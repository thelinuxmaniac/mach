/*

Test specifications for MACH

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Nov-26

*/

var mach_test_data = {};
mach_test_data['coreutils.git'] = {};
mach_test_data['coreutils.git']['repo'] = {
  'url': 'http://git.savannah.gnu.org/gitweb/?p=coreutils.git',
  'name': 'GNU coreutils',
  'last_commit': {
    'author': 'Paul Eggert <eggert@cs.ucla.edu>',
    'id': 'c7ec75a27687bc30627e70c9f14d80de778a0d85',
    'date': 'Fri Sep 8 16:25:00 2023 -0700'
  },
  'tag_count':371,
  'object_count':183569
};

//------------------------------------------------------------------------------
// [coreutils] Tests based on GNU Coreutils
//------------------------------------------------------------------------------
mach_test_data['coreutils.git']['test'] = [];

// [coreutils] retrieve blob
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': '41779f55dbaa109462267c0d7293237d555047f7',
    'expected_object_type': 'blob',
    'expected_object_size': 30656,
    'expected_object_value': `/* wc - print the number of lines, words, and bytes in files
   Copyright (C) 1985-2023 Free Software Foundation, Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

/* Written by Paul Rubin, phr@ocf.berkeley.edu
   and David MacKenzie, djm@gnu.ai.mit.edu. */

#include <config.h>

#include <stdckdint.h>
#include <stdio.h>
#include <getopt.h>
#include <sys/types.h>
#include <wchar.h>
#include <wctype.h>

#include "system.h"
#include "assure.h"
#include "argmatch.h"
#include "argv-iter.h"
#include "fadvise.h"
#include "mbchar.h"
#include "physmem.h"
#include "readtokens0.h"
#include "safe-read.h"
#include "stat-size.h"
#include "xbinary-io.h"

#if !defined iswspace && !HAVE_ISWSPACE
# define iswspace(wc) \\
    ((wc) == to_uchar (wc) && isspace (to_uchar (wc)))
#endif

/* The official name of this program (e.g., no 'g' prefix).  */
#define PROGRAM_NAME "wc"

#define AUTHORS \\
  proper_name ("Paul Rubin"), \\
  proper_name ("David MacKenzie")

/* Size of atomic reads. */
#define BUFFER_SIZE (16 * 1024)

#ifdef USE_AVX2_WC_LINECOUNT
/* From wc_avx2.c */
extern bool
wc_lines_avx2 (char const *file, int fd, uintmax_t *lines_out,
               uintmax_t *bytes_out);
#endif

static bool debug;

/* Cumulative number of lines, words, chars and bytes in all files so far.
   max_line_length is the maximum over all files processed so far.  */
static uintmax_t total_lines;
static uintmax_t total_words;
static uintmax_t total_chars;
static uintmax_t total_bytes;
static uintmax_t total_lines_overflow;
static uintmax_t total_words_overflow;
static uintmax_t total_chars_overflow;
static uintmax_t total_bytes_overflow;
static uintmax_t max_line_length;

/* Which counts to print. */
static bool print_lines, print_words, print_chars, print_bytes;
static bool print_linelength;

/* The print width of each count.  */
static int number_width;

/* True if we have ever read the standard input. */
static bool have_read_stdin;

/* Used to determine if file size can be determined without reading.  */
static size_t page_size;

/* Enable to _not_ treat non breaking space as a word separator.  */
static bool posixly_correct;

/* The result of calling fstat or stat on a file descriptor or file.  */
struct fstatus
{
  /* If positive, fstat or stat has not been called yet.  Otherwise,
     this is the value returned from fstat or stat.  */
  int failed;

  /* If FAILED is zero, this is the file's status.  */
  struct stat st;
};

/* For long options that have no equivalent short option, use a
   non-character as a pseudo short option, starting with CHAR_MAX + 1.  */
enum
{
  DEBUG_PROGRAM_OPTION = CHAR_MAX + 1,
  FILES0_FROM_OPTION,
  TOTAL_OPTION,
};

static struct option const longopts[] =
{
  {"bytes", no_argument, nullptr, 'c'},
  {"chars", no_argument, nullptr, 'm'},
  {"lines", no_argument, nullptr, 'l'},
  {"words", no_argument, nullptr, 'w'},
  {"debug", no_argument, nullptr, DEBUG_PROGRAM_OPTION},
  {"files0-from", required_argument, nullptr, FILES0_FROM_OPTION},
  {"max-line-length", no_argument, nullptr, 'L'},
  {"total", required_argument, nullptr, TOTAL_OPTION},
  {GETOPT_HELP_OPTION_DECL},
  {GETOPT_VERSION_OPTION_DECL},
  {nullptr, 0, nullptr, 0}
};

enum total_type
  {
    total_auto,         /* 0: default or --total=auto */
    total_always,       /* 1: --total=always */
    total_only,         /* 2: --total=only */
    total_never         /* 3: --total=never */
  };
static char const *const total_args[] =
{
  "auto", "always", "only", "never", nullptr
};
static enum total_type const total_types[] =
{
  total_auto, total_always, total_only, total_never
};
ARGMATCH_VERIFY (total_args, total_types);
static enum total_type total_mode = total_auto;

#ifdef USE_AVX2_WC_LINECOUNT
static bool
avx2_supported (void)
{
  bool avx_enabled = 0 < __builtin_cpu_supports ("avx2");

  if (debug)
    error (0, 0, (avx_enabled
                  ? _("using avx2 hardware support")
                  : _("avx2 support not detected")));

  return avx_enabled;
}
#endif

void
usage (int status)
{
  if (status != EXIT_SUCCESS)
    emit_try_help ();
  else
    {
      printf (_("\\
Usage: %s [OPTION]... [FILE]...\\n\\
  or:  %s [OPTION]... --files0-from=F\\n\\
"),
              program_name, program_name);
      fputs (_("\\
Print newline, word, and byte counts for each FILE, and a total line if\\n\\
more than one FILE is specified.  A word is a non-zero-length sequence of\\n\\
printable characters delimited by white space.\\n\\
"), stdout);

      emit_stdin_note ();

      fputs (_("\\
\\n\\
The options below may be used to select which counts are printed, always in\\n\\
the following order: newline, word, character, byte, maximum line length.\\n\\
  -c, --bytes            print the byte counts\\n\\
  -m, --chars            print the character counts\\n\\
  -l, --lines            print the newline counts\\n\\
"), stdout);
      fputs (_("\\
      --files0-from=F    read input from the files specified by\\n\\
                           NUL-terminated names in file F;\\n\\
                           If F is - then read names from standard input\\n\\
  -L, --max-line-length  print the maximum display width\\n\\
  -w, --words            print the word counts\\n\\
"), stdout);
      fputs (_("\\
      --total=WHEN       when to print a line with total counts;\\n\\
                           WHEN can be: auto, always, only, never\\n\\
"), stdout);
      fputs (HELP_OPTION_DESCRIPTION, stdout);
      fputs (VERSION_OPTION_DESCRIPTION, stdout);
      emit_ancillary_info (PROGRAM_NAME);
    }
  exit (status);
}

/* Return non zero if a non breaking space.  */
ATTRIBUTE_PURE
static int
iswnbspace (wint_t wc)
{
  return ! posixly_correct
         && (wc == 0x00A0 || wc == 0x2007
             || wc == 0x202F || wc == 0x2060);
}

static int
isnbspace (int c)
{
  return iswnbspace (btowc (c));
}

/* FILE is the name of the file (or null for standard input)
   associated with the specified counters.  */
static void
write_counts (uintmax_t lines,
              uintmax_t words,
              uintmax_t chars,
              uintmax_t bytes,
              uintmax_t linelength,
              char const *file)
{
  static char const format_sp_int[] = " %*s";
  char const *format_int = format_sp_int + 1;
  char buf[INT_BUFSIZE_BOUND (uintmax_t)];

  if (print_lines)
    {
      printf (format_int, number_width, umaxtostr (lines, buf));
      format_int = format_sp_int;
    }
  if (print_words)
    {
      printf (format_int, number_width, umaxtostr (words, buf));
      format_int = format_sp_int;
    }
  if (print_chars)
    {
      printf (format_int, number_width, umaxtostr (chars, buf));
      format_int = format_sp_int;
    }
  if (print_bytes)
    {
      printf (format_int, number_width, umaxtostr (bytes, buf));
      format_int = format_sp_int;
    }
  if (print_linelength)
    {
      printf (format_int, number_width, umaxtostr (linelength, buf));
    }
  if (file)
    printf (" %s", strchr (file, '\\n') ? quotef (file) : file);
  putchar ('\\n');
}

static bool
wc_lines (char const *file, int fd, uintmax_t *lines_out, uintmax_t *bytes_out)
{
  size_t bytes_read;
  uintmax_t lines, bytes;
  char buf[BUFFER_SIZE + 1];
  bool long_lines = false;

  if (!lines_out || !bytes_out)
    {
      return false;
    }

  lines = bytes = 0;

  while ((bytes_read = safe_read (fd, buf, BUFFER_SIZE)) > 0)
    {

      if (bytes_read == SAFE_READ_ERROR)
        {
          error (0, errno, "%s", quotef (file));
          return false;
        }

      bytes += bytes_read;

      char *p = buf;
      char *end = buf + bytes_read;
      uintmax_t plines = lines;

      if (! long_lines)
        {
          /* Avoid function call overhead for shorter lines.  */
          while (p != end)
            lines += *p++ == '\\n';
        }
      else
        {
          /* rawmemchr is more efficient with longer lines.  */
          *end = '\\n';
          while ((p = rawmemchr (p, '\\n')) < end)
            {
              ++p;
              ++lines;
            }
        }

      /* If the average line length in the block is >= 15, then use
          memchr for the next block, where system specific optimizations
          may outweigh function call overhead.
          FIXME: This line length was determined in 2015, on both
          x86_64 and ppc64, but it's worth re-evaluating in future with
          newer compilers, CPUs, or memchr() implementations etc.  */
      if (lines - plines <= bytes_read / 15)
        long_lines = true;
      else
        long_lines = false;
    }

  *bytes_out = bytes;
  *lines_out = lines;

  return true;
}

/* Count words.  FILE_X is the name of the file (or null for standard
   input) that is open on descriptor FD.  *FSTATUS is its status.
   CURRENT_POS is the current file offset if known, negative if unknown.
   Return true if successful.  */
static bool
wc (int fd, char const *file_x, struct fstatus *fstatus, off_t current_pos)
{
  bool ok = true;
  char buf[BUFFER_SIZE + 1];
  size_t bytes_read;
  uintmax_t lines, words, chars, bytes, linelength;
  bool count_bytes, count_chars, count_complicated;
  char const *file = file_x ? file_x : _("standard input");

  lines = words = chars = bytes = linelength = 0;

  /* If in the current locale, chars are equivalent to bytes, we prefer
     counting bytes, because that's easier.  */
#if MB_LEN_MAX > 1
  if (MB_CUR_MAX > 1)
    {
      count_bytes = print_bytes;
      count_chars = print_chars;
    }
  else
#endif
    {
      count_bytes = print_bytes || print_chars;
      count_chars = false;
    }
  count_complicated = print_words || print_linelength;

  /* Advise the kernel of our access pattern only if we will read().  */
  if (!count_bytes || count_chars || print_lines || count_complicated)
    fdadvise (fd, 0, 0, FADVISE_SEQUENTIAL);

  /* When counting only bytes, save some line- and word-counting
     overhead.  If FD is a 'regular' Unix file, using lseek is enough
     to get its 'size' in bytes.  Otherwise, read blocks of BUFFER_SIZE
     bytes at a time until EOF.  Note that the 'size' (number of bytes)
     that wc reports is smaller than stats.st_size when the file is not
     positioned at its beginning.  That's why the lseek calls below are
     necessary.  For example the command
     '(dd ibs=99k skip=1 count=0; ./wc -c) < /etc/group'
     should make wc report '0' bytes.  */

  if (count_bytes && !count_chars && !print_lines && !count_complicated)
    {
      bool skip_read = false;

      if (0 < fstatus->failed)
        fstatus->failed = fstat (fd, &fstatus->st);

      /* For sized files, seek to one st_blksize before EOF rather than to EOF.
         This works better for files in proc-like file systems where
         the size is only approximate.  */
      if (! fstatus->failed && usable_st_size (&fstatus->st)
          && 0 <= fstatus->st.st_size)
        {
          off_t end_pos = fstatus->st.st_size;
          if (current_pos < 0)
            current_pos = lseek (fd, 0, SEEK_CUR);

          if (end_pos % page_size)
            {
              /* We only need special handling of /proc and /sys files etc.
                 when they're a multiple of PAGE_SIZE.  In the common case
                 for files with st_size not a multiple of PAGE_SIZE,
                 it's more efficient and accurate to use st_size.

                 Be careful here.  The current position may actually be
                 beyond the end of the file.  As in the example above.  */

              bytes = end_pos < current_pos ? 0 : end_pos - current_pos;
              if (bytes && 0 <= lseek (fd, bytes, SEEK_CUR))
                skip_read = true;
              else
                bytes = 0;
            }
          else
            {
              off_t hi_pos = end_pos - end_pos % (ST_BLKSIZE (fstatus->st) + 1);
              if (0 <= current_pos && current_pos < hi_pos
                  && 0 <= lseek (fd, hi_pos, SEEK_CUR))
                bytes = hi_pos - current_pos;
            }
        }

      if (! skip_read)
        {
          fdadvise (fd, 0, 0, FADVISE_SEQUENTIAL);
          while ((bytes_read = safe_read (fd, buf, BUFFER_SIZE)) > 0)
            {
              if (bytes_read == SAFE_READ_ERROR)
                {
                  error (0, errno, "%s", quotef (file));
                  ok = false;
                  break;
                }
              bytes += bytes_read;
            }
        }
    }
  else if (!count_chars && !count_complicated)
    {
#ifdef USE_AVX2_WC_LINECOUNT
      static bool (*wc_lines_p) (char const *, int, uintmax_t *, uintmax_t *);
      if (!wc_lines_p)
        wc_lines_p = avx2_supported () ? wc_lines_avx2 : wc_lines;
#else
      bool (*wc_lines_p) (char const *, int, uintmax_t *, uintmax_t *)
        = wc_lines;
#endif

      /* Use a separate loop when counting only lines or lines and bytes --
         but not chars or words.  */
      ok = wc_lines_p (file, fd, &lines, &bytes);
    }
#if MB_LEN_MAX > 1
# define SUPPORT_OLD_MBRTOWC 1
  else if (MB_CUR_MAX > 1)
    {
      bool in_word = false;
      uintmax_t linepos = 0;
      mbstate_t state = {0};
      bool in_shift = false;
# if SUPPORT_OLD_MBRTOWC
      /* Back-up the state before each multibyte character conversion and
         move the last incomplete character of the buffer to the front
         of the buffer.  This is needed because we don't know whether
         the 'mbrtowc' function updates the state when it returns -2, --
         this is the ISO C 99 and glibc-2.2 behavior - or not - amended
         ANSI C, glibc-2.1 and Solaris 5.7 behavior.  We don't have an
         autoconf test for this, yet.  */
      size_t prev = 0; /* number of bytes carried over from previous round */
# else
      const size_t prev = 0;
# endif

      while ((bytes_read = safe_read (fd, buf + prev, BUFFER_SIZE - prev)) > 0)
        {
          char const *p;
# if SUPPORT_OLD_MBRTOWC
          mbstate_t backup_state;
# endif
          if (bytes_read == SAFE_READ_ERROR)
            {
              error (0, errno, "%s", quotef (file));
              ok = false;
              break;
            }

          bytes += bytes_read;
          p = buf;
          bytes_read += prev;
          do
            {
              wchar_t wide_char;
              size_t n;
              bool wide = true;

              if (!in_shift && is_basic (*p))
                {
                  /* Handle most ASCII characters quickly, without calling
                     mbrtowc().  */
                  n = 1;
                  wide_char = *p;
                  wide = false;
                }
              else
                {
                  in_shift = true;
# if SUPPORT_OLD_MBRTOWC
                  backup_state = state;
# endif
                  n = mbrtowc (&wide_char, p, bytes_read, &state);
                  if (n == (size_t) -2)
                    {
# if SUPPORT_OLD_MBRTOWC
                      state = backup_state;
# endif
                      break;
                    }
                  if (n == (size_t) -1)
                    {
                      /* Remember that we read a byte, but don't complain
                         about the error.  Because of the decoding error,
                         this is a considered to be byte but not a
                         character (that is, chars is not incremented).  */
                      p++;
                      bytes_read--;
                      continue;
                    }
                  if (mbsinit (&state))
                    in_shift = false;
                  if (n == 0)
                    {
                      wide_char = 0;
                      n = 1;
                    }
                }

              switch (wide_char)
                {
                case '\\n':
                  lines++;
                  FALLTHROUGH;
                case '\\r':
                case '\\f':
                  if (linepos > linelength)
                    linelength = linepos;
                  linepos = 0;
                  goto mb_word_separator;
                case '\\t':
                  linepos += 8 - (linepos % 8);
                  goto mb_word_separator;
                case ' ':
                  linepos++;
                  FALLTHROUGH;
                case '\\v':
                mb_word_separator:
                  words += in_word;
                  in_word = false;
                  break;
                default:
                  if (wide && iswprint (wide_char))
                    {
                      /* wcwidth can be expensive on OSX for example,
                         so avoid if not needed.  */
                      if (print_linelength)
                        {
                          int width = wcwidth (wide_char);
                          if (width > 0)
                            linepos += width;
                        }
                      if (iswspace (wide_char) || iswnbspace (wide_char))
                        goto mb_word_separator;
                      in_word = true;
                    }
                  else if (!wide && isprint (to_uchar (*p)))
                    {
                      linepos++;
                      if (isspace (to_uchar (*p)))
                        goto mb_word_separator;
                      in_word = true;
                    }
                  break;
                }

              p += n;
              bytes_read -= n;
              chars++;
            }
          while (bytes_read > 0);

# if SUPPORT_OLD_MBRTOWC
          if (bytes_read > 0)
            {
              if (bytes_read == BUFFER_SIZE)
                {
                  /* Encountered a very long redundant shift sequence.  */
                  p++;
                  bytes_read--;
                }
              memmove (buf, p, bytes_read);
            }
          prev = bytes_read;
# endif
        }
      if (linepos > linelength)
        linelength = linepos;
      words += in_word;
    }
#endif
  else
    {
      bool in_word = false;
      uintmax_t linepos = 0;

      while ((bytes_read = safe_read (fd, buf, BUFFER_SIZE)) > 0)
        {
          char const *p = buf;
          if (bytes_read == SAFE_READ_ERROR)
            {
              error (0, errno, "%s", quotef (file));
              ok = false;
              break;
            }

          bytes += bytes_read;
          do
            {
              switch (*p++)
                {
                case '\\n':
                  lines++;
                  FALLTHROUGH;
                case '\\r':
                case '\\f':
                  if (linepos > linelength)
                    linelength = linepos;
                  linepos = 0;
                  goto word_separator;
                case '\\t':
                  linepos += 8 - (linepos % 8);
                  goto word_separator;
                case ' ':
                  linepos++;
                  FALLTHROUGH;
                case '\\v':
                word_separator:
                  words += in_word;
                  in_word = false;
                  break;
                default:
                  if (isprint (to_uchar (p[-1])))
                    {
                      linepos++;
                      if (isspace (to_uchar (p[-1]))
                          || isnbspace (to_uchar (p[-1])))
                        goto word_separator;
                      in_word = true;
                    }
                  break;
                }
            }
          while (--bytes_read);
        }
      if (linepos > linelength)
        linelength = linepos;
      words += in_word;
    }

  if (count_chars < print_chars)
    chars = bytes;

  if (total_mode != total_only)
    write_counts (lines, words, chars, bytes, linelength, file_x);

  if (ckd_add (&total_lines, total_lines, lines))
    total_lines_overflow = true;
  if (ckd_add (&total_words, total_words, words))
    total_words_overflow = true;
  if (ckd_add (&total_chars, total_chars, chars))
    total_chars_overflow = true;
  if (ckd_add (&total_bytes, total_bytes, bytes))
    total_bytes_overflow = true;

  if (linelength > max_line_length)
    max_line_length = linelength;

  return ok;
}

static bool
wc_file (char const *file, struct fstatus *fstatus)
{
  if (! file || STREQ (file, "-"))
    {
      have_read_stdin = true;
      xset_binary_mode (STDIN_FILENO, O_BINARY);
      return wc (STDIN_FILENO, file, fstatus, -1);
    }
  else
    {
      int fd = open (file, O_RDONLY | O_BINARY);
      if (fd == -1)
        {
          error (0, errno, "%s", quotef (file));
          return false;
        }
      else
        {
          bool ok = wc (fd, file, fstatus, 0);
          if (close (fd) != 0)
            {
              error (0, errno, "%s", quotef (file));
              return false;
            }
          return ok;
        }
    }
}

/* Return the file status for the NFILES files addressed by FILE.
   Optimize the case where only one number is printed, for just one
   file; in that case we can use a print width of 1, so we don't need
   to stat the file.  Handle the case of (nfiles == 0) in the same way;
   that happens when we don't know how long the list of file names will be.  */

static struct fstatus *
get_input_fstatus (size_t nfiles, char *const *file)
{
  struct fstatus *fstatus = xnmalloc (nfiles ? nfiles : 1, sizeof *fstatus);

  if (nfiles == 0
      || (nfiles == 1
          && ((print_lines + print_words + print_chars
               + print_bytes + print_linelength)
              == 1)))
    fstatus[0].failed = 1;
  else
    {
      for (size_t i = 0; i < nfiles; i++)
        fstatus[i].failed = (! file[i] || STREQ (file[i], "-")
                             ? fstat (STDIN_FILENO, &fstatus[i].st)
                             : stat (file[i], &fstatus[i].st));
    }

  return fstatus;
}

/* Return a print width suitable for the NFILES files whose status is
   recorded in FSTATUS.  Optimize the same special case that
   get_input_fstatus optimizes.  */

ATTRIBUTE_PURE
static int
compute_number_width (size_t nfiles, struct fstatus const *fstatus)
{
  int width = 1;

  if (0 < nfiles && fstatus[0].failed <= 0)
    {
      int minimum_width = 1;
      uintmax_t regular_total = 0;

      for (size_t i = 0; i < nfiles; i++)
        if (! fstatus[i].failed)
          {
            if (S_ISREG (fstatus[i].st.st_mode))
              regular_total += fstatus[i].st.st_size;
            else
              minimum_width = 7;
          }

      for (; 10 <= regular_total; regular_total /= 10)
        width++;
      if (width < minimum_width)
        width = minimum_width;
    }

  return width;
}


int
main (int argc, char **argv)
{
  bool ok;
  int optc;
  size_t nfiles;
  char **files;
  char *files_from = nullptr;
  struct fstatus *fstatus;
  struct Tokens tok;

  initialize_main (&argc, &argv);
  set_program_name (argv[0]);
  setlocale (LC_ALL, "");
  bindtextdomain (PACKAGE, LOCALEDIR);
  textdomain (PACKAGE);

  atexit (close_stdout);

  page_size = getpagesize ();
  /* Line buffer stdout to ensure lines are written atomically and immediately
     so that processes running in parallel do not intersperse their output.  */
  setvbuf (stdout, nullptr, _IOLBF, 0);

  posixly_correct = (getenv ("POSIXLY_CORRECT") != nullptr);

  print_lines = print_words = print_chars = print_bytes = false;
  print_linelength = false;
  total_lines = total_words = total_chars = total_bytes = max_line_length = 0;

  while ((optc = getopt_long (argc, argv, "clLmw", longopts, nullptr)) != -1)
    switch (optc)
      {
      case 'c':
        print_bytes = true;
        break;

      case 'm':
        print_chars = true;
        break;

      case 'l':
        print_lines = true;
        break;

      case 'w':
        print_words = true;
        break;

      case 'L':
        print_linelength = true;
        break;

      case DEBUG_PROGRAM_OPTION:
        debug = true;
        break;

      case FILES0_FROM_OPTION:
        files_from = optarg;
        break;

      case TOTAL_OPTION:
        total_mode = XARGMATCH ("--total", optarg, total_args, total_types);
        break;

      case_GETOPT_HELP_CHAR;

      case_GETOPT_VERSION_CHAR (PROGRAM_NAME, AUTHORS);

      default:
        usage (EXIT_FAILURE);
      }

  if (! (print_lines || print_words || print_chars || print_bytes
         || print_linelength))
    print_lines = print_words = print_bytes = true;

  bool read_tokens = false;
  struct argv_iterator *ai;
  if (files_from)
    {
      FILE *stream;

      /* When using --files0-from=F, you may not specify any files
         on the command-line.  */
      if (optind < argc)
        {
          error (0, 0, _("extra operand %s"), quoteaf (argv[optind]));
          fprintf (stderr, "%s\\n",
                   _("file operands cannot be combined with --files0-from"));
          usage (EXIT_FAILURE);
        }

      if (STREQ (files_from, "-"))
        stream = stdin;
      else
        {
          stream = fopen (files_from, "r");
          if (stream == nullptr)
            error (EXIT_FAILURE, errno, _("cannot open %s for reading"),
                   quoteaf (files_from));
        }

      /* Read the file list into RAM if we can detect its size and that
         size is reasonable.  Otherwise, we'll read a name at a time.  */
      struct stat st;
      if (fstat (fileno (stream), &st) == 0
          && S_ISREG (st.st_mode)
          && st.st_size <= MIN (10 * 1024 * 1024, physmem_available () / 2))
        {
          read_tokens = true;
          readtokens0_init (&tok);
          if (! readtokens0 (stream, &tok) || fclose (stream) != 0)
            error (EXIT_FAILURE, 0, _("cannot read file names from %s"),
                   quoteaf (files_from));
          files = tok.tok;
          nfiles = tok.n_tok;
          ai = argv_iter_init_argv (files);
        }
      else
        {
          files = nullptr;
          nfiles = 0;
          ai = argv_iter_init_stream (stream);
        }
    }
  else
    {
      static char *stdin_only[] = { nullptr };
      files = (optind < argc ? argv + optind : stdin_only);
      nfiles = (optind < argc ? argc - optind : 1);
      ai = argv_iter_init_argv (files);
    }

  if (!ai)
    xalloc_die ();

  fstatus = get_input_fstatus (nfiles, files);
  if (total_mode == total_only)
    number_width = 1;  /* No extra padding, since no alignment requirement.  */
  else
    number_width = compute_number_width (nfiles, fstatus);

  ok = true;
  for (int i = 0; /* */; i++)
    {
      bool skip_file = false;
      enum argv_iter_err ai_err;
      char *file_name = argv_iter (ai, &ai_err);
      if (!file_name)
        {
          switch (ai_err)
            {
            case AI_ERR_EOF:
              goto argv_iter_done;
            case AI_ERR_READ:
              error (0, errno, _("%s: read error"),
                     quotef (files_from));
              ok = false;
              goto argv_iter_done;
            case AI_ERR_MEM:
              xalloc_die ();
            default:
              affirm (!"unexpected error code from argv_iter");
            }
        }
      if (files_from && STREQ (files_from, "-") && STREQ (file_name, "-"))
        {
          /* Give a better diagnostic in an unusual case:
             printf - | wc --files0-from=- */
          error (0, 0, _("when reading file names from stdin, "
                         "no file name of %s allowed"),
                 quoteaf (file_name));
          skip_file = true;
        }

      if (!file_name[0])
        {
          /* Diagnose a zero-length file name.  When it's one
             among many, knowing the record number may help.
             FIXME: currently print the record number only with
             --files0-from=FILE.  Maybe do it for argv, too?  */
          if (files_from == nullptr)
            error (0, 0, "%s", _("invalid zero-length file name"));
          else
            {
              /* Using the standard 'filename:line-number:' prefix here is
                 not totally appropriate, since NUL is the separator, not NL,
                 but it might be better than nothing.  */
              unsigned long int file_number = argv_iter_n_args (ai);
              error (0, 0, "%s:%lu: %s", quotef (files_from),
                     file_number, _("invalid zero-length file name"));
            }
          skip_file = true;
        }

      if (skip_file)
        ok = false;
      else
        ok &= wc_file (file_name, &fstatus[nfiles ? i : 0]);

      if (! nfiles)
        fstatus[0].failed = 1;
    }
 argv_iter_done:

  /* No arguments on the command line is fine.  That means read from stdin.
     However, no arguments on the --files0-from input stream is an error
     means don't read anything.  */
  if (ok && !files_from && argv_iter_n_args (ai) == 0)
    ok &= wc_file (nullptr, &fstatus[0]);

  if (read_tokens)
    readtokens0_free (&tok);

  if (total_mode != total_never
      && (total_mode != total_auto || 1 < argv_iter_n_args (ai)))
    {
      if (total_lines_overflow)
        {
          total_lines = UINTMAX_MAX;
          error (0, EOVERFLOW, _("total lines"));
          ok = false;
        }
      if (total_words_overflow)
        {
          total_words = UINTMAX_MAX;
          error (0, EOVERFLOW, _("total words"));
          ok = false;
        }
      if (total_chars_overflow)
        {
          total_chars = UINTMAX_MAX;
          error (0, EOVERFLOW, _("total characters"));
          ok = false;
        }
      if (total_bytes_overflow)
        {
          total_bytes = UINTMAX_MAX;
          error (0, EOVERFLOW, _("total bytes"));
          ok = false;
        }

      write_counts (total_lines, total_words, total_chars, total_bytes,
                    max_line_length,
                    total_mode != total_only ? _("total") : nullptr);
    }

  argv_iter_free (ai);

  free (fstatus);

  if (have_read_stdin && close (STDIN_FILENO) != 0)
    error (EXIT_FAILURE, errno, "-");

  return ok ? EXIT_SUCCESS : EXIT_FAILURE;
}
`
  }
});

// [coreutils] retrieve tag object
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'cdecf04a474972dde9c2f4fde9876a2e23818395',
    'expected_object_type': 'tag',
    'expected_object_size': 979,
    'expected_object_value': `object 201ba1a2034433e95b2647db4939d2b335cadcd8
type commit
tag v8.3
tagger Jim Meyering <meyering@redhat.com> 1262884406 +0100

coreutils 8.3
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.10 (GNU/Linux)

iQIcBAABCAAGBQJLRhY2AAoJENd//eG5q5oWH4kQAKixYSIaihQTCl6XcCXnbE7j
Q/YTcS2GaHpcnysWLj/JVJqHbQpzw7QkiKmnjxGGrPjl7nRA0maLtXaXw27Hj3pa
fcKobkaa51UtQ2sJ9qNWkuMPoy3ZbKG16RqOtQuA4hNfHti8Vj/0u2D9WtXh96yH
JlUirghPlbURmyzkTUqf1Tb7/YIVhpOWAg1exN1Frsb3nC9ZW58VKjd8A2QeujYJ
1Snf8AJ36sXD6hz41lSuA4yTm7eljOlRM7o2SCQRpnBHOrZm01vyVlrAwcbtruHz
LDrJ2k8nK8nic6ZrUPxiGhcNNk/Gn7a2GhZGXlrmWllAz7NM0vrBLJ1T5mt6LH1s
NLLAXLo77gqlfMc2Ih1NUVEPj96ttwtloM/PHRCQcgqAJ3TfRy1wHXLhZPch2XrQ
+eXXgdnWmfQa9Qy3tVFS0ZEoukU1sgf6PT/jFW7MaASRwLrz8BEXGu5mtxRd+QPz
JYOAQ/d9SDXn7e/GRaa60aOgr0IOrgxZlbw2giX1f5sSxm+aJExI5ULFy+ity5Zv
HrnkWTTp9wu/hMBCyBo3MtNmdP16nGNF6VNSGfaUgzw+ZwA6HJ3LBm4HXizPx58R
2u+xtVRGBkx5j4UhPJSrA5zZJnGzIY2buuD60JqVY8XG4Zphk4u3M5kDyVxWLp9l
HzdVBesfoEs6AN4PQ9ou
=RueB
-----END PGP SIGNATURE-----
`
  }
});

// [coreutils] tree of chain length 0
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'e4b1ebc0ff017b49321c3a87af01fa5135b8c3ec',
    'expected_object_type': 'tree',
    'expected_object_size': 611,
    'expected_object_value': `100644 blob aeb638f0a13800ec4f5c7ea20cd5c4fb3fe86cf4	chgrp.c
100644 blob 1d44c38f7620e92cf0f5a4e1a3203ec4c1adc822	chmod.c
100644 blob 2bc6987af6a894002e5f2c6e2835ffec230ce6b6	chown.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob e84fd158b23266ec69dda31d4fcbe377ed6da58a	cp.c
100644 blob 222d077e0379d92b2931d308edbaa6530ee79f7c	dd.c
100644 blob e13f1ce1db0ac5986773c214b22af6ff00b27528	df.c
100644 blob 726b5d30e176055d1ded1a6f0f4a5cc5ec89077c	du.c
100644 blob 473ea6d39725754892602cd9e0ff05510ccaec8a	install.c
100644 blob 781a55d8b31170c6ade961327ecb55d468d02ebc	ln.c
100644 blob 24343a695acd9467f6144884728e0788d75c161f	ls.c
100644 blob 7a5d08a43f5c64585845b2065c621ead80f16983	mkdir.c
100644 blob 71a98cecd8ef562d8e20c8f35c05bb86d81c82dc	mkfifo.c
100644 blob 1c582935d8526988ae02537f00d9da3eb5012f15	mknod.c
100644 blob d7fcdcb16b4b1f110d77c1035e5cdd9ed8c8cfee	mv.c
100644 blob b62fbbf07520b0e2c2c167793f857b60a9e1f167	rm.c
100644 blob 59d2de71a56f97f415bf565c4ef69d51c6306290	rmdir.c
100644 blob fa2d033c21ea6de25f997c4620d676bbd2447cf2	touch.c`
  }
});

// [coreutils] tree of chain length 1
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': '32d88add9a00e58b643e48b2ed0963b9123b1d1a',
    'expected_object_type': 'tree',
    'expected_object_size': 611,
    'expected_object_value': `100644 blob aeb638f0a13800ec4f5c7ea20cd5c4fb3fe86cf4	chgrp.c
100644 blob 1d44c38f7620e92cf0f5a4e1a3203ec4c1adc822	chmod.c
100644 blob 2bc6987af6a894002e5f2c6e2835ffec230ce6b6	chown.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob e84fd158b23266ec69dda31d4fcbe377ed6da58a	cp.c
100644 blob dd56068151dff39de4c3709357cc13ed15fd404f	dd.c
100644 blob e13f1ce1db0ac5986773c214b22af6ff00b27528	df.c
100644 blob 726b5d30e176055d1ded1a6f0f4a5cc5ec89077c	du.c
100644 blob 473ea6d39725754892602cd9e0ff05510ccaec8a	install.c
100644 blob 781a55d8b31170c6ade961327ecb55d468d02ebc	ln.c
100644 blob 24343a695acd9467f6144884728e0788d75c161f	ls.c
100644 blob 7a5d08a43f5c64585845b2065c621ead80f16983	mkdir.c
100644 blob 71a98cecd8ef562d8e20c8f35c05bb86d81c82dc	mkfifo.c
100644 blob 1c582935d8526988ae02537f00d9da3eb5012f15	mknod.c
100644 blob d7fcdcb16b4b1f110d77c1035e5cdd9ed8c8cfee	mv.c
100644 blob b62fbbf07520b0e2c2c167793f857b60a9e1f167	rm.c
100644 blob 59d2de71a56f97f415bf565c4ef69d51c6306290	rmdir.c
100644 blob fa2d033c21ea6de25f997c4620d676bbd2447cf2	touch.c`
  }
});

// [coreutils] tree of chain length 2
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'b1c295bacb43f29fe56d4156cbcd513ca82a2e92',
    'expected_object_type': 'tree',
    'expected_object_size': 611,
    'expected_object_value': `100644 blob aeb638f0a13800ec4f5c7ea20cd5c4fb3fe86cf4	chgrp.c
100644 blob 1d44c38f7620e92cf0f5a4e1a3203ec4c1adc822	chmod.c
100644 blob 2bc6987af6a894002e5f2c6e2835ffec230ce6b6	chown.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob d71734454697f0e39a37950a573582f33cf05b11	cp.c
100644 blob dd56068151dff39de4c3709357cc13ed15fd404f	dd.c
100644 blob e13f1ce1db0ac5986773c214b22af6ff00b27528	df.c
100644 blob 726b5d30e176055d1ded1a6f0f4a5cc5ec89077c	du.c
100644 blob 473ea6d39725754892602cd9e0ff05510ccaec8a	install.c
100644 blob 781a55d8b31170c6ade961327ecb55d468d02ebc	ln.c
100644 blob 3f207274d73f88ce931950eb8b03e8849210637c	ls.c
100644 blob 7a5d08a43f5c64585845b2065c621ead80f16983	mkdir.c
100644 blob 71a98cecd8ef562d8e20c8f35c05bb86d81c82dc	mkfifo.c
100644 blob 1c582935d8526988ae02537f00d9da3eb5012f15	mknod.c
100644 blob d7fcdcb16b4b1f110d77c1035e5cdd9ed8c8cfee	mv.c
100644 blob b62fbbf07520b0e2c2c167793f857b60a9e1f167	rm.c
100644 blob 59d2de71a56f97f415bf565c4ef69d51c6306290	rmdir.c
100644 blob fa2d033c21ea6de25f997c4620d676bbd2447cf2	touch.c`
  }
});

// [coreutils] tree of chain length 5
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': '663f8dfbc2061e8e96e6252c407feec2402085bf',
    'expected_object_type': 'tree',
    'expected_object_size': 160,
    'expected_object_value': `100644 blob a43ea2126fb6b114bff5f8e003ee118e045dacf1	COPYING
100644 blob c59fe67dbcd9e08034c88b1c408e7d7486026fa8	INSTALL
040000 tree b75d6cc8fe4cd584446b3a97ebf809a630a57e19	lib
040000 tree 4600a00d47ea26cc8058e9900c6f8444fb2896de	old
040000 tree ad87706fe20f77306fe591ad9f722f4e49eebdfa	src`
  }
});

// [coreutils] tree of chain length 24
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'ca6600a5176e0fd2255d7daff02c811247602444',
    'expected_object_type': 'tree',
    'expected_object_size': 611,
    'expected_object_value': `100644 blob 62358af1c206b3e21b325fe69508e639ae228a7e	chgrp.c
100644 blob efdc08cd1e08d5da0f3ad7c0498db0e7efb2a973	chmod.c
100644 blob dca9ba6debf3add99d256444b627982b10efe806	chown.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob f54a1e5784826b7568de91fdf1b1cc7b56c26d57	cp.c
100644 blob dc8d85a7d663cfded82113bbae4b2392d12914fd	dd.c
100644 blob 6439a7ec5aae41fc807a6e33bc225cafd6eb8349	df.c
100644 blob 10864bf014554987d19bb3847ef381724249b715	du.c
100644 blob 881038c4172af7c6c93a77c9e8451471d0061e3d	install.c
100644 blob d80d0cede16a1e9747ee625c214574c6f07f1397	ln.c
100644 blob 870c13066e91519311abf76b02dedf0cc685b260	ls.c
100644 blob c60c5460fa840a5b64bfd3506a909cbf321de001	mkdir.c
100644 blob 24a9437445ee35b4249a71447f60f783cd68379f	mkfifo.c
100644 blob d49070cbdb8b4c644fb488ea18d36a6ca755ae4d	mknod.c
100644 blob cd95ec2f97848b3c6112d06f064adb48e0164d05	mv.c
100644 blob 7b98acdef32e0cdc1ceed433fd81a001168f5aab	rm.c
100644 blob 92ed8b1e9b141999b40f56a5318100effa5c2964	rmdir.c
100644 blob 8c2ee312641d57e4a103be891fc0bd975e9c4c96	touch.c`
  }
});

// [coreutils] tree of chain length 50
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': '8e05a4b775377340111760aae3a3b2a5f7008ca9',
    'expected_object_type': 'tree',
    'expected_object_size': 2191,
    'expected_object_value': `100644 blob f8d9e17f6b38ffd03c1087a11a0dede71a4f3e88	basename.c
100644 blob ef4828c96f0f0993c41dbfea8fb56b327de424b1	cat.c
100644 blob 3e6c82d7e96791dc7962a1be1268474ac598c042	chgrp.c
100644 blob 3df4b99aba42fa5149fa0400949fe831a276bae9	chmod.c
100644 blob 37a881e2fd265f0a76bb5a7ba5c325ab82d24e70	chown.c
100644 blob 6cce4a8f14a84c2f0c8b9523ceb8accd6befc4b7	cksum.c
100644 blob 7a7d6accb3e0b0afee144395c0e80374f3571f64	comm.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob c1415b7902585522e7101e33486dab155b315f80	cp.c
100644 blob 8d27ce03fc650545f468b9b8fe0d1b5fb86e9fa3	csplit.c
100644 blob 6e95f0a1507cf677319b7221cf5b834d5673a331	cut.c
100644 blob 59d76c7da10680e46ac6264b821da3fc891eca33	date.c
100644 blob ba8d15e571ae820e94ac307fed3aa83dfbd8357d	dd.c
100644 blob 35c069d2630432308e076b81352a9563c3e39c8b	df.c
100644 blob 05612353a5485eb520176e2d1d677fdb70ad3cd7	dirname.c
100644 blob 5543ceea86c68c59ed52cf80f71ae77c35fa54d7	du.c
100644 blob b8c4e58d1a497f843845f23aecf89727873c51c4	echo.c
100644 blob f802856046578e21f8f49543e83276a6c513736f	env.c
100644 blob 17d215b43ef7f09d0ade4eeeda9eaf9f555485a9	expand.c
100644 blob e5f29412285bb39a681cb658d46321ccc5480312	expr.c
100644 blob fcdd885b1641e4ce5aed59034646472c57eac287	fold.c
100755 blob 7d84058699bbd7c9d05ccb4cb95dd0eac50e0567	groups.sh
100644 blob c818c661207ab4cfe10e399cb6cdc178491a4ed3	head.c
100644 blob a6708fbe4e2c1d1c29ab24818bebfa0a965f2fcc	id.c
100644 blob f0bbbbd92896b48b1e7ba16feb63cdd9ba1c2ec0	install.c
100644 blob c826df8249d4f15186a2fb80a03bc221c7d2deea	join.c
100644 blob ea8d3b2f3f278933c55c5be6262c21f4ce98ad5d	ln.c
100644 blob 39d213709873370267dbcd9563ab80ae07668d97	logname.c
100644 blob 202e16c6f41680887f23635f5be43a85477adf1c	ls.c
100644 blob 00bde815fad109c3bfde2724606511e777300516	mkdir.c
100644 blob 075cece515bd4208acde2c53e73fb9b1341501ca	mkfifo.c
100644 blob 66029ad0f6f0a4d29ea271e67fd636d35317587b	mknod.c
100644 blob 9d28d4a87f3f9362b8981bf10988b17c19cb6d4b	mv.c
100644 blob 6386e519a8b2a921c3a0bfe5903f6b2e550be1ff	nice.c
100644 blob 233a6f26a902447e9d8e581a3a632a2c77b0f41e	nl.c
100755 blob 00908b5ba8e6a11c335a0d48ee44fa82ed675c06	nohup.sh
100644 blob 6c90246b130a0de2a658eea50f1547f89aa5b42a	od.c
100644 blob 3cd95d36807adbc09d4081b6916d26553af5d79f	paste.c
100644 blob 6a0bf7965af5ace064d2514b50558e6c9e132743	pathchk.c
100644 blob 1abb686bbd97ee57ed051ab145687c59189bf259	pr.c
100644 blob ac4511cc5f11b386dc43d992cd0053a9fad01943	printenv.c
100644 blob 1c43c077399875cf3370bd7f3efe5ded1ceea58e	printf.c
100644 blob 0d0ce7c4caa85bf8a657e8de85eef08228516c1e	rm.c
100644 blob 35bd7d652b91a9956eb0341705d54417a422e7d1	rmdir.c
100644 blob 1551eeaa8ba861a179b1c012220b40f1da12bcee	sleep.c
100644 blob f4f65782f84b0befa2b1cb632340ed01b6a6b129	sort.c
100644 blob 980edf310e254dce64ecab9d09feaccfa24a9343	split.c
100644 blob 4fb8158299f1d7d80dd1fe903752018854b1b3f5	stty.c
100644 blob ff2bfe5fce6b9cade0afa3b228b060a7050b992f	su.c
100644 blob a7079b88243c5ce680cf81e23c51cb54ce6b8437	sum.c
100644 blob 8f3c94aab7b5d86686118ec2a9b209aa6b2586e1	tac.c
100644 blob 138c22894afb9cc5f7877c3f171661989d798b7d	tail.c
100644 blob b97821c8dd5527f861fa4c2ef164c50ba5612099	tee.c
100644 blob 0bc44e5dcee51909fcf53c724d54d86c84bf0f8a	test.c
100644 blob 65d76279fb31217bba00df78fcc5dfaecb3ddeb8	touch.c
100644 blob 06aeb73630fd33ac92ed3d4fa3a3fe90816221ae	tr.c
100644 blob 12ead35b0c87fef1aeda915c7d0f8dd8eb619049	tty.c
100644 blob 71d3112075d34e9ee1a447141fef965144a78563	uname.c
100644 blob 01dc417622981cabd53b0df52b2829873c2e86b3	unexpand.c
100644 blob 944727f810c1c6f906eae006dfd397657e55f562	uniq.c
100644 blob 5bb4f2405633ed5ed4ba06781e72859f2d4d5b1d	wc.c
100644 blob 381a51f505d4c9440394928f293ab949b7215a31	who.c
100644 blob 4a12406f18a2c4f493659a63ea25b46c6e6fc76c	whoami.c
100644 blob 71eabb020ed3dc91487dd11317306d6abb024dd5	yes.c`
  }
});

// [coreutils]  a commit of type OBJ_OFS_DELTA
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'a0000ba4ae23b770ba0756f0c8cfc59aa9fabbe3',
    'expected_object_type': 'commit',
    'expected_object_size': 367,
    'expected_object_value': `tree 9c82c550742d3df1747f2861bb8aa55c816323ac
parent 70d023b076ab82ad000a404310bc0aee2fa3ac80
author Jim Meyering <meyering@redhat.com> 1260538993 +0100
committer Jim Meyering <meyering@redhat.com> 1260538993 +0100

post-release administrivia

* NEWS: Add header line for next release.
* .prev-version: Record previous version.
* cfg.mk (old_NEWS_hash): Auto-update.
`
  }
});

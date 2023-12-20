/*

Maintains the state of HTML user interface for the MACH application.

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Oct-08

*/
function _mach() {
  // this.c        : reference for the HTML container used by the MACH application
  // this.repo_url : git repository URL
  // this.git      : interface to the git repository

  this.MACH_NAME = 'Manual Annotation of Code History';
  this.MACH_SHORT_NAME = 'MACH';
  this.MACH_VERSION = '0.0.1';

  // Data
  this.d = {
    'mach': {
      'project': {
        'shared_fid': '__FILE_ID__',
        'shared_rev': '__FILE_REV_ID__',
        'shared_rev_timestamp': '__FILE_REV_TIMESTAMP__',
        'name': '',
        'id': this.uuid(),
        'description':'',
        'creator':'Manual Annotation of Code History (MACH)',
        'created':Date.now(),
        'updated':'',
      },
      'conf': {
        "repo": {
          'url': '',
          'name': '',
          'head': '',
          'filepath': ''
        },
        'attributes': {}
      },
      'preferences': {
        'visible_attributes':[],
        'filepath':'',
        'version':-1
      },
      "mach_project_file_format_version": 1
    },
    'object': {}, // manual annotation of object's history
    'commit': {}, // manual annotation of commits
    'tree': {}    // manual annotation of groups of objects (i.e. tree)
  }

  // cache
  this.cache = {};

  // UI state
  this.now = {
    'filepath':'', // current file
    'head': {
      'id':'',
      'object':{},
      'tree':{},
    },
    'stat': {       // to store performance related statistical data
      'history': {}
    },
    'metadata': {
      'shortcut_prefix_list': {},
      'shortcut_ongoing': false,
      'ongoing_shortcut_aid': '',
      'shortcut_pressed_so_far': [],
    }
  }

  this.LOG_TIMEOUT = 3000;   // clear log automatically after LOG_TIMEOUT ms
  this.log_clear_timer = 0;  // for clearing log messages automatically after timeout
  this.HISTORY_LOAD_MSG_FREQ = 3;
  this.MAX_FILE_HISTORY = 10;

  // keyboard shortcuts
  this.KEYBOARD_SHORTCUTS = [
    [ ['Ctrl', 's'], 'Save project as JSON file' ],
    [ ['Ctrl', 'o'], 'Load existing project from a JSON file' ],
    [ ['&rarr;'], 'Show next version of current file' ],
    [ ['&larr;'], 'Show previous version of current file' ],
    [ ['&uarr;'], 'Scroll up by one line for the current file' ],
    [ ['&darr;'], 'Scroll down by one line for the current file' ],
    [ ['Alt', '&uarr;'], 'Jump to previous change in current file' ],
    [ ['Alt', '&darr;'], 'Jump to next change in current file' ],
    [ ['Ctrl', 'File Click'], 'Load full file history, otherwise only load latest version' ],
  ];
}

_mach.prototype.init = function(html_container) {
  this.c = html_container;
  this.init_ui();
  this.nav.innerHTML = 'Use <span class="key">Ctrl</span> + <span class="key">o</span> to load a project, press <span class="key">F1</span> for help.';

  // initialize keyboard shortcut handler
  window.addEventListener('keydown', this.keydown_handler.bind(this))
}

//
// Code Repository
//
_mach.prototype.load_code_repo = function(url) {
  return new Promise(function(ok_callback, err_callback) {
    this.repo_url = url;
    this.git = new _git(this.repo_url);
    this.git.load_tag_ref().then(function(tag_count) {
      this.git.load_all_pack_index().then(function(ok_pack) {
        if(ok_pack.length == 0 || typeof(ok_pack[0]) == 'undefined') {
          console.error('failed to load pack index');
          return;
        }
        this.git.load_all_pack_object().then(function(pack_size_in_bytes) {
          const repo_stat = {
            'tag_count': this.git.tag_ref_count,
            'pack_size': pack_size_in_bytes,
            'pack_obj_count': this.git.pack_obj_id_list.length
          }
          ok_callback(repo_stat);
        }.bind(this), function(err_pack_obj) {
          err_callback(err_pack_obj);
        });
      }.bind(this), function(err_pack) {
        err_callback(err_pack);
      }.bind(this));
    }.bind(this));
  }.bind(this));
}

//
// HTML based user Interface
//
_mach.prototype.init_ui = function() {
  this.c.innerHTML = '';

  // source tree
  this.tree_container = document.createElement('div');
  this.tree_container.setAttribute('class', 'tree_container');

  // history
  const nav_container = document.createElement('div');
  nav_container.setAttribute('class', 'nav_container');
  this.nav = document.createElement('div');
  this.nav.setAttribute('class', 'nav');
  nav_container.appendChild(this.nav);

  // content
  const content_container = document.createElement('div');
  content_container.setAttribute('class', 'content_container');
  this.content_info = document.createElement('div');
  this.content_info.setAttribute('class', 'content_info');
  this.content = document.createElement('div');
  this.content.setAttribute('class', 'content');

  content_container.appendChild(this.content_info);
  content_container.appendChild(this.content);

  // annotation
  this.metadata_container = document.createElement('div');
  this.metadata_container.setAttribute('class', 'metadata_container');

  // log showing notifications for the user
  this.log_container = document.createElement('div');
  this.log_container.setAttribute('id', 'log_container')
  this.log_content = document.createElement('div');
  this.log_content.setAttribute('id', 'log_content');
  this.log_container.appendChild(this.log_content);

  // for showing help
  this.info_dialog = document.createElement('dialog');
  this.info_dialog.setAttribute('class', 'info_dialog');
  const dialog_toolbar = document.createElement('div');
  const close_button = document.createElement('button');
  close_button.innerHTML = '&times;';
  close_button.addEventListener('click', function(e) {
    this.info_dialog.close();
  }.bind(this));
  dialog_toolbar.setAttribute('class', 'toolbar');
  dialog_toolbar.appendChild(close_button);

  this.info_dialog_content = document.createElement('div');
  this.info_dialog_content.setAttribute('class', 'info_dialog_content');
  this.info_dialog.appendChild(dialog_toolbar);
  this.info_dialog.appendChild(this.info_dialog_content);

  this.c.appendChild(this.tree_container);
  this.c.appendChild(nav_container);
  this.c.appendChild(content_container);
  this.c.appendChild(this.metadata_container);
  this.c.appendChild(this.log_container);
  this.c.appendChild(this.info_dialog);
}

_mach.prototype.show_source_tree = function(tree) {
  this.tree_container.innerHTML = '';
  const prefix = '';
  const ul = this.get_source_tree(tree, prefix);
  this.tree_container.appendChild(ul);
}

_mach.prototype.get_source_tree = function(subtree, prefix) {
  const ul = document.createElement('ul');
  for(const filename in subtree) {
    const li = document.createElement('li');
    const filepath = prefix + filename;
    li.setAttribute('data-name', filepath);
    if( typeof(subtree[filename]) === 'string' ) {
      li.innerHTML = filename;
      li.setAttribute('data-id', subtree[filename]);
      li.setAttribute('class', 'filelink');
      li.addEventListener('click', this.on_show_file.bind(this));
      // for debugging
      li.setAttribute('id', filepath);
    } else {
      const new_prefix = prefix + filename + '/';
      const subtree_ul = this.get_source_tree(subtree[filename], new_prefix);
      const subtree_summary = document.createElement('summary');
      subtree_summary.innerHTML = filename;
      const subtree_details = document.createElement('details');
      // for debug
      if(filename === 'src') {
        subtree_details.setAttribute('open', '');
      }
      subtree_details.appendChild(subtree_summary);
      subtree_details.appendChild(subtree_ul);
      li.appendChild(subtree_details);
    }
    ul.appendChild(li);
  }
  return ul;
}

_mach.prototype.on_show_file = function(e) {
  const file_content_id = e.target.dataset.id;
  this.now.filepath = e.target.dataset.name;
  var history = this.object_node(this.now.filepath);
  if(history.length === 0) {
    // load first entry
    history.push({
      'blob_id': this.get_node_val(this.now.head.tree, this.now.filepath),
      'commit': {
        'id':this.now.head.id,
        'parent':this.now.head.object['parent'],
        'tree':this.now.head.object['tree'],
        'log':this.now.head.object['log'],
        'date':this.now.head.object['author']['date'],
        'author':this.now.head.object['author']['name'],
      }
    });
    this.show_latest_version();
    this.init_file_history();
    this.update_file_history();
  } else {
    // load existing history
    this.show_oldest_version();
    this.init_file_history();
    this.update_file_history();
  }

  if(e.ctrlKey) {
    this.now.stat['history']['load_start'] = performance.now();
    this.load_all_parents(this.now.filepath).then( function(ok) {
      this.now.stat['history']['load_end'] = performance.now();

      // reverse the object history array such that the first element
      // is oldest commit while the last element is the latest commit
      this.reverse_object_history(this.now.filepath);
      this.init_file_history();
      this.update_file_history();
      this.show_oldest_version();

      const elapsed = (this.now.stat['history']['load_end'] - this.now.stat['history']['load_start'])/1000;
      this.log('finished loading history in ' + elapsed + 'sec', true);
    }.bind(this), function(err_load_parents) {
      console.log('failed to load parents ' + err_load_parents);
    }.bind(this));
  } else {
    this.log('Loading only latest version. To load full history, hold <span class="key">Ctrl</span> key and click on file.', true)
  }
}

_mach.prototype.show_file = function(filepath, version) {
  this.d.mach.preferences.version = version;
  const history = this.object_node(filepath);
  var info = [];
  info.push(filepath);
  info.push(history[version]['commit']['log'])
  info.push( '<a target="_blank" href="' + this.d.mach.conf.repo.external_url_prefix.replace('$OBJECT_TYPE', 'blob').replace('$OBJECT_ID', history[version]['blob_id']) + '">blob</a>' );
    info.push( '<a target="_blank" href="' + this.d.mach.conf.repo.external_url_prefix.replace('$OBJECT_TYPE', 'commit').replace('$OBJECT_ID', history[version]['commit']['id']) + '">commit</a>' );

  const id = history[version]['blob_id']
  this.git.load_object(id).then( function(current_version_obj) {
    const decoder = new TextDecoder('utf-8');
    const current_version = decoder.decode(current_version_obj);
    const MAX_VERSION = history.length - 1;
    if(version === 0) {
      // diff with previous version not possible
      // show content of only this version
      this.content.innerHTML = this.source_code_to_html(current_version);
      info.push('(initial commit)');
      this.content_info.innerHTML = info.join('<span class="sep"> | </span>');
      if(history.length !== 1) {
        this.log('loaded version ' + (version+1) + ' of file ' + filepath);
      }
      this.init_all_attribute_io_panels();
      return;
    } else {
      const prev_version = version - 1;
      const prev_id = history[prev_version]['blob_id'];
      this.git.load_object(prev_id).then( function(prev_version_obj) {
        const prev_version = decoder.decode(prev_version_obj);
        var dmp = new diff_match_patch();
        var diff = dmp.diff_main( prev_version, current_version);
        dmp.diff_cleanupSemantic(diff);
        const diff_html = this.diff_to_html(diff);
        this.content.innerHTML = diff_html['html'];
        this.now.diff = diff_html['diff'];
        this.now['current_diff_index'] = -1;
        var add_count = 0;
        var del_count = 0;
        for(var i=0; i<diff.length; ++i) {
          if(diff[i][0] === 1) {
            add_count++;
          } else if(diff[i][0] === -1) {
            del_count++;
          }
        }
        info.push(add_count + '+ ' + del_count + '-');
        this.content_info.innerHTML = info.join('<span class="sep"> | </span>');
        this.log('loaded version ' + (version+1) + ' of ' + filepath + '. Press <span class="key">Alt</span> + <span class="key">&uarr;</span> or <span class="key">&darr;</span> to show changes made in this revision.');
        this.init_all_attribute_io_panels();
      }.bind(this), function(err_prev) {
        this.log('Error loading previous version: ' + err_prev);
      }.bind(this));
    }
  }.bind(this), function(err_current) {
    this.log('Error loading current version: ' + err_current);
  }.bind(this));
}

_mach.prototype.load_next_parent = function(filepath, commit_id, file_content_id) {
  return new Promise(function(ok_callback, err_callback) {
    this.git.load_object(commit_id).then(function(commit_obj) {
      const commit = this.git.parse_commit_obj(commit_obj);
      const tree_id = commit['tree'];
      this.git.load_tree(tree_id, [], {}).then(function(tree) {
        var history = this.object_node(filepath);
        const history_count = history.length;
        const filepath_tok = filepath.split('/');
        var tree_node = tree;
        for(var i=0; i<filepath_tok.length; ++i) {
          if( !tree_node.hasOwnProperty(filepath_tok[i]) ) {
            // filepath does not exist in parent anymore, stop search
            ok_callback(0);
            return;
          } else {
            tree_node = tree_node[ filepath_tok[i] ];
          }
        }
        new_file_content_id = tree_node;

        if(new_file_content_id === file_content_id) {
          // A file version can remain unchanged into multiple consecutive commits.
          //
          // For example, if a file has 3 versions, it commit history can be
          // [ 1 1 1 2 2 2 2 2 2 2 3 3 3] (HEAD, i.e. latest version)
          //         |           |
          //        (commit0, commit1)
          //       *             *        change recorded when traversing from HEAD
          // We store commit0 so that we can correctly traverse from TAIL during
          // manual annotation and show log corresponding to the commit when the
          // change was introduced.

          // update last history commit such that it points to the first commit
          // that introduced the change
          history[history.length - 1]['commit'] = {
            'id': commit_id,
            'parent':commit['parent'],
            'tree':commit['tree'],
            'log':commit['log'],
            'date':commit['author']['date'],
            'author':commit['author']['name']
          }
          // continue search as long as the commits have a parent
          if('parent' in commit) {
            const new_parent_id = commit['parent'];
            this.load_next_parent(filepath, new_parent_id, file_content_id).then(function(ok) {
              if(ok) {
                ok_callback(1);
              } else {
                ok_callback(0);
              }
            }.bind(this), function(err_next) {
              console.error(err_next);
            }.bind(this));
          } else {
            ok_callback(0);
          }
        } else {
          // add an entry in history to allow the search to continue
          history.push({
            'blob_id': new_file_content_id,
            'commit': {
              'id':commit_id,
              'parent':commit['parent'],
              'tree':commit['tree'],
              'log':commit['log'],
              'date':commit['author']['date'],
              'author':commit['author']['name']
            }
          });
          ok_callback(1);
        }
      }.bind(this), function(err_tree) {
        console.error(err_tree);
      }.bind(this));
    }.bind(this), function(err_commit) {
      console.error(err_commit);
    }.bind(this));
  }.bind(this));
}

_mach.prototype.load_all_parents = function(filepath) {
  return new Promise(function(ok_callback, err_callback) {
    const history = this.object_node(filepath);
    const last_commit = history[history.length - 1]['commit']['id'];
    const parent_id = history[history.length - 1]['commit']['parent'];
    const filepath_blob_id = history[history.length - 1]['blob_id'];
    this.load_next_parent(filepath, parent_id, filepath_blob_id).then(function(ok) {
      if(ok) {
        const new_history = this.object_node(filepath);
        const new_history_count = new_history.length;
        if(new_history_count % this.HISTORY_LOAD_MSG_FREQ === 0) {
          const elapsed = (performance.now() - this.now.stat['history']['load_start'])/1000;
          this.log('So far, loaded ' + new_history_count + ' history in ' + elapsed + 'sec.');
          this.update_file_history();
        }
        this.load_all_parents(filepath).then(function(ok) {
          if(ok) {
            ok_callback(1);
          } else {
            ok_callback(0);
          }
        }.bind(this), function(err_load) {
          console.error(err_load);
        }.bind(this));
      } else {
        ok_callback(0);
      }
    }.bind(this), function(err) {
      console.error(err);
    }.bind(this));
  }.bind(this));
}

_mach.prototype.init_file_history = function() {
  const oldest = document.createElement('button');
  oldest.innerHTML = 'Oldest Version';
  oldest.addEventListener('click', this.show_oldest_version.bind(this));

  const prev = document.createElement('button');
  prev.innerHTML = '&larr;';
  prev.setAttribute('title', 'Previous Version');
  prev.addEventListener('click', this.show_prev_version.bind(this));

  this.file_revision_list = document.createElement('select');
  this.file_revision_list.addEventListener('change', this.show_file_version.bind(this));

  const next = document.createElement('button');
  next.innerHTML = '&rarr;';
  next.setAttribute('title', 'Next Version');
  next.addEventListener('click', this.show_next_version.bind(this));

  const latest = document.createElement('button');
  latest.innerHTML = 'Latest Version';
  latest.addEventListener('click', this.show_latest_version.bind(this));

  this.file_revision_log = document.createElement('p');

  this.nav.innerHTML = '';
  this.nav.appendChild(oldest);
  this.nav.appendChild(prev);
  this.nav.appendChild(this.file_revision_list);
  this.nav.appendChild(next);
  this.nav.appendChild(latest);
  this.nav.appendChild(this.file_revision_log);
}

_mach.prototype.update_file_history = function() {
  if(this.now.filepath === '') {
    return;
  }
  const filepath = this.now.filepath
  var history = this.object_node(filepath);
  if(history.length === 0) {
    return;
  }
  const history_count = history.length;
  this.file_revision_list.innerHTML = '';
  for(var i=0; i<history_count; ++i) {
    const option = document.createElement('option');
    option.setAttribute('value', i);
    const date = new Date(history[i]['commit']['date']);
    const date_str = date.toLocaleDateString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: 'UTC'
    });
    const time_str = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: 'UTC'
    });

    const commit_id = history[i]['commit']['id'].substring(0, 5);
    option.innerHTML = '[' + (i+1) + ' of ' + history_count + '] ' + date_str + ' ' + time_str + ' (' + commit_id + ')';
    this.file_revision_list.appendChild(option);
  }
}

_mach.prototype.show_latest_version = function(e) {
  const history = this.object_node(this.now.filepath);
  const history_count = history.length;
  const latest_version = history_count - 1;
  this.file_revision_list.selectedIndex = latest_version;
  this.show_file(this.now.filepath, latest_version);
}

_mach.prototype.show_oldest_version = function(e) {
  const oldest_version = 0;
  this.file_revision_list.selectedIndex = oldest_version;
  this.show_file(this.now.filepath, oldest_version);
}

_mach.prototype.show_prev_version = function(e) {
  const history = this.object_node(this.now.filepath);
  const history_count = history.length;
  const version = this.file_revision_list.selectedIndex;
  prev_version = version - 1;
  if(prev_version < 0) {
    prev_version = history_count - 1;
  }
  this.file_revision_list.selectedIndex = prev_version;
  this.show_file(this.now.filepath, prev_version);
}

_mach.prototype.show_next_version = function(e) {
  const history = this.object_node(this.now.filepath);
  const history_count = history.length;
  const version = this.file_revision_list.selectedIndex;
  next_version = version + 1;
  if(next_version >= history_count) {
    next_version = 0;
  }
  this.file_revision_list.selectedIndex = next_version;
  this.show_file(this.now.filepath, next_version);
}

_mach.prototype.show_file_version = function(e) {
  const version = this.file_revision_list.selectedIndex;
  this.show_file(this.now.filepath, version);
}

_mach.prototype.source_code_to_html = function(data) {
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;

  return data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;').replace(pattern_gt, '&gt;').replace(pattern_para, '<br/>');
}

// source: https://github.com/google/diff-match-patch/blob/62f2e689f498f9c92dbc588c58750addec9b1654/javascript/diff_match_patch_uncompressed.js#L1251C1-L1275C3
_mach.prototype.diff_to_html = function(diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  const diff_length = diffs.length;
  var diff = [];
  for (var x = 0; x < diff_length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;');
    const diff_id = 'diff_' + x;
    switch (op) {
    case 1:  // insert
      html[x] = '<ins id="' + diff_id + '">' + text + '</ins>';
      diff.push(diff_id)
      break;
    case -1: // delete
      html[x] = '<del id="' + diff_id + '">' + text + '</del>';
      diff.push(diff_id)

      break;
    case 0:  // equal
      html[x] = '<span>' + text + '</span>';
      break;
    }
  }

  return {
    'html': html.join(''),
    'diff': diff
  }
};

_mach.prototype.show_next_change = function() {
  const version = this.file_revision_list.selectedIndex;
  const diff_count = this.now.diff.length;
  var next_diff_index = this.now['current_diff_index'] + 1;
  if(next_diff_index >= diff_count) {
    next_diff_index = 0;
  }
  const diff_el_id = this.now.diff[next_diff_index];
  const diff_el = document.getElementById(diff_el_id);
  diff_el.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
  this.now['current_diff_index'] = next_diff_index;
  this.log('Showing diff ' + (this.now['current_diff_index'] + 1) + ' of ' + diff_count);
}

_mach.prototype.show_prev_change = function() {
  const version = this.file_revision_list.selectedIndex;
  const diff_count = this.now.diff.length;
  var prev_diff_index = this.now['current_diff_index'] - 1;
  if(prev_diff_index < 0) {
    prev_diff_index = diff_count - 1;
  }
  const diff_el_id = this.now.diff[prev_diff_index];
  const diff_el = document.getElementById(diff_el_id);
  diff_el.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
  this.now['current_diff_index'] = prev_diff_index;
  this.log('Showing diff ' + (this.now['current_diff_index'] + 1) + ' of ' + diff_count);
}

//
// keyboard shortcut handler
//
_mach.prototype.keydown_handler = function(e) {
  if(e.target !== document.body) {
    return;
  }

  if(e.key === 'F1') {
    this.show_help();
    e.preventDefault();
    return;
  }

  if(e.key === 'Escape') {
    if(this.now.metadata.shortcut_ongoing) {
      this.now.metadata.shortcut_ongoing = false;
      this.now.metadata.shortcut_pressed_so_far = [];
      this.log('Deactivated attribute keyboard shortcut');
      return;
    }
  }

  if(e.ctrlKey) {
    if(e.key === 's') {
      this.save_project();
      e.preventDefault();
    }
    if(e.key === 'o') {
      const file_selector = document.createElement('input');
      file_selector.setAttribute('type', 'file');
      file_selector.accept = '.json';
      file_selector.onchange = this.load_project_from_file.bind(this);
      file_selector.click();
      e.preventDefault();
    }
    return;
  }

  if(e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    if(this.now.file_path === '') {
      this.log('Select a file first');
      return;
    }
    if(e.key === 'ArrowRight') {
      this.show_next_version();
    } else {
      this.show_prev_version();
    }
    e.preventDefault();
    return;
  }

  if(e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if(this.now.file_path === '') {
      this.log('Select a file first');
      return;
    }
    if(e.altKey) {
      if(e.key === 'ArrowUp') {
        this.show_prev_change();
      } else {
        this.show_next_change();
      }
      e.preventDefault();
      return;
    } else {
      if(e.key === 'ArrowUp') {
        this.content.scrollBy(0, -10);
      } else {
        this.content.scrollBy(0, 10);
      }
      e.preventDefault();
      return;
    }
  }

  if(e.key in this.now.metadata.shortcut_prefix_list) {
    if(e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const shortcut_aid = this.now.metadata.shortcut_prefix_list[e.key];
    const input_type = this.d.mach.conf.attributes[shortcut_aid].input_type;
    switch(input_type) {
    case 'checkbox':
    case 'radio':
    this.now.metadata.shortcut_ongoing = true;
    this.now.metadata.ongoing_shortcut_aid = shortcut_aid;
    this.now.metadata.shortcut_pressed_so_far = [];
      this.log('Shortcut activated for attribute [' + this.now.metadata.ongoing_shortcut_aid + '] using <span class="key">' + e.key + '</span>');
      break;
    case 'textarea':
      const textarea = document.getElementById(shortcut_aid + '_textarea');
      this.log('Focus acquired by text input for ' + shortcut_aid);
      textarea.focus();
      e.preventDefault();
      break;
    default:
      this.log('unknown input type = ' + input_type);
    }
  }

  if( (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) &&
      this.now.metadata.shortcut_ongoing) {
    this.now.metadata.shortcut_pressed_so_far.push(e.key);
    const keypress_sofar = this.now.metadata.shortcut_pressed_so_far.join('.');

    if(!this.is_ongoing_shortcut_valid()) {
      this.log('Discarding invalid shortcut ' + keypress_sofar, true);
      return;
    }

    if(this.is_ongoing_shortcut_complete()) {
      this.on_attribute_shortcut_complete();
    } else {
      this.log('Waiting for completion of shortcut <span class="key">' + keypress_sofar + '</span>', true);
    }
  }
}

//
// MACH project i/o
//
_mach.prototype.save_project = function() {
  this.d.mach.project.updated = Date.now();
  const now = new Date();
  const fn = [];
  fn.push('mach');
  fn.push( this.d['mach']['project']['id'].substr(0,6) );
  fn.push( now.getFullYear() + ('0' + (now.getMonth()+1)).slice(-2) + ('0' + now.getDate()).slice(-2) );
  fn.push( ('0' + now.getHours()).slice(-2) + ('0' + now.getMinutes()).slice(-2) );
  const filename = fn.join('-') + '.json';
  const replacer = null;
  const space = 2;
  var blob = new Blob( [JSON.stringify(this.d, replacer, space)],
                       { type: 'text/json;charset=utf-8' } );
  this.save_data_to_local_file(blob, filename);
}

_mach.prototype.load_project_from_file = function(e) {
  const selected_file = e.target.files[0];
  this.load_text_file(selected_file, this.load_project.bind(this))
}

_mach.prototype.load_project = function(file_contents) {
  this.d = {};
  if(typeof(file_contents) === 'string') {
    this.d = JSON.parse(file_contents);
  } else {
    this.d = file_contents;
  }
  this.load_code_repo(this.d.mach.conf.repo.url).then(function(repo_stat) {
    const tag_count = repo_stat.tag_count;
    const obj_count = repo_stat.pack_obj_count;
    console.log('loaded repo with ' + tag_count + ' tags and ' + obj_count + ' objects');
    this.init_ui();
    if('head' in this.d.mach.conf.repo) {
      this.git.load_object(this.d.mach.conf.repo.head).then(function(commit_obj) {
        this.now.head.id = this.d.mach.conf.repo.head;
        this.now.head.object = mach.git.parse_commit_obj(commit_obj);
        console.log('loaded commit ' + this.now.head.id);

        const tree_id = this.now.head.object['tree'];
        this.git.load_tree(tree_id, [], {}).then(function(tree) {
          this.now.head.tree = tree;
          mach.show_source_tree(this.now.head.tree);
          if('filepath' in this.d.mach.preferences) {
            const filepath = this.d.mach.preferences.filepath;
            var filepath_li = document.getElementById(filepath);
            filepath_li.scrollIntoView();

            this.init_file_history();
            this.update_file_history();
            const history = this.object_node(filepath);
            if(history.length) {
              // load existing history
              this.now.filepath = filepath;
              this.init_file_history();
              this.update_file_history();
              if(this.d.mach.preferences.hasOwnProperty('version')) {
                const version = this.d.mach.preferences.version;
                if(version === -1) {
                } else {
                  this.file_revision_list.selectedIndex = version;
                  this.show_file_version();
                }
              } else {
                this.show_oldest_version();
              }
              this.init_all_attribute_io_panels();
            }
          }
        }.bind(this), function(err_tree) {
          mach.log('Error: failed to load tree contents (' + err_tree + ')');
        }.bind(this));
      }.bind(this), function(err_commit) {
        mach.log('Error: failed to load commits (' + err_commit + ')');
      }.bind(this));
    }
  }.bind(this), function(err_repo) {
    console.error(err_repo);
  });
}

//
// util
//

// URL.createObjectURL() produces a unique id every time it is invoked.
// We use this functionality to generate unique id required by VIA
// @todo: Replace with a true UUID generator if it can be efficiently generated
// using pure JS (no dependencies)
_mach.prototype.uuid = function() {
  var temp_url = URL.createObjectURL(new Blob())
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  var slash_index = uuid.lastIndexOf('/');
  if ( uuid !== -1 ) {
    // remove any prefix (e.g. blob:null/, blob:www.test.com/, ...)
    uuid = uuid.substr(slash_index + 1);
    uuid = uuid.replace(/-/g, '');
  }
  return uuid;
}

_mach.prototype.save_data_to_local_file = function(data, filename) {
  var a      = document.createElement('a');
  a.href     = URL.createObjectURL(data);
  a.download = filename;

  // simulate a mouse click event
  var event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  a.dispatchEvent(event);
}

_mach.prototype.object_node = function(filepath) {
  const filepath_tok = filepath.split('/');
  var object_node = this.d.object;
  for(var i=0; i<filepath_tok.length; ++i) {
    if( !object_node.hasOwnProperty(filepath_tok[i]) ) {
      if(i === (filepath_tok.length - 1)) {
        object_node[ filepath_tok[i] ] = [];
      } else {
        object_node[ filepath_tok[i] ] = {};
      }
    }
    object_node = object_node[ filepath_tok[i] ];
  }
  return object_node;
}

_mach.prototype.reverse_object_history = function(filepath) {
  const filepath_tok = filepath.split('/');
  var object_node = this.d.object;
  for(var i=0; i<filepath_tok.length; ++i) {
    if( !object_node.hasOwnProperty(filepath_tok[i]) ) {
      if(i === (filepath_tok.length - 1)) {
        object_node[ filepath_tok[i] ] = [];
      } else {
        object_node[ filepath_tok[i] ] = {};
      }
    }
    object_node = object_node[ filepath_tok[i] ];
  }
  object_node.reverse();
}

_mach.prototype.get_node_val = function(tree, filepath) {
  const filepath_tok = filepath.split('/');
  var object_node = tree;
  for(var i=0; i<filepath_tok.length; ++i) {
    object_node = object_node[ filepath_tok[i] ];
  }
  return object_node;
}

_mach.prototype.load_text_file = function(text_file, callback_function) {
  if (text_file) {
    var text_reader = new FileReader();
    text_reader.addEventListener( 'progress', function(e) {
      this.log('Loading data from file : ' + text_file.name + ' ... ');
    }.bind(this), false);

    text_reader.addEventListener( 'error', function() {
      show_message('Error loading data text file :  ' + text_file.name + ' !');
      callback_function('');
    }.bind(this), false);

    text_reader.addEventListener( 'load', function() {
      callback_function(text_reader.result);
    }.bind(this), false);
    text_reader.readAsText(text_file, 'utf-8');
  }
}

//
// log notifications for the user
//
_mach.prototype.log = function(msg, sticky) {
  if ( this.log_container && this.log_content ) {
    if ( this.log_clear_timer ) {
      clearTimeout(this.log_clear_timer);
    }
    if ( typeof(sticky) === 'undefined' ||
         sticky === false
       ) {
      this.log_clear_timer = setTimeout( function() {
        this.log_container.style.display = 'none';
      }, this.LOG_TIMEOUT);
    }

    this.log_content.innerHTML = msg + '<span class="log_panel_close_button">&times;</span>';
    this.log_container.style.display = 'block';
  }
}

_mach.prototype.log_hide = function() {
  this.log_container.style.display = 'none';
  if ( this.log_clear_timer ) {
    clearTimeout(this.log_clear_timer);
  }
}

//
// Manual annotation
//
_mach.prototype.init_all_attribute_io_panels = function() {
  this.metadata_container.innerHTML = '';
  for(const aindex in this.d.mach.preferences.visible_attributes) {
    const aid = this.d.mach.preferences.visible_attributes[aindex];
    const attribute_html_el = this.create_attribute_io_panel(aid);
    this.metadata_container.appendChild(attribute_html_el);
  }
  this.init_metadata_shortcut_handler();
}

_mach.prototype.get_attribute_io_panel_id = function(aid) {
  const attribute_io_panel_id = 'attribute_' + aid;
  return attribute_io_panel_id;
}

_mach.prototype.update_attribute_io_panel = function(aid) {
  const attribute_io_panel_id = this.get_attribute_io_panel_id(aid);
  const old_fieldset = document.getElementById(attribute_io_panel_id);
  const new_fieldset = this.create_attribute_io_panel(aid);
  this.metadata_container.replaceChild(new_fieldset, old_fieldset);
}

_mach.prototype.create_attribute_io_panel = function(aid) {
  const attribute_io_panel_id = this.get_attribute_io_panel_id(aid);
  const fieldset = document.createElement('fieldset');
  fieldset.setAttribute('id', attribute_io_panel_id);
  const legend = document.createElement('legend');
  legend.innerHTML = this.d.mach.conf.attributes[aid].name;
  if(this.d.mach.conf.attributes[aid].hasOwnProperty('keyboard_shortcut_prefix')) {
    const shortcut = this.d.mach.conf.attributes[aid]['keyboard_shortcut_prefix']
    legend.innerHTML += '&nbsp;<span class="key">' + shortcut + '</span>&nbsp;';
  }
  fieldset.appendChild(legend);

  const input_type = this.d.mach.conf.attributes[aid].input_type;
  switch(input_type) {
  case 'checkbox':
    for(var oid in this.d.mach.conf.attributes[aid].options) {
      var oid_list = [oid];

      if(this.d.mach.conf.attributes[aid].options[oid].hasOwnProperty('options')) {
        const nested_options_el = this.init_nested_option(aid, oid_list);
        fieldset.appendChild(nested_options_el);
      } else {
        const option_el = this.init_option(aid, oid_list);
        fieldset.appendChild(option_el);
      }
    }
    break;
  case 'radio':
    for(var oid in this.d.mach.conf.attributes[aid].options) {
      var oid_list = [oid];

      if(this.d.mach.conf.attributes[aid].options[oid].hasOwnProperty('options')) {
        const nested_options_el = this.init_nested_option(aid, oid_list);
        fieldset.appendChild(nested_options_el);
      } else {
        const option_el = this.init_option(aid, oid_list);
        fieldset.appendChild(option_el);
      }
    }
    break;
  case 'textarea':
    var oid_list = [];
    const option_el = this.init_option(aid, oid_list);
    fieldset.appendChild(option_el);
    break;
  }
  return fieldset;
}

_mach.prototype.init_nested_option = function(aid, oid_list) {
  const details = document.createElement('details');
  var attribute_option_node = this.d.mach.conf.attributes[aid];

  for(const oindex in oid_list) {
    const oid = oid_list[oindex];
    attribute_option_node = attribute_option_node.options[oid]
  }
  const summary = document.createElement('summary');
  summary.innerHTML = attribute_option_node['name'];
  details.appendChild(summary)

  const options_container = document.createElement('div');
  options_container.setAttribute('class', 'options_container');
  for(var oid in attribute_option_node.options) {
    var new_oid_list = oid_list.slice(0);
    new_oid_list.push(oid);

    if(attribute_option_node.options[oid].hasOwnProperty('options')) {
      const nested_options_el = this.init_nested_option(aid, new_oid_list);
      options_container.appendChild(nested_options_el);
    } else {
      const option_el = this.init_option(aid, new_oid_list);
      options_container.appendChild(option_el);
    }
  }
  details.appendChild(options_container);
  details.setAttribute('open', '');
  return details;
}

_mach.prototype.init_option = function(aid, oid_list) {
  var attribute_option_node = this.d.mach.conf.attributes[aid];
  var shortcut_key_seq = [];
  const has_shortcut = this.d.mach.conf.attributes[aid].hasOwnProperty('keyboard_shortcut_prefix');
  if(has_shortcut) {
    shortcut_key_seq.push( this.d.mach.conf.attributes[aid]['keyboard_shortcut_prefix'] );
  }
  for(const oindex in oid_list) {
    const oid = oid_list[oindex];
    shortcut_key_seq.push(oid);
    attribute_option_node = attribute_option_node.options[oid];
  }
  const shortcut_key = shortcut_key_seq.join('.');

  var input_type = this.d.mach.conf.attributes[aid].input_type;
  if(attribute_option_node.hasOwnProperty('input_type')) {
    input_type = attribute_option_node['input_type'];
  }

  const option_html_el = document.createElement('div');
  option_html_el.setAttribute('class', 'option');
  const oid_list_str = oid_list.join('.')
  const option_id = aid + '_' + oid_list_str;

  switch(input_type) {
  case 'checkbox':
    var label = document.createElement('label');
    label.innerHTML = attribute_option_node;
    label.setAttribute('for', option_id);

    var input = document.createElement('input');
    input.setAttribute('id', option_id);
    input.setAttribute('type', 'checkbox');
    input.setAttribute('data-aid', aid);
    input.setAttribute('data-oid_list', oid_list_str);
    input.addEventListener('change', this.option_onchange.bind(this));
    var shortcut_class = 'key';
    if(this.does_avalue_exist(aid)) {
      const existing_avalue = this.get_current_avalue(aid);
      const shortcut_key_id = shortcut_key_seq.slice(1).join('.'); // discard prefix
      if(existing_avalue.includes(shortcut_key_id)) {
        input.setAttribute('checked', '');
        shortcut_class = 'key_pressed';
      }
    }
    if(has_shortcut) {
      label.innerHTML += '&nbsp;<span class="' + shortcut_class + '">' + shortcut_key + '</span>';
    }

    option_html_el.appendChild(input);
    option_html_el.appendChild(label);
    break;
  case 'radio':
    option_html_el.classList.add('inline');
    var label = document.createElement('label');
    label.innerHTML = attribute_option_node;
    label.setAttribute('for', option_id);

    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', aid);
    input.setAttribute('data-aid', aid);
    input.setAttribute('data-oid_list', oid_list_str);
    input.addEventListener('change', this.option_onchange.bind(this));
    var shortcut_class = 'key';
    if(this.does_avalue_exist(aid)) {
      const existing_avalue = this.get_current_avalue(aid);
      const shortcut_key_id = shortcut_key_seq.slice(1).join('.'); // discard prefix
      if(existing_avalue.includes(shortcut_key_id)) {
        input.setAttribute('checked', '');
        shortcut_class = 'key_pressed';
      }
    }
    if(has_shortcut) {
      label.innerHTML += '&nbsp;<span class="' + shortcut_class + '">' + shortcut_key + '</span>';
    }

    option_html_el.appendChild(input);
    option_html_el.appendChild(label);
    break;
  case 'textarea':
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', aid + '_textarea');
    textarea.setAttribute('data-aid', aid);
    textarea.setAttribute('data-oid_list', oid_list_str);
    textarea.addEventListener('change', this.option_onchange.bind(this));
    if(this.does_avalue_exist(aid)) {
      const existing_avalue = this.get_current_avalue(aid);
      textarea.value = existing_avalue;
    }
    option_html_el.appendChild(textarea);
    break;
  }
  return option_html_el;
}

_mach.prototype.init_metadata_shortcut_handler = function() {
  this.now.metadata.shortcut_prefix_list = {};
  this.now.metadata.shortcut_ongoing = false;
  this.now.metadata.shortcut_pressed_so_far = [];
  for(const aindex in this.d.mach.preferences.visible_attributes) {
    const aid = this.d.mach.preferences.visible_attributes[aindex];
    if(this.d.mach.conf.attributes[aid].hasOwnProperty('keyboard_shortcut_prefix')) {
      const shortcut_prefix = this.d.mach.conf.attributes[aid]['keyboard_shortcut_prefix'];
      if(shortcut_prefix.length !== 1) {
        this.log('Discarding attribute keyboard shortcut prefix "' + shortcut_prefix + '" for attribute [' + aid + ']');
        continue;
      }
      if(shortcut_prefix in this.now.metadata.shortcut_prefix_list) {
        this.log('Discarding duplicate attribute keyboard shortcut prefix "' + shortcut_prefix + '" for attribute [' + aid + ']');
        continue;
      }
      this.now.metadata.shortcut_prefix_list[shortcut_prefix] = aid;
    }
  }
}

_mach.prototype.is_ongoing_shortcut_complete = function() {
  const aid = this.now.metadata.ongoing_shortcut_aid;
  const oid_list = this.now.metadata.shortcut_pressed_so_far;
  var attribute_option_node = this.d.mach.conf.attributes[aid];
  for(const oindex in oid_list) {
    const oid = oid_list[oindex];
    attribute_option_node = attribute_option_node.options[oid]
  }
  if(typeof(attribute_option_node) === 'string') {
    return true;
  } else {
    return false;
  }
}

_mach.prototype.is_ongoing_shortcut_valid = function() {
  const aid = this.now.metadata.ongoing_shortcut_aid;
  const oid_list = this.now.metadata.shortcut_pressed_so_far;
  var attribute_option_node = this.d.mach.conf.attributes[aid];
  for(const oindex in oid_list) {
    const oid = oid_list[oindex];
    if(!attribute_option_node.hasOwnProperty('options')) {
      return false;
    }
    if(!attribute_option_node.options.hasOwnProperty(oid)) {
      return false;
    }
    attribute_option_node = attribute_option_node.options[oid]
  }
  return true;
}

_mach.prototype.on_attribute_shortcut_complete = function() {
  const aid = this.now.metadata.ongoing_shortcut_aid;
  const oid_list = this.now.metadata.shortcut_pressed_so_far;
  const version = this.file_revision_list.selectedIndex;
  const avalue = oid_list.join('.');
  this.add_object_metadata(this.now.filepath, version, aid, avalue);
  this.update_attribute_io_panel(aid);
}

_mach.prototype.add_object_metadata = function(filepath, version, aid, avalue) {
  const history = this.object_node(filepath);
  if( !(history[version].hasOwnProperty('metadata')) ) {
    history[version]['metadata'] = {};
  }

  const ainput_type = this.d.mach.conf.attributes[aid]['input_type'];
  if( !(history[version]['metadata'].hasOwnProperty(aid)) ) {
    switch(ainput_type) {
    case 'checkbox':
      history[version]['metadata'][aid] = [];
      break;
    case 'radio':
      history[version]['metadata'][aid] = '';
      break;
    case 'textarea':
      history[version]['metadata'][aid] = '';
      break;
    default:
      console.error('add_object_metadata(): unknown input type ' + ainput_type);
    }
  }

  // set value
  switch(ainput_type) {
  case 'checkbox':
    const existing_values = history[version]['metadata'][aid];
    const avalue_index = existing_values.indexOf(avalue);
    if(avalue_index === -1) {
      history[version]['metadata'][aid].push(avalue);
      this.log('Added ' + avalue + ' to ' + aid);
    } else {
      history[version]['metadata'][aid].splice(avalue_index, 1);
      this.log('Removed ' + avalue + ' from ' + aid);
    }
    break;
  case 'radio':
    history[version]['metadata'][aid] = avalue;
    this.log('Added ' + avalue + ' to ' + aid);
    break;
  case 'textarea':
    history[version]['metadata'][aid] = avalue;
    this.log('Updated ' + aid);
    break;
  default:
    console.error('unknown input type = ' + ainput_type);
    return;
  }
}

_mach.prototype.does_avalue_exist = function(aid) {
  const history = this.object_node(this.now.filepath);
  const version = this.file_revision_list.selectedIndex;
  if(history[version].hasOwnProperty('metadata') &&
     history[version]['metadata'].hasOwnProperty(aid)) {
    return true;
  } else {
    return false;
  }
}
_mach.prototype.get_current_avalue = function(aid) {
  const history = this.object_node(this.now.filepath);
  const version = this.file_revision_list.selectedIndex;
  return history[version]['metadata'][aid];
}

_mach.prototype.update_metadata_container = function() {
  this.metadata_container.innerHTML = '';
  for(const aindex in this.d.mach.preferences.visible_attributes) {
    const aid = this.d.mach.preferences.visible_attributes[aindex];
    const attribute_html_el = this.init_attribute_html(aid);
    this.metadata_container.appendChild(attribute_html_el);
  }
  this.init_metadata_shortcut_handler();
}

_mach.prototype.option_onchange = function(e) {
  const aid = e.target.dataset['aid'];
  const oid_list = e.target.dataset['oid_list'];
  const version = this.file_revision_list.selectedIndex;
  const input_type = this.d.mach.conf.attributes[aid].input_type;

  var avalue;
  switch(input_type) {
  case 'checkbox':
    avalue = oid_list;
    break;
  case 'radio':
    avalue = oid_list;
    break;
  case 'textarea':
    avalue = e.target.value;
    break;
  default:
    console.error('unknown input type = ' + input_type);
    return;
  }
  this.add_object_metadata(this.now.filepath, version, aid, avalue);
  this.update_attribute_io_panel(aid);
}

//
// help
//

_mach.prototype.show_help = function() {
  var html = [];
  html.push('<h2>' + this.MACH_NAME + ' (' + this.MACH_SHORT_NAME + ')</h2>');
  html.push('<p>Version <a href="https://gitlab.com/thelinuxmaniac/mach">' + this.MACH_VERSION + '</a></p>');
  html.push('<h4>Keyboard Shortcuts</h4>');
  html.push('<table>');
  for(var i=0; i<this.KEYBOARD_SHORTCUTS.length; ++i) {
    var keys = [];
    for(var j=0; j<this.KEYBOARD_SHORTCUTS[i][0].length; ++j) {
      keys.push('<span class="key">' + this.KEYBOARD_SHORTCUTS[i][0][j] + '</span>');
    }

    const keys_desc = this.KEYBOARD_SHORTCUTS[i][1];
    html.push('<tr><td>' + keys.join(' + ') + '</td><td>' + keys_desc + '</td></tr>');
  }
  html.push('</table>');

  this.info_dialog_content.innerHTML = html.join('\n');
  this.info_dialog.showModal();
}

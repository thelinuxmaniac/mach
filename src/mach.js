/*

Maintains the state of HTML user interface for the MACH application.

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Oct-08

*/
function _mach() {
  // this.c        : reference for the HTML container used by the MACH application
  // this.repo_url : git repository URL
  // this.git      : interface to the git repository

  // UI state
  this.now = {
    'file_path':'', // current file
    'commit': {},   // current commit
    'tree': {},     // source tree corresponding to current commit
    'object': {},   // object (e.g. file) selected by user from the current tree
    'stat': {}      // to store performance related statistical data
  }
  this.LOG_TIMEOUT = 3000;   // clear log automatically after LOG_TIMEOUT ms
  this.log_clear_timer = 0;  // for clearing log messages automatically after timeout
  this.HISTORY_LOAD_MSG_FREQ = 3;
  this.MAX_FILE_HISTORY = 10;
}

_mach.prototype.init = function(html_container) {
  this.c = html_container;
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
_mach.prototype.ui_init = function() {
  this.c.innerHTML = '';

  // source tree
  this.tree_container = document.createElement('div');
  this.tree_container.setAttribute('class', 'tree_container');

  // history
  const nav_container = document.createElement('div');
  nav_container.setAttribute('class', 'nav_container');
  this.nav = document.createElement('div');
  this.nav.setAttribute('class', 'nav');
  this.nav.innerHTML = 'Click on a filename in the source tree shown on the left';
  nav_container.appendChild(this.nav);

  // content
  const content_container = document.createElement('div');
  content_container.setAttribute('class', 'content_container');
  this.content_info = document.createElement('div');
  this.content_info.setAttribute('class', 'content_info');
  this.content_info.innerHTML = '&nbsp;';
  /*
  this.content = document.createElement('textarea');
  this.content.setAttribute('class', 'content');
  this.content.setAttribute('readonly', '');
  this.content.setAttribute('spellcheck', 'false');
  this.content.setAttribute('wrap', 'off');
  */
  this.content = document.createElement('div');
  this.content.setAttribute('class', 'content');

  content_container.appendChild(this.content_info);
  content_container.appendChild(this.content);

  // annotation
  const annotation_container = document.createElement('div');
  annotation_container.setAttribute('class', 'annotation_container');
  annotation_container.innerHTML = 'Manual annotations';

  // log showing notifications for the user
  this.log_container = document.createElement('div');
  this.log_container.setAttribute('id', 'log_container')
  this.log_content = document.createElement('div');
  this.log_content.setAttribute('id', 'log_content');
  this.log_container.appendChild(this.log_content);

  this.c.appendChild(this.tree_container);
  this.c.appendChild(nav_container);
  this.c.appendChild(content_container);
  this.c.appendChild(annotation_container);
  this.c.appendChild(this.log_container);

  // initialize keyboard shortcut handler
  window.addEventListener('keydown', this.keydown_handler.bind(this))
}

_mach.prototype.update_source_tree = function() {
  this.tree_container.innerHTML = '';
  const prefix = '';
  const ul = this.get_source_tree(this.now.tree, prefix);
  this.tree_container.appendChild(ul);

  console.log('DEBUG: scrolling src/wc.c into view');
  var wc_li = document.getElementById('src/wc.c');
  wc_li.scrollIntoView();
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
  const file_path = e.target.dataset.name;
  this.now.file_path = file_path;
  this.now.object[file_path] = {
    'initial_file_content_id': file_content_id,
    'history': []
  };
  this.now.object[file_path]['history'].push( {
    'commit_id': this.now.commit_id,
    'file_content_id': file_content_id,
    'commit': this.now.commit
  });
  const parent_id = this.now.commit['parent'];
  this.now.stat['history'] = {
    'load_start': performance.now()
  };
  this.load_next_parent(file_path, parent_id, file_content_id).then(function(ok) {
    if(ok) {
      this.init_file_history();
      this.update_file_history();
      const file_log = this.now.commit['log'];
      const version = 0;
      this.show_file(file_path, version);
      this.load_all_parents(file_path).then(function(status) {
        const history_count = this.now.object[this.now.file_path]['history'].length;
        this.update_file_history();
        this.log('finished loading ' + history_count + ' historical commits for [' + file_path + ']');
      }.bind(this), function(err) {
        console.error(err);
      }.bind(this));
    }
  }.bind(this), function(err_parent) {
    console.error('failed to load parent');
  }.bind(this));
}
_mach.prototype.show_file = function(file_path, version) {
  const id = this.now.object[this.now.file_path]['history'][version]['file_content_id'];
  this.git.load_object(id).then( function(current_version_obj) {
    const decoder = new TextDecoder('utf-8');
    const current_version = decoder.decode(current_version_obj);
    const current_version_log = this.now.object[this.now.file_path]['history'][version]['commit']['log'];
    const MAX_VERSION = this.now.object[this.now.file_path]['history'].length - 1;
    if(version === MAX_VERSION) {
      // diff with previous version not possible
      // show content of only this version
      this.content.innerHTML = current_version;
      this.content_info.innerHTML = file_path + ' | ' + current_version_log;
      this.log('loaded file ' + name + ' (version ' + version + ')');
      return;
    } else {
      const prev_version = version + 1;
      const prev_id = this.now.object[this.now.file_path]['history'][prev_version]['file_content_id'];
      this.git.load_object(prev_id).then( function(prev_version_obj) {
        const prev_version = decoder.decode(prev_version_obj);
        var dmp = new diff_match_patch();
        var diff = dmp.diff_main(current_version, prev_version);
        dmp.diff_cleanupSemantic(diff);
        const diff_html = this.diff_to_html(diff);
        this.content.innerHTML = diff_html['html'];
        this.now.object[this.now.file_path]['history'][version]['diff'] = diff_html['diff'];
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
        this.content_info.innerHTML = file_path + ' | ' + add_count + '+ ' + del_count + '- | ' + current_version_log;
        this.log('loaded file ' + name + ' (version ' + version + '). Press <span class="key">&uarr;</span> or <span class="key">&darr;</span> to view changes made in this revision.');
      }.bind(this), function(err_prev) {
        this.log('Error loading previous version: ' + err_prev);
      }.bind(this));
    }
  }.bind(this), function(err_current) {
    this.log('Error loading current version: ' + err_current);
  }.bind(this));
}

_mach.prototype.load_next_parent = function(file_path, commit_id, file_content_id) {
  return new Promise(function(ok_callback, err_callback) {
    this.git.load_object(commit_id).then(function(commit_obj) {
      const commit = this.git.parse_commit_obj(commit_obj);
      const tree_id = commit['tree'];
      this.git.load_tree(tree_id, [], {}).then(function(tree) {
        const history_count = this.now.object[file_path]['history'].length;
        const file_path_tok = file_path.split('/');
        tree_node = tree;
        for(var i=0; i<file_path_tok.length; ++i) {
          tree_node = tree_node[ file_path_tok[i] ];
        }
        new_file_content_id = tree_node;
        if(new_file_content_id !== file_content_id) {
          // found one parent
          this.now.object[file_path]['history'].push( {
            'commit_id': commit_id,
            'file_content_id': new_file_content_id,
            'commit': commit
          });
          ok_callback(1);
        } else {
          // did not find a parent, continue search
          if('parent' in commit) {
            const new_parent_id = commit['parent'];
            this.load_next_parent(file_path, new_parent_id, file_content_id).then(function(ok) {
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
        }
      }.bind(this), function(err_tree) {
        console.error(err_tree);
      }.bind(this));
    }.bind(this), function(err_commit) {
      console.error(err_commit);
    }.bind(this));
  }.bind(this));
}

_mach.prototype.load_all_parents = function(file_path) {
  return new Promise(function(ok_callback, err_callback) {
    const pindex = this.now.object[this.now.file_path]['history'].length - 1;
    const file_content_id = this.now.object[this.now.file_path]['history'][pindex]['file_content_id'];
    const parent_id = this.now.object[this.now.file_path]['history'][pindex]['commit']['parent'];
    this.load_next_parent(file_path, parent_id, file_content_id).then(function(ok) {
      if(ok) {
        const history_count = this.now.object[this.now.file_path]['history'].length;
        if(history_count % this.HISTORY_LOAD_MSG_FREQ === 0) {
          const elapsed = (performance.now() - this.now.stat['history']['load_start'])/1000;
          console.log('loaded ' + history_count + ' history in ' + elapsed + 'sec.');
          this.update_file_history();
        }
        // for DEBUG ONLY
        if(history_count < this.MAX_FILE_HISTORY) {
          this.load_all_parents(file_path).then(function(ok) {
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
  const file_path = this.now.file_path
  const history_count = this.now.object[this.now.file_path]['history'].length;
  const current_options = this.file_revision_list.options;
  const options_length  = this.file_revision_list.options.length;
  if(options_length === history_count) {
    // nothing to update
    return;
  }
  for(var i=options_length; i<history_count; ++i) {
    const option = document.createElement('option');
    option.setAttribute('value', i);
    const date = this.now.object[this.now.file_path]['history'][i]['commit']['author']['date'];
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

    const commit_id = this.now.object[this.now.file_path]['history'][i]['commit_id'].substring(0, 5);
    option.innerHTML = '[' + i + '] ' + date_str + ' ' + time_str + ' (' + commit_id + ')';
    this.file_revision_list.appendChild(option);
  }
}

_mach.prototype.show_oldest_version = function(e) {
  const history_count = this.now.object[this.now.file_path]['history'].length;
  const oldest_version = history_count - 1;
  this.file_revision_list.selectedIndex = oldest_version;
  this.show_file(this.now.file_path, oldest_version);
}

_mach.prototype.show_latest_version = function(e) {
  const latest_version = 0;
  this.file_revision_list.selectedIndex = latest_version;
  this.show_file(this.now.file_path, latest_version);
}

_mach.prototype.show_prev_version = function(e) {
  const history_count = this.now.object[this.now.file_path]['history'].length;
  const version = this.file_revision_list.selectedIndex;
  prev_version = version + 1;
  if(prev_version >= history_count) {
    prev_version = 0;
  }
  this.file_revision_list.selectedIndex = prev_version;
  this.show_file(this.now.file_path, prev_version);
}

_mach.prototype.show_next_version = function(e) {
  const history_count = this.now.object[this.now.file_path]['history'].length;
  const version = this.file_revision_list.selectedIndex;
  next_version = version - 1;
  if(next_version < 0) {
    next_version = history_count - 1;
  }
  this.file_revision_list.selectedIndex = next_version;
  this.show_file(this.now.file_path, next_version);
}

_mach.prototype.show_file_version = function() {
  const version = this.file_revision_list.selectedIndex;
  this.show_file(this.now.file_path, version);
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
  const diff_count = this.now.object[this.now.file_path]['history'][version]['diff'].length;
  var next_diff_index = this.now['current_diff_index'] + 1;
  if(next_diff_index >= diff_count) {
    next_diff_index = 0;
  }
  const diff_el_id = this.now.object[this.now.file_path]['history'][version]['diff'][next_diff_index];
  const diff_el = document.getElementById(diff_el_id);
  diff_el.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
  this.now['current_diff_index'] = next_diff_index;
  this.log('Showing diff ' + (this.now['current_diff_index'] + 1) + ' of ' + diff_count);
}

_mach.prototype.show_prev_change = function() {
  const version = this.file_revision_list.selectedIndex;
  const diff_count = this.now.object[this.now.file_path]['history'][version]['diff'].length;
  var prev_diff_index = this.now['current_diff_index'] - 1;
  if(prev_diff_index < 0) {
    prev_diff_index = diff_count - 1;
  }
  const diff_el_id = this.now.object[this.now.file_path]['history'][version]['diff'][prev_diff_index];
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
    if(e.shiftKey) {
      if(e.key === 'ArrowUp') {
        this.content.scrollBy(0, -10);
      } else {
        this.content.scrollBy(0, 10);
      }
      e.preventDefault();
      return;
    } else {
      if(e.key === 'ArrowUp') {
        this.show_prev_change();
      } else {
        this.show_next_change();
      }
      e.preventDefault();
      return;
    }
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

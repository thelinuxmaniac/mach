/*

Maintains the state of HTML user interface for the MACH application.

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Oct-08

*/
function _mach() {
  // this.c        : reference for the HTML container used by the MACH application
  // this.repo_url : git repository URL
  // this.git      : interface to the git repository

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
    }
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
    console.log('DEBUG: loaded only latest version, avoiding loading history.')
    //this.now.stat['history']['load_start'] = performance.now();
    //this.load_all_parents(this.now.filepath);
  } else {
    // load existing history
    this.show_latest_version();
    this.init_file_history();
    this.update_file_history();
  }
}

_mach.prototype.show_file = function(filepath, version) {
  const history = this.object_node(filepath);
  var info = [];
  info.push(filepath);
  info.push(history[version]['commit']['log'])
  info.push( '<a target="_blank" href="' + this.d.mach.conf.repo.external_url_prefix.replace('$OBJECT_TYPE', 'commit').replace('$OBJECT_ID', history[version]['commit']['id']) + '">commit</a>' );

  const id = history[version]['blob_id']
  this.git.load_object(id).then( function(current_version_obj) {
    const decoder = new TextDecoder('utf-8');
    const current_version = decoder.decode(current_version_obj);
    const MAX_VERSION = history.length - 1;
    if(version === MAX_VERSION) {
      // diff with previous version not possible
      // show content of only this version
      this.content.innerHTML = current_version;
      this.content_info.innerHTML = info.join('<span class="sep"> | </span>');
      this.log('loaded initial version of file ' + name);
      return;
    } else {
      const prev_version = version + 1;
      const prev_id = history[prev_version]['blob_id'];
      this.git.load_object(prev_id).then( function(prev_version_obj) {
        const prev_version = decoder.decode(prev_version_obj);
        var dmp = new diff_match_patch();
        var diff = dmp.diff_main(current_version, prev_version);
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
        this.log('loaded file ' + name + ' (version ' + version + '). Press <span class="key">&uarr;</span> or <span class="key">&darr;</span> to view changes made in this revision.');
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

        if(new_file_content_id !== file_content_id) {
          // found one parent
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
        } else {
          // did not find a parent, continue search
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
        const new_history =this.object_node(filepath);
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
        this.now.stat['history']['load_end'] = performance.now();
        const elapsed = (this.now.stat['history']['load_end'] - this.now.stat['history']['load_start'])/1000;
        this.log('finished loading history in ' + elapsed + 'sec');
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
  const filepath = this.now.filepath
  var history = this.object_node(filepath);
  if(history.length === 0) {
    return;
  }
  const history_count = history.length;
  const current_options = this.file_revision_list.options;
  const options_length  = this.file_revision_list.options.length;
  if(options_length === history_count) {
    // nothing to update
    return;
  }
  for(var i=options_length; i<history_count; ++i) {
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
    option.innerHTML = '[' + i + ' of ' + history_count + '] ' + date_str + ' ' + time_str + ' (' + commit_id + ')';
    this.file_revision_list.appendChild(option);
  }
}

_mach.prototype.show_oldest_version = function(e) {
  const history = this.object_node(this.now.filepath);
  const history_count = history.length;
  const oldest_version = history_count - 1;
  this.file_revision_list.selectedIndex = oldest_version;
  this.show_file(this.now.filepath, oldest_version);
}

_mach.prototype.show_latest_version = function(e) {
  const latest_version = 0;
  this.file_revision_list.selectedIndex = latest_version;
  this.show_file(this.now.filepath, latest_version);
}

_mach.prototype.show_prev_version = function(e) {
  const history = this.object_node(this.now.filepath);
  const history_count = history.length;
  const version = this.file_revision_list.selectedIndex;
  prev_version = version + 1;
  if(prev_version >= history_count) {
    prev_version = 0;
  }
  this.file_revision_list.selectedIndex = prev_version;
  this.show_file(this.now.filepath, prev_version);
}

_mach.prototype.show_next_version = function(e) {
  const history = this.object_node(this.now.filepath);
  const history_count = history.length;
  const version = this.file_revision_list.selectedIndex;
  next_version = version - 1;
  if(next_version < 0) {
    next_version = history_count - 1;
  }
  this.file_revision_list.selectedIndex = next_version;
  this.show_file(this.now.filepath, next_version);
}

_mach.prototype.show_file_version = function() {
  const version = this.file_revision_list.selectedIndex;
  this.show_file(this.now.filepath, version);
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

  if(e.ctrlKey) {
    if(e.key === 's') {
      this.save_project();
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
    if(e.shiftKey) {
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
}

//
// MACH project i/o
//
_mach.prototype.save_project = function() {
  var filename = this.d['mach']['project']['name'];
  if(filename === '') {
    filename = 'mach-' + this.d['mach']['project']['id'].substr(0,6) + '.json';
  }
  var blob = new Blob( [JSON.stringify(this.d)],
                       { type: 'text/json;charset=utf-8' } );
  this.save_data_to_local_file(blob, filename);
}

_mach.prototype.load_project = function(json) {
  this.d = json;
  this.load_code_repo(this.d.mach.conf.repo.url).then(function(repo_stat) {
    const tag_count = repo_stat.tag_count;
    const obj_count = repo_stat.pack_obj_count;
    console.log('loaded repo with ' + tag_count + ' tags and ' + obj_count + ' objects');
    this.ui_init();
    if('head' in this.d.mach.conf.repo) {
      this.git.load_object(this.d.mach.conf.repo.head).then(function(commit_obj) {
        this.now.head.id = this.d.mach.conf.repo.head;
        this.now.head.object = mach.git.parse_commit_obj(commit_obj);
        console.log('loaded commit ' + this.now.head.id);

        const tree_id = this.now.head.object['tree'];
        this.git.load_tree(tree_id, [], {}).then(function(tree) {
          this.now.head.tree = tree;
          mach.show_source_tree(this.now.head.tree);
          if('filepath' in this.d.mach.conf.repo) {
            this.now.filepath = this.d.mach.conf.repo.filepath;
            var filepath_li = document.getElementById(this.now.filepath);
            filepath_li.scrollIntoView();

            this.init_file_history();
            this.update_file_history();

            this.show_latest_version();
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

_mach.prototype.get_node_val = function(tree, filepath) {
  const filepath_tok = filepath.split('/');
  var object_node = tree;
  for(var i=0; i<filepath_tok.length; ++i) {
    object_node = object_node[ filepath_tok[i] ];
  }
  return object_node;
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

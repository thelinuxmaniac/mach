/*

Maintains the state of HTML user interface for the MACH application.

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Oct-08

*/
function _mach() {
  // this.c        : reference for the HTML container used by the MACH application
  // this.repo_url : git repository URL
  // this.git      : interface to the git repository

  this.LOG_TIMEOUT = 3000;   // clear log automatically after LOG_TIMEOUT ms
  this.log_clear_timer = 0;  // for clearing log messages automatically after timeout
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

  // nav
  const nav_container = document.createElement('div');
  nav_container.setAttribute('class', 'nav_container');
  nav_container.innerHTML = 'Navigation';

  // content
  const content_container = document.createElement('div');
  content_container.setAttribute('class', 'content_container');
  this.content_info = document.createElement('div');
  this.content_info.setAttribute('class', 'content_info');
  this.content = document.createElement('textarea');
  this.content.setAttribute('class', 'content');
  this.content.setAttribute('readonly', '');
  this.content.setAttribute('spellcheck', 'false');
  this.content.setAttribute('wrap', 'off');
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
}

_mach.prototype.update_source_tree = function() {
  this.tree_container.innerHTML = '';
  const prefix = '';
  const ul = this.get_source_tree(this.git.tree, prefix);
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
      li.addEventListener('click', this.show_file.bind(this));
    } else {
      const new_prefix = prefix + filename + '/';
      const subtree_ul = this.get_source_tree(subtree[filename], new_prefix);
      const subtree_summary = document.createElement('summary');
      subtree_summary.innerHTML = filename;
      const subtree_details = document.createElement('details');
      subtree_details.appendChild(subtree_summary);
      subtree_details.appendChild(subtree_ul);
      li.appendChild(subtree_details);
    }
    ul.appendChild(li);
  }
  return ul;
}

_mach.prototype.show_file = function(e) {
  const id = e.target.dataset.id;
  const name = e.target.dataset.name;
  const index = this.git.pack_obj_id_to_index(id);
  const offset = this.git.pack_obj_offset_list[index];
  this.git.load_object(id, offset).then( function(file_content_obj) {
    const decoder = new TextDecoder('utf-8');
    const file_content = decoder.decode(file_content_obj);
    this.content.innerHTML = file_content;
    this.content_info.innerHTML = name;
    this.log('loaded file ' + name);
  }.bind(this), function(err_file_obj) {
    this.log('Error: ' + err_file_obj);
  }.bind(this));
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

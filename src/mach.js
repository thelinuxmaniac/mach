/*

Maintains the state of HTML user interface for the ACE application.

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Oct-08

*/
function _ace() {
  // this.c        : reference for the HTML container used by the ACE application
  // this.repo_url : git repository URL
  // this.git      : interface to the git repository
}

_ace.prototype.init = function(html_container) {
  this.c = html_container;

  if(typeof(_ACE_DEBUG) !== 'undefined' && _ACE_DEBUG === true) {
    const REPO_BASEURL      = '../repo/';
    const REPO_NAME         = 'coreutils.git';
    this.selected_tag_name = 'refs/tags/v8.3';
    const repo_url = REPO_BASEURL + REPO_NAME;
    this.load_code_repo(repo_url).then(function(repo_stat) {
      const tag_count = repo_stat.tag_count;
      const obj_count = repo_stat.pack_obj_count;
      console.log('loaded git repo with ' + tag_count + ' tags and ' + obj_count + ' objects');
      this.ui_init();

      // select a tag
      for(var i=0; i<this.tag_list.options.length; ++i) {
        if(this.tag_list.options[i].value == this.selected_tag_name) {
          this.tag_list.selectedIndex = i;
        }
      }
      this.tag_list.dispatchEvent(new Event('change'));
    }.bind(this), function(err) {
      console.error(err);
    });
  }
}

//
// Code Repository
//
_ace.prototype.load_code_repo = function(url) {
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
            'pack_obj_count': this.git.pack_obj_count
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
_ace.prototype.ui_init = function() {
  this.c.innerHTML = '';

  const page_title = document.createElement('h1');
  page_title.innerHTML = 'Annotation of Code Evolution (ACE)'

  const tag_list_container = document.createElement('div');
  tag_list_container.setAttribute('class', 'tag_list_container');
  const tag_fieldset = document.createElement('fieldset');
  const tag_legend = document.createElement('legend');
  tag_legend.innerHTML = 'Repository Tags'
  tag_fieldset.appendChild(tag_legend);
  this.tag_list = document.createElement('select');
  this.tag_list.setAttribute('id', 'tag_list');
  this.tag_list.addEventListener('change', this.ui_tag_list_onchange.bind(this));
  this.ui_tag_list_update();
  tag_fieldset.appendChild(this.tag_list);
  this.tag_details = document.createElement('div');
  tag_fieldset.appendChild(this.tag_details);
  tag_list_container.appendChild(tag_fieldset);

  this.c.appendChild(page_title);
  this.c.appendChild(tag_list_container);
}

_ace.prototype.ui_tag_list_update = function() {
  this.tag_list.innerHTML = '';
  for(const tag_name in this.git.tag_ref) {
    const option = document.createElement('option');
    option.setAttribute('value', tag_name);
    option.innerHTML = tag_name;
    this.tag_list.appendChild(option);
  }
}

_ace.prototype.ui_tag_list_onchange = function() {
  this.selected_tag_name = this.tag_list.options[this.tag_list.selectedIndex].value;
  const selected_tag_id = this.git.tag_ref[this.selected_tag_name]['tag_id'];
  const tag_offset = this.git.pack_index[selected_tag_id]['offset'];
  this.git.load_object(selected_tag_id, tag_offset).then(function(object_text) {
    const commit_obj = this.git.parse_commit_obj(object_text);
    const commit_title = document.createElement('h4');
    commit_title.innerHTML = commit_obj['tagger']['name'] + ' &lt;' + commit_obj['tagger']['email'] + '&gt; on ' + commit_obj['tagger']['date'].toLocaleString();
    const commit_log = document.createElement('p');
    commit_log.innerHTML = commit_obj['log'];
    this.tag_details.innerHTML = '';
    this.tag_details.appendChild(commit_title);
    this.tag_details.appendChild(commit_log);
  }.bind(this), function(err_load_obj) {
    console.error(err_load_obj);
  });
}

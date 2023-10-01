/*

Provides an interface to interact with a git repository using the
dumb HTTP protocol.

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Oct-01

*/

function _git(repo_url) {
  this.repo_url = repo_url;
  this.tag_ref = {};
}

_git.prototype.load_tag_ref = function() {
  return new Promise( function(ok_callback, err_callback) {
    console.log(this.repo_url)
    const packed_ref_url = this.repo_url + '/packed-refs';
    fetch(packed_ref_url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain',
      },
    }).then( function(response) {
      if(response.statusText === 'OK') {
        return response.text();
      } else {
        err_callback(response.statusText);
      }
    }).then( function(data) {
      const packed_ref_tok = data.split('\n');
      const line_count = packed_ref_tok.length;
      var prev_tag_name = '';
      for(var i=0; i<line_count; ++i) {
        const line = packed_ref_tok[i];
        const line_tok = line.split(' ');
        if(line_tok.length === 2) {
          const tag_id = line_tok[0];
          const tag_name = line_tok[1];
          this.tag_ref[tag_name] = { 'tag_id': tag_id };
          prev_tag_name = tag_name;
        } else {
          if(line.startsWith('^') && prev_tag_name !== '') {
            this.tag_ref[prev_tag_name]['commit_id'] = line.substr(1);
          }
        }
      }
      ok_callback( Object.keys(this.tag_ref).length );
    }.bind(this)).catch( function(err) {
      err_callback(err);
    });
  }.bind(this));
}

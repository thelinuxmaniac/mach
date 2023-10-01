/*

Provides an interface to interact with a git repository using the
dumb HTTP protocol.

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Oct-01

*/

function _git(repo_url) {
  this.repo_url = repo_url;
  this.tag_ref = {};
  this.pack_id = '';
  this.pack_index = {}; // {'offset':..., 'crc':...}
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

_git.prototype.load_all_packs = function() {
  return new Promise( function(ok_callback, err_callback) {
    const pack_list_url = this.repo_url + '/objects/pack/';
    fetch(pack_list_url, {
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
      const html = document.createElement('html');
      html.innerHTML = data;
      const links = html.getElementsByTagName('a');
      const link_count = links.length;
      var pack_sha_list = [];
      for(var i=0; i<link_count; ++i) {
        const href = links[i].getAttribute('href');
        const label = links[i].innerHTML;
        if(label.startsWith('pack-')) {
          if(label.endsWith('.idx') || label.endsWith('.pack')) {
            const dash_index = label.indexOf('-');
            const dot_index = label.indexOf('.');
            const pack_sha = label.substring(dash_index+1, dot_index);
            if( pack_sha_list.indexOf(pack_sha) === -1 ) {
              pack_sha_list.push(pack_sha);
            }
          }
        }
      }
      var fetch_pack_promises = [];
      for(const pack_sha_index in pack_sha_list) {
        const pack_sha = pack_sha_list[pack_sha_index];
        fetch_pack_promises.push(this.load_pack(pack_sha));
      }
      Promise.all(fetch_pack_promises).then( function(ok) {
        ok_callback(ok);
      }, function(err) {
        err_callback(err);
      });
    }.bind(this));
  }.bind(this));
}

_git.prototype.load_pack = function(pack_sha) {
  return new Promise( function(ok_callback, err_callback) {
    const pack_index_url = this.repo_url + '/objects/pack/pack-' + pack_sha + '.idx';
    fetch(pack_index_url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Transfer-Encoding': 'binary',
      },
    }).then( function(response) {
      if(response.statusText === 'OK') {
        this.pack_id = pack_sha;
        return response.arrayBuffer();
      } else {
        err_callback(response.statusText);
      }
    }.bind(this)).then( function(array_buffer) {
      this.parse_pack_index(array_buffer).then(function(ok_parse) {
        ok_callback(ok_parse);
      }, function(err_parse) {
        err_callback(err_parse);
      });
    }.bind(this));
  }.bind(this));
}

// References
// https://github.com/git/git/blob/bcb6cae2966cc407ca1afc77413b3ef11103c175/builtin/show-index.c
// https://github.com/git/git/blob/bcb6cae2966cc407ca1afc77413b3ef11103c175/pack.h
_git.prototype.parse_pack_index = function(array_buffer) {
  return new Promise( function(ok_callback, err_callback) {
    const PACK_IDX_SIGNATURE = Number('0xff744f63'); // in host byte order (Little Endian)
    const SIGNATURE_UINT32_SIZE = 2; // 2 * 4 bytes
    const HASH_SIZE = 20; // sha1 is 160 bits = 20 bytes
    const CRC_SIZE = 4; // 4 bytes
    const OFFSET_SIZE = 4; // 4 bytes
    var uint8_offset = 0; // reading from beginning of the array buffer
    const uint32_array = new Uint32Array(array_buffer); // network byte order (Big Endian)
    const uint8_array = new Uint8Array(array_buffer); // network byte order (Big Endian)

    // assert the signature
    const signature = uint32_array[0];
    if(signature !== this.htonl(PACK_IDX_SIGNATURE)) {
      console.error('Invalid signature found in pack index: required=' + signature + ', received=' + htonl(PACK_IDX_SIGNATURE));
      return;
    }

    const git_pack_version = this.ntohl(uint32_array[1]);
    if(git_pack_version !== 2) {
      console.error('Unknown git pack version : required=2, received=' + git_pack_version);
      return;
    }

    uint8_offset = 2 * 4; // after the first 8 bytes used for pack signature
    // read next 256 uint32 entries
    var nr = 0;
    for(var i=0; i<256; ++i) {
      var n = this.ntohl(uint32_array[SIGNATURE_UINT32_SIZE + i]);
      if(n<nr) {
        err_callback('corrupt git pack index');
        return;
      }
      nr = n;
      uint8_offset += 4;
    }

    // each entry consists of the following
    // offset (4 bytes), hash (20 bytes), crc-checksum(4 bytes)
    var hash = [];
    var hash_str = [];
    var crc = [];
    var off = [];
    var off64_nr = 0;

    // read id (i.e. hash of each object)
    var index_to_id = [];
    for(var i=0; i<nr; ++i) {
      var id_buf = new ArrayBuffer(HASH_SIZE);
      var id = '';
      const hash_uint8_array = new Uint8Array(id_buf);
      for(var j=0; j<HASH_SIZE; ++j) {
        hash_uint8_array[j] = uint8_array[uint8_offset + j];
        id += hash_uint8_array[j].toString(16);
      }
      this.pack_index[id] = { 'offset':-1, 'crc':'' };
      index_to_id[i] = id;
      uint8_offset += HASH_SIZE;
    }

    // read crc
    for(var i=0; i<nr; ++i) {
      var crc_buf = new ArrayBuffer(CRC_SIZE);
      const crc_uint8_array = new Uint8Array(crc_buf);
      for(var j=0; j<CRC_SIZE; ++j) {
        crc_uint8_array[j] = uint8_array[uint8_offset + j];
      }
      const crc_uint32_array = new Uint32Array(crc_buf);
      const id = index_to_id[i];
      this.pack_index[id]['crc'] = this.ntohl(crc_uint32_array[0]).toString(16);
      uint8_offset += CRC_SIZE;
    }

    // read offset
    for(var i=0; i<nr; ++i) {
      var offset_buf = new ArrayBuffer(OFFSET_SIZE);
      const off_uint8_array = new Uint8Array(offset_buf);
      for(var j=0; j<OFFSET_SIZE; ++j) {
        off_uint8_array[j] = uint8_array[uint8_offset + j];
      }
      const off_uint32_array = new Uint32Array(offset_buf);
      const id = index_to_id[i];
      this.pack_index[id]['offset'] = this.ntohl(off_uint32_array[0]);
      uint8_offset += OFFSET_SIZE;
    }
    ok_callback(nr);
  }.bind(this));
}

// convert from host byte order to network byte order, see
// $ man htonl
// source: https://stackoverflow.com/a/9283707
_git.prototype.htonl = function(n) {
  var buf = new ArrayBuffer(4);
  var one_byte_view = new Uint8Array(buf);
  one_byte_view[0] = (n & 0xFF000000) >>> 24;
  one_byte_view[1] = (n & 0x00FF0000) >>> 16;
  one_byte_view[2] = (n & 0x0000FF00) >>> 8;
  one_byte_view[3] = (n & 0x000000FF) >>> 0;
  var four_byte_view = new Uint32Array(buf);
  return four_byte_view[0];
}

// convert from network byte order (Big Endian) to host byte order
_git.prototype.ntohl = function(n) {
  var buf = new ArrayBuffer(4);
  var one_byte_view = new Uint8Array(buf);
  one_byte_view[0] = (n & 0xFF000000) >>> 24;
  one_byte_view[1] = (n & 0x00FF0000) >>> 16;
  one_byte_view[2] = (n & 0x0000FF00) >>> 8;
  one_byte_view[3] = (n & 0x000000FF) >>> 0;
  var four_byte_view = new Uint32Array(buf);
  return four_byte_view[0];
}

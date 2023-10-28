/*

Provides an interface to interact with a git repository using the
dumb HTTP protocol.

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Oct-01

*/

function _git(repo_url) {
  this.repo_url = repo_url;
  this.tag_ref = {};

  // git pack data
  this.pack_id = '';
  this.pack_obj_id_list = new Array(0);
  this.pack_obj_offset_list = new Array(0);
  this.pack_obj_crc_list = new Array(0);

  this.pack_obj_array_buffer = new ArrayBuffer(0);
  this.pack_obj_uint8_arr = new Uint8Array(0);

  // defined in https://github.com/git/git/blob/master/object.h
  this.PACK_OBJECT_TYPE = {
    OBJ_COMMIT: 1,
    OBJ_TREE: 2,
    OBJ_BLOB: 3,
    OBJ_TAG: 4,
    OBJ_OFS_DELTA: 6,
    OBJ_REF_DELTA: 7
  }
  this.OBJECT_HEADER_SIZE = 2; // in bytes
}

_git.prototype.load_tag_ref = function() {
  return new Promise( function(ok_callback, err_callback) {
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
      this.tag_ref_count = Object.keys(this.tag_ref).length;
      ok_callback(this.tag_ref_count);
    }.bind(this)).catch( function(err) {
      err_callback(err);
    });
  }.bind(this));
}

_git.prototype.load_all_pack_index = function() {
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
        fetch_pack_promises.push(this.load_pack_index(pack_sha));
      }
      Promise.all(fetch_pack_promises).then( function(ok) {
        ok_callback(ok);
      }, function(err) {
        err_callback(err);
      });
    }.bind(this));
  }.bind(this));
}

_git.prototype.load_pack_index = function(pack_sha) {
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
    this.pack_obj_id_list = new Array(nr);
    this.pack_obj_offset_list = new Array(nr);
    this.pack_obj_crc_list = new Array(nr);
    // read id (i.e. hash of each object)
    for(var i=0; i<nr; ++i) {
      var id_buf = new ArrayBuffer(HASH_SIZE);
      var id = '';
      const hash_uint8_array = new Uint8Array(id_buf);
      for(var j=0; j<HASH_SIZE; ++j) {
        hash_uint8_array[j] = uint8_array[uint8_offset + j];
        var hex_value = hash_uint8_array[j].toString(16);
        if(hex_value.length < 2) {
          // add padding to values (e.g. 11 -> 0b)
          id += '0' + hex_value;
        } else {
          id += hex_value;
        }
      }
      this.pack_obj_id_list[i] = id;
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
      this.pack_obj_crc_list[i] = this.ntohl(crc_uint32_array[0]).toString(16);
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
      this.pack_obj_offset_list[i] = parseInt(this.ntohl(off_uint32_array[0]));
      uint8_offset += OFFSET_SIZE;
    }

    // (this.pack_obj_id_list, this.pack_obj_offset_list) are sorted based on object-id
    // we maintain a sorted list of offset values so that we can determine the size of
    // each object-id
    this.pack_obj_offset_sorted_list = this.pack_obj_offset_list.toSorted(function(a, b) {
      return a-b;
    });
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

_git.prototype.load_all_pack_object = function() {
  return new Promise( function(ok_callback, err_callback) {
    const pack_index_url = this.repo_url + '/objects/pack/pack-' + this.pack_id + '.pack';
    fetch(pack_index_url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Transfer-Encoding': 'binary',
      },
    }).then( function(response) {
      if(response.statusText === 'OK') {
        return response.arrayBuffer();
      } else {
        err_callback(response.statusText);
      }
    }.bind(this)).then( function(array_buffer) {
      this.parse_pack_object(array_buffer).then(function(pack_obj_stat) {
        ok_callback(pack_obj_stat);
      }.bind(this), function(err_parse) {
        err_callback(err_parse);
      });
    }.bind(this));
  }.bind(this));
}

// References
// https://github.com/git/git/blob/bcb6cae2966cc407ca1afc77413b3ef11103c175/builtin/unpack-objects.c
// https://stefan.saasen.me/articles/git-clone-in-haskell-from-the-bottom-up/#pack-file-format
_git.prototype.parse_pack_object = function(array_buffer) {
  return new Promise( function(ok_callback, err_callback) {
    this.pack_obj_array_buffer = array_buffer;

    const pack_obj_header = new Uint32Array(array_buffer);

    const PACK_HEADER_SIZE = 12; // bytes
    const PACK_SIGNATURE = 1346454347;
    const PACK_VERSION = 2;
    if(pack_obj_header[0] !== this.htonl(PACK_SIGNATURE)) {
      err_callback('malformed pack file header: expected=' + PACK_SIGNATURE + ', received=' + pack_obj_header[0]);
      return;
    }
    const version = this.ntohl(pack_obj_header[1]);
    if(version !== 2) {
      err_callback('unexpected version number: expected=' + PACK_VERSION + ', received=' + version);
      return;
    }

    const pack_obj_count = this.ntohl(pack_obj_header[2]);
    if(pack_obj_count !== this.pack_obj_id_list.length) {
      err_callback('mismatch between pack object count in index file and object file!');
      return;
    }
    this.pack_obj_uint8_arr = new Uint8Array(this.pack_obj_array_buffer);
    ok_callback(array_buffer.byteLength);
  }.bind(this));
}

// References
// - https://github.com/git/git/blob/bcb6cae2966cc407ca1afc77413b3ef11103c175/builtin/unpack-objects.c::unpack_one()
_git.prototype.load_object = function(id, pack_offset) {
  return new Promise(function(ok_callback, err_callback) {
    // The first byte is structured as follows:
    // MSB : is set to indicate that object size value overflows into the next byte
    // 3 bits  : object type
    // 4 bites : size (partial size if MSB is set to 1)
    var offset = pack_offset;
    const byte1 = this.pack_obj_uint8_arr[offset];
    offset += 1;

    var type = (byte1 >> 4) & 7; // extract the 3 bits holding type information
    var object_size = (byte1 & 15);
    var shift = 4;
    var byte_k = byte1;
    while (byte_k & parseInt('0x80', 16)) {
      byte_k = this.pack_obj_uint8_arr[offset];
      offset += 1;
      object_size += ( (byte_k & parseInt('0x7f', 16)) << shift );
      shift += 7;
    }

    switch(type) {
    case this.PACK_OBJECT_TYPE.OBJ_COMMIT:
    case this.PACK_OBJECT_TYPE.OBJ_TREE:
    case this.PACK_OBJECT_TYPE.OBJ_BLOB:
    case this.PACK_OBJECT_TYPE.OBJ_TAG:
      this.unpack_non_delta_entry(id, pack_offset, type, object_size).then(function(object_text) {
        ok_callback(object_text);
      }, function(obj_err) {
        err_callback(obj_err);
      });
      break;
    case this.PACK_OBJECT_TYPE.OBJ_OFS_DELTA:
    case this.PACK_OBJECT_TYPE.OBJ_REF_DELTA:
      this.unpack_delta_entry(id, pack_offset, type, object_size).then(function(object_text) {
        ok_callback(object_text);
      }, function(obj_err) {
        err_callback(obj_err);
      });
      break;
    default:
      err_callback('unknown object type ' + type);
    }
  }.bind(this));
}

_git.prototype.pack_obj_id_to_index = function(id) {
  var low = 0;
  var high = this.pack_obj_id_list.length;
  while(low < high) {
    const mid = low + parseInt((high - low) / 2.0);
    if(id < this.pack_obj_id_list[mid]) {
      high = mid;
    } else if (id > this.pack_obj_id_list[mid]) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
}

_git.prototype.pack_obj_offset_to_index = function(pack_offset) {
  var low = 0;
  var high = this.pack_obj_id_list.length;
  while(low < high) {
    const mid = low + parseInt((high - low) / 2.0);
    if(pack_offset < this.pack_obj_offset_sorted_list[mid]) {
      high = mid;
    } else if (pack_offset > this.pack_obj_offset_sorted_list[mid]) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
}

_git.prototype.unpack_non_delta_entry = function(id, pack_offset, type, object_size) {
  return new Promise(function(ok_callback, err_callback) {
    const object_type_name = this.pack_object_type_id_to_str(type);
    const offset = pack_offset + this.OBJECT_HEADER_SIZE;
    const zlib_byte1 = this.pack_obj_uint8_arr[offset];
    if(zlib_byte1 !== parseInt('0x78', 16)) {
      console.error('malformed header of zlib compressed object: expected 0x78, got ' + zlib_byte1.toString(16));
      err_callback(zlib_byte1);
      return;
    }

    // The pack files only contains the size of uncompressed data and
    // does not contain the size of compressed zlib data. So, we do
    // not know how many bytes to provide to the DecompressionStream().
    // If any extra bytes are supplied to the browser's zlib decompression
    // algorithm, the following error gets raised
    //     "Unexpected input after the end of stream"
    // To solve this, we create a sorted list of all offset values obtained
    // from the pack index file and compute the size of zlib data based on
    // the difference between consecutive offset values.
    const id_index = this.pack_obj_id_to_index(id);
    const id_offset = this.pack_obj_offset_list[id_index];
    const sorted_offset_index = this.pack_obj_offset_to_index(id_offset);
    const next_sorted_offset_index = sorted_offset_index + 1;
    const next_offset = this.pack_obj_offset_sorted_list[next_sorted_offset_index];

    const zlib_data_size = (next_offset - pack_offset) - this.OBJECT_HEADER_SIZE;
    var obj_arr_uint8 = new Uint8Array(this.pack_obj_array_buffer.slice(offset, offset + zlib_data_size));
    const pack_blob = new Blob([ obj_arr_uint8 ])
    const ds = new DecompressionStream("deflate");
    const decompressedStream = pack_blob.stream().pipeThrough(ds);
    const response = new Response(decompressedStream).blob();
    response.then( function(object_blob) {
      if(object_blob.size !== object_size) {
        const err_msg = 'Inflated object size mismatch: expected=' + object_size + ', received=' + object_blob.size;
        err_callback(err_msg);
      } else {
        object_blob.text().then(function(object_text) {
          ok_callback(object_text);
        }, function(err_text) {
          err_callback(err_text);
        });
      }
    }.bind(this), function(err) {
      err_callback(err);
    });
  }.bind(this));
}

_git.prototype.unpack_delta_entry = function(id, pack_offset, type, delta_size) {
  return new Promise(function(ok_callback, err_callback) {
    console.log('TODO');
  }.bind(this));
}

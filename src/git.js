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
  this.pack_obj_offset_sorted_list = new Array(0);
  this.pack_obj_crc_list = new Array(0);
  this.pack_obj_size_list = new Array(0);
  this.pack_obj_type_list = new Array(0);
  this.pack_obj_data_offset_list = new Array(0);
  this.pack_obj_count = 0;
  this.pack_obj_array_buffer = new ArrayBuffer(0);
  this.pack_obj_uint8_arr = new Uint8Array(0);
  this.pack_obj_grouped_by_type = {};

  this.commit = {};
  this.commit_id_sorted_list = new Array(0);
  this.tree = {};

  // defined in https://github.com/git/git/blob/master/object.h
  this.PACK_OBJECT_TYPE = {
    OBJ_BAD: -1,
    OBJ_NONE: 0,
    OBJ_COMMIT: 1,
    OBJ_TREE: 2,
    OBJ_BLOB: 3,
    OBJ_TAG: 4,
    OBJ_OFS_DELTA: 6,
    OBJ_REF_DELTA: 7
  }
  this.OBJECT_HEADER_SIZE = 2; // in bytes
  this.HASH_SIZE = 20;         // sha1 is 160 bits = 20 bytes
  this.PACK_HEADER_SIZE = 12;  // [SIGNATURE, VERSION, OBJ-COUNT] each 4 bytes long
  this.byte_to_hex = new Array(256);

  // initialise the module
  this._init();
}

_git.prototype._init = function() {
  // https://stackoverflow.com/a/55200387
  for(var i=0; i<= 0xff; ++i) {
    this.byte_to_hex[i] = i.toString(16).padStart(2, '0');
  }
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
    this.pack_obj_count = nr;
    this.pack_obj_id_list = new Array(nr);
    this.pack_obj_offset_list = new Array(nr);
    this.pack_obj_crc_list = new Array(nr);
    // read id (i.e. hash of each object)
    for(var i=0; i<nr; ++i) {
      var id_buf = new ArrayBuffer(this.HASH_SIZE);
      var id = '';
      const hash_uint8_array = new Uint8Array(id_buf);
      for(var j=0; j<this.HASH_SIZE; ++j) {
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
      uint8_offset += this.HASH_SIZE;
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
    this.pack_obj_offset_sorted_list = new Array(nr);
    for(var i=0; i<nr; ++i) {
      this.pack_obj_offset_sorted_list[i] = [ i, this.pack_obj_offset_list[i] ];
    }
    this.pack_obj_offset_sorted_list.sort( function(a, b) {
      if(a[1] < b[1]) {
        return -1;
      } else if(a[1] > b[1]) {
        return 1;
      }
      return 0;
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
      this.parse_pack_object(array_buffer).then(function(pack_size_in_bytes) {
        ok_callback(pack_size_in_bytes);
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
    if(pack_obj_count !== this.pack_obj_count) {
      err_callback('mismatch between pack object count in index file and object file!');
      return;
    }
    this.pack_obj_uint8_arr = new Uint8Array(this.pack_obj_array_buffer);

    // load all object metadata
    this.pack_obj_size_list = new Array(this.pack_obj_count);
    this.pack_obj_type_list = new Array(this.pack_obj_count);
    this.pack_obj_data_offset_list = new Array(this.pack_obj_count);

    for(var i=0; i<this.pack_obj_count; ++i) {
      const id = this.pack_obj_id_list[i];
      const offset = this.pack_obj_offset_list[i];
      const metadata = this.load_object_metadata(id, offset);
      const type = metadata[0];
      this.pack_obj_type_list[i] = type;
      this.pack_obj_size_list[i] = metadata[1];
      this.pack_obj_data_offset_list[i] = metadata[2];

      if( !(type in this.pack_obj_grouped_by_type) ) {
        this.pack_obj_grouped_by_type[type] = [];
      }
      this.pack_obj_grouped_by_type[type].push(id);
    }
    ok_callback(array_buffer.byteLength);
  }.bind(this));
}

// References
// - https://github.com/git/git/blob/bcb6cae2966cc407ca1afc77413b3ef11103c175/builtin/unpack-objects.c::unpack_one()
_git.prototype.load_object = function(id) {
  return new Promise(function(ok_callback, err_callback) {
    const index = this.pack_obj_id_to_index(id);
    const offset = this.pack_obj_offset_list[index];
    const object_size = this.pack_obj_size_list[index];
    const data_offset = this.pack_obj_data_offset_list[index];
    const type = this.pack_obj_type_list[index];
    switch(type) {
    case this.PACK_OBJECT_TYPE.OBJ_BAD:
      err_callback('Cannot load object of type OBJ_BAD');
      break;
    case this.PACK_OBJECT_TYPE.OBJ_NONE:
      err_callback('Cannot load object of type OBJ_NONE');
      break;
    case this.PACK_OBJECT_TYPE.OBJ_COMMIT:
    case this.PACK_OBJECT_TYPE.OBJ_TREE:
    case this.PACK_OBJECT_TYPE.OBJ_BLOB:
    case this.PACK_OBJECT_TYPE.OBJ_TAG:
      this.unpack_non_delta_entry(id, data_offset, type, object_size).then(function(object) {
        ok_callback(object);
      }, function(obj_err) {
        err_callback(obj_err);
      });
      break;
    case this.PACK_OBJECT_TYPE.OBJ_OFS_DELTA:
      const delta_data_size = object_size; // size of data after negative offset
      this.unpack_offset_delta_entry(id, data_offset, delta_data_size).then(function(object) {
        ok_callback(object);
      }, function(obj_err) {
        err_callback(obj_err);
      });
      break;
    case this.PACK_OBJECT_TYPE.OBJ_REF_DELTA:
      err_callback('decoding of object type OBJ_REF_DELTA not supported yet!');
      break;
    default:
      err_callback('unknown object type ' + type);
    }
  }.bind(this));
}

_git.prototype.unpack_non_delta_entry = function(id, zlib_data_offset, type, object_size) {
  return new Promise(function(ok_callback, err_callback) {
    const offset = zlib_data_offset;
    const zlib_byte1 = this.pack_obj_uint8_arr[offset];
    if(zlib_byte1 !== parseInt('0x78', 16)) {
      console.error('id=' + id + ', type=' + type + ' : malformed header of zlib compressed object: expected 0x78, got ' + zlib_byte1.toString(16));
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
    const sorted_offset_index = this.pack_obj_offset_to_sorted_index(id_offset);
    const next_sorted_offset_index = sorted_offset_index + 1;
    const next_offset = this.pack_obj_offset_sorted_list[next_sorted_offset_index][1];

    const zlib_data_size = (next_offset - zlib_data_offset);
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
        object_blob.arrayBuffer().then(function(object_buf) {
          ok_callback(object_buf);
        }, function(err_text) {
          err_callback(err_text);
        });
      }
    }.bind(this), function(err) {
      err_callback(err);
    });
  }.bind(this));
}

_git.prototype.inflate_pack_obj_data = function(offset, size, deflate_size) {
  return new Promise(function(ok_callback, err_callback) {
    var obj_uint8_arr = new Uint8Array(this.pack_obj_array_buffer.slice(offset, offset + size));
    const zlib_byte1 = obj_uint8_arr[0]
    if(zlib_byte1 !== parseInt('0x78', 16)) {
      console.error('malformed header of zlib compressed object: expected 0x78, got ' + zlib_byte1.toString(16));
      err_callback(zlib_byte1);
      return;
    }

    const pack_blob = new Blob([ obj_uint8_arr ]);
    const ds = new DecompressionStream("deflate");
    const decompressedStream = pack_blob.stream().pipeThrough(ds);
    const response = new Response(decompressedStream).blob();
    response.then( function(object_blob) {
      if(object_blob.size !== deflate_size) {
        const err_msg = 'Inflated object size mismatch: expected=' + deflate_size + ', received=' + object_blob.size;
        err_callback(err_msg);
      } else {
        object_blob.arrayBuffer().then(function(object_buf) {
          ok_callback(object_buf);
        }, function(err_text) {
          err_callback(err_text);
        });
      }
    }.bind(this), function(err) {
      err_callback(err);
    });
  }.bind(this));
}

_git.prototype.unpack_offset_delta_entry = function(id, offset, delta_data_size) {
  return new Promise(function(ok_callback, err_callback) {
    // 1. Find negative offset for base object
    // The delta object contains instructions (COPY, INSERT) to
    // create the final object data. The COPY instruction corresponds
    // to the content of base object while the INSERT instruction
    // corresponds to the data contained in the delta object
    var byte_k = this.pack_obj_uint8_arr[offset];
    offset += 1;
    var negative_offset = byte_k & 0b01111111; // extract lower 7 bits
    var loop_count = 0;
    while (byte_k & 0b10000000) { // MSB = 1 indicates info overflow to next byte
      negative_offset += 1;
      byte_k = this.pack_obj_uint8_arr[offset];
      offset += 1;
      negative_offset = (negative_offset << 7) + ( byte_k & 0b01111111);
      loop_count += 1;
    }
    const delta_data_offset = offset;
    const id_index = this.pack_obj_id_to_index(id);
    const base_offset = this.pack_obj_offset_list[id_index] - negative_offset;

    // find the base_id based on base_offset using binary search
    const base_offset_index = this.pack_obj_offset_to_index(base_offset);
    const base_id = this.pack_obj_id_list[base_offset_index];

    // 2. parse delta data for COPY/INSERT instructions
    // should be COPY, INSERT
    // see https://github.com/git/git/blob/011b648646fcf1f467336ac6bbf46145501c0f12/Documentation/technical/pack-format.txt#L39
    this.load_object(base_id).then(function(base_data_arr_buf) {
      const base_data_uint8 = new Uint8Array(base_data_arr_buf);

      const decoder = new TextDecoder();
      const id_index = this.pack_obj_id_to_index(id);
      const id_offset = this.pack_obj_offset_list[id_index];
      const sorted_offset_index = this.pack_obj_offset_to_sorted_index(id_offset);
      const next_sorted_offset_index = sorted_offset_index + 1;
      var next_offset;
      if(next_sorted_offset_index === this.pack_obj_offset_sorted_list.length) {
        next_offset = this.pack_obj_array_buffer.byteLength - this.HASH_SIZE; // the pack file ends with SHA-1 checksum of file contents
      } else {
        next_offset = this.pack_obj_offset_sorted_list[next_sorted_offset_index][1];
      }
      var delta_zlib_data_size = next_offset - delta_data_offset;
      this.inflate_pack_obj_data(delta_data_offset, delta_zlib_data_size, delta_data_size).then(function(delta_data_arr_buf) {
        const delta_data_uint8 = new Uint8Array(delta_data_arr_buf);
        //                      +------------+------------+----------------------------+
        // delta_data_arr_buf = | source-len | target-len | {COPY,INSERT} instructions |
        //                      +------------+------------+----------------------------+
        var i = 0;
        // source length
        var byte_k = delta_data_uint8[i];
        i += 1;
        var source_size = byte_k & 0b01111111; // extract lower 7 bits
        var shift = 7;
        while (byte_k & 0b10000000) { // MSB = 1 indicates info overflow to next byte
          byte_k = delta_data_uint8[i];
          i += 1;
          source_size |= (( byte_k & 0b01111111 ) << shift);
          shift += 7;
        }
        // target length
        byte_k = delta_data_uint8[i];
        i += 1;
        var target_size = byte_k & 0b01111111; // extract lower 7 bits
        shift = 7;
        while (byte_k & 0b10000000) { // MSB = 1 indicates info overflow to next byte
          byte_k = delta_data_uint8[i];
          i += 1;
          target_size |= (( byte_k & 0b01111111 ) << shift);
          shift += 7;
        }

        var target_arr_buf = new ArrayBuffer(target_size);
        var target_uint8 = new Uint8Array(target_arr_buf);
        var target_offset = 0;

        while( i < delta_data_uint8.length ) {
          var cmd = delta_data_uint8[i];
          if(cmd & 0b10000000) {
            // COPY instruction, see
            // https://github.com/git/git/blob/011b648646fcf1f467336ac6bbf46145501c0f12/Documentation/technical/pack-format.txt#L82
            // https://github.com/git/git/blob/a9ecda2788e229afc9b611acaa26d0d9d4da53ed/patch-delta.c
            var cp_offset = 0;
            var cp_size = 0;
            if(cmd & 0b00000001) {
              // offset1 present
              i = i + 1;
              cp_offset = delta_data_uint8[i];
            }
            if(cmd & 0b00000010) {
              // offset2 present
              i = i + 1;
              cp_offset |= delta_data_uint8[i] << 8;
            }
            if(cmd & 0b00000100) {
              // offset3 present
              i = i + 1;
              cp_offset |= delta_data_uint8[i] << 16;
            }
            if(cmd & 0b00001000) {
              // offset4 present
              i = i + 1;
              cp_offset |= delta_data_uint8[i] << 24;
            }
            if(cmd & 0b00010000) {
              // size1 present
              i = i + 1;
              cp_size |= delta_data_uint8[i];
            }
            if(cmd & 0b00100000) {
              // size2 present
              i = i + 1;
              cp_size |= delta_data_uint8[i] << 8;
            }
            if(cmd & 0b01000000) {
              // size3 present
              i = i + 1;
              cp_size |= delta_data_uint8[i] << 16;
            }
            if (cp_size == 0) {
              cp_size = 0x10000;
            }
            for(var base_index=0; base_index < cp_size; ++base_index) {
              target_uint8[target_offset] = base_data_uint8[cp_offset + base_index];
              target_offset += 1;
            }
            i = i + 1; // move to next command
          } else {
            // INSERT instruction
            var insert_size = cmd;
            if(insert_size === 0) {
              err_callback('Malformed delta object: INSERT size cannot be 0');
            }
            i = i + 1; // move to the start of next delta data
            for(var insert_index=0; insert_index < insert_size; insert_index++) {
              target_uint8[target_offset] = delta_data_uint8[i + insert_index];
              target_offset += 1;
            }
            i += insert_size;
          }
        }
        ok_callback(target_arr_buf);
      }.bind(this), function(err_delta) {
        err_callback(err_delta);
      });
    }.bind(this), function(err_base) {
      err_callback(err_base);
    });
  }.bind(this));
}

_git.prototype.obj_type_id_to_name = function(object_type_id) {
  for(object_type_str in this.PACK_OBJECT_TYPE) {
    if(this.PACK_OBJECT_TYPE[object_type_str] === object_type_id) {
      return object_type_str;
    }
  }
  return 'UNKNOWN-ID (' + object_type_id + ')';
}

_git.prototype.parse_commit_obj = function(commit_obj) {
  const decoder = new TextDecoder('utf-8');
  const commit_obj_text = decoder.decode(commit_obj);
  var commit_obj = {};
  const empty_line_idx0 = commit_obj_text.indexOf('\n\n', 0);
  const empty_line_idx1 = commit_obj_text.indexOf('\n', empty_line_idx0 + 2);
  const commit_metadata = commit_obj_text.substring(0, empty_line_idx0);
  const commit_log = commit_obj_text.substring(empty_line_idx0 + 2, empty_line_idx1);
  const commit_extra = commit_obj_text.substring(empty_line_idx1 + 1);

  commit_obj['log'] = commit_log;
  commit_obj['extra'] = commit_extra;
  const commit_metadata_tok = commit_metadata.split('\n');
  for(var i=0; i<commit_metadata_tok.length; ++i) {
    const line = commit_metadata_tok[i];
    const line_tok = line.split(' ');
    const key = line_tok[0];
    const value = line_tok[1];
    switch(key) {
    case 'tagger':
    case 'author':
    case 'committer':
      const space1_idx = line.indexOf(' ', 0);
      const email_idx0 = line.indexOf('<', space1_idx);
      const email_idx1 = line.indexOf('>', email_idx0);
      const timestamp_idx = line.indexOf(' ', email_idx1);
      const timezone_idx = line.indexOf(' ', timestamp_idx + 1);
      const name = line.substring(space1_idx + 1, email_idx0 - 1);
      const email = line.substring(email_idx0 + 1, email_idx1);
      const git_timestamp = line.substring(timestamp_idx + 1, timezone_idx);
      const git_timezone = line.substring(timezone_idx + 1, line.length);
      var timezone_iso = git_timezone.substring(0, 3) + ':' + git_timezone.substring(3);
      // convert the git timestamp and timezone into Javascript Date() object
      const git_date = new Date(parseInt(git_timestamp) * 1000);
      var git_date_iso_str = git_date.toISOString();
      var date_iso_str = git_date_iso_str.replace('Z', timezone_iso);
      var date = new Date(Date.parse(date_iso_str))
      commit_obj[key] = {
        'name': name,
        'email': email,
        'date': date,
        'git_timestamp': git_timestamp,
        'git_timezone': git_timezone,
      }
      break;
    default:
      commit_obj[key] = value;
    }
  }

  return commit_obj;
}

// https://github.com/isomorphic-git/isomorphic-git/blob/90ea0e34f6bb0956858213281fafff0fd8e94309/src/models/GitTree.js#L27
_git.prototype.mode_to_type = function(mode) {
  switch (mode) {
  case '040000':
  case '40000':
    return this.PACK_OBJECT_TYPE.OBJ_TREE;
  case '100644':
    return this.PACK_OBJECT_TYPE.OBJ_BLOB;
  case '100755':
    return this.PACK_OBJECT_TYPE.OBJ_BLOB;
  case '120000':
    return this.PACK_OBJECT_TYPE.OBJ_BLOB;
  case '160000':
    return this.PACK_OBJECT_TYPE.OBJ_COMMIT;
  }
}

_git.prototype.mode_to_type_name = function(mode) {
  switch (mode) {
  case '040000':
  case '40000':
    return 'tree';
  case '100644':
  case '100755':
  case '120000':
    return 'blob';
  case '160000':
    return 'commit';
  }
}

// https://github.com/git/git/blob/2e8e77cbac8ac17f94eee2087187fa1718e38b14/builtin/ls-tree.c#L342
// https://github.com/isomorphic-git/isomorphic-git/blob/90ea0e34f6bb0956858213281fafff0fd8e94309/src/models/GitTree.js#L27
// [mode] [file/folder name]\0[SHA-1 of referencing blob or tree]
//
// Note: This took me nearly two weekends to understand;
// finally, the code isomorphic-git code helped me understand it.
// requested_return_type = { 'array-of-dict', 'plain-text' }
_git.prototype.parse_tree_obj = function(buf, requested_return_type) {
  var result = [];
  var buf_uint8 = new Uint8Array(buf);
  var offset = 0;
  const decoder = new TextDecoder('utf-8');

  while(offset < buf_uint8.length) {
    const space_idx = buf_uint8.indexOf(32, offset);
    if(space_idx === -1) {
      console.error('failed to find space character after offset ' + offset);
      return;
    }
    const null_idx = buf_uint8.indexOf(0, offset);
    if(null_idx === -1) {
      console.error('failed to find null character after offset ' + offset);
      return;
    }

    var mode = decoder.decode(buf.slice(offset, space_idx));
    if(mode === '40000') {
      mode = '040000';
    }
    const type = this.mode_to_type_name(mode);
    const filename = decoder.decode(buf_uint8.slice(space_idx + 1, null_idx));
    const oid = this.to_hex(buf_uint8.slice(null_idx + 1, null_idx + 21));
    offset = null_idx + 21;
    if(requested_return_type === 'array-of-dict') {
      result.push( { 'filename':filename, 'mode':mode, 'type':type, 'id':oid } );
    } else {
      result.push(mode + ' ' + type + ' ' + oid + '\t' + filename);
    }
  }
  if(requested_return_type === 'plain-text') {
    return result.join('\n');
  } else {
    return result;
  }
}

// utils
_git.prototype.to_hex = function(uint8_array) {
  const hex = new Array(uint8_array.length);
  for(var i=0; i<uint8_array.length; ++i) {
    hex[i] = this.byte_to_hex[ uint8_array[i] ];
  }
  return hex.join('');
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
    if(pack_offset < this.pack_obj_offset_sorted_list[mid][1]) {
      high = mid;
    } else if (pack_offset > this.pack_obj_offset_sorted_list[mid][1]) {
      low = mid + 1;
    } else {
      return this.pack_obj_offset_sorted_list[mid][0];
    }
  }
}

_git.prototype.pack_obj_offset_to_sorted_index = function(pack_offset) {
  var low = 0;
  var high = this.pack_obj_id_list.length;
  while(low < high) {
    const mid = low + parseInt((high - low) / 2.0);
    if(pack_offset < this.pack_obj_offset_sorted_list[mid][1]) {
      high = mid;
    } else if (pack_offset > this.pack_obj_offset_sorted_list[mid][1]) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
}

_git.prototype.load_object_metadata = function(id, pack_offset) {
  // The first byte is structured as follows:
  // MSB : is set to indicate that object size value overflows into the next byte
  // 3 bits  : object type
  // 4 bites : size (partial size if MSB is set to 1)
  var offset = pack_offset;
  const byte1 = this.pack_obj_uint8_arr[offset];
  offset += 1;

  var type = (byte1 >> 4) & 0b00000111; // extract the 3 bits holding type information
  var object_size = (byte1 & 0b00001111);
  var shift = 4;
  var byte_k = byte1;
  while (byte_k & 0b10000000) {
    byte_k = this.pack_obj_uint8_arr[offset];
    offset += 1;
    object_size += ( (byte_k & 0b01111111) << shift );
    shift += 7;
  }

  return [type, object_size, offset];
}

// Load all commit and their corresponding tree in cache
_git.prototype.load_all_commit = function() {
  return new Promise(function(ok_callback, err_callback) {
    const OBJ_COMMIT = this.PACK_OBJECT_TYPE.OBJ_COMMIT;
    const COMMIT_COUNT = this.pack_obj_grouped_by_type[OBJ_COMMIT].length;
    console.log('Loading ' + COMMIT_COUNT + ' commits ...');
    var commit_load_promise_list = new Array(COMMIT_COUNT);
    const start_time = performance.now();

    for(var commit_index=0; commit_index<COMMIT_COUNT; ++commit_index) {
      const commit_id = this.pack_obj_grouped_by_type[OBJ_COMMIT][commit_index];
      const index = this.pack_obj_id_to_index(commit_id);
      const commit_offset = this.pack_obj_offset_list[index];
      const commit_size = this.pack_obj_size_list[index];
      const data_offset = this.pack_obj_data_offset_list[index];
      const type = this.pack_obj_type_list[index];

      // The pack files only contains the size of uncompressed data and
      // does not contain the size of compressed zlib data. So, we do
      // not know how many bytes to provide to the DecompressionStream().
      // If any extra bytes are supplied to the browser's zlib decompression
      // algorithm, the following error gets raised
      //     "Unexpected input after the end of stream"
      // To solve this, we create a sorted list of all offset values obtained
      // from the pack index file and compute the size of zlib data based on
      // the difference between consecutive offset values.
      const sorted_offset_index = this.pack_obj_offset_to_sorted_index(commit_offset);
      const next_sorted_offset_index = sorted_offset_index + 1;
      const next_offset = this.pack_obj_offset_sorted_list[next_sorted_offset_index][1];

      const data_byte1 = this.pack_obj_uint8_arr[data_offset];
      if(data_byte1 & 0b01111000) { // 0x78 is marker for zlib compressed stream
        const zlib_data_size = (next_offset - data_offset);
        const zlib_data_blob = new Blob([ this.pack_obj_array_buffer.slice(data_offset, data_offset + zlib_data_size) ])

        // TODO: add all zlib data into a single blob and try to decompress eveything in one go
        const ds = new DecompressionStream("deflate");
        const decompressedStream = zlib_data_blob.stream().pipeThrough(ds);
        commit_load_promise_list[commit_index] = new Response(decompressedStream).arrayBuffer();
      } else {
        console.log('WARNING: id=' + commit_id + ', type=' + type + ' : expected first byte 0x78, got ' + data_byte1.toString(16));
      }
    }

    // wait until all zlib compressed commit objects get decompressed
    // TODO: This currently takes a long time (e.g. 18 sec.), optimize it
    // for example by using the Streams API to inflate all objects in one go
    Promise.all(commit_load_promise_list).then( function(commit_data_list) {
      const end_time = performance.now();
      const elapsed = end_time - start_time;
      const COMMIT_DATA_COUNT = commit_data_list.length;
      if(COMMIT_DATA_COUNT !== COMMIT_COUNT) {
        console.log('WARNING: Only ' + COMMIT_DATA_COUNT + ' out of ' + COMMIT_COUNT + ' commits were loaded');
        err_callback(COMMIT_DATA_COUNT);
        return;
      } else {
        console.log('loaded ' + commit_data_list.length + ' commits in ' + elapsed + ' ms');
      }
      this.commit_id_sorted_list = new Array(COMMIT_COUNT);
      for(var commit_index=0; commit_index<COMMIT_COUNT; ++commit_index) {
        const id = this.pack_obj_grouped_by_type[OBJ_COMMIT][commit_index];
        this.commit[id] = this.parse_commit_obj(commit_data_list[commit_index]);
        this.commit_id_sorted_list[commit_index] = [ id, parseInt(this.commit[id]['author']['git_timestamp']) ];
      }
      this.commit_id_sorted_list.sort( function(a, b) {
        if(a[1] < b[1]) {
          return -1;
        } else if(a[1] > b[1]) {
          return 1;
        }
        return 0;
      });
      ok_callback(COMMIT_COUNT);
    }.bind(this), function(err) {
      err_callback(err);
    });
  }.bind(this));
}

// Load all commit and their corresponding tree in cache
_git.prototype.load_tree = function(id, path) {
  return new Promise(function(ok_callback, err_callback) {
    var tree_node = this.tree;
    for(var i=0; i<path.length; ++i) {
      if( !tree_node.hasOwnProperty(path[i]) ) {
        tree_node[ path[i] ] = {};
      }
      tree_node = tree_node[ path[i] ]
    }
    this.load_object(id).then(function(tree_obj) {
      const tree_entries = this.parse_tree_obj(tree_obj, 'array-of-dict');
      for(var i=0; i<tree_entries.length; ++i) {
        const filename = tree_entries[i]['filename'];
        tree_node[filename] = tree_entries[i];
      }

      // find a tree node and resolve it
      var tree_subnode_promises = [];
      for(var i=0; i<tree_entries.length; ++i) {
        const filename = tree_entries[i]['filename'];
        if(tree_entries[i]['type'] === 'tree') {
          var new_path = path.slice(0, path.length);
          new_path.push(filename);
          const subtree_id = tree_entries[i]['id'];
          tree_node[filename] = {};
          tree_subnode_promises.push( this.load_tree(subtree_id, new_path) );
        } else {
          tree_node[filename] = tree_entries[i]['id'];
        }
      }
      if(tree_subnode_promises.length) {
        Promise.all(tree_subnode_promises).then(function(path_list) {
          ok_callback(path);
        }.bind(this), function(err_node) {
          err_callback(err_node);
        });
      } else {
        ok_callback(path);
      }
    }.bind(this), function(err_obj) {
      err_callback(err_obj);
    });
  }.bind(this));
}

//
// debug tools
//
_git.prototype.print_tree_obj = function(tree_contents) {
  for(var i=0; i<tree_contents.length; ++i) {
    console.log(tree_contents[i].mode + ' ' + tree_contents[i].type + ' ' + tree_contents[i].oid + '\t' + tree_contents[i].filename);
  }
}

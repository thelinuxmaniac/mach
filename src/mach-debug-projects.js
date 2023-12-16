const mach_debug_projects = []
mach_debug_projects.push({
  "mach": {
    "project": {
      "shared_fid": "__FILE_ID__",
      "shared_rev": "__FILE_REV_ID__",
      "shared_rev_timestamp": "__FILE_REV_TIMESTAMP__",
      "name": "coreutils-src-wc",
      "id": "36a6c8376e014805ab8c7b4f315ce343",
      "description": "Analysis of code history for wc tool in GNU Coreutils",
      "creator": "Manual Annotation of Code History (MACH)",
      "created": 1702191192852,
      "updated": ""
    },
    "conf": {
      "repo": {
        "url": "../repo/coreutils.git",
        "name": "coreutils.git",
        "head": "e0326b0473837aae21fbf4c60674a5fcf85d9bf1",
        "filepath": "src/wc.c",
        "external_url_prefix": "http://git.savannah.gnu.org/gitweb/?p=coreutils.git;a=$OBJECT_TYPE;h=$OBJECT_ID"
      },
      "show_attributes": ["revision_type"],
      "attributes": {
        "revision_type": {
          "name": "Code Revision Type",
          "keyboard_shortcut_prefix": "d",
          "input_type": "checkbox",
          "options": {
            "1": {
              "name": "Feature",
              "options": {
                "1": "Add New Feature",
                "2": "Extend Existing Feature",
                "3": "Remove Existing Feature",
                "4": "Fix an Issue with Existing Feature",
                }
            },
            "2": {
              "name": "Code Improvement",
              "options": {
                "1": {
                  "name": "For Users",
                  "options": {
                    "1": "Improve user guide",
                    "2": "Code Readability and Intelligibility",
                    "3": "Code Maintainability"
                  }
                },
                "2": {
                  "name": "For Maintainers",
                  "options": {
                    "1": "Fix Typo in Code Comment" ,
                    "2": "Improve user visible",
                    "2": "Code Readability and Intelligibility",
                    "3": "Code Maintainability"
                  }
                },
                "3": {
                  "name": "For Machines",
                  "options": {
                    "1": "Improve Speed Using Machine Specific Instructions",
                    "2": "Handle special case separately",
                    "3": "Algorithmic improvement"
                  }
                }
              }
            },
            "3": "Code Issue"
          }
        }
      }
    },
    "mach_project_file_format_version": 1
  },
  "object": {
    "src": {
      "wc.c": [
        {
          "blob_id": "41779f55dbaa109462267c0d7293237d555047f7",
          "commit": {
            "id": "e0326b0473837aae21fbf4c60674a5fcf85d9bf1",
            "parent": "2c902cc2887340adb6ca7ac6b4b922b52438920f",
            "tree": "ff8e86bfa96049f3c7d488ddceb896e189fb6dff",
            "log": "maint: regularize struct initializers",
            "date": "2023-08-30T14:39:34.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "29114c874fa06a08765f77f813a195127eb6512c",
          "commit": {
            "id": "2c902cc2887340adb6ca7ac6b4b922b52438920f",
            "parent": "50e99b59bf58187ffd433f9267af7d6f6e9a0912",
            "tree": "02e678ee77f190b231cfa9be69ebbb3fdfc632de",
            "log": "maint: rely on Gnulib fdatasync",
            "date": "2023-08-30T14:16:49.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "b1d82074d36fc2037e4390a6f81cf9fd0a420e59",
          "commit": {
            "id": "e3f15c9c4a0ca69bfdf7fada8b8697f627a7c84d",
            "parent": "c8340962dd098eb092bb9ebaad3d239c613e28f1",
            "tree": "db5faa2ad2707efb7e83c88f9d2cf205143033b1",
            "log": "test: omit unreachable code",
            "date": "2023-08-28T19:40:57.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "1330734d51c7ccf00d584d43200671bab3867acd",
          "commit": {
            "id": "123d03dca47c4d8e0dc896dd8c5732329e6acffe",
            "parent": "c0285a713671df2347051f27a2f5f0375a2acf04",
            "tree": "b086a9c9c645974c27811a69c2b31f8ce86b34ae",
            "log": "who: don’t crash if clock gyrates",
            "date": "2023-07-01T18:31:41.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "318fcaa3d13f0bb7615d342e50e0d93988302065",
          "commit": {
            "id": "478055dc30b9d1565e6b577485aea824ef22b038",
            "parent": "2522c1db68a3cd627432d77220f53de56e875648",
            "tree": "7695dafd6fbc614df86ab6737eddb07506ef0b81",
            "log": "maint: improve static and dynamic checking",
            "date": "2023-07-01T18:31:40.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "9f345aa7275a2f3980414b3c2e829235f26b315f",
          "commit": {
            "id": "2522c1db68a3cd627432d77220f53de56e875648",
            "parent": "16b5ca6e0df165bd8b9c2d8c7e4bc7d1b7efa25d",
            "tree": "1df01b3e003cf4a943538235480d563888125d24",
            "log": "maint: fix indenting in previous change",
            "date": "2023-07-01T18:31:40.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "30214655c74f8d337030857e10570398a408da75",
          "commit": {
            "id": "e600fbb7648c206099177bb7a1d253f1dccd7409",
            "parent": "e8858f15150e9132355437d3e6aba86fbedeb40a",
            "tree": "752541c8dee1718c09b53ffcf0f7b42764761ca5",
            "log": "build: ensure that makeinfo ≥ 6.8 checks the @menu structure",
            "date": "2023-06-22T21:59:11.000Z",
            "author": "Bruno Haible"
          }
        },
        {
          "blob_id": "ebe83af4dfe587e84e263e667ba6a3dac4f2576b",
          "commit": {
            "id": "4ac941565fc1f7c1eb7954302f2ec20435fdf34c",
            "parent": "7814596fa91a07fb2f1d0972f93f26de8a4ad547",
            "tree": "aa1000562eb96d621708c78c6c87845f323b9a5d",
            "log": "cksum,wc: don’t include <cpuid.h>",
            "date": "2023-06-14T21:18:42.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "3708d0b8fb58ac3cb4562ad6047df01764fb5e5d",
          "commit": {
            "id": "7814596fa91a07fb2f1d0972f93f26de8a4ad547",
            "parent": "91a74d361461494dd546467e83bc36c24185d6e7",
            "tree": "a36974e866e9ff12b88c8e7053630e0bbd37cf5c",
            "log": "cksum: fix bug in check for cksum_pclmul",
            "date": "2023-06-14T21:13:35.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "becceda987692fd8319ade1e6432ee9d1bcaa0e7",
          "commit": {
            "id": "37890240730f0d0a24d3fd01357fb96955b29b52",
            "parent": "e8e81fc44b9cf5fa4c13fa8b2824278b75566398",
            "tree": "1bc263d510f3d93f9817716228c3ceca0a3274b5",
            "log": "dircolors: update list of backup file extensions",
            "date": "2023-06-12T20:27:37.000Z",
            "author": "Ville Skyttä"
          }
        },
        {
          "blob_id": "801396a15087e2535309688e1e155f9381d597c8",
          "commit": {
            "id": "f6c21f6d3addb6461c41af612e73fbb15d21545f",
            "parent": "db28af406f311ac8f78604cc5906613866aecef5",
            "tree": "d5079976206a43071ddd160672f95a200513adf1",
            "log": "cp,mv: issue \"skipped\" messages when skipping files",
            "date": "2023-04-07T09:25:41.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "5f3ef6eee55c53e780cb4f84d400faf1a4483c07",
          "commit": {
            "id": "a9bd274616a8d2e99736b498e657cda4e6954f3f",
            "parent": "a4525de1ef593cb3873eb88caa7279eb32669bda",
            "tree": "490b4fbe787b29ce2fa18f0c4824b2d976f30580",
            "log": "dircolors: diagnose read errors",
            "date": "2023-03-28T13:24:29.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "df9770396a07d1a206d78d30355d20ccc5be68a0",
          "commit": {
            "id": "0239f2a782cb6b2181f29b34cd80c06bb704a2ef",
            "parent": "c9a21ec3173b93de4839e5ff9eddadb020431656",
            "tree": "ff27487cc8cb2b058b70df3fd88764b88ec7c8dc",
            "log": "build: update gnulib submodule to latest",
            "date": "2023-01-01T13:39:25.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "bc52a8c0ea59c3708d5d06193a03404df33738a7",
          "commit": {
            "id": "4bf990bf658d4070e74fc64b0fafef4d305af8f4",
            "parent": "cfe4af661f9572ad4dbe5b3e01a178e04ff343ae",
            "tree": "dd32469b266410bfa4c7f2a17773b48637866238",
            "log": "maint: avoid recent syntax check failure",
            "date": "2022-12-29T14:14:11.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "dee8233a606408ac46ad2bf785fa7572d7d7ad41",
          "commit": {
            "id": "627c9a97c1054afdbe6870f3b64d42e7fccaf9eb",
            "parent": "800ff60f6f68223e30e8dd347381a2934cdb4f1c",
            "tree": "8056c75775b11a7fb9f8068b478e633d8a014819",
            "log": "maint: use enums to make dir_status code easier to read",
            "date": "2022-09-25T14:26:20.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "cea6f294e4e5d54560c1b4a1c3504a8329cc90d2",
          "commit": {
            "id": "76700e775e2643fdabe51f9c88e1718424f5b30a",
            "parent": "840ae54cf5e7b1bfa5755f7bb70c1b671ec36190",
            "tree": "66e8dd6d33c2945b244402df66c8634377b09e58",
            "log": "build: update gnulib submodule to latest",
            "date": "2022-01-02T15:28:34.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ec2a4e18416ad92c1d116caa254c6664c6a34957",
          "commit": {
            "id": "bafff0019cad471b69036ab0d6d1a80c9285583d",
            "parent": "aa31b919ca7a7ed1bde7852549c9fd5dacf3925e",
            "tree": "c24e5796181c9e431def7989696708c3ccb8872f",
            "log": "sort: --debug: add warnings about sign, radix, and grouping chars",
            "date": "2021-10-10T17:35:59.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "bdb51928d846aad92364b05e4facf7575d3e4464",
          "commit": {
            "id": "f8dc5a6215846f289d9e9c4c18a7c51f008f76d3",
            "parent": "ed1c58427d574fb4ff0cb8f915eb0d554000ceeb",
            "tree": "ab3ed3408e12484104f7ef93eb9d524fa9c1e0c5",
            "log": "split: avoid NULL + 1",
            "date": "2021-09-15T20:44:46.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "35a865719e7855009b7feac26e94163b3f9f8069",
          "commit": {
            "id": "4064c57380621399b54217a64c2c2bed1d0dccd1",
            "parent": "d435cfc0bc554b8baef2e690e138e27ac1b4d5b1",
            "tree": "fd79abf11f263fdde4bf53eb4fc8a0f3cb4f241e",
            "log": "wc: use avx2 optimization when counting only lines",
            "date": "2021-02-20T11:27:17.000Z",
            "author": "Kristoffer Brånemyr"
          }
        },
        {
          "blob_id": "d635e5214affde3f76b6a8cefec30fe43b3c49d0",
          "commit": {
            "id": "d435cfc0bc554b8baef2e690e138e27ac1b4d5b1",
            "parent": "62a7ce5f503c4a7f8bb410f0cc10fefab106a4d2",
            "tree": "8716fceec4c63bc17831479f945d7e058986307d",
            "log": "touch: fix wrong diagnostic (Bug#48106)",
            "date": "2021-05-01T22:19:16.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "a122bde8073edf68a9f8970e0966d31c9b5f657d",
          "commit": {
            "id": "ef772bf97f7ec577754cbb5b278504d83cf41a43",
            "parent": "34ed19eed8fe1e29372f19883c846f888fd79f0e",
            "tree": "b6553bdc35b4d08368d427dbb3bb790acf43129c",
            "log": "maint: use \"char const *\" rather than \"const char *\"",
            "date": "2021-04-11T17:23:21.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "5216db189920fc9ef36dc2c821a55db100234a95",
          "commit": {
            "id": "34ed19eed8fe1e29372f19883c846f888fd79f0e",
            "parent": "751ad58e00a7cacfb511f651837d336253eb672c",
            "tree": "98869d14b64851abb4d87c64604140c98b880ea5",
            "log": "ls: cache name width determination",
            "date": "2021-04-10T15:54:03.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "d18eaee6c33e1a67b65f1e62bb427e8777bc0aed",
          "commit": {
            "id": "ffb7ebfa253a44f52808cade5657d7541eaccfa5",
            "parent": "a7533917e031125cfcb3076a0dc6b9ad7275f9d2",
            "tree": "ff9f3cc1c129ec0e0663a92542c94a047916274b",
            "log": "tests: add a test for cksum",
            "date": "2020-12-28T15:04:54.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "23818042fbab1f6ff81773f3c194b27971de4607",
          "commit": {
            "id": "7490e94aa7ea1ba50492e211fc415a6bda9de9ee",
            "parent": "ec5ab426042d4c2d6add3f9a38c0847cc835a4d6",
            "tree": "54b99fda2433cfe01f53cfa1f245acfa1acd3f17",
            "log": "doc: add example to demonstrate sub-second sleep times",
            "date": "2019-12-08T16:29:57.000Z",
            "author": "Bernhard Voelker"
          }
        },
        {
          "blob_id": "179abbe2c3919e4bc17ffc292ac302cf5dc47a70",
          "commit": {
            "id": "2ab2f7a422652a9ec887e08ca8935b44e9629505",
            "parent": "d5c820109ea7e732e6b573a325971e0da4968e70",
            "tree": "90d4f5188680f70c76a305852d1d7e94fb57fb24",
            "log": "doc: more date +%F clarifications",
            "date": "2019-02-25T18:20:23.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "2034c42beebf58c7b6e593316014c7594235dc47",
          "commit": {
            "id": "1f9152a50f16fb5979871e3c9f2db9f91dbc4dbc",
            "parent": "67c537b91cc80397401fcb02718f81c85ab6638b",
            "tree": "43dec441ee1aebe6b0c53b09cedd6c90dc64e1e1",
            "log": "maint: mention base32 in the title line of common basenc.c",
            "date": "2018-12-21T07:31:00.000Z",
            "author": "Bernhard Voelker"
          }
        },
        {
          "blob_id": "0c72042a0b28092ad4660671a7075ba299996dc5",
          "commit": {
            "id": "21682faa5e9c2f7e1eaa39a938105551b0f000ad",
            "parent": "de73c801f34438c1457118f33e26e688554019d3",
            "tree": "d2a9801748197666544d398ecaae4383d1c420d8",
            "log": "doc: port test.1 to doclifter",
            "date": "2018-06-14T19:04:57.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "bd742f87d3209406f59ad1f6d99ea3c8fddf2bf1",
          "commit": {
            "id": "1d7db19cbad9a7b42ba84515b78b7898829b8e89",
            "parent": "27b2b19aa8d8b30b8cb4198b2f4b54568e10a35e",
            "tree": "0a010a84c58e64b5979abcbaca5c1b8a9ba35aa3",
            "log": "maint: post-release administrivia",
            "date": "2017-12-27T18:26:39.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "299a9665f68f49995f9abd69c7f6eb6abe9a3637",
          "commit": {
            "id": "44ccd1c4657703b15971b0670b9716a25244a358",
            "parent": "97c5045435f15c2bc984cc05bbfdca897bbdd284",
            "tree": "23c4c4b5a730d00305672234a3e9e999a48f1c13",
            "log": "copy: check for vulnerable target dirs",
            "date": "2017-09-19T01:54:52.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "8a656c3d0bc201081367734d1a88ff160d0704b0",
          "commit": {
            "id": "18f6b22fe1eb4447b26fafd3bed1e6bb23c9adc2",
            "parent": "aab875a40b61711077e90be904c9977b47931ec3",
            "tree": "89c6c5dbadd963628dd133be46879d5516bda2a4",
            "log": "tail: only use inotify with regular files",
            "date": "2017-06-17T06:50:47.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "be4f3062dfd996703192dd35330989a446f55afb",
          "commit": {
            "id": "ba16bdd89064a58d828d557827a473fc02b0d5ad",
            "parent": "fd41e49973f3d5d112ebacdeb4b7fec90753ae0d",
            "tree": "ea4855e7359ae69ce120d768cf37f5301df90fa2",
            "log": "tail: with --pid, ensure all inotify events are processed",
            "date": "2017-06-07T07:17:57.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "a587b2ca4eae6ec05b125abb61c47646bd8a27cb",
          "commit": {
            "id": "a24e9cc55c36f148639557767a39958683577b72",
            "parent": "75aababed45d0120d44baa76c5107d0ceb71fc59",
            "tree": "1123b02798e09f8c86bfc25e7cb88cb060fac3ff",
            "log": "build: update gnulib submodule to latest",
            "date": "2017-02-16T08:20:30.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "40fce685dc422dc7718d39de99c152beeb103bf4",
          "commit": {
            "id": "e5cfadd6c7fa08153e56b950e72801677f7d1fe8",
            "parent": "bd4bb42d65aac6591277066739ca42d1ddcc2d0e",
            "tree": "9bcbf5bcb4357dfda05914f4c80129cc7c01fc8f",
            "log": "build: update gnulib submodule to latest",
            "date": "2017-02-15T23:35:25.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "a02379bf85cbb2391dfc5e8ae163682b20b14daf",
          "commit": {
            "id": "b02631b14b2a155c4a233c8e8dad2569c159e85d",
            "parent": "d1a1276979c4744587c8a81e2b212c244512e83b",
            "tree": "2d72a06b1bfa94f49fdc73b159398b0f548dcc34",
            "log": "doc: recommend b2sum as well as SHA2",
            "date": "2016-12-26T20:06:36.000Z",
            "author": "Zooko"
          }
        },
        {
          "blob_id": "64df50cd9fc91cbcb6d8dae9e2d7d549162760e7",
          "commit": {
            "id": "94d2c6848b17b4e14235e80e6fa6af37aa76217b",
            "parent": "9944e4763bb178852727812e8b188540772384e2",
            "tree": "edf0e634e9ae85497d867dff0a97daa597c99f0e",
            "log": "maint: correct the version for the previous bug fix",
            "date": "2016-12-20T13:07:07.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "412bda0db540ffc7d0387c7414f30a23f7b9b9b0",
          "commit": {
            "id": "f071b04afaeefbf6c37a00986fec02b8df5e9560",
            "parent": "be2f82f670b914e26ffcbbff0378a0452d432d1c",
            "tree": "29eea2de7ad395725f42129e10a551de191e3dc1",
            "log": "tests: fix typos in previous commit",
            "date": "2016-12-18T20:37:21.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "94cbaff9ad6d8fbadff74ebb1ad4a1101438e8bd",
          "commit": {
            "id": "d035eacfdeba2da0134e606c8a63b2f3c0bd05bb",
            "parent": "dad7ab0b7b322a800e6b1012b777169169068388",
            "tree": "f7eeddac51f1bcdfdba9d21b50a775ab0df1f36d",
            "log": "build: also distribute new file, src/die.h",
            "date": "2016-10-15T22:27:48.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "c2a9c3fbe99186af5bc588792ffe3b90e7e091e5",
          "commit": {
            "id": "672663e1b0afd68a10d991527fd5021c40c99acc",
            "parent": "8297568ec60103d95a56cf142d534f215086fe2b",
            "tree": "e5ca8c84fbb1b863ab1ae5f9692e7da63e6a0585",
            "log": "numfmt: add the -z,--zero-terminated option",
            "date": "2016-01-08T18:55:12.000Z",
            "author": "Assaf Gordon"
          }
        },
        {
          "blob_id": "17f7fd4defab0e283bb45a4200db29c1cebe7e94",
          "commit": {
            "id": "81dce30cba6fbfd2166a22c6f0e190309c58bbe9",
            "parent": "2dab6cd3c2e18eb574b24e54fba86a33c80b6a27",
            "tree": "2c13fe5568f60a2e92f3f1f74bf67844cb9de0e1",
            "log": "build: update gnulib submodule to latest",
            "date": "2015-12-31T22:13:23.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "33b5ba4dd5b8554ae203ec76d12603f4c43dd242",
          "commit": {
            "id": "2c5d86a8b8340b50ca1457923f9041143245bb35",
            "parent": "c840d3ad89a9016b4d2c22b77495f53b37625d5a",
            "tree": "a4e5448f9f668db436e3660358aaa91833624e60",
            "log": "sort: promote '--debug'",
            "date": "2015-12-07T21:12:07.000Z",
            "author": "Eric Blake"
          }
        },
        {
          "blob_id": "30a08926f5eee82aace08188af8a6278a6ba2b41",
          "commit": {
            "id": "1e8f9afac53a628dbc64e62bea53eb2da29c47fa",
            "parent": "646902b30dee04b9454fdcaa8a30fd89fc0514ca",
            "tree": "03189ca5188588a005b7e75dc1bba9a99adae82f",
            "log": "build: update gnulib submodule to latest",
            "date": "2015-11-02T12:43:33.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "fc66dfc73568a12c0ef442274f6854cc9a65eda1",
          "commit": {
            "id": "00eb7af8ea30ccbefeb17213cd644b8f0ade1ef8",
            "parent": "3f5e0453e17bd9db231d2fc7ba112821c428d0fc",
            "tree": "dc9119868b542c9a0d79df2fdc1440af6b88157b",
            "log": "doc: fix texinfo for short options taking a parameter",
            "date": "2015-11-01T20:37:00.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "9fbaee7bc1e1bb8eccabb832e01e3e381c3eb0ea",
          "commit": {
            "id": "106d4bf159a97b573d6479473fa38216fb8bfada",
            "parent": "e71be1292b92b244d065873fae5a17d5e1f0a16c",
            "tree": "df625291cacb7341dd291f3edc87907ba83e655c",
            "log": "md5sum: quote all printed file names",
            "date": "2015-10-26T01:26:04.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "eb7b5b69a0c4260661a8adadb34792fc79ec0dcf",
          "commit": {
            "id": "8bf2af685cf2cb1291fb03ec8a6942c26a7e0bd7",
            "parent": "81c7fc4081df7cb59b55c5fde486687afd0c87d7",
            "tree": "1e9b01206371377f15aac94c2a597fdd35f03f93",
            "log": "build: update gnulib submodule to latest",
            "date": "2015-07-01T15:09:12.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ae7ae952dc7348fccd551d87b7ab2db5779069ed",
          "commit": {
            "id": "b28ff6a3c6ad25d877b63013af245de5d6c70b10",
            "parent": "cf06a872e74b45588c2e64903f7fc99cf2aafe27",
            "tree": "e1e0d4e15c02f8041b930e5fb9902334c295a9b2",
            "log": "tail: consistently output all data for truncated files",
            "date": "2015-05-11T13:25:19.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "fe73d2ce162931cafacdec602b6fdb1582433f44",
          "commit": {
            "id": "88a03548248cac37662f5044df5c35152c5eb937",
            "parent": "c77a96ccba91ca687fe0c22e3b2bb1141fbab421",
            "tree": "81536b5549137289f28e98f9d5e7cb300430c643",
            "log": "tests: don't skip df tests with /proc/self/mountinfo",
            "date": "2015-04-30T10:33:38.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "91f4a3145525a132c0bec2ba76bad20ad9509890",
          "commit": {
            "id": "01f4065b129c6ad55eef765e701d0e20342867c7",
            "parent": "88e491044bf802e433a94a01401c342c287d9c24",
            "tree": "acdeaab3d5b9fb088cef42ad6f73e408133f8940",
            "log": "dircolors: add 'MISSING' to the default database",
            "date": "2015-04-17T22:47:58.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ceb48ed899c6c6e9661f1178b73f5f1dec0ac313",
          "commit": {
            "id": "01fb984887ce6fdd71d563e57c6b59155a1f4cb7",
            "parent": "9042ff441cd931eeb4196651170797a688f82522",
            "tree": "3155cb12e9a60840f6a14c4ce3d674a0fd366c9b",
            "log": "doc: clarify default order for ls --sort=size",
            "date": "2015-03-23T08:59:18.000Z",
            "author": "Dan Jacobson"
          }
        },
        {
          "blob_id": "8cb5163dcfa0a2436173917970d278fc660b4397",
          "commit": {
            "id": "e2e11119e0ac653bd0bdab91c189b7803f8df1f0",
            "parent": "35217221c211f3116f374f305654462195aa634a",
            "tree": "47b82ed120099802b15c5422849c35bcd13402ff",
            "log": "yes: improve efficiency when all args aren't buffered",
            "date": "2015-03-10T12:25:48.000Z",
            "author": "Giuseppe Scrivano"
          }
        },
        {
          "blob_id": "24069f7e956ea379bd3b18dc1092f06c7d1dc043",
          "commit": {
            "id": "1269bf58578615a8a5255d36582cb0736fd57227",
            "parent": "974c355c595598a219785b6661bb6b030aaef4df",
            "tree": "cf4f3d52681b8c4714074046efe0061b4aa711df",
            "log": "tests: fix possible 8 minute running time of inotify-rotate.sh",
            "date": "2014-12-30T01:25:17.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "1ff007dcffbe3b8fee262f7ca17d52b762731917",
          "commit": {
            "id": "b020002b4bfae55d5bbcf66bd7ce787a4e6da689",
            "parent": "2d3ba46e580cbc9e81edc4e8dd759f9fb0775161",
            "tree": "42f49f2a64b66da4eb876796183117de91ca03b8",
            "log": "doc: document stat's output with the --terse option",
            "date": "2014-10-04T15:09:59.000Z",
            "author": "Bernhard Voelker"
          }
        },
        {
          "blob_id": "204802543ddd2e054e17e65adea62ca5ccab35c6",
          "commit": {
            "id": "1f2647b8affae8bf6907f790a399041812ddf16e",
            "parent": "ed0c3c33c6f7c28e5f05e96e1891251bdd181651",
            "tree": "893b7372473ff6cd174662f2afcd8a809acb762c",
            "log": "doc: ensure the correct texinfo nodes are referenced in --help",
            "date": "2014-09-18T13:37:37.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "4909d9fe855e82ac5ea5c652dfe3dd03734fce78",
          "commit": {
            "id": "72e470b9b5af77bcfd90ac175ed285877837ba20",
            "parent": "943ca00bba40c50ce95a2ff224998175bcb18ed4",
            "tree": "90ab185d7b95b4dc3146e26b3adcfa11400cf3ea",
            "log": "doc: rename \"coreutils invocation\" to \"Multi-call invocation\"",
            "date": "2014-09-08T19:51:14.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "93decd7e9b37951cba3e2d0de9e4af76962be9ed",
          "commit": {
            "id": "68f96c0db1ee5a46e10b8b91c275ee4d8e335331",
            "parent": "fad018bac1349d92e06464440e2cb2032a0c67e7",
            "tree": "a26cf5ced8e6c62baa988224d5425e0a8d36f8fc",
            "log": "maint: prevent update-copyright from updating files from gnulib",
            "date": "2014-01-02T21:17:03.000Z",
            "author": "Bernhard Voelker"
          }
        },
        {
          "blob_id": "501737731d0eceb87ad815a24530c7ce08622a32",
          "commit": {
            "id": "a4838da139dde3739d9046153809939b8ccfe72d",
            "parent": "a4d3a44d2792cc0dc40a7ad1bafdf80fec677fea",
            "tree": "41b4c7801da7083622bf43589dc67eb823b9fe75",
            "log": "build: update gnulib submodule to latest",
            "date": "2013-01-01T02:54:41.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1b8a7a4f2cb5fd038bc77674c178c9eb0299310f",
          "commit": {
            "id": "a18ba2f10a739e1f0ef31cf0ebd60c8cf95d74f0",
            "parent": "c83f723267dff03e954ba77454d51a691dfba1c0",
            "tree": "fc8d2c573a111dde57169a49157e2b74c90442e8",
            "log": "cat,cp,mv,install,split: Set the minimum IO block size used to 64KiB",
            "date": "2011-07-21T07:25:49.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "8c45af333ca1244436d5d457344f69f189580b4b",
          "commit": {
            "id": "3068c84765ca8bb0a5ba425664fb2e7454a8bbc5",
            "parent": "2a90c5a125ac654def9c1f7d3c52fd1dd1bab6a8",
            "tree": "483c10b676221b9257820e601271ecb633ce043e",
            "log": "maint: make copyright statements more consistent; update gnulib",
            "date": "2012-01-27T10:33:11.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "893bd23063e8bfdc8c1d2f5134289c925c25d597",
          "commit": {
            "id": "a517386f1bf8c64ee7617cc2c9d0a16a1d85c8c4",
            "parent": "9af0dced5a2eb167ec7b9dfe3f358f214e45d41a",
            "tree": "20ad6e7d6aa0baed16f884fca2bccff4dda4983d",
            "log": "maint: src/*.c: change remaining quotes (without embedded spaces)",
            "date": "2012-01-08T14:08:30.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "924732d8e010777e18162931f4953dc89ad089c7",
          "commit": {
            "id": "9af0dced5a2eb167ec7b9dfe3f358f214e45d41a",
            "parent": "36b9a1b6ac2730e78c14552fd55795fe10862a3d",
            "tree": "b182495d17047e581cbee89db69d76d87173b0cc",
            "log": "maint: convert `...' to '...' in --help output",
            "date": "2012-01-08T13:08:03.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "bdd893aec8cc6a4e845f3c149f18a3a56084cf8b",
          "commit": {
            "id": "22af6d97526e52e1fc14a86d811c92e421a67577",
            "parent": "1df91bd6b97616fe29cf9c5f17907a9237a3d2e2",
            "tree": "a7b4bbde9a809ddf0f931aee11eecc310d262428",
            "log": "maint: factor out all `Try --help'-emitting statements",
            "date": "2012-01-07T15:42:41.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "43b46a3b9ca0bae721b8f8089ec1690e36ead92a",
          "commit": {
            "id": "75a21e62486521ba3d8ef518dc4740dc1adeb7f4",
            "parent": "76fd122a856fec75a9bc843610e3b035f23dabc8",
            "tree": "aca095fc0eea67816189a47e2755dd6bd6cfdec8",
            "log": "tests: change copyright year from 2011 to 2012 in sample-test",
            "date": "2012-01-01T08:52:49.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "c4b5a9138f43678d7aee59d1a3ce03700d03eb9b",
          "commit": {
            "id": "7700751c5feff007a1b5054769d0e8d90638a62f",
            "parent": "bf0771a1c5d6bf609956a7338c7415dc0c7b9a86",
            "tree": "2753bc18742bcb2537a111604070ce8d912c98fc",
            "log": "build: update gnulib submodule to latest",
            "date": "2011-07-12T13:40:53.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "d5a0afc23d6a84cfc31215898c43e482f8029eb7",
          "commit": {
            "id": "76d8e9abe18c3e3ed6dc37338b75140e06555cd5",
            "parent": "e7734b4a66f0d860698538cef13e6392ff8fdaf7",
            "tree": "26742497b309c90ad8a320f17cbc95606f781f18",
            "log": "buffer_lcm: declare with _GL_ATTRIBUTE_CONST",
            "date": "2011-06-04T08:41:08.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "702a7a779c7bc99579500447a7be537c044dd2c3",
          "commit": {
            "id": "963d809ae9d2ff4bc4844d2ebaf64a74deb1ae7e",
            "parent": "54a49f22ae158470142f92e00af69fbb3b774699",
            "tree": "cbbbe6a2de00a4ce0dcfcaa4609d99fb64f5103b",
            "log": "tests: move tests/misc/split-* into tests/split/...",
            "date": "2011-05-26T22:54:53.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "03992147055f1bf232adfb090a6071df087f27c5",
          "commit": {
            "id": "3c8ff029d4475eb79f69c98420f93e93a42a25dc",
            "parent": "09baf2287ee1b4e104f5cea1d1b3495ecd5c9d16",
            "tree": "713704f4622f257d6f0211c3a3e01b7d5446cf3f",
            "log": "tests: don't fail the split --filter=CMD test if xz is not available",
            "date": "2011-05-07T05:48:00.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "ccf4ccfbc5300ead45387415cb2e7e6820e8da99",
          "commit": {
            "id": "7cfd12c78e0be4c90f29c99ab383163aa1471504",
            "parent": "a132e03507871f9506940d3cdf82faa072d861bf",
            "tree": "fedfcb74dc902d31a6f7d27bc2c76838ff10d244",
            "log": "wc: avoid NULL dereference on out-of-memory error",
            "date": "2011-03-02T17:54:43.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3afd4deabd86e56b193523c88ef2474757b90cc1",
          "commit": {
            "id": "a132e03507871f9506940d3cdf82faa072d861bf",
            "parent": "269665866d589ee9b3b44156c59a3169dbfd3629",
            "tree": "27c965f223b5a1bbb08e456a815abf236ff743bd",
            "log": "tests: without filefrag, only skip part of sparse-fiemap",
            "date": "2011-02-24T10:25:52.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ae29f10547b91b005cb979d5e1e250c81e2cbde8",
          "commit": {
            "id": "257909013ef559418f612e8592f55b29dafda154",
            "parent": "9a008a9e24166375cf512457155d38c760c89258",
            "tree": "207d2520d12d3643502c0703ce7b3ab60dfebe4b",
            "log": "build: update gnulib for version-etc copyright year update",
            "date": "2011-01-01T10:10:00.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "a1922baf9fe12818f52ed8be31bc200886ea2302",
          "commit": {
            "id": "e66948c3b59045bf8b9f6bd1e0dcc3bb93488cab",
            "parent": "0e181024c00b746a930aab6a0cfd9162d7b67ae4",
            "tree": "77ff3c316573b8dc186020f232f31c3b859a0721",
            "log": "cp: ensure backups are created when -T specified",
            "date": "2010-12-18T02:50:33.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "6df7feddfcdeb7e841a2e2b9664cb51342186aa2",
          "commit": {
            "id": "63b5e8164847285f5d3c1dbc9f7c41ad8c17ccc6",
            "parent": "c88cfffb6cb424c2f2ee8317dd8f546bd8594443",
            "tree": "ad36d7838aa11ba9a3090cf88890de923d61a6ce",
            "log": "fadvise: new module providing a simpler interface to posix_fadvise",
            "date": "2010-07-14T08:49:16.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "0698ae117854189e5dac02aa05a7c035da308866",
          "commit": {
            "id": "9e66806e2869504567761d632c806005d51265ca",
            "parent": "f6b2f46714c7aab9f1402008f12f8c83487a5761",
            "tree": "f4d759f241cb18bb2a55ac9531fe1d84c88a54f1",
            "log": "doc: adjust a header in announcement email template",
            "date": "2010-04-08T06:45:23.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "48b5a4e39353314818143f00436b62c4ea379c6f",
          "commit": {
            "id": "6c8d432b1f70c80213b0a2244e2427ae3c1394ef",
            "parent": "f1ab2e02270bcd42444186b6f8e75971ce55736f",
            "tree": "260fb288da12b01f239e362aeb3a78663dbda2c3",
            "log": "pr --help: add missing space between short and long options usage message",
            "date": "2009-12-31T15:52:25.000Z",
            "author": "Stéphane Raimbault"
          }
        },
        {
          "blob_id": "52e899e97f0c914926839717562f72214ff05789",
          "commit": {
            "id": "53db8d6479019474a14b8b858e83ace450195034",
            "parent": "4b449caf2dad59fb05d4089f810036872f4b232f",
            "tree": "f3f1ca56304a097f6530e719b211c0dbe393cd0c",
            "log": "stat: Recognize k-afs, gfs, ocfs2 file system types",
            "date": "2009-12-22T12:21:45.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "15a723acbe8933f641c11ce71aea0ad1bfd9875b",
          "commit": {
            "id": "ade8dd2096e1898edefadf2314d4e1ec654adda5",
            "parent": "0cce6908503c7cda6bca71340accebfdc03ebec4",
            "tree": "0554afe2be9fce5c52b37e03c974f19818c2d8f6",
            "log": "maint: expr: avoid compiler warnings without GMP",
            "date": "2009-09-23T11:49:42.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "0f7a368889749440b5109b70cd9df2f02178dacb",
          "commit": {
            "id": "c48003a53cbeee75dd34f5c3932a60ee97defb28",
            "parent": "a2883947bc7bcc5e4cb3d18d55f60998383cdef9",
            "tree": "99a3b23648af7952411914d6fdd29c07f9a26223",
            "log": "maint: automate the web-doc updating procedure",
            "date": "2009-09-21T06:56:17.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e6ffd1a5822af9d881782f94c298a430b45fe4f9",
          "commit": {
            "id": "2bc0f3caaafeb240cdcfd050b7ad1fe0ad14addf",
            "parent": "831acb987e970ca86b72eb594965ff59bfedfd30",
            "tree": "cac10505aae58298cbff1fe2dfe69e9373b765a6",
            "log": "cp: ignore obscure failure to preserve symlink time stamps,",
            "date": "2009-08-24T06:21:47.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "b1afe14952007797e67878693e0fc73463bd2e8d",
          "commit": {
            "id": "c55c0e736926178d317027fb8c938c266d7b0ea3",
            "parent": "e3e9713fad1cdd2ffc6334c180181cae3ae25df2",
            "tree": "53d791384a6b6181a9e1fd673fecc82500dd47fd",
            "log": "maint: tighten atoi/atof-prohibiting regexp, clean up .x-sc- file",
            "date": "2009-02-02T08:37:08.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "65368f99431a10b29acae046ded527ab133e3ad1",
          "commit": {
            "id": "921feefb12e7f93c0925188b9b11f2e1fd775e33",
            "parent": "0c65638b0fe521a47e72f318edfb12c5b3b850f5",
            "tree": "df920f1f5ca7b472297185cef6b29a03378b04d9",
            "log": "doc: mention long option abbreviation",
            "date": "2008-12-27T16:38:09.000Z",
            "author": "Eric Blake"
          }
        },
        {
          "blob_id": "ad25ed8d0570e2ad663a34fbe745b5b0ff2b1c43",
          "commit": {
            "id": "031e2fb5e9501fb9cda4d739a92abb02e2b05a52",
            "parent": "e181802521d4e19e367dbe8cfa877296bb5dafb2",
            "tree": "1ac3a5640ea8d70cd9ee8de9ea182ed330067aa8",
            "log": "du: read and process --files0-from= input a name at a time,",
            "date": "2008-11-24T08:55:55.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8cfd974cacfe0a04a9b0caa4f730715087b3e843",
          "commit": {
            "id": "80325aca2dc20c9f6ac0ac51fdfb2a12aee565eb",
            "parent": "d3b5555f102c1ad192c45a20f02204bfe2a3ebf2",
            "tree": "a029d69d897aa33d2fe193a12ea5dcf5bc5686b2",
            "log": "* bootstrap.conf (gnulib_modules): Add argv-iter.",
            "date": "2008-11-30T19:21:28.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "280d7ac885f2708bde33e47297acd7ed18f7ff8b",
          "commit": {
            "id": "e34894bf3f52f1600e5a334ddeec9c2a7e431853",
            "parent": "b14e5c40b9e7f6140a800a0b69eec693ea73fd09",
            "tree": "375ce7867cb3936ac5b821b78bbf011357683190",
            "log": "tests: dd/reblock: Reduce chance of timing related failures",
            "date": "2008-12-01T01:08:02.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "0bb1929f488b6ba18e957d7201648c39197dad92",
          "commit": {
            "id": "32d4d0dd5ececb6df73b233e9c868dc51868204a",
            "parent": "cfa2120e83087c542bc80bd84928c8a965b5deed",
            "tree": "3d9c3f87c483d95edb33b134208a63a18a185709",
            "log": "xfreopen: new module",
            "date": "2008-10-12T13:36:28.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e6b9a1ebbc0c1ab9277575938a9dd4ba18c1efa9",
          "commit": {
            "id": "e2dbcee444e90e4289bd4bdc36783a5ef00af396",
            "parent": "8ce745dc612b21c01439da9a0ca217054841d177",
            "tree": "f5973cdb26c2e9d1f271b0c4bad69aae62dcac59",
            "log": "truncate: Fix integer portability issues",
            "date": "2008-06-26T10:10:13.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "7990a7af190e0d00dd942439c7dabd4d3df5dd38",
          "commit": {
            "id": "3de15598304c141bdac5a3545874bab035536d88",
            "parent": "956abf969ca4e8f01403ae39991e42f0ad3c27cb",
            "tree": "3dcf60ca0fce0f0cfd6631afb9917a8fc7315806",
            "log": "chcon: correct --verbose output to include newlines",
            "date": "2008-06-16T11:03:07.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e6b9a1ebbc0c1ab9277575938a9dd4ba18c1efa9",
          "commit": {
            "id": "d42994df5d9deb7a5f6c43b5d171015535df8bcd",
            "parent": "d7d80c5b7b122377fe250357a3ab182e8fbde20a",
            "tree": "78b451e6a8d764f27387b26906fa303738d1b78f",
            "log": "revert previous change, \"don't use \"const\" with scalar types\"",
            "date": "2008-06-14T09:04:41.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8073bb0f97278de9859b8e28110de9c886fd92eb",
          "commit": {
            "id": "68158e6b1025292c9cc540ffeebe560a0772d255",
            "parent": "75e0047c4b916393b6be3cb985c4c4d4a2d1a836",
            "tree": "4dfb0d0222fa01dee5476c5c7ba17b60c238a515",
            "log": "syntax-check: detect anachronistic Perl-based tests",
            "date": "2008-06-08T08:30:50.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "731eb4a47aea934f2a21bd3af1ac68ec4da0cb2c",
          "commit": {
            "id": "1b0b6c8d08785bf9b05931371259ac710a806e51",
            "parent": "cc4bdb92f9ef7528658c9e925f2b1156bd693c86",
            "tree": "0040f653fa6e69cbe7f650df07846493f2b88a81",
            "log": "remove duplicate definition of matchpathcon_init_prefix",
            "date": "2008-06-03T05:44:09.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "0fd138d070fa527058ea11b3a72a4a3905b6fbde",
          "commit": {
            "id": "eebe7310143d24dd1b510b2df75ce776e70934ae",
            "parent": "91c1384602f5d7be5dd227f6926b7305fc4e496c",
            "tree": "bffe38c5cfab4f92a7218bfb15377f73cf855579",
            "log": "export program_name, required by gnulib",
            "date": "2008-06-02T13:53:26.000Z",
            "author": "Eric Blake"
          }
        },
        {
          "blob_id": "ebbb5b337c4f0a7b3739849d556c7e4fb3526ad3",
          "commit": {
            "id": "b69b4cca953a9a0a13edf026ea104d13dc956bd3",
            "parent": "7855cbfcac867621c18d1fc85abe5332f6aae1ec",
            "tree": "c015ee1d335da9c4d97c544da8c2f5bf8eac28f0",
            "log": "convert single-author programs to use proper_name",
            "date": "2008-05-19T14:24:27.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1945504bc81b3cdba1769adce23c1573caed7077",
          "commit": {
            "id": "51243cdacacbde2c020846c22d81ab435f2f1f22",
            "parent": "1081bbc74e48010700783a9bb82a4657d1d02bd2",
            "tree": "21a5891547493a54d14e27caf218cfcaa3ecf544",
            "log": "test invalid-option handling in all programs",
            "date": "2008-05-12T12:43:23.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "61ab485b4975ef2917691795ca1ccf29c7cd88fc",
          "commit": {
            "id": "28c9d4ecff150942d46247076c8456dd79baf178",
            "parent": "ce7b12ef1b4d691490a6c890341cc9a59bbcbdeb",
            "tree": "edf51c19285ab6d5cf80627d8c5b4c3472735688",
            "log": "tests: remove directory, tests/tac/",
            "date": "2008-05-08T08:33:15.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5ffc4b43bdc29da306fa7fd3c0f72292cd0af15f",
          "commit": {
            "id": "5f606e6f1f0552c8af7b9cfbbafe3aad048bb99e",
            "parent": "7326d1f1a67edf21947ae98194f98c38b6e9e527",
            "tree": "af8b45bd7ae8d278e8fd114f1a23a9abb7b2c98f",
            "log": "* COPYING: Update to Version 3.",
            "date": "2007-07-23T12:31:01.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "884f86a50c29143f96297a3111333545084eea96",
          "commit": {
            "id": "578332c0e2a2a2c843f27a5bc18275c84e491763",
            "parent": "86e4b778b148bdd82395fdc312ce8d937f303e33",
            "tree": "8769b463b41e82132c6a4caea4444038292430d5",
            "log": "Compensate for new c99'isms in seq.c.",
            "date": "2007-07-09T17:24:15.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "b4464d2c43658376a52ccb6c4740680b9d15c11c",
          "commit": {
            "id": "685d3c3f2adfabbf79b626f84be17170b59d449d",
            "parent": "e0066f36c22dce02f9d6327cb881ee7eec6e7539",
            "tree": "6de291f719c2c6c1fdc92c413eb40b662cda47ca",
            "log": "Fix typo in comment.",
            "date": "2007-07-06T23:49:12.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "85f7d33a97faae8c69c8c5cc50efbf02f60996bb",
          "commit": {
            "id": "8ab7f351a139ab25a14843c69699069242bfc510",
            "parent": "9e450601b1509b3a83d9c1231b3cf9107eedbe9b",
            "tree": "d33619ed857dc81e1fc12739b80110dc38b6edf1",
            "log": "Add to .cvsignore and .gitignore files.",
            "date": "2007-05-26T04:30:30.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "332f32dc4a57327fbbc69c63ef340df44c5e5079",
          "commit": {
            "id": "59312fa3f99cbe5a4bb4f194a1106ea484d9bb0c",
            "parent": "2fa23f1f86ddc57e4b7bf2453e75a9e54ba60d2b",
            "tree": "72f7afeb5db028b7f6f1987a2ea1bcfbbb5a3184",
            "log": "Add to .cvsignore and .gitignore files.",
            "date": "2007-03-28T06:46:01.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e21fb7f0572c8cb7bb227d8a19ce624b9d5f1d78",
          "commit": {
            "id": "489ff7f0cdaa63403aefcce778ea7214dc4e6808",
            "parent": "2983bf7c85fc69d1bcfb6fa45c2dd7eedc59fc2a",
            "tree": "e86d67ada5ebb74d1c4d114ef6ff9d96b9222884",
            "log": "* src/sort.c (usage): Mention again that sort fields are origin 1.",
            "date": "2006-10-09T23:26:33.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "f533b7ca68cfde2e9be652b9066db42f8dc30867",
          "commit": {
            "id": "0f7a044109b860443ecaa4f8a37652b1b4423057",
            "parent": "11fd62b0080ce376b26241bd789b7e7390befef6",
            "tree": "b5834ed9867213221a2636e0fa7e8da178749a76",
            "log": "Remove from CVS, since the bootstrap script generates them automatically.",
            "date": "2006-08-21T07:26:38.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "1da5373e35373cf0902b7ca8c01b359a84c287b4",
          "commit": {
            "id": "b3e1ad7a5d972ee947831e9d943a12c239864e72",
            "parent": "b35b31b0f88f89c4afd23b79946263926317e087",
            "tree": "942ff3cd3fcca975d462a25441a985908b99a0a3",
            "log": "(print_it): Don't assume char is unsigned.",
            "date": "2006-07-09T17:07:12.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "29c624015cb0e5005aab9c846e3fedcc749b8f3c",
          "commit": {
            "id": "d77808bb40f70f60f6e0c2309a33fec36d36c4e5",
            "parent": "59bafa5a0cbb8baed511b48fea996e0c260aebed",
            "tree": "8200f0e9c193d53dcf50f7cc3774029e4d754b95",
            "log": "remove wc --files0-from item",
            "date": "2006-06-25T20:45:32.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4147d7c11657d80c843c2bcccde4b7635323fde5",
          "commit": {
            "id": "b2657ecc6a8193a862991bfb08cdc91c6cc5cb91",
            "parent": "99fb2bfe1f72be004245801fc57bbc10c25bcdd1",
            "tree": "785c4224143a5ce350f0b759b9812a4d6a7050b7",
            "log": "(sleep invocation): Document that accepting",
            "date": "2006-06-25T06:55:07.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "96747fc4db28af8d013b634030ff9e3558f6588a",
          "commit": {
            "id": "9d66e1afee62a575d9ad815adaa4efae5bd723d7",
            "parent": "4f47534c2a852fbf9338d70f86b9ce10f40e79c0",
            "tree": "ca9b9b7b06d08b02c8c3451647d835ef446d5a39",
            "log": "*** empty log message ***",
            "date": "2005-08-13T22:46:07.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "98af229037dd64b25c0f429e99d88008454b93ea",
          "commit": {
            "id": "68b0358b66daa89cf499e6a4b455972df79f6a6c",
            "parent": "f6ab92093a0e199da1fa0085829a2427709ed79d",
            "tree": "e078119fff8067ad473498eadd1db669fb4f86f1",
            "log": "*** empty log message ***",
            "date": "2005-08-12T08:06:56.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3e451ebc8384b8b4bcafd0ab923b09452723141d",
          "commit": {
            "id": "07fc234838d4bae0ddaa98ead2233ba2c98a1979",
            "parent": "a1170668ff7ff2f348f801b086fb2561dadeb226",
            "tree": "7d8af8f2d1378e3d98b7b516f8ed1917591b83f5",
            "log": "(main): Avoid setmode; use POSIX-specified routines instead.",
            "date": "2005-07-11T18:27:10.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "56db631de3f024952fd008419baa0694ae420f8a",
          "commit": {
            "id": "116e6fb2443d140959ea042865cd67b95aab3c47",
            "parent": "a5d7b5f8aa511a3a7820aece22e219659909e8ac",
            "tree": "7e5d985e69445be00606696b7fc013da82e161ee",
            "log": "Update FSF postal mail address.",
            "date": "2005-05-14T07:58:06.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8ee9940fba159de7d5d0da0f11c9821d006f4c4c",
          "commit": {
            "id": "4a3c27dd70f7672c18fb4def95cc0440644c686f",
            "parent": "909dd8df1caf3299fb7c6e615ef72cdcef60c82a",
            "tree": "23be8d3ebf32821f55fceb7096176f160298c38d",
            "log": "\"bytes, words and lines\" -> \"lines, words, and bytes\" in comment",
            "date": "2005-05-13T19:35:06.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "4b7098775c9c3ae287a769ba728d14fdd1c60f5b",
          "commit": {
            "id": "909dd8df1caf3299fb7c6e615ef72cdcef60c82a",
            "parent": "a738692de487f4593548bd7a28438e67ac2cb51e",
            "tree": "e574035e3dd2d664a71563904e935efe174db090",
            "log": "fix grammar typo in comment",
            "date": "2005-05-13T08:42:35.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "ed65a11c5c1929547a93bc5b88b66972838ec240",
          "commit": {
            "id": "6eb01f34a60e149bfb70f4f2f15551441859abaf",
            "parent": "af2031973758c6372e57c6b0dae62adc325d8a3a",
            "tree": "f8c6cd7c6966e61c1bea21c714572759afd6a492",
            "log": "Remove `register' keyword.",
            "date": "2005-03-06T16:33:20.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5f8bb94e260c0848e458c71cb52796807c8e9441",
          "commit": {
            "id": "718c00df82db6bc0510938e32266dbc314cd5f31",
            "parent": "9873bd7eb683857ba25de884ee4427458d3088ed",
            "tree": "efd546f9559cb2a245d49b7b12046ecc2aa8ea3e",
            "log": "Adjust to new wording in diagnostic.",
            "date": "2004-09-21T22:25:51.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "5a4bec4d6ee1fffef40c9294f2b22e4bec8a3c90",
          "commit": {
            "id": "a1e3a341a6eaee3e20d855a2447cfe510229c6f0",
            "parent": "f55c9b41a254e3a7d37ae1d10491a410e22ff6b7",
            "tree": "4f2cc6641a14316bda04d8db28eefd2941ce30b3",
            "log": "(hard_LC_COLLATE, ignore_case, different, check_file,",
            "date": "2004-08-03T23:37:56.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "091c04386fbb21953fa4e7c3746c0f63f0859025",
          "commit": {
            "id": "1956f215e1537dba38ffc4021e0511c2dcf21092",
            "parent": "c9316ddd8543fb0e0ef4544535d6cb36f70e0eaa",
            "tree": "7accec56c35b56c9da1a0cdd0f625caf5dcd7ebb",
            "log": ".",
            "date": "2004-05-04T11:36:13.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "b19a9c28b55f7bde3ce321d4b01ecfd7949ff1ce",
          "commit": {
            "id": "68e999b21f6d6e41b22c13ceea7bb3fccc39e707",
            "parent": "36504c3b09ff9d4327181d23bb2ea0c3be9a67ca",
            "tree": "bbed061a430aa9c60e1eea7ce2861eee9e40a6c1",
            "log": "(usage): Use EXIT_SUCCESS, not 0, for clarity.",
            "date": "2004-01-21T23:49:31.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "061b4650044657f59d5e71a1af67bb5d4628c24a",
          "commit": {
            "id": "c1f33f59f59af314aeb898e1c8d267dd5d808171",
            "parent": "da13dd4431782b3db9042c717f6d176a914d29d7",
            "tree": "e4e66f5532f26bfd6294615793686873d8c4e365",
            "log": "Fix 'cut' problems with size_t overflow and unsigned int.",
            "date": "2003-11-06T08:37:55.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4bdffc4d813868a18545ba4447d27235987904cc",
          "commit": {
            "id": "f81b126bd4e29178fb4a7c4b6483349f91360242",
            "parent": "0cecd156c6ea60fae5b0997415ba09d6ec8ac751",
            "tree": "ad70a506859de808638b8cd475d8b9b8ffcac25f",
            "log": ".",
            "date": "2003-10-18T10:05:08.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e7a693594029e67a74be8ed631f32191f9dd0186",
          "commit": {
            "id": "424b8a4ff8081ee2c4c1ab29864cb62296acbe94",
            "parent": "243ea2b5e939b4b91f37b18cd05f9f2efba8ff32",
            "tree": "e6def8c80022efbd6590bdb9d7c203135b5f50ca",
            "log": "(case_GETOPT_VERSION_CHAR): Rename parameter, Authors, to Written_by.",
            "date": "2003-09-18T22:16:00.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "061b4650044657f59d5e71a1af67bb5d4628c24a",
          "commit": {
            "id": "2c5fbb29a6c44279b909a2a781cd2c3cb84bad0f",
            "parent": "3280bf4b5571fd4425c7e6f7d765d08b77ce8d8a",
            "tree": "d2f0013b98d1a4b8a8ba5d61bbf6ab525cc682cd",
            "log": "*** empty log message ***",
            "date": "2003-09-18T18:23:19.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e7a693594029e67a74be8ed631f32191f9dd0186",
          "commit": {
            "id": "588291785cbab06fe461c6a45e4eba53e4e2f13f",
            "parent": "ac58291e4d9d528512e99a809d91bc26a2f3dc49",
            "tree": "4ed528398e668a20042e459dd30576a40d791bda",
            "log": "*** empty log message ***",
            "date": "2003-09-18T18:13:57.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8593c11845f20104e3c36d0bb55e64675aa355a2",
          "commit": {
            "id": "b42129829ac0ddc66a1c5f992bb691931130c7ed",
            "parent": "0ac638c6eae73f77bec6a9ec704f705f097de023",
            "tree": "4cf34c960f0191f3e568d1f5acfbeb7ea41a0ce1",
            "log": "*** empty log message ***",
            "date": "2003-08-09T16:34:02.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1ddd71105f0b642f2455e183f2c98625c0e47eb1",
          "commit": {
            "id": "2841d4bb915564666eb9254c458d250c63fcf4dd",
            "parent": "d845589c72f3456664d3de2c005fa0e360435165",
            "tree": "f554b3755823fd402f25d6eed842bf9c52f48606",
            "log": "*** empty log message ***",
            "date": "2003-07-23T07:15:43.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8647fd77dee3e9e5940d3b04a58e3813a91c7662",
          "commit": {
            "id": "a68226bb5b81fd6ffd5d65b8529a07c19e17811a",
            "parent": "0ff72c1f5c5b11a3f257d861e623ad02c8e02ff0",
            "tree": "e4089c24262d538e576b625c90552806611b433f",
            "log": "*** empty log message ***",
            "date": "2003-07-23T05:38:41.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8f3f6791c8abc9925b5faef3f77e16b019e913d5",
          "commit": {
            "id": "1fb0960527f7ce534048edb8e2a19826eba5043c",
            "parent": "c279f529aab08f04333d8da3f21f7b894dd025bd",
            "tree": "149dbc23a5baf1cf714e9196a0ecad655c797058",
            "log": "*** empty log message ***",
            "date": "2003-07-20T16:04:04.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e772511269af66dfd2ad6f6132063218e4c9af54",
          "commit": {
            "id": "47c0b910f1813f8dd1792ea113fd814e1f274293",
            "parent": "b17a0f8d39a01fbe9c42b384d2571ca096f3ab99",
            "tree": "0e0cc83b080d8be59980ca053bcc64d480233fc2",
            "log": "*** empty log message ***",
            "date": "2003-07-20T15:25:02.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "65bdb2ebdb780e6c5216def77ca9333df1e806eb",
          "commit": {
            "id": "32d2cea9b8b45c9c48ecfb8ac5741a43ac0863b7",
            "parent": "107ee59889a7429c324318b74a86611725a9eac8",
            "tree": "0925a52a8e67ccf73be78f4d87fcbe5daff85172",
            "log": "convert each 8-space prefix to a TAB",
            "date": "2003-07-20T11:19:12.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5d520ff70ab5273cb048e7b4a4c82a4b8ae95a37",
          "commit": {
            "id": "1844eee69a9c94701606f9d274fce3dc84b15f86",
            "parent": "83563c918af741c732b100849d5f7790f1f41490",
            "tree": "0efbabec990d04b5eb3d4eb769a85aa51deb62d9",
            "log": "(initialize_main): Define.",
            "date": "2003-06-17T18:12:26.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "733d32d85e5a8f36748aa54c34897b3750d6c406",
          "commit": {
            "id": "e07c146aa1bbed70eae79c5bb93756811180c2f3",
            "parent": "e7c3673528868432f402726177eac6549cc4432b",
            "tree": "eac515ccd1e3ae0a1e5640f7f40981c97b778ff7",
            "log": "*** empty log message ***",
            "date": "2003-06-12T06:52:53.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4a1852732a8719dac3b19283e94e72b154f99b8e",
          "commit": {
            "id": "f3fc3d47268365532b022079de28528bfbf082a7",
            "parent": "3f2cc46da4afe2fac5aecd2009c8fa26e28d36e0",
            "tree": "ed5013d5c175d74015b86ed33d5090176607fecc",
            "log": "(dopass):",
            "date": "2002-11-05T20:28:36.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "858d3cecc8c424077e952c767125f3f6288796b3",
          "commit": {
            "id": "7db0a344887500e3139f0c2e16b452f6d302a6b4",
            "parent": "97cd9f11492ebe47c56105e2819efea841c25f2c",
            "tree": "cc54fdc24c453a020c319a5498343ef3a44220a8",
            "log": "*** empty log message ***",
            "date": "2002-10-09T13:28:55.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "c7688bdd77f81bc50725838b0d0b8feda3714b99",
          "commit": {
            "id": "709d79631a25a48e72c6fc232c7f23070b1f3ca0",
            "parent": "7b355ee4761cf333485a753665e9a89345d86167",
            "tree": "e3c40f432b84e35a625dd7d2f8e5bdb914ee1e5c",
            "log": "Remove all inclusions of inttypes.h,",
            "date": "2002-09-22T06:40:14.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "2ecb3be244817f9252352a84b24b84d4cfcba14a",
          "commit": {
            "id": "74887031996e79df07dae9711f08d80839b31e62",
            "parent": "6c80ecd8d5d3a0642f8cf321f9750f50314ea939",
            "tree": "d249c7ea293b5540ca108f3b40733401544b29ba",
            "log": "Change `error (1, ...' to `error (EXIT_FAILURE, ...'.",
            "date": "2002-08-30T23:04:53.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "062a7dd057074a7020f433a18e932bdb470132c4",
          "commit": {
            "id": "f7f7207a69ad5e5b1a5a617f6a76986f54888960",
            "parent": "dd11d9349e2ec6a60e7ea7c6a24f2a2cf686c83e",
            "tree": "d593377a2e5d789388c3811bbdcd3b24e6acfb0e",
            "log": "latest",
            "date": "2002-08-25T07:35:00.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "970497ac844b4d739619ffdd3882c8e0cae16ec8",
          "commit": {
            "id": "d23970e52ecd6553cc8885a1ebd31e245b184a61",
            "parent": "4c7e003c1b7da727b325d57066803a306f237283",
            "tree": "e19a310ded4d80ccf4b9d60fc705ce5ae0867d35",
            "log": "(usage): Use the PACKAGE_BUGREPORT e-mail address, rather than hard-coding it.",
            "date": "2002-07-02T09:05:33.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1d638b8c20d1c931acceb388b690a51c30b31b1c",
          "commit": {
            "id": "93066fab5134692b3b2355425857be2df9f694a1",
            "parent": "daeef68961a04442bcb71efe9a500be9e3dea9ef",
            "tree": "71a221d5390cd4d13f913ffc6befd95cb598de49",
            "log": "*** empty log message ***",
            "date": "2002-04-25T20:16:15.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "7996f7757165ccd48d81e21cf89571c3d554568d",
          "commit": {
            "id": "80f17f22f26b2df8c985e744742c47136ce6d530",
            "parent": "098bfeea80fd5683d14cc5f9155200dd26ddc41d",
            "tree": "7f5eb2c0155948c6c60ffbb9a5e6704a419379cd",
            "log": "*** empty log message ***",
            "date": "2001-12-11T11:51:17.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "14645fefd43e731f72b4b7c2c77ccf3a7811ed94",
          "commit": {
            "id": "0c3fd309031b720f2af0439673f479946b2446f4",
            "parent": "52f3031b240b7eed511acbe74067b97f8c018db2",
            "tree": "1d2de01126d0df4a0248858f0ec2caa7dc6504d0",
            "log": "*** empty log message ***",
            "date": "2001-12-01T17:40:17.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "fe9c2487340cbdc26ad3a970ec7e9b39fefb44ee",
          "commit": {
            "id": "c0f45e1e438519da401714ab98a6c30d3aa7c241",
            "parent": "7c8e0d8c97ebe87e5372afc219815f830edc055d",
            "tree": "2c40f4cc89fdd552d05e1e44f95fda57586ad2e6",
            "log": ".",
            "date": "2001-12-01T15:41:16.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "f92f124a3b24b189ce419273fa0234a0d026cb88",
          "commit": {
            "id": "6f468fedb43dff9e6966ec73d3bb61a28d227484",
            "parent": "a5f1ced62a3a3288f72d4f494e61122e7d407498",
            "tree": "9f7a8e7d8dcdf0b1fab958d0b4adb58e3a8f590d",
            "log": "(main): Don't split string in the middle of sentence.",
            "date": "2001-11-23T18:45:32.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5248acdcd6a9b7c60ffe11ef6911f26c6c16b73e",
          "commit": {
            "id": "04b632033879392e3ffaf39ddfa703b96f77d105",
            "parent": "06e70ddab4319357dbbe78148d57124260c81de1",
            "tree": "9cf37623ef8da864a858a016df934245a513ea6d",
            "log": "*** empty log message ***",
            "date": "2001-11-11T13:17:58.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "c6e447c0c7676dbf0727691f8082d25a0498ef9c",
          "commit": {
            "id": "4c83ec781b02b43c16f0d82c8c5c830721b138e6",
            "parent": "63cf4a98932dada020f9f5cd187167c826688378",
            "tree": "b0bce322f7670f2616bd1d16fbb3fed7284dbc8d",
            "log": "(author_mark_check): New rule.",
            "date": "2001-08-13T10:27:02.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "00bb10c77783e8b228b459a97655b0d9755ae752",
          "commit": {
            "id": "dfbabfe75826abb183859c88300653dcb8d049a0",
            "parent": "21049673a0407784ebe9c4587ac427773cc83187",
            "tree": "b338873b44cedcfaf051d265e46cd4394e240132",
            "log": "*** empty log message ***",
            "date": "2001-04-13T20:33:37.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5520610d0d4fc07fcef066608db2bbeaabffe3a4",
          "commit": {
            "id": "ba74efc7c69fff13d3c02bb11e809167b0f3dfc9",
            "parent": "2307570c3ed159a3191183906a39ea4f7290f8f2",
            "tree": "a1f0ef66787f2f8ceb0831057a7f4a62cc375a23",
            "log": "*** empty log message ***",
            "date": "2001-02-18T19:39:38.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "ac9ecf5773f011c5a33537d4ab2136ab684c11f1",
          "commit": {
            "id": "82cd6af9bca49b1818a17a61c01e0b7f3b0cbc22",
            "parent": "971d190dc4a50ec861628362e992a06be0bd771b",
            "tree": "3f642c36d1763f07256ec87c47ca86f6379d0f67",
            "log": "*** empty log message ***",
            "date": "2000-10-29T22:43:51.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "bf78e7a7ee268061b2f088e5f774824ba3f3795c",
          "commit": {
            "id": "c14f06f708d40ddb91d1e1e73111500e3e9c979c",
            "parent": "5018ccfb7efced663ae455e99d7d830730f62888",
            "tree": "8c7534e2ce1a6d5376748ae6728d0a0562e77056",
            "log": "*** empty log message ***",
            "date": "2000-08-11T09:13:00.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "ced5300dd9018e6e146954e53e821e0d02dbaaec",
          "commit": {
            "id": "ac8180336348bee878584b013d71f84e5d047f21",
            "parent": "b2c7c6055d627e8c8bd1ede48b7c99272a850c54",
            "tree": "72f81b1e9047cfbc782139a943514ded264f386b",
            "log": "Arrange to call close_stdout upon exit.  Don't close stdout explicitly.",
            "date": "2000-05-20T22:04:40.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4799ee446f3c1872dd0ba84c64042cf751bbee5e",
          "commit": {
            "id": "8e369dfcaacf79dac646d5bcf8dc00de141b3d35",
            "parent": "196c0a27f045b668eb75d45aeab02c4048f8fe53",
            "tree": "3dd90a97b202f77a6d382779d8a831eb5f57c8c3",
            "log": "remove @key uses, rewrite --sep-string, small cleanups",
            "date": "1999-07-18T13:58:57.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "886b4484a9c8918c28a60a60b18c9f870bd18838",
          "commit": {
            "id": "25abb410d417faa40faa7833c55e19ee2819f804",
            "parent": "baa8cd4493d6c067e2a8b5e43f8f72162857a9ea",
            "tree": "a41648fb3d4f00d362ebf49a409bfb45a7ab1676",
            "log": "define/use AUTHORS",
            "date": "1999-04-04T14:44:45.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "87c3c55b04e14201c404047a949e4c19477ebabd",
          "commit": {
            "id": "1d47220ab215c10e3883915a24ae1318213fb4da",
            "parent": "cf691ec714de68d0a2d0dec53704b02e2ab52009",
            "tree": "076a4e3786254bb51b7f29294d385cd54498dd1a",
            "log": "Insert AUTHORS definition.",
            "date": "1999-04-03T05:22:05.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "db2365c96f1b9eabc1d5f616e49b3c74190f1738",
          "commit": {
            "id": "cf691ec714de68d0a2d0dec53704b02e2ab52009",
            "parent": "7c2d5de6c7a61c075fe3fe8012301966c8dfb7b9",
            "tree": "45d129fabfa6477ac47b55c830762f5ca506d9cd",
            "log": "Use PROGRAM_NAME in place of string in parse_long_options call.",
            "date": "1999-04-03T05:20:06.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "9750a774b2458f070a6d81c711f4ae135d4038b1",
          "commit": {
            "id": "7c2d5de6c7a61c075fe3fe8012301966c8dfb7b9",
            "parent": "db6ce0481b41d5c956d190fd3f57cddba4fb2bb3",
            "tree": "63cd3274c8e45f123d16619f8e539b216bb477de",
            "log": "define PROGRAM_NAME",
            "date": "1999-04-03T05:01:48.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "97dc02520d88baf5870b57454361a7b531a8763b",
          "commit": {
            "id": "db6ce0481b41d5c956d190fd3f57cddba4fb2bb3",
            "parent": "98327bba60c85660429a91d1f80912f3f37c2fb2",
            "tree": "2662ff9e15a81cb92a8b555a704951797212d1ab",
            "log": "*** empty log message ***",
            "date": "1999-04-03T03:29:41.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "a105cafe2bab5dabaac16c8fd97dded20dbaafd1",
          "commit": {
            "id": "0ae96f236175101ddc6c8f0eaf46d08f88173486",
            "parent": "32deb2026bc15689a864ce6ecb7ebb486625ed18",
            "tree": "cf5ecb22dd7271c5c1bd5fecffee62ad7fc5507d",
            "log": "(main): Include author name argument in call to parse_long_options.",
            "date": "1999-03-04T05:33:22.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8e20e910419f7c0828c53f8cddfed49c285f9d86",
          "commit": {
            "id": "16f3644da7042689f0fafb6d1860c7ff981b4d15",
            "parent": "e2bf10d90e4b3b2dfb5e7d3df66377a576584294",
            "tree": "369e1467b355bab677d701311d73a72cbd7b4e7c",
            "log": "*** empty log message ***",
            "date": "1999-02-16T04:19:44.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "9571fd9da0d8e23c4ed5656b07b2fce20b02c876",
          "commit": {
            "id": "da258119328fe4af0e0aa0d6f292600732aa0bb4",
            "parent": "dc4fd4c43b21e3c7043d963f1ecbae5716f06e61",
            "tree": "3d4ab4a3c9d52bc28eb15293a5c0a096d7e7ec6f",
            "log": "Include closeout.h. (main): Use close_stdout.",
            "date": "1999-01-14T15:37:04.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3590bf54ae1c17bbd9cf080f55cc67b6a27b14b3",
          "commit": {
            "id": "59998135d08d667353977036c6d532d88373f767",
            "parent": "87f9e231c340b939bf691842df8fb30e88402acd",
            "tree": "aa3cf8751dd914f9b627ec813b964baf08be60cb",
            "log": "(unexpand): Use binary I/O where appropriate.",
            "date": "1999-01-01T22:41:58.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "500958bdbf79197f7c2935b62d34c2a080cc54a7",
          "commit": {
            "id": "6606de8b811f254122c909646ae60a2ae5e64d2a",
            "parent": "08cfef16a270608325db3f9ca5398d9aba8cd1dc",
            "tree": "50c397794a7bab548c32ccff0d230f2f4d777cad",
            "log": "(program_name): Declare *not* to be const.",
            "date": "1998-09-19T17:19:06.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "71fd4fb182c3156870a126c489647ba3c73d33aa",
          "commit": {
            "id": "62f208d49356dd96fa40bc7f175297de1c349659",
            "parent": "60ae0b81a59d36eacf4f1ecd14b52b80a444fef5",
            "tree": "4d6c60be7e974382d83c6eb3ba00d302a2f4df4e",
            "log": ".",
            "date": "1998-06-29T15:38:09.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "15a38917a306364d05ff4e1361ca6db985ca4dbe",
          "commit": {
            "id": "02fc5fa0d0a68fa070dcb93983ad20590e051164",
            "parent": "b62793b100c35efe44f66184e7f60ebc8ab890e5",
            "tree": "6e1a0c837ad0724d823599cde25fad9e3f9d61ad",
            "log": "Change all uses of unlocked-wrapped functions to their upper case wrapper names.",
            "date": "1998-06-29T02:10:24.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "94079684d8c4ef61f94196585827ee26b010c85c",
          "commit": {
            "id": "7154d646cb343aa28459ffbfb5a1ca7057f3c8d7",
            "parent": "b388203a65251b73dba040148039914062685c88",
            "tree": "24ca75366da3bff9f7d8e1a4960aa6bfe35ed344",
            "log": "(wc): Declare per-file counters and `linepos' to be of type uintmax_t.",
            "date": "1998-04-12T09:12:21.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "da05631a8e2c41e89eedb1f195ed5fc1cdff435d",
          "commit": {
            "id": "b388203a65251b73dba040148039914062685c88",
            "parent": "66c7b3c41d44c5153e9e7cc93eaffc3cddc0aadd",
            "tree": "8e3ef9af38a5d7232937ee76c4d1fe63efcb1603",
            "log": "Include safe-read.h instead of merely declaring safe_read.",
            "date": "1998-04-11T18:24:09.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "7ee31f9beff86daa9529f7c299d3e8c63eb48133",
          "commit": {
            "id": "ac7b3c4fa9ed57b536207950255f71f0d0cd3448",
            "parent": "b402870080b5a3c84febb6c9de0b3977d1c0f010",
            "tree": "e32c9525eed1ad21e7ef59fa804f1ede0ce0deab",
            "log": "[HAVE_INTTYPES_H]: Include inttypes.h.",
            "date": "1998-04-11T18:21:24.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "aef35570f1a26d413397ff0dbe20106dd5ac56c3",
          "commit": {
            "id": "b402870080b5a3c84febb6c9de0b3977d1c0f010",
            "parent": "1cbe202b0ac6f8429cf3b3f7c60d6583afa24d9b",
            "tree": "c1bd86cdcdd6ae0dc2d4475dfaaf03c4230222b5",
            "log": "(noinst_HEADERS): Add safe-read.h.",
            "date": "1998-04-11T17:53:09.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "577c71dc7a4e68333a8e00d18276e17643521305",
          "commit": {
            "id": "00ea94587fb469e6a998ec47e0d50be992299f2d",
            "parent": "49875c159374b2b3209fe30718b48d9f33725573",
            "tree": "c509ea8cda386cd6f3ac490f8be71bf3754b3da3",
            "log": "indent cpp directives",
            "date": "1998-04-09T07:28:10.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "aff6b62fe3446c399f4fe7e236f1e2341c2f3bf9",
          "commit": {
            "id": "d6174d58f939754a7da6117c69e9d3344db35719",
            "parent": "ea3c071c2d436dc59a3a98dbe71ab28dbba0d263",
            "tree": "01e120922e2c000e2cba9ef18a29fdb1cb0061ee",
            "log": ".",
            "date": "1997-11-03T04:52:50.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6a866dca5ab9b08b28a5c91ca8820775267b118a",
          "commit": {
            "id": "05bbdbd786c3ceefe4e57e8930c5bbe0918d3e58",
            "parent": "54abd850106b7c1d65da6dbd7683cb48f52935fd",
            "tree": "4f208c67b33b642a5e464ac19ea2ec7deb78d049",
            "log": "update bug-reporting address",
            "date": "1997-10-07T23:53:36.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "d268d6503e490d3cc7d4376103cce5189a0a14a5",
          "commit": {
            "id": "562488ee9c86692635a9784c993f57dd3ce8adc7",
            "parent": "3e9c9be49e35227ef1e97efddef7c5f09463f67d",
            "tree": "a43e00bc430d793e5607320198d4ec2ed90247ac",
            "log": "(parse_obsolescent_option): Give warning diagnostic for",
            "date": "1997-02-09T04:44:47.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "114b27dbe7aa33141effca9029fab2ef76f6237c",
          "commit": {
            "id": "a882d55b5246251a558ad2c05c5547b76a8f0efb",
            "parent": "899a90bfd951946003f3aa7932d0467de5d12c5f",
            "tree": "879748321773ca97caa27b6bcd17de8f3c6384e8",
            "log": "bracket bug address with <> and append a period",
            "date": "1997-02-01T04:24:08.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e101b903320a1e6da71162c182e03b0f6ca4aa33",
          "commit": {
            "id": "1e40423be84cc3e594d7c64c923f39663549dcca",
            "parent": "0c5ab92b5932030439686d0a56efa5fea814ab13",
            "tree": "ff582681a35fc5f8d37aa5979c8ee3269323592a",
            "log": "(maintainer-clean): Remove GMOFILES.",
            "date": "1997-01-30T05:28:37.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3f384480ba1fc0ff41c788d36cfc2f826f359c97",
          "commit": {
            "id": "81024044659c48de8fa65fc1ea44071bda7db7eb",
            "parent": "bef51e36a455b219b16ef68d52fe281709e9c077",
            "tree": "0beadb349d6a6b3837fca2afcedf007a4e62838c",
            "log": ".",
            "date": "1996-11-23T05:04:56.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "48b0d45d6e2392694b4ad9e16e8a29452188ed8b",
          "commit": {
            "id": "2e5585410022bbe330b01e1d65e3f3c63bee1c1b",
            "parent": "8114f3fcdb152904ca4e47d1111d1dd330cc375e",
            "tree": "9ff2c592bdf371415ce9d3374ba1048b4bf73a22",
            "log": "change bug-reporting address",
            "date": "1996-11-03T03:16:23.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6c7e6e64ce1e280e059d928bd9e5f4288f40fad3",
          "commit": {
            "id": "87b19e8a11826de97e1bd2204564bf68097a3f35",
            "parent": "a1c6ed64c0e25ba9a35c4180facfd4fa1bcf6dff",
            "tree": "7407a29337e47e47a5a18339b03288e914d39dec",
            "log": ".",
            "date": "1996-11-02T19:24:35.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4bd20b42a1c19a2953cf4eeb37439f308a414231",
          "commit": {
            "id": "de05a873ec03684edc6229e86282886ece7e53d0",
            "parent": "3361bd2bca857df4e502280400aa88a7cebda588",
            "tree": "7eba5ad872d6c9def7419d41d87510843580698b",
            "log": "(main): update --version output to conform to coding standard",
            "date": "1996-10-04T04:16:01.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8834b2a5338eb4f3d2933356de8a84dd8477be5f",
          "commit": {
            "id": "1c6698b17da173119b57c0faed1f175896020241",
            "parent": "a3edb3f940a0bb7385e9f5846b67e3a8c8295e6d",
            "tree": "4eacf95642a1f14afba15d2373e2945ec4c0f676",
            "log": ".",
            "date": "1996-10-03T02:46:05.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6a05e844d0b8e5d1d1eb3ad90573522edf84aca2",
          "commit": {
            "id": "6a52479e0aee37a718a92fa3c1cf1f5816ad0954",
            "parent": "1cd5fb882cdac04f12ba8f21e93935a80993ffa3",
            "tree": "6c3d51d8e9c00825f23e20b43d0d1f2bc366eb6e",
            "log": ".",
            "date": "1996-09-02T14:12:33.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "7f59cf5bb3849920bc660d85d882331b3382a13b",
          "commit": {
            "id": "e6eece157594b44057c1400ca546110574d2cb36",
            "parent": "8fbeb80792052f147d3d9f59a3299fe13d390823",
            "tree": "334d5b8f4c431807c31f16ec18f209cdb91866f6",
            "log": "update Copyright years for 1996",
            "date": "1996-04-24T04:45:54.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "9b98d45865e9bdf51e897c94c1db02b5d78988b3",
          "commit": {
            "id": "47f70113d4342682a6408f85337676f1ccb7e8fe",
            "parent": "2fa0c16e5e11ff23fb4e57246a21d9d0ef731caa",
            "tree": "e0a69d9a12ac5b336364cc0191f2390d5061fd50",
            "log": "Exit with status EXIT_SUCCESS or EXIT_FAILURE, rather than 0 or 1.",
            "date": "1996-03-24T14:58:01.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5338b0e97ba1e17a922cb18711b651458a35f7ea",
          "commit": {
            "id": "2fa0c16e5e11ff23fb4e57246a21d9d0ef731caa",
            "parent": "8060afb088496bdce06c5916f8e7eee398e1f79c",
            "tree": "d2976150260c595816869c45272f98f26e99abc3",
            "log": ".",
            "date": "1996-03-24T05:15:00.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "10875887abeb35aadf48f2631a6d8eabfb02f347",
          "commit": {
            "id": "92d78458e06f471854fd448dce0fb0e1bfc14173",
            "parent": "dd5db064679caf2fe14a64f1873b1be7db461d57",
            "tree": "823592d6bab39ef109af44af8a54383311dbd4a8",
            "log": ".",
            "date": "1996-03-21T13:00:25.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "27db2a436dcf1c7e5676997ab3dfc906224a2a48",
          "commit": {
            "id": "688833b80eb8394b7246eae84766ae1e606ef663",
            "parent": "ca0246a4c13e8414a35263997b8a7b71ca28b71d",
            "tree": "7b685eba1532b06a7e91b44c78d4cd141e5bbb1a",
            "log": ".",
            "date": "1996-03-16T16:54:48.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "bb903f1a290f87ffa5b890d370cc238ffc3f217f",
          "commit": {
            "id": "de0fdbb080e3902f2a6d4ee795b6322565df424b",
            "parent": "e6800f5073314470f97a6529f20e0dfb59205822",
            "tree": "633edd44697c894e6e902d3333e069ab092818cf",
            "log": ".",
            "date": "1996-03-09T20:17:53.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "17d67e587b2db7bf285337ac7b0366bcf66159ec",
          "commit": {
            "id": "0402200daf1f34000f50eaef97a26ea824ac3e68",
            "parent": "dc0708fa823578533ed53e1ff730fd97d46f6b20",
            "tree": "1dc019a370fbf98238a7bf466dcd46b77d99b73d",
            "log": "Clarify usage.  From Karl Berry.",
            "date": "1995-11-26T22:09:43.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "cfa28bbbee0ce84c2bfad08edf2e6470023fac1d",
          "commit": {
            "id": "47eaf4a1e815553fef112a5afe2ebc1c00c3a15f",
            "parent": "1e30b2f8c4b0ccb5597cd31aca1b51e6951a3bdf",
            "tree": "63e79879f527e1934aeaeb3ac2a8448f61e6a25f",
            "log": "Protoize.",
            "date": "1995-10-30T21:01:35.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "40b6c2e3d64adf59c9e016b194f5053f0483e72f",
          "commit": {
            "id": "1e30b2f8c4b0ccb5597cd31aca1b51e6951a3bdf",
            "parent": "84df8be86408de0466357f5543ba866477036c77",
            "tree": "5467bdd4b3cf63748e85668a006ba9f8dbca4673",
            "log": "Reorder functions to obviate forward dcls.",
            "date": "1995-10-30T21:00:36.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "2a604cfb20421beed4d8f9c3288e5a9b21c3dcc5",
          "commit": {
            "id": "84df8be86408de0466357f5543ba866477036c77",
            "parent": "f05befc26c046bb3ba37a8de003a3c38c7711a58",
            "tree": "052b8921ba46d479e9ab5ad04ee1b5571fb23c95",
            "log": "(eaccess_stat): Make static.",
            "date": "1995-10-30T18:00:05.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "9346a2dbd79d443633e21a2c5b449cfada6f770f",
          "commit": {
            "id": "22ebf9c6ac7640bf58cfa9662eae765a61bf9f0f",
            "parent": "5fa76547cf0fc73da7a1d2131f1243fc7a608ad4",
            "tree": "8df47158b145781e05310260d8f86f41f7cb4ce0",
            "log": "Sort examples.",
            "date": "1995-08-06T20:02:27.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8c812ca38ccf8cbc831b6e84a68324ced74eb002",
          "commit": {
            "id": "8c17f50aea64f125655602fe2c2efb8855e88d9d",
            "parent": "28e28e6d749747b1b77878d31308c665195283ca",
            "tree": "4576f346cc5db8790f320fdfca64cf7b0de7a465",
            "log": "(tail_bytes) [from_start]: For regular files, seek",
            "date": "1995-07-27T03:56:35.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e8b1208270234bb64fe3921a37f8a8598f9ceb5e",
          "commit": {
            "id": "d96ba2d1532aabd28412c2331785f23a7ffb967b",
            "parent": "2adaaa85210a951f211735a41e626a60d52751e8",
            "tree": "eab9bf3f14c2918ce612c396dba929f440a942b2",
            "log": ".",
            "date": "1995-06-18T14:24:56.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "257e3f983ec28370f224761045d584fea7406f78",
          "commit": {
            "id": "e8be969ec8dabc29cf0f55750fdde2a52cc0df23",
            "parent": "56c8261d7ea0cc01bc1cbab375fd19c449f4103d",
            "tree": "9cf578c9dae67c562bb74dbfac59c175e9673674",
            "log": ".",
            "date": "1995-05-13T14:05:46.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "ef76b7eb07acee57a3d211542497aadde36fd0b4",
          "commit": {
            "id": "c2c77cdc0f681ced186b82687e5f19a90337b56a",
            "parent": "d307cc738a23b5139d7c0119c9ec97bc25e2e76e",
            "tree": "955f85bb90ed38120fa93ef58d8588158d8832d6",
            "log": ".",
            "date": "1995-03-06T14:20:34.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "53d83876d259775ea5248ab1b9ca45988922aa4a",
          "commit": {
            "id": "b53cae84920f6acb8f71eb1e65fbbfd06745adc7",
            "parent": "861ff7f26cb8432a0ccada947e6cfae73a666e4a",
            "tree": "74b34ee75f00cb01aec75eadbf2a14a51fc48793",
            "log": "Always include system headers, but define-away any putenv prototype.",
            "date": "1995-02-28T12:08:03.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "fd75bcce7f28502ed8a15d97cd699e70cfdd0205",
          "commit": {
            "id": "0988b76df5070300bbea759077aeee9d003062fe",
            "parent": "8467987e4b5da93e8855edad9783f06cf30d4dca",
            "tree": "15eaefb3710f195250a4eb076cc7be0faa339988",
            "log": ".",
            "date": "1995-02-26T19:05:34.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1f362fd0958f26e657d93f4550ffe6f4cde720fc",
          "commit": {
            "id": "e1453c467f54f41f042efe2b87516868e5da67af",
            "parent": "a40b09272576ca916255f7cdeec66e03d9194056",
            "tree": "a6131e4e695b6e2fc18bcb28b10555cf6f4fe9ee",
            "log": ".",
            "date": "1995-02-11T14:15:09.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4d307cd18ec45dc4eaf59d30cf666df9d09c3295",
          "commit": {
            "id": "a3d2e589edcca9f8b511436027d2fd7f62c7849c",
            "parent": "15d9f70d1a5af7d27ac66de79be0514e8d09e5f6",
            "tree": "70d06870aeb7b2446e8ba6fae8a0a692a02098b1",
            "log": "(wc): Eliminate fstat call -- using lseek is sufficient.",
            "date": "1995-02-10T05:53:54.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "34b3e0872e722e59379f5e1b3e86cbfa641f961a",
          "commit": {
            "id": "15d9f70d1a5af7d27ac66de79be0514e8d09e5f6",
            "parent": "d131ddcf1fd7b00accdf61a35e8dcd212cb19387",
            "tree": "3b1ab71f649b1348326e85d32e1ac96465369099",
            "log": "(wc): Handle separately the cases in which words need",
            "date": "1995-02-10T05:34:27.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "7dca0f37d93f19447c2d58459b2c91b804b5564c",
          "commit": {
            "id": "d131ddcf1fd7b00accdf61a35e8dcd212cb19387",
            "parent": "05d1bec3e5a34449ffde7f71648084069b1319f5",
            "tree": "7c1d6c91c081b6beb2e042802aabcfa912c62a81",
            "log": "(wc): Add a separate loop for counting only lines or lines and bytes.",
            "date": "1995-02-09T17:15:17.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "34706ae675fc9b63ee1e1d169c231316d31d83cf",
          "commit": {
            "id": "05d1bec3e5a34449ffde7f71648084069b1319f5",
            "parent": "b968f43e9508fc16e225b749ce3368071630065a",
            "tree": "3b561f642ae9a632ad8fe11bf0eba17cf362ce3d",
            "log": "(wc): Don't overcount the number of bytes when reading from",
            "date": "1995-02-09T17:05:43.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "7086c96c00d1cc2280d91e9b3e1ed6dae33999c3",
          "commit": {
            "id": "b968f43e9508fc16e225b749ce3368071630065a",
            "parent": "5695b2f051f107d6651930bb1822af9dc84fa41d",
            "tree": "7f1b6aedf1b8d1921ffed1f71cda814f866ad317",
            "log": ".",
            "date": "1995-01-29T05:34:15.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "62da906466a47e6ac31f7235582acde9b4f6c845",
          "commit": {
            "id": "8d6c6946ddc86f8af7c2cad20bc4209ee5b3f88b",
            "parent": "029fcaa9139e51beb6afa0b96670c684260e8bfa",
            "tree": "dd8c1bc685db44816d2aff94074544262ea1e3ce",
            "log": "Include \"error.h\" instead of simply declaring `void error ();'.",
            "date": "1994-12-16T05:41:05.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "904efe5c902f0d8e9552f37b546f8ea27cb817c6",
          "commit": {
            "id": "6a76abbf9c911e179a4d6fbd38940077ad1a0f3a",
            "parent": "131aa77dd9cf1ecc0fb10afead3facf8bdbc0a45",
            "tree": "5d1312076efd5cb5ffb2d512e341d8026b78bc7a",
            "log": ".",
            "date": "1994-10-19T02:45:36.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6480c7872a9faa5994fe9a666b89045b242ab625",
          "commit": {
            "id": "31185771208980da2c1c5924a960538b158880a6",
            "parent": "bd3061bed95fc14478e958c95fe3b53911e74890",
            "tree": "327fc4ab3386066f4b63a769e6b63c31ccdb9556",
            "log": ".",
            "date": "1994-05-02T04:26:07.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3f1dd90aef43855d1cabd3351ae460bcab1c9cd1",
          "commit": {
            "id": "baaac7ac25ea615dfd014acb9fbcad56f0dceb6e",
            "parent": "7960ad7d8b7b2a57c416d8d15aea60a13c9b602a",
            "tree": "10e24cc66eaaa30af99492de7a42ae62ad73b6c6",
            "log": ".",
            "date": "1994-04-13T15:26:17.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6625b59f06ae9d939d314a04c1673e670737ac89",
          "commit": {
            "id": "4f90578a4f0cdb2e9f708d924dd67e6a5b9cd289",
            "parent": "5bed1ce3db1e36571cf796e371f38ae437daca89",
            "tree": "e6acc14527335adc52d86237e8cd3f2266862a76",
            "log": "* who.c (print_entry): Prepend `/dev/' only if ut_line is not",
            "date": "1994-01-07T00:06:38.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6dce782412f3475c53e8c794800f7216ffe7ec01",
          "commit": {
            "id": "d1df8c198d8878b77d1d1583bc7b3c491534616a",
            "parent": "df1e389479d422ebf9eb7a08ef3d60238776e9c9",
            "tree": "716a7debdc7eb431164b5e827db0f8f71a365590",
            "log": "merge with 1.8d",
            "date": "1993-10-21T22:08:53.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6e67ecb9b5ac09e24f84340899bd094e89238b1b",
          "commit": {
            "id": "df1e389479d422ebf9eb7a08ef3d60238776e9c9",
            "parent": "193e68abd485958da7811d9fb18015d151145347",
            "tree": "8cf589ac0041d09f57a6b347a339343a323d47e8",
            "log": "merge with 1.8c",
            "date": "1993-10-21T17:19:34.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "b484911d78cbb6de808299f8c64e363f6aaf8105",
          "commit": {
            "id": "3b5543d43131da003fcf75c5d9062da0199b3b88",
            "parent": "5bf316d15e9fb57ef165d9a93f8342f895cd6146",
            "tree": "025cae0397b194906c0d1d9ebad5d4dafac7f820",
            "log": "merge with 1.8a",
            "date": "1993-10-05T18:29:05.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "22aa533338e29a94547f0acd05244ce410f3deb3",
          "commit": {
            "id": "d1c5cbfcddaced8d64b23bc3f22bfc4082b58604",
            "parent": "5ca6750d57a9d89163cd3548758589d4ab14c75c",
            "tree": "684956921106115248c1a6e3263fba4309b0d698",
            "log": "merge with 3.5.5",
            "date": "1993-05-22T02:09:05.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "678e179aea08d133081fc7b824aaba8db324652b",
          "commit": {
            "id": "f7999d7584ad787f4e7432b7ad76cc3486bc7b0b",
            "parent": "236ab993af66a347349200119b15ff6ab62bb20d",
            "tree": "e1769261c6b1ac82b9ecaed02712499d93e653f3",
            "log": "merge with 3.5.2",
            "date": "1993-05-06T05:34:26.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5bb4f2405633ed5ed4ba06781e72859f2d4d5b1d",
          "commit": {
            "id": "19272693f57193a57e5c4c66f65c791b2ee97378",
            "parent": "8993498904ab594d404ce7b287beee37c6c5e708",
            "tree": "c5ce09b38b4c55be91b3d4e9d14c5298ab391c14",
            "log": "add --version and --help options",
            "date": "1993-04-29T05:25:16.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "f2d7918247f37607293c219c7121e15919219740",
          "commit": {
            "id": "f9a9be97e1792fb13bcd72b1bf82414bdb615788",
            "parent": "3a26bddda4fea256408b3cacec21a86be98cbc30",
            "tree": "6a33f9c4b8de264a6c292a49f6bae5a6d79b6660",
            "log": "Use David's definition of isascii instead of my CTYPE_PREFIX macro.",
            "date": "1992-11-24T20:26:20.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "72d6ea665525921eae81d4a5658cdad00f5eac1c",
          "commit": {
            "id": "40d0a06450310c7abc8b393f130fa76de682313d",
            "parent": "b25038ce9a234ea0906ddcbd8a0012e917e6c661",
            "tree": "663f8dfbc2061e8e96e6252c407feec2402085bf",
            "log": "Initial revision",
            "date": "1992-11-08T02:55:41.000Z",
            "author": "Jim Meyering"
          }
        }
      ]
    }
  },
  "commit": {},
  "tree": {}
});

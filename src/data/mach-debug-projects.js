const mach_debug_projects = [];

// 1. GNU Coreutils : commit history for src/wc.c
mach_debug_projects.push(
{
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
        "external_url_prefix": "http://git.savannah.gnu.org/gitweb/?p=coreutils.git;a=$OBJECT_TYPE;h=$OBJECT_ID"
      },
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
                "4": "Fix an Issue with Existing Feature"
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
                    "1": "Fix Typo in Code Comment",
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
        },
        "atomic_revision": {
          "name": "Atomic Revision",
          "keyboard_shortcut_prefix": "a",
          "input_type": "radio",
          "options": {
            "1": "Yes",
            "2": "No",
            "3": "Cannot say"
          }
        },
        "notes": {
          "name": "Notes",
          "keyboard_shortcut_prefix": "n",
          "input_type": "textarea"
        }
      }
    },
    "preferences": {
      "visible_attributes": [
        "revision_type",
        "atomic_revision",
        "notes"
      ],
      "filepath": "src/wc.c",
      "version": 1
    },
    "mach_project_file_format_version": 1
  },
  "object": {
    "src": {
      "wc.c": [
        {
          "blob_id": "72d6ea665525921eae81d4a5658cdad00f5eac1c",
          "commit": {
            "id": "b25038ce9a234ea0906ddcbd8a0012e917e6c661",
            "parent": "f33e06711c51330972e2adf07d21a4e69c8f44f6",
            "tree": "a4360f1b307910d9266f65fc851479c218219009",
            "log": "Initial revision",
            "date": "1992-11-08T02:50:43.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "f2d7918247f37607293c219c7121e15919219740",
          "commit": {
            "id": "925487607cfed5d4e68ffa375bc17941934dba07",
            "parent": "40d0a06450310c7abc8b393f130fa76de682313d",
            "tree": "d9333d9e8759a18b2ea1b3550319491cce519cb0",
            "log": "Declared lots of external functions and variables static.",
            "date": "1992-11-08T20:19:58.000Z",
            "author": "Jim Meyering"
          },
          "metadata": {
            "revision_type": [],
            "notes": "The static prefix added to function declaration (e.g. `static void wc()` ) ensures that these functions are only accessible within the context of that source file (i.e. `src/wc.c`). This avoid name conflicts with function declarations in other files and contexts. This code update used a feature of the programming language (i.e. local scope of static functions) to improve the maintainability (e.g. avoid naming conflicts in future) of program code.\n\nThe static prefix added to variable declaration (e.g. `static unsigned long total_lines`) allow accumulation of line count for multiple files. The value of static variable is retained between function execution. This allows cumulative sum of the line, word and character count when more than one file is being processed. This code update used a feature of the programming language (i.e. local scope of static functions) to introduce a new feature (i.e. cumulative sum of line count for multiple input files) in the software.\n\nSee [1] for more details about static function and variable declaration.\n\n[1] https://stackoverflow.com/questions/572547/what-does-static-mean-in-c/572550#572550"
          }
        },
        {
          "blob_id": "5bb4f2405633ed5ed4ba06781e72859f2d4d5b1d",
          "commit": {
            "id": "eb3a2516dba78740843793f755af412f24ac5330",
            "parent": "f9a9be97e1792fb13bcd72b1bf82414bdb615788",
            "tree": "f6d6f8c876d373ff98a21e69c08c4a2a194fc360",
            "log": "Convert static declarations of struct option to use new macros from",
            "date": "1992-12-02T18:31:56.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "678e179aea08d133081fc7b824aaba8db324652b",
          "commit": {
            "id": "2ff4fc16721b6caac08c16c851024b51b16a1824",
            "parent": "19272693f57193a57e5c4c66f65c791b2ee97378",
            "tree": "34d2aba87f63f370d03812e5c8660c2e84b3908e",
            "log": "add --version and --help",
            "date": "1993-04-29T05:26:22.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "22aa533338e29a94547f0acd05244ce410f3deb3",
          "commit": {
            "id": "9a96f7c461a5c7c53639d3f84bd446a6959aa1a9",
            "parent": "f7999d7584ad787f4e7432b7ad76cc3486bc7b0b",
            "tree": "df4468282d2a175bdfabcb9001f30b18f9686329",
            "log": "merge with 1.5",
            "date": "1993-05-07T03:09:55.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "b484911d78cbb6de808299f8c64e363f6aaf8105",
          "commit": {
            "id": "6587c39b3ad22a17a2525597bc8d4712916d29fe",
            "parent": "d1c5cbfcddaced8d64b23bc3f22bfc4082b58604",
            "tree": "0e841eb7fb9d97d3e8ae8c26bd4a6b2c337e0ee5",
            "log": "merge with 1.5.2",
            "date": "1993-05-22T05:06:39.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6e67ecb9b5ac09e24f84340899bd094e89238b1b",
          "commit": {
            "id": "712109716a7b75dda2d34751202d210acd879f6b",
            "parent": "3b5543d43131da003fcf75c5d9062da0199b3b88",
            "tree": "93943c37813a5b456347b7e6009ef10b9f782fba",
            "log": "merge with 1.8a",
            "date": "1993-10-05T18:29:39.000Z",
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
          "blob_id": "6625b59f06ae9d939d314a04c1673e670737ac89",
          "commit": {
            "id": "b869639f4661488eba0bb2d08020c6e71bb72627",
            "parent": "d1df8c198d8878b77d1d1583bc7b3c491534616a",
            "tree": "e325845ec7ca06b4d59fcc07e87020897c7c4d9b",
            "log": "merge with 1.8d+",
            "date": "1993-10-23T15:37:19.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3f1dd90aef43855d1cabd3351ae460bcab1c9cd1",
          "commit": {
            "id": "07cd9a8d1563ddc8627f762e67fffae95fd6ab30",
            "parent": "4f90578a4f0cdb2e9f708d924dd67e6a5b9cd289",
            "tree": "3ea6f2c5b82f78d41db79729b21986848d6e4e3a",
            "log": "safe_read and full_write + join patch",
            "date": "1994-01-09T03:47:21.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6480c7872a9faa5994fe9a666b89045b242ab625",
          "commit": {
            "id": "85842e28eb47efce87b5c3bca60d26c62a70679e",
            "parent": "baaac7ac25ea615dfd014acb9fbcad56f0dceb6e",
            "tree": "0ea2559818fd80e2484446b2bcd61087361f91c0",
            "log": ".",
            "date": "1994-04-13T17:12:17.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "904efe5c902f0d8e9552f37b546f8ea27cb817c6",
          "commit": {
            "id": "556cdce5c8a92c0fbb1d6d829edb28299b43c6e8",
            "parent": "31185771208980da2c1c5924a960538b158880a6",
            "tree": "101f01a0dcb280dc45514da8649395c11da3323e",
            "log": ".",
            "date": "1994-05-06T15:28:01.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "62da906466a47e6ac31f7235582acde9b4f6c845",
          "commit": {
            "id": "544baf5482a56229515f24806f35ab1a847f3504",
            "parent": "6a76abbf9c911e179a4d6fbd38940077ad1a0f3a",
            "tree": "c522a976b4153fe4225529d50bab5a186bf55eb8",
            "log": "merge with 1.9.1h",
            "date": "1994-10-19T03:39:33.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "7086c96c00d1cc2280d91e9b3e1ed6dae33999c3",
          "commit": {
            "id": "7323b7d9f2c7710bf836cd31213b7e0c644cebe5",
            "parent": "8d6c6946ddc86f8af7c2cad20bc4209ee5b3f88b",
            "tree": "59a49034b573c492cae9bbf0bd64e49e55e582ee",
            "log": "Include \"error.h\" instead of simply declaring `void error ();'.",
            "date": "1994-12-16T05:42:47.000Z",
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
          "blob_id": "1f362fd0958f26e657d93f4550ffe6f4cde720fc",
          "commit": {
            "id": "79c16924de3eb2ec2a7a66c506fc3fd8a330b4c4",
            "parent": "a3d2e589edcca9f8b511436027d2fd7f62c7849c",
            "tree": "2c104959653f7266361dab1e67385313449b908d",
            "log": "Fix example in comment.",
            "date": "1995-02-11T13:21:46.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "fd75bcce7f28502ed8a15d97cd699e70cfdd0205",
          "commit": {
            "id": "695dd1100332ca4589dfc7bef3b91035286a526b",
            "parent": "e1453c467f54f41f042efe2b87516868e5da67af",
            "tree": "8572e4722c43bcdfa0fa76f76068f0932eaf7848",
            "log": "(wc): Fix off-by-one error when counting lines.",
            "date": "1995-02-16T00:10:49.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "53d83876d259775ea5248ab1b9ca45988922aa4a",
          "commit": {
            "id": "06b585059b8ac501ba04a8bca3f87d64643fa743",
            "parent": "0988b76df5070300bbea759077aeee9d003062fe",
            "tree": "c96cc721bf87fda9dc14501c0cf46ff2d0a61e96",
            "log": "(wc): Put back test for S_ISREG.  On some systems lseek returns zero for",
            "date": "1995-02-27T00:07:35.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "ef76b7eb07acee57a3d211542497aadde36fd0b4",
          "commit": {
            "id": "40f6e920679bdadd5f391d8043347489d89993d1",
            "parent": "b53cae84920f6acb8f71eb1e65fbbfd06745adc7",
            "tree": "a7e513fc1cecc1a3a4ac468d687bce98aa419412",
            "log": "(wc): oops.  Add missing dcl of stats.",
            "date": "1995-02-28T12:50:35.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "257e3f983ec28370f224761045d584fea7406f78",
          "commit": {
            "id": "eba8aab7f2f6df8259287e977f42c0b3b234d385",
            "parent": "c2c77cdc0f681ced186b82687e5f19a90337b56a",
            "tree": "1ca3645573d54fb2042f80c7858c3bb55b95959a",
            "log": "add 1995 to Copyright dates",
            "date": "1995-03-09T22:20:59.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e8b1208270234bb64fe3921a37f8a8598f9ceb5e",
          "commit": {
            "id": "7cdc7a0bd9dfa7a106a27115eb6fa1a3ee0f28ad",
            "parent": "e8be969ec8dabc29cf0f55750fdde2a52cc0df23",
            "tree": "977d95cd30e4083cdebe7ce708c4940438689d05",
            "log": "(usage): Include one- or two-line synopsis in --help output.",
            "date": "1995-05-13T18:34:54.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8c812ca38ccf8cbc831b6e84a68324ced74eb002",
          "commit": {
            "id": "6ebaf82426c177a0d699c7a8d5985eb1b84a90f6",
            "parent": "d96ba2d1532aabd28412c2331785f23a7ffb967b",
            "tree": "f804ee8d758bef9d0eadb5f83dbaec3b359b873a",
            "log": "merge with 1.12",
            "date": "1995-06-18T19:33:31.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "9346a2dbd79d443633e21a2c5b449cfada6f770f",
          "commit": {
            "id": "8904d4a45c8113c3bfdf3ab809ef934545ce37e9",
            "parent": "8c17f50aea64f125655602fe2c2efb8855e88d9d",
            "tree": "1b81e2b7e9682c6cda0013fae5f9d27913e5aaad",
            "log": "Remove spurious space.",
            "date": "1995-07-27T03:57:10.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "2a604cfb20421beed4d8f9c3288e5a9b21c3dcc5",
          "commit": {
            "id": "92c50e7f527080fa7a1a7745d235f436ff7411fd",
            "parent": "22ebf9c6ac7640bf58cfa9662eae765a61bf9f0f",
            "tree": "e558f31db7be5292af01682042e2b2c121ac9b7f",
            "log": "Annotate localizable strings with _(...).  From Franc,ois.",
            "date": "1995-08-07T14:57:29.000Z",
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
          "blob_id": "17d67e587b2db7bf285337ac7b0366bcf66159ec",
          "commit": {
            "id": "334f8dcbb77afed18562680e090e27e9d5bc95a7",
            "parent": "47eaf4a1e815553fef112a5afe2ebc1c00c3a15f",
            "tree": "fff819059802b53780d666b9acd8f592dbab122d",
            "log": "Add `const' attribute to some parameters.",
            "date": "1995-10-31T02:21:13.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "bb903f1a290f87ffa5b890d370cc238ffc3f217f",
          "commit": {
            "id": "7956c1508120414a4e8e1c468133b0e0214103d0",
            "parent": "0402200daf1f34000f50eaef97a26ea824ac3e68",
            "tree": "2cd2b42ab8dcb0ad27efbe65c69d9b9268abdd90",
            "log": "s/non-zero/nonzero/g",
            "date": "1995-11-27T03:09:18.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "27db2a436dcf1c7e5676997ab3dfc906224a2a48",
          "commit": {
            "id": "715765a5487d2e37c4d48e216e6958883db6a41f",
            "parent": "de0fdbb080e3902f2a6d4ee795b6322565df424b",
            "tree": "05d3a6daffcd9629e21fb275fe387e06dc3ba440",
            "log": "(main): Initialize for internationalized message support: call setlocale,",
            "date": "1996-03-09T20:19:13.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "10875887abeb35aadf48f2631a6d8eabfb02f347",
          "commit": {
            "id": "4229a555fc6298ac0cbc6f76faf4eaea628bc80c",
            "parent": "688833b80eb8394b7246eae84766ae1e606ef663",
            "tree": "d7980c8872aa7269f1273c89400e20f8f5d51f88",
            "log": "Don't include version.h.",
            "date": "1996-03-16T22:30:54.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5338b0e97ba1e17a922cb18711b651458a35f7ea",
          "commit": {
            "id": "adb7c216b2f18c8b24881ff66cb916e37bc9ea41",
            "parent": "92d78458e06f471854fd448dce0fb0e1bfc14173",
            "tree": "be44dc8f3c2d5dd9f8616864b990d784f17c021d",
            "log": "(main): Declare to be of type int, not void.",
            "date": "1996-03-21T22:41:04.000Z",
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
          "blob_id": "7f59cf5bb3849920bc660d85d882331b3382a13b",
          "commit": {
            "id": "818d29db9bee7b3a87d677bb4bdd520b30924fad",
            "parent": "47f70113d4342682a6408f85337676f1ccb7e8fe",
            "tree": "4994682f8e7be50460c142ee85321f4e5f3a29e6",
            "log": "Call error with EXIT_FAILURE (rather than `1') as first actual parameter.",
            "date": "1996-03-24T16:59:11.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6a05e844d0b8e5d1d1eb3ad90573522edf84aca2",
          "commit": {
            "id": "59d334f4d4d81e34bc990c0eca1826fef7b67abd",
            "parent": "e6eece157594b44057c1400ca546110574d2cb36",
            "tree": "0669541e559e20e151d007eee79832ee6b1911d0",
            "log": "update Copyright years for 1996",
            "date": "1996-04-24T04:50:53.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8834b2a5338eb4f3d2933356de8a84dd8477be5f",
          "commit": {
            "id": "c609ba2d1300921fcd0bffd5951185e7c97ff4ad",
            "parent": "6a52479e0aee37a718a92fa3c1cf1f5816ad0954",
            "tree": "7687ccb04adc13183a76508f66a7d978f0207b33",
            "log": "(usage): Tell where to report bugs.",
            "date": "1996-09-02T15:34:25.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4bd20b42a1c19a2953cf4eeb37439f308a414231",
          "commit": {
            "id": "3361bd2bca857df4e502280400aa88a7cebda588",
            "parent": "1c6698b17da173119b57c0faed1f175896020241",
            "tree": "e0cc379ca2f25f07ac9c1407fa62db674fe8f655",
            "log": "(main): update --version output to conform to coding standard",
            "date": "1996-10-04T04:15:08.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6c7e6e64ce1e280e059d928bd9e5f4288f40fad3",
          "commit": {
            "id": "630b771f1b9e264af678554890bcec558a154b2a",
            "parent": "de05a873ec03684edc6229e86282886ece7e53d0",
            "tree": "f935e39e1a1b2d126aa9fa68d86ef74dc5a89eb0",
            "log": "(main): update --version output again",
            "date": "1996-10-04T04:25:46.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "48b0d45d6e2392694b4ad9e16e8a29452188ed8b",
          "commit": {
            "id": "b8e689dc67f219414801df5c398dbff1693f097f",
            "parent": "87b19e8a11826de97e1bd2204564bf68097a3f35",
            "tree": "ee20bb787beca8226230e645a9b8c1feb234db55",
            "log": "change bug-reporting address",
            "date": "1996-11-02T20:44:15.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3f384480ba1fc0ff41c788d36cfc2f826f359c97",
          "commit": {
            "id": "5582e6dad335facddf60ed0629c4d772f432d32c",
            "parent": "2e5585410022bbe330b01e1d65e3f3c63bee1c1b",
            "tree": "786c7ce2c2f6c8680cfbfc453a7cdebcae544f46",
            "log": "change bug-reporting address",
            "date": "1996-11-03T03:16:27.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e101b903320a1e6da71162c182e03b0f6ca4aa33",
          "commit": {
            "id": "e298f1f300b261e41db1a7516d99693986a2267b",
            "parent": "81024044659c48de8fa65fc1ea44071bda7db7eb",
            "tree": "ad56adabdb5c0877cd3405fe7b9d49232e28a965",
            "log": "(usage): Alphabetize options like sort -f would.",
            "date": "1996-11-23T22:06:55.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "114b27dbe7aa33141effca9029fab2ef76f6237c",
          "commit": {
            "id": "c2d2dec516bd776d6acba7637d2e9ee721394604",
            "parent": "1e40423be84cc3e594d7c64c923f39663549dcca",
            "tree": "9c653ac2059ce12ae9004342e22881af2c68794a",
            "log": "Compare getopt_long return value against -1, not EOF.  Use NULL, not '(int *) 0' as last parameter in getopt_long call.",
            "date": "1997-02-01T02:00:04.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "d268d6503e490d3cc7d4376103cce5189a0a14a5",
          "commit": {
            "id": "e077b7593bbb59b8e469281bbea5398ad717321a",
            "parent": "a882d55b5246251a558ad2c05c5547b76a8f0efb",
            "tree": "bf74f3df78a5b549a6df3d7af92a7a5fd43c0f14",
            "log": "bracket bug address with <> and append a period",
            "date": "1997-02-01T04:24:58.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6a866dca5ab9b08b28a5c91ca8820775267b118a",
          "commit": {
            "id": "dbc538f92b52087d99acd451103e6395eeb45738",
            "parent": "562488ee9c86692635a9784c993f57dd3ce8adc7",
            "tree": "18328d0b5987f7bf02a089b2edcb9d1786182248",
            "log": "update copyrights for 1997",
            "date": "1997-02-09T04:46:02.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "aff6b62fe3446c399f4fe7e236f1e2341c2f3bf9",
          "commit": {
            "id": "3f3f5666275c92dedf7a940dd0cba6158a86d325",
            "parent": "05bbdbd786c3ceefe4e57e8930c5bbe0918d3e58",
            "tree": "9e3778e847e555e86aba666e346180d4efb10e63",
            "log": "update bug-reporting address",
            "date": "1997-10-07T23:55:52.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "577c71dc7a4e68333a8e00d18276e17643521305",
          "commit": {
            "id": "ab5ff1597f5d734b711fbd95389cefcc8203d51c",
            "parent": "d6174d58f939754a7da6117c69e9d3344db35719",
            "tree": "68698b5fea816d265a3d9290a51cd9c7693e5810",
            "log": "(main): New option, --max-line-length (-L).",
            "date": "1997-11-03T05:08:36.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "aef35570f1a26d413397ff0dbe20106dd5ac56c3",
          "commit": {
            "id": "dddfcab3b3329257dd1d4859db8dbee2f20445e8",
            "parent": "00ea94587fb469e6a998ec47e0d50be992299f2d",
            "tree": "31291e778fcab3e3871b164c74aaf1da4515fbaa",
            "log": "*** empty log message ***",
            "date": "1998-04-11T09:24:28.000Z",
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
          "blob_id": "da05631a8e2c41e89eedb1f195ed5fc1cdff435d",
          "commit": {
            "id": "66c7b3c41d44c5153e9e7cc93eaffc3cddc0aadd",
            "parent": "ac7b3c4fa9ed57b536207950255f71f0d0cd3448",
            "tree": "3c4b4812329548d22a003c2d7043b92a69aaba82",
            "log": "Include safe-read.h instead of merely declaring safe_read.",
            "date": "1998-04-11T18:23:13.000Z",
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
          "blob_id": "15a38917a306364d05ff4e1361ca6db985ca4dbe",
          "commit": {
            "id": "d4257e63c7956d7a77349f0e3b693afa5e1ab9df",
            "parent": "7154d646cb343aa28459ffbfb5a1ca7057f3c8d7",
            "tree": "37c7c7ae817f492796a4b084772a4e2c39acedb9",
            "log": "Use STREQ rather than strcmp",
            "date": "1998-04-12T09:27:45.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "71fd4fb182c3156870a126c489647ba3c73d33aa",
          "commit": {
            "id": "dd9470cb58f9c668279aa8dab8164440b73daaad",
            "parent": "02fc5fa0d0a68fa070dcb93983ad20590e051164",
            "tree": "cf22a0d981deca2485740b4b6ec6efd6ae15793d",
            "log": "Change all uses of unlocked-wrapped functions to their upper case wrapper names.",
            "date": "1998-06-29T02:11:07.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "500958bdbf79197f7c2935b62d34c2a080cc54a7",
          "commit": {
            "id": "391c960cba3d7207149f5148d99c068331add803",
            "parent": "62f208d49356dd96fa40bc7f175297de1c349659",
            "tree": "375400da83e67ccf5eaa3e5e3d57d0065223539f",
            "log": "Update call to human_readable -- now there's one fewer arg.",
            "date": "1998-06-29T15:56:23.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3590bf54ae1c17bbd9cf080f55cc67b6a27b14b3",
          "commit": {
            "id": "6880f434c04f7e5f49121554fdeb99bf52ba88dc",
            "parent": "6606de8b811f254122c909646ae60a2ae5e64d2a",
            "tree": "0c6b9e6b76039fde463b7d589199d82e5bb9b833",
            "log": "update bug-reporting address",
            "date": "1998-09-19T17:24:05.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "9571fd9da0d8e23c4ed5656b07b2fce20b02c876",
          "commit": {
            "id": "f3ade72018002a21c32618af5300d9682f9d698a",
            "parent": "59998135d08d667353977036c6d532d88373f767",
            "tree": "e02753dfd5a4e8c851d0732bdfc561ecd0a13065",
            "log": "(wc): Use binary mode for input.",
            "date": "1999-01-01T22:42:36.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8e20e910419f7c0828c53f8cddfed49c285f9d86",
          "commit": {
            "id": "9fec9172beaf67d1e16ae13b1f3ac44135cc8363",
            "parent": "da258119328fe4af0e0aa0d6f292600732aa0bb4",
            "tree": "d787cf23dce38b0e2af16cc93c345f106c095801",
            "log": "Don't prototype usage as static.",
            "date": "1999-01-14T18:25:16.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "a105cafe2bab5dabaac16c8fd97dded20dbaafd1",
          "commit": {
            "id": "7568de86540328351e6c135e165df8acb6322c12",
            "parent": "16f3644da7042689f0fafb6d1860c7ff981b4d15",
            "tree": "c014c6baa0ae29cad7f54b1e80726a5d8627f2f0",
            "log": "update copyright dates",
            "date": "1999-02-16T04:20:43.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "97dc02520d88baf5870b57454361a7b531a8763b",
          "commit": {
            "id": "88cbad981787d34f3dc8118bde16416c12a50421",
            "parent": "0ae96f236175101ddc6c8f0eaf46d08f88173486",
            "tree": "1a8993c9e22726767a534efd76dd619bfc80752d",
            "log": "Include long-options.h",
            "date": "1999-03-04T05:36:10.000Z",
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
          "blob_id": "886b4484a9c8918c28a60a60b18c9f870bd18838",
          "commit": {
            "id": "c21cecaea84fb2d86a2873d23eb8e6d92a0bdd65",
            "parent": "1d47220ab215c10e3883915a24ae1318213fb4da",
            "tree": "807312038cf092b63b2cee21f69e1183979df674",
            "log": "Use AUTHORS in place of string in parse_long_options call.",
            "date": "1999-04-03T05:26:48.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4799ee446f3c1872dd0ba84c64042cf751bbee5e",
          "commit": {
            "id": "d815c152dfb4d796fce6debeaaf14f2ae5534337",
            "parent": "25abb410d417faa40faa7833c55e19ee2819f804",
            "tree": "bd7ddbcf36af5d84e3485faeaeb8ea38c8d58579",
            "log": "Standardize --help and --version processing.",
            "date": "1999-04-04T15:44:26.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "ced5300dd9018e6e146954e53e821e0d02dbaaec",
          "commit": {
            "id": "7387f60b8563a8fba885748cf4b1f8a4baf548d2",
            "parent": "8e369dfcaacf79dac646d5bcf8dc00de141b3d35",
            "tree": "b852dac8c32aab7ecbd032e4d0f04b9038ecb9d1",
            "log": "(posixly_correct): Declare global.",
            "date": "1999-07-20T07:56:59.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "bf78e7a7ee268061b2f088e5f774824ba3f3795c",
          "commit": {
            "id": "24f2bd8c9f62409ef7d7c919c9a53f438ee991cb",
            "parent": "ac8180336348bee878584b013d71f84e5d047f21",
            "tree": "0d30aa82a2c6c12ab2224c5ecffb9ded6a11caaa",
            "log": "Arrange to call close_stdout upon exit.  Don't close stdout explicitly.",
            "date": "2000-05-20T22:06:38.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "ac9ecf5773f011c5a33537d4ab2136ab684c11f1",
          "commit": {
            "id": "19d6aed7605a022576323c574c78a3d24ff84516",
            "parent": "c14f06f708d40ddb91d1e1e73111500e3e9c979c",
            "tree": "1293385c09ad1367e1a2ac9ba40702502087e6a2",
            "log": "Add support for multi-byte locales.",
            "date": "2000-08-11T09:20:31.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5520610d0d4fc07fcef066608db2bbeaabffe3a4",
          "commit": {
            "id": "ad3a1fbb8289be18fae8734c428df5081c560e7c",
            "parent": "82cd6af9bca49b1818a17a61c01e0b7f3b0cbc22",
            "tree": "d988743b2d5b3707a2bd1b17abb6a7f74512883b",
            "log": "Include \"system.h\" after wctype.h (not before) to avoid",
            "date": "2000-10-30T15:58:59.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "00bb10c77783e8b228b459a97655b0d9755ae752",
          "commit": {
            "id": "e4db8d3b54852866011e3a30983c18ba3efd55ce",
            "parent": "ba74efc7c69fff13d3c02bb11e809167b0f3dfc9",
            "tree": "3925352e81faa37fa6058297fca7bb7b33c4959e",
            "log": "(wc): Rename innermost `buf' to avoid shadowing warning.",
            "date": "2001-02-19T08:42:25.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "c6e447c0c7676dbf0727691f8082d25a0498ef9c",
          "commit": {
            "id": "868e467701ba47024ad01539cccf3aed99d10825",
            "parent": "dfbabfe75826abb183859c88300653dcb8d049a0",
            "tree": "8505ed4fbac16cb7d294af555d15f6f7b80c2cd0",
            "log": "(usage): Tweak --help output: s/line,/newline,/",
            "date": "2001-04-14T06:43:24.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5248acdcd6a9b7c60ffe11ef6911f26c6c16b73e",
          "commit": {
            "id": "41a201e991b0eef5f0c97b0f24b8d4d1457ff9a1",
            "parent": "4c83ec781b02b43c16f0d82c8c5c830721b138e6",
            "tree": "7d985a7fc93e71878583b4ec9a04498d7126dce9",
            "log": "(AUTHORS): Mark string for translation, since it contains the English word `and'.",
            "date": "2001-08-13T10:33:28.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "f92f124a3b24b189ce419273fa0234a0d026cb88",
          "commit": {
            "id": "cfcf052439b6884fe4627f63aa4d7c4d250ccdd2",
            "parent": "04b632033879392e3ffaf39ddfa703b96f77d105",
            "tree": "193768f587678e670b82ea2e0742cda90ab9cbf2",
            "log": "(usage): Split --help output into smaller pieces.",
            "date": "2001-11-11T13:38:18.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "fe9c2487340cbdc26ad3a970ec7e9b39fefb44ee",
          "commit": {
            "id": "909dc8c01d31c23ffe4e89f4ec68850b5d401662",
            "parent": "6f468fedb43dff9e6966ec73d3bb61a28d227484",
            "tree": "88e241a2b384bcd7a33a8f429283540e3d0d2f91",
            "log": "Factor out some common strings to make translation easier.",
            "date": "2001-11-23T19:58:23.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "14645fefd43e731f72b4b7c2c77ccf3a7811ed94",
          "commit": {
            "id": "afa12bc91246072ba505a8a1d57eba1486f33ee2",
            "parent": "c0f45e1e438519da401714ab98a6c30d3aa7c241",
            "tree": "35303eb9fadd6825b784b6989aa30ceb6971abb2",
            "log": "(usage): Use new macros, EMIT_HELP_DESCRIPTION and EMIT_VERSION_DESCRIPTION",
            "date": "2001-12-01T17:21:56.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "7996f7757165ccd48d81e21cf89571c3d554568d",
          "commit": {
            "id": "3a0a028c8c549e1aa38b7c39d371c696dc3d6a07",
            "parent": "0c3fd309031b720f2af0439673f479946b2446f4",
            "tree": "c07ad7475d87bad3cf60785099db4a8e682aba78",
            "log": "Reflect renaming to, and new usage of these macros:",
            "date": "2001-12-01T17:41:25.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1d638b8c20d1c931acceb388b690a51c30b31b1c",
          "commit": {
            "id": "8471372f24b80813e8b419afe41222ab1bfed7b1",
            "parent": "80f17f22f26b2df8c985e744742c47136ce6d530",
            "tree": "80d7fb9c1e4765234dbbaf46180e4f0b347e2c68",
            "log": "(wc): Use ISSPACE and iswspace in addition to hard-coding",
            "date": "2001-12-13T11:12:18.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "970497ac844b4d739619ffdd3882c8e0cae16ec8",
          "commit": {
            "id": "6cc8245afb6e6e021dac727eb59025a12c88f853",
            "parent": "93066fab5134692b3b2355425857be2df9f694a1",
            "tree": "5ef36599e0ce830a477a4e86cc992901464f0770",
            "log": "(usage): Adjust ordering to match that of default output.",
            "date": "2002-04-25T20:38:16.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "062a7dd057074a7020f433a18e932bdb470132c4",
          "commit": {
            "id": "5a731510b2f53cff57266fcd006e61e8743e86df",
            "parent": "d23970e52ecd6553cc8885a1ebd31e245b184a61",
            "tree": "fd40885c05f7275c0cca8761c90ef12ed6d3ce12",
            "log": "(usage): Use the PACKAGE_BUGREPORT e-mail address, rather than hard-coding it.",
            "date": "2002-07-02T09:06:33.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "2ecb3be244817f9252352a84b24b84d4cfcba14a",
          "commit": {
            "id": "3124a4e39341371d69097cf276fc00bd65a0e5f1",
            "parent": "f7f7207a69ad5e5b1a5a617f6a76986f54888960",
            "tree": "9d09a01198e030ddf72ba599dea3fa7c2631b3a9",
            "log": "(main): Close STDIN_FILENO rather than a literal `0'.",
            "date": "2002-08-25T14:32:02.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "c7688bdd77f81bc50725838b0d0b8feda3714b99",
          "commit": {
            "id": "4006f4e672123e0189e58d4f76b58d06ae30eb94",
            "parent": "74887031996e79df07dae9711f08d80839b31e62",
            "tree": "8a56a42aaa14b061c6181b43d9b3c6d78de83f5b",
            "log": "Change `exit (0)' to `exit (EXIT_SUCCESS)',",
            "date": "2002-08-31T08:52:10.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "858d3cecc8c424077e952c767125f3f6288796b3",
          "commit": {
            "id": "003ab9a58d36f9690a78e05048ef92b030893ac4",
            "parent": "709d79631a25a48e72c6fc232c7f23070b1f3ca0",
            "tree": "98d30253a561c82007e7e5856bd79cecb8306945",
            "log": "Remove all inclusions of inttypes.h,",
            "date": "2002-09-22T06:41:02.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4a1852732a8719dac3b19283e94e72b154f99b8e",
          "commit": {
            "id": "e995dcb2d5177d64fa5711695f625b605b5bd265",
            "parent": "7db0a344887500e3139f0c2e16b452f6d302a6b4",
            "tree": "9a817eed416fee9061c2ca04027d9a03f01f95c4",
            "log": "(wc): Adapt to new safe_read ABI.",
            "date": "2002-10-09T15:07:52.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "733d32d85e5a8f36748aa54c34897b3750d6c406",
          "commit": {
            "id": "4c16b8d35a631c86bdac8296d8d7a96eb70c7287",
            "parent": "f3fc3d47268365532b022079de28528bfbf082a7",
            "tree": "23be65299d859f588f1314a565813e13b5ad84b6",
            "log": "(write_counts, wc):",
            "date": "2002-11-05T20:30:43.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5d520ff70ab5273cb048e7b4a4c82a4b8ae95a37",
          "commit": {
            "id": "92bbc5bbaf9341c5fe6eb108c8448d43dd701e19",
            "parent": "e07c146aa1bbed70eae79c5bb93756811180c2f3",
            "tree": "e5d41ff5b71798878d663c89c54ec1604a67ab51",
            "log": "(usage): Correct wording: wc prints counts in the order `newline, word, byte'.",
            "date": "2003-06-12T06:55:57.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "65bdb2ebdb780e6c5216def77ca9333df1e806eb",
          "commit": {
            "id": "6bcd4b08baf53737b37d7dcc2d92460133b2891c",
            "parent": "1844eee69a9c94701606f9d274fce3dc84b15f86",
            "tree": "4fa7886254143aec5763ecd765989ffeafc70642",
            "log": "(main): Call initialize_main.",
            "date": "2003-06-17T18:13:23.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e772511269af66dfd2ad6f6132063218e4c9af54",
          "commit": {
            "id": "6e1923f4c123c14796fa136d00d70f6148dd7cef",
            "parent": "32d2cea9b8b45c9c48ecfb8ac5741a43ac0863b7",
            "tree": "b0e463efe2cd041959b5d2f70427b893b2486f2a",
            "log": "(number_width): New var.",
            "date": "2003-07-20T15:22:25.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8f3f6791c8abc9925b5faef3f77e16b019e913d5",
          "commit": {
            "id": "224d5c81705cdf1cfc3add6a3fa14eb90fc3ed07",
            "parent": "47c0b910f1813f8dd1792ea113fd814e1f274293",
            "tree": "ce5ab857d4f9143869d4100367fa002eaf332a1b",
            "log": "(write_counts): Add a comment.",
            "date": "2003-07-20T15:45:29.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8647fd77dee3e9e5940d3b04a58e3813a91c7662",
          "commit": {
            "id": "1eb0fd1dd12316b4033605d95dd3111f1204ac64",
            "parent": "1fb0960527f7ce534048edb8e2a19826eba5043c",
            "tree": "dc269f27718a6d75092851b672455d0c14465340",
            "log": "(get_input_fstatus): Fix typo: `stat' was being",
            "date": "2003-07-20T21:13:04.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1ddd71105f0b642f2455e183f2c98625c0e47eb1",
          "commit": {
            "id": "3d0b2cc66a6d520094364e6af8d4f6fad49521c9",
            "parent": "a68226bb5b81fd6ffd5d65b8529a07c19e17811a",
            "tree": "e9cd201350648029395528c5e5566d86b182f8e3",
            "log": "(wc): Fix typo in computation of file from file_x,",
            "date": "2003-07-23T05:47:57.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8593c11845f20104e3c36d0bb55e64675aa355a2",
          "commit": {
            "id": "4f4e9aa8e16aaaf7dea9bb8053168316c0515626",
            "parent": "2841d4bb915564666eb9254c458d250c63fcf4dd",
            "tree": "5b03381bd66c1cf756b0b2eb2a4597365cfd5db8",
            "log": "Don't include headers already included by system.h:",
            "date": "2003-07-23T07:29:54.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e7a693594029e67a74be8ed631f32191f9dd0186",
          "commit": {
            "id": "dc141253935454486778655b0fdd08749bc31b21",
            "parent": "b42129829ac0ddc66a1c5f992bb691931130c7ed",
            "tree": "400ccca3592b02c82e49d3c61ecc164561fecd0f",
            "log": "Tweak Solaris OS version number in comment.",
            "date": "2003-08-09T16:34:22.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "061b4650044657f59d5e71a1af67bb5d4628c24a",
          "commit": {
            "id": "3280bf4b5571fd4425c7e6f7d765d08b77ce8d8a",
            "parent": "588291785cbab06fe461c6a45e4eba53e4e2f13f",
            "tree": "2e9536eaec036a182d71472659ee9cc055c1c31b",
            "log": "Update AUTHORS definition to be a comma-separated list of strings and/or update",
            "date": "2003-09-18T18:22:23.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e7a693594029e67a74be8ed631f32191f9dd0186",
          "commit": {
            "id": "c6ec14449470fce01a93bd0724ea3146c3ba3e7e",
            "parent": "2c5fbb29a6c44279b909a2a781cd2c3cb84bad0f",
            "tree": "6a222465ed5113f2f2f011396c07b2cefcae946f",
            "log": "revert previous change",
            "date": "2003-09-18T19:39:12.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4bdffc4d813868a18545ba4447d27235987904cc",
          "commit": {
            "id": "bafd927f03084ba6b12f7ff1b95352eb0e3a0a84",
            "parent": "424b8a4ff8081ee2c4c1ab29864cb62296acbe94",
            "tree": "5339ef1d5887269915d8f655bd78a5ecad443883",
            "log": "(WRITTEN_BY): Rename from AUTHORS.",
            "date": "2003-09-18T22:19:03.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "061b4650044657f59d5e71a1af67bb5d4628c24a",
          "commit": {
            "id": "cf4fdf373fa202877d8141fcf7c1ef655a8e06d9",
            "parent": "f81b126bd4e29178fb4a7c4b6483349f91360242",
            "tree": "22f66d8083fd94790ee8c94f3f4827d0c79ee482",
            "log": "Most .c files (AUTHORS): Revert the WRITTEN_BY/AUTHORS change",
            "date": "2003-10-18T10:05:47.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "b19a9c28b55f7bde3ce321d4b01ecfd7949ff1ce",
          "commit": {
            "id": "a5aaf05fbfcf36b80e4759ea1f40c37cb1313089",
            "parent": "c1f33f59f59af314aeb898e1c8d267dd5d808171",
            "tree": "72ebae52adc807ecab291329159e9953b034af08",
            "log": "(main): Free `fstatus' so there is no confusion about",
            "date": "2003-11-06T09:28:13.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "091c04386fbb21953fa4e7c3746c0f63f0859025",
          "commit": {
            "id": "1a013f63f9b2e15babbc30c84f96fb0cbe4b5cb1",
            "parent": "68e999b21f6d6e41b22c13ceea7bb3fccc39e707",
            "tree": "327b8eca633c9aac12ac68d05f94109727ef2611",
            "log": "(usage): Use EXIT_SUCCESS, not 0, for clarity.",
            "date": "2004-01-21T23:50:13.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5a4bec4d6ee1fffef40c9294f2b22e4bec8a3c90",
          "commit": {
            "id": "4de12cc0124f3574876763010b5f0c5cf9a67d91",
            "parent": "1956f215e1537dba38ffc4021e0511c2dcf21092",
            "tree": "908dd9344c90c3dd348726bac1c3a746f0f0ce9e",
            "log": "(get_input_fstatus): Use xnmalloc, rather than xmalloc.",
            "date": "2004-05-06T14:23:08.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5f8bb94e260c0848e458c71cb52796807c8e9441",
          "commit": {
            "id": "44956bb6b02214f2c31779217786deb85b4918ed",
            "parent": "a1e3a341a6eaee3e20d855a2447cfe510229c6f0",
            "tree": "f1f1e0034d94529a4625d3deef4cf5fd75a7e579",
            "log": "(iswspace, wc): Use to_uchar rather than a cast.",
            "date": "2004-08-03T23:38:10.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "ed65a11c5c1929547a93bc5b88b66972838ec240",
          "commit": {
            "id": "81ca57a91d18d157c0a1405b98641b8de00a0817",
            "parent": "718c00df82db6bc0510938e32266dbc314cd5f31",
            "tree": "77e722d6163e3d18b010656532e5c8ca8c6c2206",
            "log": "Remove unused \"case 0\".",
            "date": "2004-09-21T22:26:42.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "4b7098775c9c3ae287a769ba728d14fdd1c60f5b",
          "commit": {
            "id": "e098a29c751d998d8a6e4650e8a5ada54a0cae4e",
            "parent": "6eb01f34a60e149bfb70f4f2f15551441859abaf",
            "tree": "433f09cd4a4acc27144a5bf460decb803efe1531",
            "log": "Remove `register' keyword.",
            "date": "2005-03-06T16:34:01.000Z",
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
          "blob_id": "56db631de3f024952fd008419baa0694ae420f8a",
          "commit": {
            "id": "c0c815af8db441526ef112700b9185df6006c771",
            "parent": "4a3c27dd70f7672c18fb4def95cc0440644c686f",
            "tree": "47ece953ab9f7cf8169dc36049e48135c72983df",
            "log": "Update FSF postal mail address.",
            "date": "2005-05-14T06:57:06.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "3e451ebc8384b8b4bcafd0ab923b09452723141d",
          "commit": {
            "id": "44d59bb168eaf820bdfd13ee9df442cde795f9c7",
            "parent": "116e6fb2443d140959ea042865cd67b95aab3c47",
            "tree": "6e822b4d9329cf46115d6c0d6f36202d20ca6599",
            "log": "Update FSF postal mail address.",
            "date": "2005-05-14T07:58:31.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "98af229037dd64b25c0f429e99d88008454b93ea",
          "commit": {
            "id": "f3946fbee9a26999028e67e5f4ecef59b74eed38",
            "parent": "07fc234838d4bae0ddaa98ead2233ba2c98a1979",
            "tree": "e7d832d7bd2b634a816fb268697e81c2f7101224",
            "log": "(wc): Avoid setmode; use POSIX-specified routines instead.",
            "date": "2005-07-11T18:27:49.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "96747fc4db28af8d013b634030ff9e3558f6588a",
          "commit": {
            "id": "53a9b25dc2a50d2bcfb5b765cb6c9afaab23e0d6",
            "parent": "68b0358b66daa89cf499e6a4b455972df79f6a6c",
            "tree": "3d9fd684814a0b5a483cfd31c49d04bc7074a141",
            "log": "Test `!defined HAVE_MBSTATE_T' rather than",
            "date": "2005-08-12T08:08:00.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4147d7c11657d80c843c2bcccde4b7635323fde5",
          "commit": {
            "id": "f9a52f316ac276a95e63900ba533561f29b837ea",
            "parent": "9d66e1afee62a575d9ad815adaa4efae5bd723d7",
            "tree": "3fe4ef4c6c5bed4506bb136474b9cd67923d0d15",
            "log": "Don't define mbrtowc at all.",
            "date": "2005-08-13T22:47:48.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "29c624015cb0e5005aab9c846e3fedcc749b8f3c",
          "commit": {
            "id": "cc705714016dae0b64e50f535f8c2db284a83f80",
            "parent": "b2657ecc6a8193a862991bfb08cdc91c6cc5cb91",
            "tree": "d49898d58951ebcef2d4969be7d65ef2a5f49dd7",
            "log": "* NEWS: wc accepts a new option --files0-from=FILE, where FILE",
            "date": "2006-06-25T18:26:09.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1da5373e35373cf0902b7ca8c01b359a84c287b4",
          "commit": {
            "id": "6def7f622770acefde65603432c4bf216948d44e",
            "parent": "d77808bb40f70f60f6e0c2309a33fec36d36c4e5",
            "tree": "68f5a0baf56ba0c0db60199abe8974245b8d71fe",
            "log": "Avoid a segfault for wc --files0=- < /dev/null.",
            "date": "2006-06-26T08:39:59.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "f533b7ca68cfde2e9be652b9066db42f8dc30867",
          "commit": {
            "id": "197b96d06916887c4c167a3ee25edfdb3631ac71",
            "parent": "b3e1ad7a5d972ee947831e9d943a12c239864e72",
            "tree": "a80b97e630d7ad60e5479022aef34f3ace3105ab",
            "log": "Adjust to today's renaming changes in system.h.",
            "date": "2006-07-09T17:08:55.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "e21fb7f0572c8cb7bb227d8a19ce624b9d5f1d78",
          "commit": {
            "id": "05e03fc6560278ba81f78f397a00319e9df5a5ca",
            "parent": "0f7a044109b860443ecaa4f8a37652b1b4423057",
            "tree": "ab6aba763c2b2fa08236105ad511b3800f1df3ea",
            "log": "Add a bootstrap procedure, so that the CVS version contains fewer",
            "date": "2006-08-21T07:30:45.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "332f32dc4a57327fbbc69c63ef340df44c5e5079",
          "commit": {
            "id": "e245a66054cac00f2916fbc9436d926ea2cf4d1c",
            "parent": "489ff7f0cdaa63403aefcce778ea7214dc4e6808",
            "tree": "b36a56e3bede31be2c78a76e0bfe7db73670587a",
            "log": "* src/ls.c (quote_name): Use initializer rather than memset to",
            "date": "2006-10-10T22:57:07.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "85f7d33a97faae8c69c8c5cc50efbf02f60996bb",
          "commit": {
            "id": "a0faff1a58a96e008f45ab7c00e790dd2c397363",
            "parent": "59312fa3f99cbe5a4bb4f194a1106ea484d9bb0c",
            "tree": "aca8128d1151ed114a7647491e01bb4e942ef833",
            "log": "Help translators include translation team's web or email address.",
            "date": "2007-03-28T06:50:29.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "b4464d2c43658376a52ccb6c4740680b9d15c11c",
          "commit": {
            "id": "e82c7ddd4737d3e402cb6c73d91b50afe8c5b7f7",
            "parent": "8ab7f351a139ab25a14843c69699069242bfc510",
            "tree": "8499ecbe6d89853aeeee0465f99c4c3ce3c81133",
            "log": "wc: ignore multibyte-character decoding errors",
            "date": "2007-05-26T05:08:18.000Z",
            "author": "James Youngman"
          }
        },
        {
          "blob_id": "884f86a50c29143f96297a3111333545084eea96",
          "commit": {
            "id": "1cea914143cab171beaad1f3df60566bcfa48cff",
            "parent": "685d3c3f2adfabbf79b626f84be17170b59d449d",
            "tree": "82b8b17b86dbcc0d0e257c82f01537ce304d024c",
            "log": "Use <wchar.h>, not \"wcwidth.h\".",
            "date": "2007-07-08T08:16:44.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "5ffc4b43bdc29da306fa7fd3c0f72292cd0af15f",
          "commit": {
            "id": "33342c1a0a464f198df3f177432a0e98e482e7a4",
            "parent": "578332c0e2a2a2c843f27a5bc18275c84e491763",
            "tree": "26aa81e832cead167d91f6d5440861838498b3d9",
            "log": "Change \"version 2\" to \"version 3\" in all copyright notices.",
            "date": "2007-07-10T10:21:15.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "61ab485b4975ef2917691795ca1ccf29c7cd88fc",
          "commit": {
            "id": "71aa3ea88084d17bcb4fc1031ad7b66f8647115e",
            "parent": "5f606e6f1f0552c8af7b9cfbbafe3aad048bb99e",
            "tree": "76368c9a00e46e8d6a468850d0d0e36f1a658c37",
            "log": "Update all copyright notices to use the newer form.",
            "date": "2007-07-23T12:35:58.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1945504bc81b3cdba1769adce23c1573caed7077",
          "commit": {
            "id": "f0ad302ca9b8ec6b22bb3015aebdd4a1fd449ccf",
            "parent": "28c9d4ecff150942d46247076c8456dd79baf178",
            "tree": "420b7cc26e98c5dce80c7e06113b09b0012c0bfd",
            "log": "Speed up \"wc -m\" and \"wc -w\" in multibyte case.",
            "date": "2008-05-08T21:15:36.000Z",
            "author": "Bruno Haible"
          }
        },
        {
          "blob_id": "ebbb5b337c4f0a7b3739849d556c7e4fb3526ad3",
          "commit": {
            "id": "878e51ebfaf130f494957e7e6b5bce96d6e1eb13",
            "parent": "51243cdacacbde2c020846c22d81ab435f2f1f22",
            "tree": "e8e3e9ae473abc8c94e6d22916451f330a807605",
            "log": "du, wc: merge improved --files0-from=F-related diagnostics",
            "date": "2008-05-15T09:19:44.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "0fd138d070fa527058ea11b3a72a4a3905b6fbde",
          "commit": {
            "id": "be2abe31fd4d500a7a320e4e0598fb8bf78db352",
            "parent": "b69b4cca953a9a0a13edf026ea104d13dc956bd3",
            "tree": "29f881f89f8646b9148d705a6fa5f3ac35c7c819",
            "log": "convert 2-author programs to use proper_name",
            "date": "2008-05-19T14:26:25.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "731eb4a47aea934f2a21bd3af1ac68ec4da0cb2c",
          "commit": {
            "id": "434258ca739c0cd820f6359ee248ce2d196d302f",
            "parent": "eebe7310143d24dd1b510b2df75ce776e70934ae",
            "tree": "0742ed070ca09638eb2b9255a18adaf993b19305",
            "log": "declare program_name consistently",
            "date": "2008-06-02T15:47:32.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8073bb0f97278de9859b8e28110de9c886fd92eb",
          "commit": {
            "id": "896b672499d6a31a6caf85411bcbdde6edc57668",
            "parent": "1b0b6c8d08785bf9b05931371259ac710a806e51",
            "tree": "27683a9e32614e6ea09de5e06d7967164593bbd7",
            "log": "use gnulib's progname module",
            "date": "2008-06-03T06:34:09.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e6b9a1ebbc0c1ab9277575938a9dd4ba18c1efa9",
          "commit": {
            "id": "6eec737ade63bd48e0cccd66c021dd5523100f06",
            "parent": "68158e6b1025292c9cc540ffeebe560a0772d255",
            "tree": "654d2b69b59db68fd6679fdfc66fc8d86dccc7be",
            "log": "standardize some error messages",
            "date": "2008-04-04T15:13:13.000Z",
            "author": "Bo Borgerson"
          }
        },
        {
          "blob_id": "7990a7af190e0d00dd942439c7dabd4d3df5dd38",
          "commit": {
            "id": "1463824d8e7f72c31f1d803d7cfe2b608ccafc5c",
            "parent": "d42994df5d9deb7a5f6c43b5d171015535df8bcd",
            "tree": "42b3f693d772028962ac11af24d4c8d937359cd8",
            "log": "add \"const\" attribute, where possible",
            "date": "2008-06-12T20:06:15.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e6b9a1ebbc0c1ab9277575938a9dd4ba18c1efa9",
          "commit": {
            "id": "45e67188d6615820f5bb39cb6890c5b4dfca83c4",
            "parent": "3de15598304c141bdac5a3545874bab035536d88",
            "tree": "a5ef6fe5c6266ff8ee74ead1b50e7abada1c3bef",
            "log": "remove redundant const directives",
            "date": "2008-06-16T12:55:06.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "0bb1929f488b6ba18e957d7201648c39197dad92",
          "commit": {
            "id": "a67685628504d92b80eabe7cdc02c500f12b4873",
            "parent": "e2dbcee444e90e4289bd4bdc36783a5ef00af396",
            "tree": "55f09b93cd3d7454edf9b235815f0922c10a4d59",
            "log": "factor out time_t-to-string conversion idiom",
            "date": "2008-06-27T08:54:23.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "280d7ac885f2708bde33e47297acd7ed18f7ff8b",
          "commit": {
            "id": "03911ef780eae7d060963bf01ccaf594779b9420",
            "parent": "32d4d0dd5ececb6df73b233e9c868dc51868204a",
            "tree": "e40dd9d866a20c7e88d703557359037dd5661aaf",
            "log": "use xfreopen in place of unchecked freopen",
            "date": "2008-10-12T12:50:02.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "8cfd974cacfe0a04a9b0caa4f730715087b3e843",
          "commit": {
            "id": "00b5a2db33cddadf641ae2f01534514314d7e817",
            "parent": "e34894bf3f52f1600e5a334ddeec9c2a7e431853",
            "tree": "a8c936c2ecb95023ef0ad2f724c2d4b3334f841f",
            "log": "doc: Improve description of --files0-from option",
            "date": "2008-12-01T02:09:19.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ad25ed8d0570e2ad663a34fbe745b5b0ff2b1c43",
          "commit": {
            "id": "c58b5daa337b16416be50adfeb3e99e3c009c891",
            "parent": "80325aca2dc20c9f6ac0ac51fdfb2a12aee565eb",
            "tree": "ed91dec7768322eb9f09427036069239b210f562",
            "log": "avoid warnings about initialization of automatic aggregates",
            "date": "2008-11-30T21:37:42.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "65368f99431a10b29acae046ded527ab133e3ad1",
          "commit": {
            "id": "c2e56e0de7d86bdc0f824d758a7efde4d5d7b235",
            "parent": "031e2fb5e9501fb9cda4d739a92abb02e2b05a52",
            "tree": "acd3e00bd616d75dccf110ef810a9e74a1c787d3",
            "log": "wc: read and process --files0-from= input a name at a time,",
            "date": "2008-11-25T17:38:26.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "b1afe14952007797e67878693e0fc73463bd2e8d",
          "commit": {
            "id": "92465d59c678c5a8e8c4c0985eb6ecec4c391df9",
            "parent": "921feefb12e7f93c0925188b9b11f2e1fd775e33",
            "tree": "5f79e5a63b435fa4d8260bc7a82ca2376ad25c1c",
            "log": "cleanup/modernize: don't test HAVE_MBRTOWC; now gnulib provides it",
            "date": "2008-12-23T18:06:31.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "e6ffd1a5822af9d881782f94c298a430b45fe4f9",
          "commit": {
            "id": "8ed84c34388b3e475ece2f93ac22e25546503f16",
            "parent": "c55c0e736926178d317027fb8c938c266d7b0ea3",
            "tree": "018dc7c9796f43fe17badf9d0c493e69764a130a",
            "log": "avoid spurious parentheses/arith-op-related warnings from newer gcc",
            "date": "2009-02-05T13:53:10.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "0f7a368889749440b5109b70cd9df2f02178dacb",
          "commit": {
            "id": "5e778f7c8d1ecf3d8f11385db013af2ba026e2a5",
            "parent": "2bc0f3caaafeb240cdcfd050b7ad1fe0ad14addf",
            "tree": "e460d471f37f0dce1ba06f60f88114d1a65326c4",
            "log": "global: convert indentation-TABs to spaces",
            "date": "2009-08-22T16:56:06.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "15a723acbe8933f641c11ce71aea0ad1bfd9875b",
          "commit": {
            "id": "5d4f09d83a7c69110b4db97443759e9046c149e1",
            "parent": "c48003a53cbeee75dd34f5c3932a60ee97defb28",
            "tree": "150048d2ed16477e5259502ef1df2569e39bab94",
            "log": "doc: mention the texinfo documentation in --help",
            "date": "2009-09-18T22:06:21.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "52e899e97f0c914926839717562f72214ff05789",
          "commit": {
            "id": "a037e838e15c9a698f1634398e0fe2726398d575",
            "parent": "ade8dd2096e1898edefadf2314d4e1ec654adda5",
            "tree": "7361ac5f2c3dbd8fc4763e6fa960e6646670dc79",
            "log": "maint: Use logical rather than bitwise operators on bools",
            "date": "2009-09-23T09:10:51.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "48b5a4e39353314818143f00436b62c4ea379c6f",
          "commit": {
            "id": "11dc0016bb72372bbd46b964fb57f4d10448225a",
            "parent": "53db8d6479019474a14b8b858e83ace450195034",
            "tree": "eef2f1ed04939d441e60c26e6751564d3a84311a",
            "log": "wc: line-buffer the printed counts",
            "date": "2009-12-22T07:36:12.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "0698ae117854189e5dac02aa05a7c035da308866",
          "commit": {
            "id": "1aa17dc89b3f313697661541adca0aa0defbdc09",
            "parent": "6c8d432b1f70c80213b0a2244e2427ae3c1394ef",
            "tree": "19c56a4689f6137f1c912876a4e30a1cf382a1a7",
            "log": "maint: update all FSF copyright year lists to include 2010",
            "date": "2010-01-01T09:56:28.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "6df7feddfcdeb7e841a2e2b9664cb51342186aa2",
          "commit": {
            "id": "0a9302e7f796bc59a17f85fed00f0350c8330e12",
            "parent": "9e66806e2869504567761d632c806005d51265ca",
            "tree": "3f111ab0f521d1dc65fd3f48839b3406e0eaa118",
            "log": "doc: make wc --help say how it defines a 'word'",
            "date": "2010-04-08T09:58:52.000Z",
            "author": "James Youngman"
          }
        },
        {
          "blob_id": "a1922baf9fe12818f52ed8be31bc200886ea2302",
          "commit": {
            "id": "47076e3c7c22fc7557f388ad3d47228b922da71e",
            "parent": "63b5e8164847285f5d3c1dbc9f7c41ad8c17ccc6",
            "tree": "94f785d628a11e6c786f5aa85daa88d2a672b2fe",
            "log": "provide POSIX_FADV_SEQUENTIAL hint to appropriate utils",
            "date": "2010-07-20T17:51:01.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ae29f10547b91b005cb979d5e1e250c81e2cbde8",
          "commit": {
            "id": "0eaa993ae64d75c7b9da62c99e9e5f617b6a248d",
            "parent": "e66948c3b59045bf8b9f6bd1e0dcc3bb93488cab",
            "tree": "f6c8c108faa2d0e36b91576d662d7843bae6da9e",
            "log": "wc: fix a possible hang with --files0-from",
            "date": "2010-12-18T03:25:49.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "3afd4deabd86e56b193523c88ef2474757b90cc1",
          "commit": {
            "id": "9d6231ef2a74671fa08bc263519edfe46e8d1805",
            "parent": "257909013ef559418f612e8592f55b29dafda154",
            "tree": "03ac673dab3083a1589d4dd47aa077a840d21da5",
            "log": "maint: update all copyright year number ranges",
            "date": "2011-01-01T10:37:32.000Z",
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
          "blob_id": "03992147055f1bf232adfb090a6071df087f27c5",
          "commit": {
            "id": "caaf2899f67d312d76af91add2a4d9f7be2d5c61",
            "parent": "7cfd12c78e0be4c90f29c99ab383163aa1471504",
            "tree": "5b11c3ce27d9d74b258f7720fd2e3130617d0a20",
            "log": "du: don't infloop for --files0-from=DIR",
            "date": "2011-03-02T18:16:46.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "702a7a779c7bc99579500447a7be537c044dd2c3",
          "commit": {
            "id": "73fd918bd0f4417bb800bd569af69fb07ec65e72",
            "parent": "3c8ff029d4475eb79f69c98420f93e93a42a25dc",
            "tree": "cf0055d5c744d198930f80805ad74761266d9bd7",
            "log": "maint: remove -Wmissing-field-initializers workarounds",
            "date": "2011-04-26T09:30:05.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "d5a0afc23d6a84cfc31215898c43e482f8029eb7",
          "commit": {
            "id": "d0a9750e08a4cf0329f99a9956ab85f196a81263",
            "parent": "963d809ae9d2ff4bc4844d2ebaf64a74deb1ae7e",
            "tree": "f1a0c9ca465221c0f8c74126c314f5bf9acc6264",
            "log": "maint: remove useless (off_t) cast of lseek arg",
            "date": "2011-05-28T11:52:13.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "c4b5a9138f43678d7aee59d1a3ce03700d03eb9b",
          "commit": {
            "id": "84d048002e423dc85ae99bbb3372cd48dc1bfe72",
            "parent": "76d8e9abe18c3e3ed6dc37338b75140e06555cd5",
            "tree": "f790fcb7ed23c571dd9eb4dc637a35b30978e376",
            "log": "maint: use \"const\" and \"pure\" function attributes where possible",
            "date": "2011-04-24T17:06:39.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "43b46a3b9ca0bae721b8f8089ec1690e36ead92a",
          "commit": {
            "id": "2c558fd0d36162559574b7696fe485913cdd9066",
            "parent": "7700751c5feff007a1b5054769d0e8d90638a62f",
            "tree": "e66c011425b2910890f0978691af76c4594d8a87",
            "log": "doc: note the order in which wc counts are printed",
            "date": "2011-07-11T21:10:33.000Z",
            "author": "Benoît Knecht"
          }
        },
        {
          "blob_id": "bdd893aec8cc6a4e845f3c149f18a3a56084cf8b",
          "commit": {
            "id": "5111aa42968262bd4d44eeca277b194020bb5007",
            "parent": "75a21e62486521ba3d8ef518dc4740dc1adeb7f4",
            "tree": "055fe885ece6e346f0da5e8472df13b0810c7a07",
            "log": "maint: update all copyright year number ranges",
            "date": "2012-01-01T08:47:10.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "924732d8e010777e18162931f4953dc89ad089c7",
          "commit": {
            "id": "101d1203c667ec3ab54a026dde43117563d4e944",
            "parent": "22af6d97526e52e1fc14a86d811c92e421a67577",
            "tree": "b2391c4041f3122458342b77ba55f5f766ab67e5",
            "log": "maint: use new emit_try_help in place of equivalent fprintf",
            "date": "2012-01-07T15:54:26.000Z",
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
          "blob_id": "8c45af333ca1244436d5d457344f69f189580b4b",
          "commit": {
            "id": "3ba8b044267a5f7cfa8a7b0d7f19dab3f21431da",
            "parent": "a517386f1bf8c64ee7617cc2c9d0a16a1d85c8c4",
            "tree": "576e37b75cd77b289313b23676b6bebc08c1e23b",
            "log": "maint: src/*.[ch]: convert more `...' to '...'",
            "date": "2012-01-08T20:03:22.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "1b8a7a4f2cb5fd038bc77674c178c9eb0299310f",
          "commit": {
            "id": "d7878454cd02518959b0d6036db3a5b6ff00ca57",
            "parent": "3068c84765ca8bb0a5ba425664fb2e7454a8bbc5",
            "tree": "2f62fd5d7fadac095c0e9fbfc39140028dfa8a73",
            "log": "maint: use single copyright year range",
            "date": "2012-01-27T10:35:24.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "501737731d0eceb87ad815a24530c7ce08622a32",
          "commit": {
            "id": "b8a6996e258a2c30de40fb20cab0d17a38c3eff2",
            "parent": "a18ba2f10a739e1f0ef31cf0ebd60c8cf95d74f0",
            "tree": "4c84dc578458441a112a4bc3c874cf27eccb231d",
            "log": "maint: with split lines, don't leave an operator at end of line",
            "date": "2012-01-01T00:46:34.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "93decd7e9b37951cba3e2d0de9e4af76962be9ed",
          "commit": {
            "id": "77da73c75432f3c5b4beebae7b0797a1e33160bc",
            "parent": "a4838da139dde3739d9046153809939b8ccfe72d",
            "tree": "012cad68220079b5a79c46723d47f6897e418f56",
            "log": "maint: update all copyright year number ranges",
            "date": "2013-01-01T02:54:51.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "4909d9fe855e82ac5ea5c652dfe3dd03734fce78",
          "commit": {
            "id": "275c078fb43b25229dd5d6bb4ade596edbddbfd1",
            "parent": "68f96c0db1ee5a46e10b8b91c275ee4d8e335331",
            "tree": "a261320b1c76b534972682a582aea41bcf3105bb",
            "log": "maint: update all copyright year number ranges",
            "date": "2014-01-02T19:52:55.000Z",
            "author": "Bernhard Voelker"
          }
        },
        {
          "blob_id": "204802543ddd2e054e17e65adea62ca5ccab35c6",
          "commit": {
            "id": "8defcee49be881f8c7b8327f07b988fbe5c7171d",
            "parent": "72e470b9b5af77bcfd90ac175ed285877837ba20",
            "tree": "1ff1094a2d7fb53222831670d211ce60a408b866",
            "log": "maint: prefer 'return status;' to 'exit (status);' in 'main'",
            "date": "2014-09-08T23:31:14.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "1ff007dcffbe3b8fee262f7ca17d52b762731917",
          "commit": {
            "id": "8e93dc629727140e950a709008f9a17ca461af63",
            "parent": "1f2647b8affae8bf6907f790a399041812ddf16e",
            "tree": "73e81ea9f1be3ba95f097a3802dc7fdc750c97b4",
            "log": "doc: output correct --help references with --program-prefix",
            "date": "2014-09-18T13:50:47.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "24069f7e956ea379bd3b18dc1092f06c7d1dc043",
          "commit": {
            "id": "2662702b9e8643f62c670bbf2fa94b1be1ccf9af",
            "parent": "b020002b4bfae55d5bbcf66bd7ce787a4e6da689",
            "tree": "c82775c20abc304fa4f187218830dc3aa2f7e481",
            "log": "wc: don't miscount /sys and similar file systems",
            "date": "2014-10-07T23:46:08.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "8cb5163dcfa0a2436173917970d278fc660b4397",
          "commit": {
            "id": "e0afeb0099c899c2caa7453072e2d223d8f0ceb9",
            "parent": "1269bf58578615a8a5255d36582cb0736fd57227",
            "tree": "ccd8ac7d7bfade0fcee10dd25fda9cf92d6f2603",
            "log": "maint: update all copyright year number ranges",
            "date": "2015-01-01T04:49:02.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ceb48ed899c6c6e9661f1178b73f5f1dec0ac313",
          "commit": {
            "id": "1025243b6a0c8b8830b2d3676a97dae83c74d284",
            "parent": "e2e11119e0ac653bd0bdab91c189b7803f8df1f0",
            "tree": "94325b00bc4610e4af13fb6a88af7496ad683a04",
            "log": "wc: speedup counting of short lines",
            "date": "2015-03-18T15:32:19.000Z",
            "author": "Kristoffer Brånemyr"
          }
        },
        {
          "blob_id": "91f4a3145525a132c0bec2ba76bad20ad9509890",
          "commit": {
            "id": "56ff7a67601e79d9f7bf2fb946204a5482aa9302",
            "parent": "01fb984887ce6fdd71d563e57c6b59155a1f4cb7",
            "tree": "1a3e003b85b50592d134de49b7cbcf88391e1926",
            "log": "wc: use a more adaptive wc -l implementation",
            "date": "2015-03-23T11:54:19.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "fe73d2ce162931cafacdec602b6fdb1582433f44",
          "commit": {
            "id": "8878c4ef1b88fd07a48ccd7df6bff7ba0929dad7",
            "parent": "01f4065b129c6ad55eef765e701d0e20342867c7",
            "tree": "f427316aa66d271bfc031d1701629d5e2a69a212",
            "log": "maint: avoid -Werror=strict-overflow warnings with GCC 5",
            "date": "2015-04-22T00:07:01.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ae7ae952dc7348fccd551d87b7ab2db5779069ed",
          "commit": {
            "id": "e981643ae3e57affdf3f4f6aa8bf53cf06433f17",
            "parent": "88a03548248cac37662f5044df5c35152c5eb937",
            "tree": "410ea5b90407aabda7177a934bce47aaf01d4f7a",
            "log": "doc: standardize messages about the '-' stdin FILE",
            "date": "2015-04-30T13:02:46.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "eb7b5b69a0c4260661a8adadb34792fc79ec0dcf",
          "commit": {
            "id": "79111d1553ff6603199b9e8e5f27269d55b095fb",
            "parent": "b28ff6a3c6ad25d877b63013af245de5d6c70b10",
            "tree": "539ae7e25bec66577029831fdcd8a85e379dc2a2",
            "log": "doc: clarify the operation of wc -L",
            "date": "2015-05-13T01:46:29.000Z",
            "author": "Assaf Gordon"
          }
        },
        {
          "blob_id": "9fbaee7bc1e1bb8eccabb832e01e3e381c3eb0ea",
          "commit": {
            "id": "a645ce6c04719ad616ecd3bd7a16cd14772d6a74",
            "parent": "8bf2af685cf2cb1291fb03ec8a6942c26a7e0bd7",
            "tree": "b223ae17b9c075d76178b4ee1b02b232012c77ae",
            "log": "wc: fix reading of /proc files on aarch64",
            "date": "2015-07-01T21:37:26.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "fc66dfc73568a12c0ef442274f6854cc9a65eda1",
          "commit": {
            "id": "6796698c9945d87236ffcc939137d0919ef04931",
            "parent": "106d4bf159a97b573d6479473fa38216fb8bfada",
            "tree": "dd843e7808186887c2959451e34fdd7f42783359",
            "log": "all: quote string arguments in error messages",
            "date": "2015-10-27T13:13:59.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "30a08926f5eee82aace08188af8a6278a6ba2b41",
          "commit": {
            "id": "ab40a941a07d80326aaa051e3c94c88b800cbd7d",
            "parent": "00eb7af8ea30ccbefeb17213cd644b8f0ade1ef8",
            "tree": "382e656f126d0e63ca1158f8f43630e1dd10d18b",
            "log": "all: replace most uses of quotearg_colon() with quote()",
            "date": "2015-10-28T13:02:31.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "33b5ba4dd5b8554ae203ec76d12603f4c43dd242",
          "commit": {
            "id": "08e8fd7e38f2dae7c69c54eb22d508b6517e66e5",
            "parent": "1e8f9afac53a628dbc64e62bea53eb2da29c47fa",
            "tree": "63d021e305cd93bea445f9484fe8b3446dda2c3d",
            "log": "all: avoid quoting file names when possible",
            "date": "2015-11-01T18:53:26.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "17f7fd4defab0e283bb45a4200db29c1cebe7e94",
          "commit": {
            "id": "5f87f1ac1cb2ef44aac4284d8103e7556597a842",
            "parent": "2c5d86a8b8340b50ca1457923f9041143245bb35",
            "tree": "5111883a2ffcd6856d42d66e70980fb19c02409c",
            "log": "maint: remove form feed characters from sources",
            "date": "2015-12-13T20:16:59.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "c2a9c3fbe99186af5bc588792ffe3b90e7e091e5",
          "commit": {
            "id": "b16e999f553b682e74e0a56750f649da05130c4f",
            "parent": "81dce30cba6fbfd2166a22c6f0e190309c58bbe9",
            "tree": "ff9c4411e6738d3cfef4883df82d1a1a0dba1b77",
            "log": "maint: update all copyright year number ranges",
            "date": "2016-01-01T14:10:41.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "94cbaff9ad6d8fbadff74ebb1ad4a1101438e8bd",
          "commit": {
            "id": "3ed89ae9324026660dfefb5e482e91b8acc5262d",
            "parent": "672663e1b0afd68a10d991527fd5021c40c99acc",
            "tree": "77025a5cb78df0fd5ffad2929a3023181b37c4a1",
            "log": "wc: avoid ambiguous output with '\\n' in file names",
            "date": "2016-01-09T01:38:30.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "412bda0db540ffc7d0387c7414f30a23f7b9b9b0",
          "commit": {
            "id": "492dcb2eb191b844a2fd5e51db3eed85289bea1f",
            "parent": "d035eacfdeba2da0134e606c8a63b2f3c0bd05bb",
            "tree": "910f93d88891b573520ebd5c812d61ddc7fbeed8",
            "log": "all: use die() rather than error(EXIT_FAILURE)",
            "date": "2016-10-15T22:10:35.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "64df50cd9fc91cbcb6d8dae9e2d7d549162760e7",
          "commit": {
            "id": "9944e4763bb178852727812e8b188540772384e2",
            "parent": "f071b04afaeefbf6c37a00986fec02b8df5e9560",
            "tree": "02803ee9f30391c6c9c1520fd61fe7f57099af95",
            "log": "wc: fix wrong byte counts when using --files-from0",
            "date": "2016-03-21T00:44:09.000Z",
            "author": "William R. Fraser"
          }
        },
        {
          "blob_id": "a02379bf85cbb2391dfc5e8ae163682b20b14daf",
          "commit": {
            "id": "e17e5f40b81447a2af65b0e64a3295d5e2e86753",
            "parent": "94d2c6848b17b4e14235e80e6fa6af37aa76217b",
            "tree": "762ad410249552a67b467941acbcde0f8d3019a2",
            "log": "wc: with only --bytes, determine size more efficiently",
            "date": "2016-12-22T14:31:44.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "40fce685dc422dc7718d39de99c152beeb103bf4",
          "commit": {
            "id": "e7a2580b96370da03c4d3553ccdf4ee66a14c6a4",
            "parent": "b02631b14b2a155c4a233c8e8dad2569c159e85d",
            "tree": "0b3d7ab3f93d6de66ce6dfb92591cca1f1b8c426",
            "log": "maint: update all copyright year number ranges",
            "date": "2017-01-01T22:38:02.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "a587b2ca4eae6ec05b125abb61c47646bd8a27cb",
          "commit": {
            "id": "75aababed45d0120d44baa76c5107d0ceb71fc59",
            "parent": "e5cfadd6c7fa08153e56b950e72801677f7d1fe8",
            "tree": "5b4d628544b8640e489e356d881ff72ad6ff4db1",
            "log": "maint: use xsetmode, not xfreopen",
            "date": "2017-02-15T23:58:08.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "be4f3062dfd996703192dd35330989a446f55afb",
          "commit": {
            "id": "1c27b56095b4a82be7d072baabc09262cb4227e5",
            "parent": "a24e9cc55c36f148639557767a39958683577b72",
            "tree": "116db7c0c9eec1c6321db7e079975f897554ea7c",
            "log": "maint: xsetmode renamed to xbinary-io",
            "date": "2017-02-16T08:40:02.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "8a656c3d0bc201081367734d1a88ff160d0704b0",
          "commit": {
            "id": "28042c4ff56ce1c22d620d3a3b0d6f52d98dd0e9",
            "parent": "ba16bdd89064a58d828d557827a473fc02b0d5ad",
            "tree": "3342315f07a0affff3103d88ab337367279c766e",
            "log": "maint: update to work with GCC7's -Werror=implicit-fallthrough=5",
            "date": "2017-06-10T17:02:31.000Z",
            "author": "Jim Meyering"
          }
        },
        {
          "blob_id": "299a9665f68f49995f9abd69c7f6eb6abe9a3637",
          "commit": {
            "id": "1379bdc65b76471a344b2affc8f1e9b6188d1092",
            "parent": "18f6b22fe1eb4447b26fafd3bed1e6bb23c9adc2",
            "tree": "ddae4e04a297f46d5205365bd21f96fb23baf8b1",
            "log": "maint: use C99 for loop initial declarations where possible",
            "date": "2017-06-17T21:54:23.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "bd742f87d3209406f59ad1f6d99ea3c8fddf2bf1",
          "commit": {
            "id": "be87d61299f52e366bcb65fd176ccf325b0f77e0",
            "parent": "44ccd1c4657703b15971b0670b9716a25244a358",
            "tree": "c5e289ea68824ba407d5928e0e6e65d8bab51430",
            "log": "all: prefer HTTPS in URLs",
            "date": "2017-09-19T08:13:23.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "0c72042a0b28092ad4660671a7075ba299996dc5",
          "commit": {
            "id": "ece7157933fea925da10b5c3e7ace1f0fb2d9f50",
            "parent": "1d7db19cbad9a7b42ba84515b78b7898829b8e89",
            "tree": "a315c17439e5a23a57b79105d3af757f489418fe",
            "log": "maint: update all copyright year number ranges",
            "date": "2018-01-01T15:57:22.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "2034c42beebf58c7b6e593316014c7594235dc47",
          "commit": {
            "id": "77517a99179b728c6369341b0d36568bac5d7914",
            "parent": "21682faa5e9c2f7e1eaa39a938105551b0f000ad",
            "tree": "6e9c69fec2b0ba25f1855b58e02deaf3e3cec2f3",
            "log": "wc: optimize processing of ASCII in multi byte locales",
            "date": "2018-05-18T04:41:46.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "179abbe2c3919e4bc17ffc292ac302cf5dc47a70",
          "commit": {
            "id": "8dfcf38af1280c34d7c02b1bbed151368f6de211",
            "parent": "1f9152a50f16fb5979871e3c9f2db9f91dbc4dbc",
            "tree": "5c3052056419fa29f834d857194c17c219defdc3",
            "log": "maint: update all copyright year number ranges",
            "date": "2019-01-01T23:50:20.000Z",
            "author": "Assaf Gordon"
          }
        },
        {
          "blob_id": "23818042fbab1f6ff81773f3c194b27971de4607",
          "commit": {
            "id": "a5202bd58531923ea9f93cc35ddeec5e3a8e0189",
            "parent": "2ab2f7a422652a9ec887e08ca8935b44e9629505",
            "tree": "a7530c8d01d08dd8561c20b1512f330127d7090b",
            "log": "wc: treat non breaking space as a word separator",
            "date": "2019-02-24T05:23:47.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "d18eaee6c33e1a67b65f1e62bb427e8777bc0aed",
          "commit": {
            "id": "aaba82431ceca97441d56152d8c7ec2d84fa1d12",
            "parent": "7490e94aa7ea1ba50492e211fc415a6bda9de9ee",
            "tree": "30eddf3061f03e0fb2155a652ba1f4f96ca0d1d5",
            "log": "maint: update all copyright year number ranges",
            "date": "2020-01-01T14:16:56.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "5216db189920fc9ef36dc2c821a55db100234a95",
          "commit": {
            "id": "32ff1d1313ff566685b9092ac929251a4c22e7c4",
            "parent": "ffb7ebfa253a44f52808cade5657d7541eaccfa5",
            "tree": "cf01118a1dc28a1324f4e9d360752c5530153278",
            "log": "maint: update all copyright year number ranges",
            "date": "2021-01-01T16:36:09.000Z",
            "author": "Pádraig Brady"
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
          "blob_id": "d635e5214affde3f76b6a8cefec30fe43b3c49d0",
          "commit": {
            "id": "512fe0490254aaa3cb679237dafe9cc1bb7cd3ea",
            "parent": "ef772bf97f7ec577754cbb5b278504d83cf41a43",
            "tree": "2ecc50fd51f5a0808a410276d3b12ab4a92f835d",
            "log": "doc: clarify what's counted by wc",
            "date": "2021-04-11T15:24:07.000Z",
            "author": "Pádraig Brady"
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
          "blob_id": "bdb51928d846aad92364b05e4facf7575d3e4464",
          "commit": {
            "id": "e7fff54c92477a9f114b3f482b4f81a66144633e",
            "parent": "4064c57380621399b54217a64c2c2bed1d0dccd1",
            "tree": "e5e3db686c8b664b1b85b096e50fefce89941460",
            "log": "wc: add --debug to diagnose which implementation used",
            "date": "2021-05-01T19:02:02.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "ec2a4e18416ad92c1d116caa254c6664c6a34957",
          "commit": {
            "id": "2715aba08a381a6099c1c6b054995e6b3df785c8",
            "parent": "f8dc5a6215846f289d9e9c4c18a7c51f008f76d3",
            "tree": "f0f18d6e3f9f66065c6d33cea5aec93eebf6824e",
            "log": "maint: prefer rawmemchr to memchr when easy",
            "date": "2021-09-15T21:09:03.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "cea6f294e4e5d54560c1b4a1c3504a8329cc90d2",
          "commit": {
            "id": "389e7663671e6dbd5644f6381d23f46f6d341339",
            "parent": "bafff0019cad471b69036ab0d6d1a80c9285583d",
            "tree": "1f1ffc9e4029cb55bc9895ee6dcf6c906024d68e",
            "log": "maint: prefer attribute.h in .c files",
            "date": "2021-11-01T05:30:38.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "dee8233a606408ac46ad2bf785fa7572d7d7ad41",
          "commit": {
            "id": "3067a9293af07ba2cf1ababe6b4482196717f806",
            "parent": "76700e775e2643fdabe51f9c88e1718424f5b30a",
            "tree": "740aa850b6e950846e584d9a70f4287eb397f228",
            "log": "maint: update all copyright year number ranges",
            "date": "2022-01-02T15:42:45.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "bc52a8c0ea59c3708d5d06193a03404df33738a7",
          "commit": {
            "id": "ce2b875cd725d8d64aae5b1f250382f3fa987593",
            "parent": "627c9a97c1054afdbe6870f3b64d42e7fccaf9eb",
            "tree": "981b8a836395a7879424c83348037418346cbbf8",
            "log": "wc: add --total={auto,never,always,only} option",
            "date": "2022-06-25T23:27:06.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "df9770396a07d1a206d78d30355d20ccc5be68a0",
          "commit": {
            "id": "266b7cbc846f91e5f48085c7de68682f5841e2a0",
            "parent": "4bf990bf658d4070e74fc64b0fafef4d305af8f4",
            "tree": "d5c1f183ed8622126e4d739bdf0901733913b74b",
            "log": "wc: fix regression determining file size",
            "date": "2022-12-28T14:04:19.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "5f3ef6eee55c53e780cb4f84d400faf1a4483c07",
          "commit": {
            "id": "01755d36e7389aef48f712193976205e7381115b",
            "parent": "0239f2a782cb6b2181f29b34cd80c06bb704a2ef",
            "tree": "79391c24e545d8d4f251691c5fb345931b8dd35a",
            "log": "maint: update all copyright year number ranges",
            "date": "2023-01-01T14:50:15.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "801396a15087e2535309688e1e155f9381d597c8",
          "commit": {
            "id": "7ad749886cddc76860bd8cfc38a408032a5e4c99",
            "parent": "a9bd274616a8d2e99736b498e657cda4e6954f3f",
            "tree": "3ec78d113e52c0579a1e80411bd04d7c6a4ff437",
            "log": "wc: diagnose overflow of total counts",
            "date": "2023-03-29T14:29:52.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "becceda987692fd8319ade1e6432ee9d1bcaa0e7",
          "commit": {
            "id": "ce630dfc7ef32ff7e35c627bd061a45ce9053d9d",
            "parent": "f6c21f6d3addb6461c41af612e73fbb15d21545f",
            "tree": "e198bd7070f7ce510498c61af2243096e4913104",
            "log": "wc: ensure we update file offset",
            "date": "2023-02-05T19:52:31.000Z",
            "author": "Pádraig Brady"
          }
        },
        {
          "blob_id": "3708d0b8fb58ac3cb4562ad6047df01764fb5e5d",
          "commit": {
            "id": "91a74d361461494dd546467e83bc36c24185d6e7",
            "parent": "37890240730f0d0a24d3fd01357fb96955b29b52",
            "tree": "5e3ebe929531fdd6ced53ed5c93a67fe768ff370",
            "log": "wc: port to kernels that disable XSAVE YMM",
            "date": "2023-06-14T04:10:24.000Z",
            "author": "Paul Eggert"
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
          "blob_id": "30214655c74f8d337030857e10570398a408da75",
          "commit": {
            "id": "f780a85985f5b069ba8597aaeac49eb74864926a",
            "parent": "4ac941565fc1f7c1eb7954302f2ec20435fdf34c",
            "tree": "478b83a97c9a315cef56a315ec3dde4cb4b208cb",
            "log": "cksum,wc: clean up hw capability checking",
            "date": "2023-06-14T21:52:37.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "9f345aa7275a2f3980414b3c2e829235f26b315f",
          "commit": {
            "id": "16b5ca6e0df165bd8b9c2d8c7e4bc7d1b7efa25d",
            "parent": "e600fbb7648c206099177bb7a1d253f1dccd7409",
            "tree": "665d2e8164077b316fcfc5efa7d9915a145bd8bb",
            "log": "maint: prefer C23-style nullptr",
            "date": "2023-06-29T22:27:21.000Z",
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
          "blob_id": "1330734d51c7ccf00d584d43200671bab3867acd",
          "commit": {
            "id": "6d61667d0d874f6af7d618221505c395b383534f",
            "parent": "478055dc30b9d1565e6b577485aea824ef22b038",
            "tree": "6f46e831e3eb51a0db2184578833b0f05530e041",
            "log": "maint: go back to using ‘error’",
            "date": "2023-07-01T18:31:40.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "b1d82074d36fc2037e4390a6f81cf9fd0a420e59",
          "commit": {
            "id": "d727aba601c003ff9439df7775c4682b956968f1",
            "parent": "123d03dca47c4d8e0dc896dd8c5732329e6acffe",
            "tree": "edab98f981dc1146b54834f24d624393287ed6bd",
            "log": "maint: prefer ckd_add to INT_ADD_WRAPV etc",
            "date": "2023-07-01T18:31:41.000Z",
            "author": "Paul Eggert"
          }
        },
        {
          "blob_id": "29114c874fa06a08765f77f813a195127eb6512c",
          "commit": {
            "id": "2dddc87214503199a38beeb175cd42cbb43cdff1",
            "parent": "e3f15c9c4a0ca69bfdf7fada8b8697f627a7c84d",
            "tree": "ca6109cc31cb86e167a312a303b791aa303bcc43",
            "log": "maint: spelling fixes, including author names",
            "date": "2023-08-28T19:42:23.000Z",
            "author": "Paul Eggert"
          }
        },
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
        }
      ]
    }
  },
  "commit": {},
  "tree": {}
});

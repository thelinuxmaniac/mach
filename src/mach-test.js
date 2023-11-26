/*

Test specifications for MACH

Author : Abhishek Dutta <https://abhishekdutta.org>
Date   : 2023-Nov-26

*/

var mach_test_data = {};
mach_test_data['coreutils.git'] = {};
mach_test_data['coreutils.git']['repo'] = {
  'url': 'http://git.savannah.gnu.org/gitweb/?p=coreutils.git',
  'name': 'GNU coreutils',
  'last_commit': {
    'author': 'Paul Eggert <eggert@cs.ucla.edu>',
    'id': 'c7ec75a27687bc30627e70c9f14d80de778a0d85',
    'date': 'Fri Sep 8 16:25:00 2023 -0700'
  },
  'tag_count':371,
  'object_count':183569
};

//------------------------------------------------------------------------------
// [coreutils] Tests based on GNU Coreutils
//------------------------------------------------------------------------------
mach_test_data['coreutils.git']['test'] = [];

// [coreutils] retrieve tag object
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'cdecf04a474972dde9c2f4fde9876a2e23818395',
    'expected_object_type': 'tag',
    'expected_object_size': 979,
    'expected_object_value': `object 201ba1a2034433e95b2647db4939d2b335cadcd8
type commit
tag v8.3
tagger Jim Meyering <meyering@redhat.com> 1262884406 +0100

coreutils 8.3
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.10 (GNU/Linux)

iQIcBAABCAAGBQJLRhY2AAoJENd//eG5q5oWH4kQAKixYSIaihQTCl6XcCXnbE7j
Q/YTcS2GaHpcnysWLj/JVJqHbQpzw7QkiKmnjxGGrPjl7nRA0maLtXaXw27Hj3pa
fcKobkaa51UtQ2sJ9qNWkuMPoy3ZbKG16RqOtQuA4hNfHti8Vj/0u2D9WtXh96yH
JlUirghPlbURmyzkTUqf1Tb7/YIVhpOWAg1exN1Frsb3nC9ZW58VKjd8A2QeujYJ
1Snf8AJ36sXD6hz41lSuA4yTm7eljOlRM7o2SCQRpnBHOrZm01vyVlrAwcbtruHz
LDrJ2k8nK8nic6ZrUPxiGhcNNk/Gn7a2GhZGXlrmWllAz7NM0vrBLJ1T5mt6LH1s
NLLAXLo77gqlfMc2Ih1NUVEPj96ttwtloM/PHRCQcgqAJ3TfRy1wHXLhZPch2XrQ
+eXXgdnWmfQa9Qy3tVFS0ZEoukU1sgf6PT/jFW7MaASRwLrz8BEXGu5mtxRd+QPz
JYOAQ/d9SDXn7e/GRaa60aOgr0IOrgxZlbw2giX1f5sSxm+aJExI5ULFy+ity5Zv
HrnkWTTp9wu/hMBCyBo3MtNmdP16nGNF6VNSGfaUgzw+ZwA6HJ3LBm4HXizPx58R
2u+xtVRGBkx5j4UhPJSrA5zZJnGzIY2buuD60JqVY8XG4Zphk4u3M5kDyVxWLp9l
HzdVBesfoEs6AN4PQ9ou
=RueB
-----END PGP SIGNATURE-----
`
  }
});

// [coreutils] tree of chain length 0
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'e4b1ebc0ff017b49321c3a87af01fa5135b8c3ec',
    'expected_object_type': 'tree',
    'expected_object_size': 611,
    'expected_object_value': `100644 blob aeb638f0a13800ec4f5c7ea20cd5c4fb3fe86cf4	chgrp.c
100644 blob 1d44c38f7620e92cf0f5a4e1a3203ec4c1adc822	chmod.c
100644 blob 2bc6987af6a894002e5f2c6e2835ffec230ce6b6	chown.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob e84fd158b23266ec69dda31d4fcbe377ed6da58a	cp.c
100644 blob 222d077e0379d92b2931d308edbaa6530ee79f7c	dd.c
100644 blob e13f1ce1db0ac5986773c214b22af6ff00b27528	df.c
100644 blob 726b5d30e176055d1ded1a6f0f4a5cc5ec89077c	du.c
100644 blob 473ea6d39725754892602cd9e0ff05510ccaec8a	install.c
100644 blob 781a55d8b31170c6ade961327ecb55d468d02ebc	ln.c
100644 blob 24343a695acd9467f6144884728e0788d75c161f	ls.c
100644 blob 7a5d08a43f5c64585845b2065c621ead80f16983	mkdir.c
100644 blob 71a98cecd8ef562d8e20c8f35c05bb86d81c82dc	mkfifo.c
100644 blob 1c582935d8526988ae02537f00d9da3eb5012f15	mknod.c
100644 blob d7fcdcb16b4b1f110d77c1035e5cdd9ed8c8cfee	mv.c
100644 blob b62fbbf07520b0e2c2c167793f857b60a9e1f167	rm.c
100644 blob 59d2de71a56f97f415bf565c4ef69d51c6306290	rmdir.c
100644 blob fa2d033c21ea6de25f997c4620d676bbd2447cf2	touch.c`
  }
});

// [coreutils] tree of chain length 1
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': '32d88add9a00e58b643e48b2ed0963b9123b1d1a',
    'expected_object_type': 'tree',
    'expected_object_size': 611,
    'expected_object_value': `100644 blob aeb638f0a13800ec4f5c7ea20cd5c4fb3fe86cf4	chgrp.c
100644 blob 1d44c38f7620e92cf0f5a4e1a3203ec4c1adc822	chmod.c
100644 blob 2bc6987af6a894002e5f2c6e2835ffec230ce6b6	chown.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob e84fd158b23266ec69dda31d4fcbe377ed6da58a	cp.c
100644 blob dd56068151dff39de4c3709357cc13ed15fd404f	dd.c
100644 blob e13f1ce1db0ac5986773c214b22af6ff00b27528	df.c
100644 blob 726b5d30e176055d1ded1a6f0f4a5cc5ec89077c	du.c
100644 blob 473ea6d39725754892602cd9e0ff05510ccaec8a	install.c
100644 blob 781a55d8b31170c6ade961327ecb55d468d02ebc	ln.c
100644 blob 24343a695acd9467f6144884728e0788d75c161f	ls.c
100644 blob 7a5d08a43f5c64585845b2065c621ead80f16983	mkdir.c
100644 blob 71a98cecd8ef562d8e20c8f35c05bb86d81c82dc	mkfifo.c
100644 blob 1c582935d8526988ae02537f00d9da3eb5012f15	mknod.c
100644 blob d7fcdcb16b4b1f110d77c1035e5cdd9ed8c8cfee	mv.c
100644 blob b62fbbf07520b0e2c2c167793f857b60a9e1f167	rm.c
100644 blob 59d2de71a56f97f415bf565c4ef69d51c6306290	rmdir.c
100644 blob fa2d033c21ea6de25f997c4620d676bbd2447cf2	touch.c`
  }
});

// [coreutils] tree of chain length 2
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'b1c295bacb43f29fe56d4156cbcd513ca82a2e92',
    'expected_object_type': 'tree',
    'expected_object_size': 611,
    'expected_object_value': `100644 blob aeb638f0a13800ec4f5c7ea20cd5c4fb3fe86cf4	chgrp.c
100644 blob 1d44c38f7620e92cf0f5a4e1a3203ec4c1adc822	chmod.c
100644 blob 2bc6987af6a894002e5f2c6e2835ffec230ce6b6	chown.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob d71734454697f0e39a37950a573582f33cf05b11	cp.c
100644 blob dd56068151dff39de4c3709357cc13ed15fd404f	dd.c
100644 blob e13f1ce1db0ac5986773c214b22af6ff00b27528	df.c
100644 blob 726b5d30e176055d1ded1a6f0f4a5cc5ec89077c	du.c
100644 blob 473ea6d39725754892602cd9e0ff05510ccaec8a	install.c
100644 blob 781a55d8b31170c6ade961327ecb55d468d02ebc	ln.c
100644 blob 3f207274d73f88ce931950eb8b03e8849210637c	ls.c
100644 blob 7a5d08a43f5c64585845b2065c621ead80f16983	mkdir.c
100644 blob 71a98cecd8ef562d8e20c8f35c05bb86d81c82dc	mkfifo.c
100644 blob 1c582935d8526988ae02537f00d9da3eb5012f15	mknod.c
100644 blob d7fcdcb16b4b1f110d77c1035e5cdd9ed8c8cfee	mv.c
100644 blob b62fbbf07520b0e2c2c167793f857b60a9e1f167	rm.c
100644 blob 59d2de71a56f97f415bf565c4ef69d51c6306290	rmdir.c
100644 blob fa2d033c21ea6de25f997c4620d676bbd2447cf2	touch.c`
  }
});

// [coreutils] tree of chain length 5
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': '663f8dfbc2061e8e96e6252c407feec2402085bf',
    'expected_object_type': 'tree',
    'expected_object_size': 160,
    'expected_object_value': `100644 blob a43ea2126fb6b114bff5f8e003ee118e045dacf1	COPYING
100644 blob c59fe67dbcd9e08034c88b1c408e7d7486026fa8	INSTALL
040000 tree b75d6cc8fe4cd584446b3a97ebf809a630a57e19	lib
040000 tree 4600a00d47ea26cc8058e9900c6f8444fb2896de	old
040000 tree ad87706fe20f77306fe591ad9f722f4e49eebdfa	src`
  }
});

// [coreutils] tree of chain length 24
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'ca6600a5176e0fd2255d7daff02c811247602444',
    'expected_object_type': 'tree',
    'expected_object_size': 611,
    'expected_object_value': `100644 blob 62358af1c206b3e21b325fe69508e639ae228a7e	chgrp.c
100644 blob efdc08cd1e08d5da0f3ad7c0498db0e7efb2a973	chmod.c
100644 blob dca9ba6debf3add99d256444b627982b10efe806	chown.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob f54a1e5784826b7568de91fdf1b1cc7b56c26d57	cp.c
100644 blob dc8d85a7d663cfded82113bbae4b2392d12914fd	dd.c
100644 blob 6439a7ec5aae41fc807a6e33bc225cafd6eb8349	df.c
100644 blob 10864bf014554987d19bb3847ef381724249b715	du.c
100644 blob 881038c4172af7c6c93a77c9e8451471d0061e3d	install.c
100644 blob d80d0cede16a1e9747ee625c214574c6f07f1397	ln.c
100644 blob 870c13066e91519311abf76b02dedf0cc685b260	ls.c
100644 blob c60c5460fa840a5b64bfd3506a909cbf321de001	mkdir.c
100644 blob 24a9437445ee35b4249a71447f60f783cd68379f	mkfifo.c
100644 blob d49070cbdb8b4c644fb488ea18d36a6ca755ae4d	mknod.c
100644 blob cd95ec2f97848b3c6112d06f064adb48e0164d05	mv.c
100644 blob 7b98acdef32e0cdc1ceed433fd81a001168f5aab	rm.c
100644 blob 92ed8b1e9b141999b40f56a5318100effa5c2964	rmdir.c
100644 blob 8c2ee312641d57e4a103be891fc0bd975e9c4c96	touch.c`
  }
});

// [coreutils] tree of chain length 50
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': '8e05a4b775377340111760aae3a3b2a5f7008ca9',
    'expected_object_type': 'tree',
    'expected_object_size': 2191,
    'expected_object_value': `100644 blob f8d9e17f6b38ffd03c1087a11a0dede71a4f3e88	basename.c
100644 blob ef4828c96f0f0993c41dbfea8fb56b327de424b1	cat.c
100644 blob 3e6c82d7e96791dc7962a1be1268474ac598c042	chgrp.c
100644 blob 3df4b99aba42fa5149fa0400949fe831a276bae9	chmod.c
100644 blob 37a881e2fd265f0a76bb5a7ba5c325ab82d24e70	chown.c
100644 blob 6cce4a8f14a84c2f0c8b9523ceb8accd6befc4b7	cksum.c
100644 blob 7a7d6accb3e0b0afee144395c0e80374f3571f64	comm.c
100644 blob a0afcfcf3571f1e391d2741bac60f1b71a667ab7	cp-hash.c
100644 blob c1415b7902585522e7101e33486dab155b315f80	cp.c
100644 blob 8d27ce03fc650545f468b9b8fe0d1b5fb86e9fa3	csplit.c
100644 blob 6e95f0a1507cf677319b7221cf5b834d5673a331	cut.c
100644 blob 59d76c7da10680e46ac6264b821da3fc891eca33	date.c
100644 blob ba8d15e571ae820e94ac307fed3aa83dfbd8357d	dd.c
100644 blob 35c069d2630432308e076b81352a9563c3e39c8b	df.c
100644 blob 05612353a5485eb520176e2d1d677fdb70ad3cd7	dirname.c
100644 blob 5543ceea86c68c59ed52cf80f71ae77c35fa54d7	du.c
100644 blob b8c4e58d1a497f843845f23aecf89727873c51c4	echo.c
100644 blob f802856046578e21f8f49543e83276a6c513736f	env.c
100644 blob 17d215b43ef7f09d0ade4eeeda9eaf9f555485a9	expand.c
100644 blob e5f29412285bb39a681cb658d46321ccc5480312	expr.c
100644 blob fcdd885b1641e4ce5aed59034646472c57eac287	fold.c
100755 blob 7d84058699bbd7c9d05ccb4cb95dd0eac50e0567	groups.sh
100644 blob c818c661207ab4cfe10e399cb6cdc178491a4ed3	head.c
100644 blob a6708fbe4e2c1d1c29ab24818bebfa0a965f2fcc	id.c
100644 blob f0bbbbd92896b48b1e7ba16feb63cdd9ba1c2ec0	install.c
100644 blob c826df8249d4f15186a2fb80a03bc221c7d2deea	join.c
100644 blob ea8d3b2f3f278933c55c5be6262c21f4ce98ad5d	ln.c
100644 blob 39d213709873370267dbcd9563ab80ae07668d97	logname.c
100644 blob 202e16c6f41680887f23635f5be43a85477adf1c	ls.c
100644 blob 00bde815fad109c3bfde2724606511e777300516	mkdir.c
100644 blob 075cece515bd4208acde2c53e73fb9b1341501ca	mkfifo.c
100644 blob 66029ad0f6f0a4d29ea271e67fd636d35317587b	mknod.c
100644 blob 9d28d4a87f3f9362b8981bf10988b17c19cb6d4b	mv.c
100644 blob 6386e519a8b2a921c3a0bfe5903f6b2e550be1ff	nice.c
100644 blob 233a6f26a902447e9d8e581a3a632a2c77b0f41e	nl.c
100755 blob 00908b5ba8e6a11c335a0d48ee44fa82ed675c06	nohup.sh
100644 blob 6c90246b130a0de2a658eea50f1547f89aa5b42a	od.c
100644 blob 3cd95d36807adbc09d4081b6916d26553af5d79f	paste.c
100644 blob 6a0bf7965af5ace064d2514b50558e6c9e132743	pathchk.c
100644 blob 1abb686bbd97ee57ed051ab145687c59189bf259	pr.c
100644 blob ac4511cc5f11b386dc43d992cd0053a9fad01943	printenv.c
100644 blob 1c43c077399875cf3370bd7f3efe5ded1ceea58e	printf.c
100644 blob 0d0ce7c4caa85bf8a657e8de85eef08228516c1e	rm.c
100644 blob 35bd7d652b91a9956eb0341705d54417a422e7d1	rmdir.c
100644 blob 1551eeaa8ba861a179b1c012220b40f1da12bcee	sleep.c
100644 blob f4f65782f84b0befa2b1cb632340ed01b6a6b129	sort.c
100644 blob 980edf310e254dce64ecab9d09feaccfa24a9343	split.c
100644 blob 4fb8158299f1d7d80dd1fe903752018854b1b3f5	stty.c
100644 blob ff2bfe5fce6b9cade0afa3b228b060a7050b992f	su.c
100644 blob a7079b88243c5ce680cf81e23c51cb54ce6b8437	sum.c
100644 blob 8f3c94aab7b5d86686118ec2a9b209aa6b2586e1	tac.c
100644 blob 138c22894afb9cc5f7877c3f171661989d798b7d	tail.c
100644 blob b97821c8dd5527f861fa4c2ef164c50ba5612099	tee.c
100644 blob 0bc44e5dcee51909fcf53c724d54d86c84bf0f8a	test.c
100644 blob 65d76279fb31217bba00df78fcc5dfaecb3ddeb8	touch.c
100644 blob 06aeb73630fd33ac92ed3d4fa3a3fe90816221ae	tr.c
100644 blob 12ead35b0c87fef1aeda915c7d0f8dd8eb619049	tty.c
100644 blob 71d3112075d34e9ee1a447141fef965144a78563	uname.c
100644 blob 01dc417622981cabd53b0df52b2829873c2e86b3	unexpand.c
100644 blob 944727f810c1c6f906eae006dfd397657e55f562	uniq.c
100644 blob 5bb4f2405633ed5ed4ba06781e72859f2d4d5b1d	wc.c
100644 blob 381a51f505d4c9440394928f293ab949b7215a31	who.c
100644 blob 4a12406f18a2c4f493659a63ea25b46c6e6fc76c	whoami.c
100644 blob 71eabb020ed3dc91487dd11317306d6abb024dd5	yes.c`
  }
});

// [coreutils]  a commit of type OBJ_OFS_DELTA
mach_test_data['coreutils.git']['test'].push({
  'target': 'load_object',
  'param': {
    'id': 'a0000ba4ae23b770ba0756f0c8cfc59aa9fabbe3',
    'expected_object_type': 'commit',
    'expected_object_size': 367,
    'expected_object_value': `tree 9c82c550742d3df1747f2861bb8aa55c816323ac
parent 70d023b076ab82ad000a404310bc0aee2fa3ac80
author Jim Meyering <meyering@redhat.com> 1260538993 +0100
committer Jim Meyering <meyering@redhat.com> 1260538993 +0100

post-release administrivia

* NEWS: Add header line for next release.
* .prev-version: Record previous version.
* cfg.mk (old_NEWS_hash): Auto-update.
`
  }
});

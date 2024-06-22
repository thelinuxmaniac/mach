# View manual annotations created using MACH tool
#
# Author: Abhishek Dutta <https://abhishekdutta.org>
# Date  : 2024-01-05

import json
import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Viewer for MACH annotations")
    parser.add_argument("--mach-fn",
                        required=True,
                        type=str,
                        help="a MACH project (i.e. JSON file)")
    parser.add_argument("--object-name",
                        required=True,
                        type=str,
                        help="object name")

    args = parser.parse_args()

    with open(args.mach_fn, 'r') as f:
        mach = json.load(f)
    node = mach['object']
    object_name_tok = args.object_name.split('/')
    for i in range(0, len(object_name_tok)):
        node = node[ object_name_tok[i] ]
    stat = {}
    for i in range(0, len(node)):
        if 'metadata' not in node[i]:
            continue
        if 'revision_type' not in node[i]['metadata']:
            continue
        for j in range(0, len(node[i]['metadata']['revision_type'])):
            option_id = node[i]['metadata']['revision_type'][j]
            option_tok = option_id.split('.')
            option_node = mach['mach']['conf']['attributes']['revision_type']
            for k in range(0, len(option_tok)):
                option_node = option_node['options'][ option_tok[k] ]
            if option_id not in stat:
                stat[option_id] = 0
            stat[option_id] += 1
            revision_type_str = option_node
            commit_date = node[i]['commit']['date']
            print('%s : [%s] %s' % (commit_date, option_id, revision_type_str))
    print('Revision type stat.')
    stat_sorted = dict(sorted(stat.items(), key=lambda item: item[1]))
    print(json.dumps(stat_sorted, indent=2))

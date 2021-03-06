#!/bin/bash
source ./vars.sh
init_folder="$INIT_FOLDER-rusttest"

echo -n 'blast rusttest...'
cp -R $PATH_TO_TEMPLATE $init_folder &> /dev/null && cd $init_folder

blast rusttest -q &> cargo.logs.json
result=`cat cargo.logs.json`
if [[ $result =~ $RUSTTEST_RESULT ]]; then
    echo -e $PASSED
else
    echo -e "$FAILED\n$EXPECTED\n$RUSTTEST_RESULT\n$ACTUAL\n$result" 1>&2
    exit_status=1
fi

rm -r -f ../$init_folder &> /dev/null || true
exit $exit_status
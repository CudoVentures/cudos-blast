#!/bin/bash
source ./vars.sh

echo -n 'blast init -d...'
blast init -d $INIT_FOLDER &> /dev/null && cd $INIT_FOLDER

if [[ `ls` == $TEMPLATE_FILES && `ls scripts` == $TEMPLATE_SCRIPTS_FILES ]]; then
    echo -e "$PASSED"
else
    echo -e "$FAILED\nGenerated folder is invalid!" 1>&2
    exit_status=1
fi

rm -r -f ../$INIT_FOLDER &> /dev/null
exit $exit_status
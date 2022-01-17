source ./packages/cudos-test/_vars.sh
alias cleanup="$COMPOSE cudos-noded keys delete $TEST_ACC -y"

echo "Executing cudos keys ls..."
$COMPOSE cudos-noded keys add $TEST_ACC &> /dev/null
if [[ ! `cudos keys ls` =~ $TEST_KEY ]]; then
    echo "cudos keys ls $FAILED" 1>&2
    cleanup &> /dev/null && exit 1
fi

cleanup &>/dev/null
if [[ `cudos keys ls` =~ $TEST_KEY ]]; then
    echo "cudos keys ls $FAILED" 1>&2 && exit 1
fi
echo "cudos keys ls $PASSED"
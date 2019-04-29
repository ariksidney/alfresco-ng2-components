#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR/../../

AFFECTED_E2E="$(./affected-folder.sh -b $TRAVIS_BRANCH -f "e2e")";
AFFECTED_LIBS="$(./affected-libs.sh -gnu -b $TRAVIS_BRANCH)";
if [[ $AFFECTED_LIBS =~ "process-services-cloud$" || $AFFECTED_E2E = "e2e" || $TRAVIS_PULL_REQUEST == "false"  ]];
then
    node ./travis/check-env/check-activiti-env.js --host "$E2E_HOST_BPM" -u "$E2E_USERNAME" -p "$E2E_PASSWORD" --client 'activiti' || exit 1;
    ./test-e2e-lib.sh -host localhost:4200 -proxy "$E2E_HOST_BPM" -u "$E2E_USERNAME" -p "$E2E_PASSWORD" -e "$E2E_EMAIL" --folder process-services-cloud --skip-lint --use-dist -timeout 8000  || exit 1;
fi;

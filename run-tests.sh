#! /bin/bash

LOCAL_IDENTIFIER="sdktest"
PROJECT_DIR=./

curl https://www.browserstack.com/browserstack-local/BrowserStackLocal-${type}.zip > /var/tmp/BrowserStackLocal.zip
unzip -o /var/tmp/BrowserStackLocal.zip -d /var/tmp && chmod +x /var/tmp/BrowserStackLocal

nohup /var/tmp/BrowserStackLocal \
    --key kqExpNPZDere7GszwkgL \
    --local-identifier ${LOCAL_IDENTIFIER} \
    --folder ${PROJECT_DIR} \
    > /var/tmp/browserstack.log 2>&1 & echo \$! > /var/tmp/browserstack.pid

cd tests

mocha ./trial.js --timeout 60000

kill "cat `/var/tmp/browserstack.pid`"
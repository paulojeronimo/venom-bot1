#!/usr/bin/env bash
set -eou pipefail
cd $(dirname $0)
echo Running $PWD/${0##*/}. Configured variables are:
set -x
BASE_DIR=$PWD
BASE_NAME=$(basename $BASE_DIR)
BROWSER_APP=${BROWSER_APP:-chromium}
DATA_DIR=${DATA_DIR:-$BASE_DIR/data}
{ set +x; } 2> /dev/null
[ -f .env ] || {
    echo Generating .env from .env.sample ...
    cp .env.sample .env
    echo "DATA_DIR=${DATA_DIR}" >> .env
}
[ -d node_modules ] || {
    echo Installing npm packages ...
    npm i
}
! [ "${1:-}" == --build-only ] || exit 0
case "$(uname)" in
  Linux)
    BROWSER_PATH=$(command -v $BROWSER_APP || :)
    [ "$BROWSER_PATH" ] || {
        echo Aborting: $BROWSER_APP is not in PATH!
        exit 1
    }
    export BROWSER_PATH
esac
echo Starting Node.js code ...
node src/main/index.js

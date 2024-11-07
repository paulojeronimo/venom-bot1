#!/usr/bin/env bash
set -eou pipefail
cd $(dirname $0)

BASE_NAME=$(basename $PWD)
DOCKER_IMAGE=${DOCKER_IMAGE:-${BASE_NAME%-private}}
DOCKER_CONTAINER=${DOCKER_CONTAINER:-$DOCKER_IMAGE}
DOCKER_WORKDIR=$(sed -n 's/^WORKDIR[[:space:]]\+\(.*\)/\1/p' Dockerfile)
DOCKER_DATA_VOLUME=venom-bot1-data
DOCKER_TOKENS_VOLUME=venom-bot1-tokens
USE_DOCKER_TOKENS_VOLUME=${USE_DOCKER_TOKENS_VOLUME:-true}

_docker() {
    set -x
    docker "$@"
    { set -x; } 2> /dev/null
}

source ./docker-utils.sh 2> /dev/null || :

case "${1:-run}" in
    build) _docker buildx build . -t $DOCKER_IMAGE ;;
    volume)
        shift
        case "${1:-create}" in
            create) _docker volume create $DOCKER_VOLUME;;
        esac
        ;; 
    run)
        [ -f tokens.docker ] || {
            echo Removing tokens directory or volume ...
            if $USE_DOCKER_TOKENS_VOLUME
            then
                docker volume rm $DOCKER_TOKENS_VOLUME &> /dev/null || :
            else
                sudo rm -rf tokens
            fi
            echo 'Remove this file to recreate the tokens directory after starting ./docker.sh' > tokens.docker
        }
        docker_tokens_volume_cfg=$PWD/tokens:$DOCKER_WORKDIR/tokens
        $USE_DOCKER_TOKENS_VOLUME && docker_tokens_volume_cfg=$DOCKER_TOKENS_VOLUME:$DOCKER_WORKDIR/tokens
        _docker run -it --rm \
            -v $DOCKER_DATA_VOLUME:$DOCKER_WORKDIR/data \
            -v $docker_tokens_volume_cfg \
            --name $DOCKER_CONTAINER \
            $DOCKER_IMAGE ;;
    rmi)
        _docker rmi $DOCKER_IMAGE || : ;;
    *)
        if [ "${1:-}" ] && command -v _docker_$1 &> /dev/null
        then
            _docker_$1 "$@"
            exit $?
        fi
        echo Invalid docker option: \"${1:-}\"
        exit 1
esac

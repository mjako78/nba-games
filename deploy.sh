#!/bin/bash

# This is a sample bash utility to sync development source directory to extensions directory

# Useful colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NONE='\033[0m'

CWD=$(pwd)
DIR_NAME=${PWD##*/}
DEST_PATH="${HOME}/.local/share/gnome-shell/extensions/${DIR_NAME}"

check_deps() {
  printf "Checking for dependencies [  ]\n"
  which rsync > /dev/null
  rc=$?
  if [ $rc -ne 0 ]; then
    printf "Checking for dependencies [${RED}KO${NONE}]\n"
    exit 1
  fi
  printf "Checking for dependencies [${GREEN}OK${NONE}]\n"
}

check_deps

if [ ! -d $DEST_PATH ]; then
  printf "Creating dest directory [  ]\n"
  mkdir -p $DEST_PATH
  printf "Creating dest directory [${GREEN}OK${NONE}]\n"
fi

printf "Syncing to dest directory [  ]\n"
rsync -arz --files-from=./sync-list.txt $CWD $DEST_PATH
rc=$?
if [ $rc -ne 0 ]; then
  printf "Syncing to dest directory [${RED}KO${NONE}]\n"
  exit 1
fi
printf "Syncing to dest directory [${GREEN}OK${NONE}]\n"

exit 0
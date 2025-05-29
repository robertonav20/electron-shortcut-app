#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

sudo rm -rf node_modules
sudo rm -rf out
yarn install --platform=win32
yarn run rebuild-win
yarn run make-win
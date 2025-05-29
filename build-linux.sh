#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

sudo rm -rf node_modules
sudo rm -rf out
yarn install --platform=linux
yarn run rebuild-linux
yarn run make-linux
#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

rm -rf .webpack
rm -rf node_modules
rm -rf out
npm install --platform=linux
yarn run rebuild-linux
yarn run postinstall-linux
yarn run make-linux
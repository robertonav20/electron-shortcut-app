#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

rm -rf .webpack
rm -rf node_modules
rm -rf out
npm install --platform=win32
yarn run rebuild-win
yarn run postinstall-win
yarn run make-win
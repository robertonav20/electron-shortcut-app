#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

rm -rf .webpack
rm -rf node_modules
rm -rf out
npm install --platform=win32
yarn run package-win

# Copy prebuilt binary lib instead to build manually
cp lib/node_sqlite3.node out/Shortcut App-win32-x64/resources/app/.webpack/main/native_modules/build/Release

yarn run make-win
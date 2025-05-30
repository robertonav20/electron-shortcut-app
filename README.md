# Shortcut app

Shortcut App, it's based on **electron** and a SPA framework **react** version or **vue** version (_older_).

![Alt text](https://raw.githubusercontent.com/robertonav20/electron-shortcut-app/main/Home.png?raw=true"Home")

## Versions

- Versions:
  > - node 18
  > - electron 23.1.4
  > - react 18.2.0

### Features

- Create shortcut button to launch everything
  > - Netflix browser with <https://netflix.com>
  > - Netflix windows app with netflix://
  > - etc...
- Remove shortcut button
- Export all shortcut
- Import all shortcut

### How to develop

Prerequisites

    npm install -g yarn electron
    npm install && yarn run rebuild

Run dev app

    yarn run start

### How to create package Win32

Create package for Win32

    yarn run package-win

Create installer for Win32

    yarn run make-win

Create installer from WSL with Docker for Win32

    docker run --rm -ti \
      --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
      --env ELECTRON_CACHE="/root/.cache/electron" \
      --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
      -v ${PWD}:/project:rw \
      -v ${PWD##*/}-node-modules:/project/node_modules:rw \
      -v ~/.cache/electron:/root/.cache/electron \
      -v ~/.cache/electron-builder:/root/.cache/electron-builder \
      electronuserland/builder:18-wine-mono

    ./build-win.sh

### How to create package Linux

Create package for Linux

    yarn run package-linux

Create installer for Linux

    yarn run make-linux

Create installer from WSL with Docker for Linux

    docker run --rm -ti \
      --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
      --env ELECTRON_CACHE="/root/.cache/electron" \
      --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
      -v ${PWD}:/project \
      -v ${PWD##*/}-node-modules:/project/node_modules \
      -v ~/.cache/electron:/root/.cache/electron \
      -v ~/.cache/electron-builder:/root/.cache/electron-builder \
      electronuserland/builder:18-11.23

    ./build-linux.sh

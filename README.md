# Shortcut app

Shortcut App, it's based on **electron** and a SPA framework **react** version or **vue** version (_older_).

![Alt text](https://raw.githubusercontent.com/robertonav20/electron-shortcut-app/main/Home.png?raw=true"Home")

### Versions
 - React:
 > - electron 23.1.4
 > - react 18.2.0
 - Vue:
 > - electron 13.0.0
 > - vue 2.6.11

### Features

- Create shortcut button to launch everything
> - Netflix browser with https://netflix.com
> - Netflix windows app with netflix://
> - etc...
- Remove shortcut button
- Export all shortcut
- Import all shortcut

## React
Prerequisites

    npm i -g yarn electron
    yarn i

Run dev app

    yarn run start
    
Create package

    yarn run package
    
Create installer

    yarn run make

## Vue (older)
Prerequisites

    npm i -g electron @vue/cli-service

Run dev app

    npm run serve
    
Create installer

    npm run build
const { defineConfig } = require('@vue/cli-service')
const { IgnorePlugin } = require('webpack')

module.exports = defineConfig({
    configureWebpack: {
        /*
        resolve: {
            fallback: {
                tty: require.resolve('tty-browserify'),
                stream: require.resolve('stream-browserify'),
                crypto: require.resolve('crypto-browserify'),
                timers: require.resolve('timers-browserify')
            }
        },
        */
        devtool: "source-map",
        plugins: [
            new IgnorePlugin({ resourceRegExp: new RegExp('^(mssql|mariasql|.*oracle.*|mysql.*|pg.*|node-pre-gyp)$') })
        ]
    },
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            appId: "electron.multimedia.app",
            builderOptions: {
                extraResources: ['src']
            },
            contextIsolation: false,
            customFileProtocol: './',
            enableRemoteModule: true,
            externals: ['knex', 'sqlite3'],
            extraResources: [
                "./node_modules/@electron/remote/**"
            ],
            mainProcessFile: 'src/background.js',
            node: {
                __dirname: false,
            },
            nodeIntegration: true,
            productName: "shortcut-app",
        }
    }
})
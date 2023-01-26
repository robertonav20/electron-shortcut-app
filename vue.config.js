const { IgnorePlugin } = require('webpack')

module.exports = {
    configureWebpack: {
        devtool: "source-map",
        plugins: [
            new IgnorePlugin({ resourceRegExp: new RegExp('^(mssql|mariasql|.*oracle.*|mysql.*|pg.*|node-pre-gyp)$') })
        ]
    },
    pluginOptions: {
        electronBuilder: {
            appId: "electron.multimedia.app",
            asar: true,
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
            files: [
                `dist/**/*`,
                `node_modules/**/*`,
                `package.json`,
                `background.js`
            ],
            mainProcessFile: 'src/background.js',
            node: {
                __dirname: false,
            },
            nodeIntegration: true,
            productName: "shortcut-app",
        }
    }
}
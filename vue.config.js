const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            customFileProtocol: './',
            builderOptions: {
                extraResources: ['src/router', 'src/service', 'src/storage']
            },
            externals: ['knex','sqlite3']
        }
    }
})

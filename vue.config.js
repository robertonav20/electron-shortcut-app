const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                extraResources: ['src/storage/']
            },
            externals: ['knex','sqlite3']
        }
    }
})

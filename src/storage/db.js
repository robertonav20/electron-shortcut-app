export var connection;
export const shortcutTable = 'SHORTCUT'
export function initDB() {
    connection = require('knex') (
        {
            client: 'sqlite3',
            connection: {
                filename: `/home/rob/Desktop/workspace/electron-multimedia-app/src/storage/test.sqlite`,
                database: 'test'
            },
            useNullAsDefault: true
        }
    );


    connection.schema.hasTable(shortcutTable).then(result => {
        if (result) {
            console.log('Table ' + shortcutTable + ' exists yet')
        } else {
            connection.schema.createTable(shortcutTable, table => {
                table.increments('id', {primaryKey: true})
                table.string('title')
                table.string('icon')
                table.string('size')
                table.string('action')
            }).then(result => console.log('Connection successful'))
            console.log('Table created')
        }
    })
}
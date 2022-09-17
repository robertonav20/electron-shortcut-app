export const shortcutTable = 'SHORTCUT'
let connection;

export function initDB() {
    connection = require('knex') (
        {
            client: 'sqlite3',
            connection: {
                filename: `./test.sqlite`,
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
            }).then(result => console.log('Connection successful' + result))
            console.log('Table created')
        }
    })
}
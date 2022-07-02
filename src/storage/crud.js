import {shortcutTable} from './db'

let connection;

function getConnection() {
    if (!connection) {
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
    }

    return connection
}

export function addShortcut() {
    getConnection().table(shortcutTable).insert({
        action: 'https://google.it',
        icon: 'chrome',
        size: 'large',
        title: 'Chrome'
    }).then(result => console.log(result))
}

export function removeShortcut(id) {
    getConnection()
        .del()
        .table(shortcutTable)
        .where('id', id)
        .then(() => {
            alert('Id ' + id + ' deleted successfully')
        })
}

export function exportShortcuts() {
    console.log('export')
}

export function importShortcuts() {
    console.log('import')
}

export function getAllShortcut() {
    return getConnection()
        .select('id', 'title', 'action', 'icon', 'size')
        .table(shortcutTable)
}
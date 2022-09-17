import {shortcutTable} from './db'

let connection;

function getConnection() {
    if (!connection) {
        connection = require('knex')(
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

export function addShortcut(shortcut, showAlert) {
    getConnection().table(shortcutTable).insert({
        action: shortcut.action,
        icon: shortcut.icon,
        size: shortcut.size,
        title: shortcut.title
    }).then(result => {
            if (showAlert === true) {
                alert('Id ' + result + ' added successfully')
            }
        }
    )
}

export function removeShortcut(id, showAlert) {
    getConnection()
        .del()
        .table(shortcutTable)
        .where('id', id)
        .then(() => {
            if (showAlert === true) {
                alert('Id ' + id + ' deleted successfully')
            }
        })
}

export function getAllShortcut() {
    return getConnection()
        .select('id', 'title', 'action', 'icon', 'size')
        .table(shortcutTable)
}
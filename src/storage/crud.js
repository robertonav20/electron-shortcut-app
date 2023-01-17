import {shortcutTable} from './db'
import {configuration} from './configuration'

let connection;

function getConnection() {
    if (!connection) {
        connection = require('knex')(configuration);
    }

    return connection
}

export function addShortcut(shortcut, showAlert, callback) {
    getConnection().table(shortcutTable).insert({
        action: shortcut.action,
        icon: shortcut.icon,
        size: shortcut.size,
        title: shortcut.title
    }).then(result => {
        if (showAlert === true) {
            alert('Id ' + result + ' added successfully')
        }
        if (callback != null && callback != undefined) {
            callback(result)
        }
    })
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

export function deleteAll() {
    return getConnection()
        .del()
        .table(shortcutTable)
}
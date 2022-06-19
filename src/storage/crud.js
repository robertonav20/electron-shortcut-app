import {connection} from './db'
import {shortcutTable} from './db'

export function addShortcut() {
    connection(shortcutTable).insert({
        action: 'https://google.it',
        icon: 'chrome',
        size: 'large',
        title: 'Chrome'
    }).then(result => console.log(result))
}

function removeShortcut() {
    console.log('remove')
}

function exportShortcuts() {
    console.log('export')
}

function importShortcuts() {
    console.log('import')
}

export function getAllShortcuts() {
    console.log(connection.select('title', 'action', 'icon', 'size').table(shortcutTable))
}
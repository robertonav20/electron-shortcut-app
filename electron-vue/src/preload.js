const { ipcMain, shell, dialog } = require('electron')
const fs = require('fs');

const configuration = {
    client: 'sqlite3',
    connection: {
        filename: `./data`,
        database: 'data'
    },
    useNullAsDefault: true
};
const connection = require('knex')(configuration);
const shortcutTable = 'SHORTCUT'

export function initialize(win) {
    initDB()
    initHandlers(win)
}

function initDB() {
    connection.schema.hasTable(shortcutTable).then(result => {
        if (result) {
            console.log('Table ' + shortcutTable + ' exists yet')
        } else {
            connection.schema.createTable(shortcutTable, table => {
                table.increments('id', { primaryKey: true })
                table.string('title')
                table.string('icon')
                table.string('size')
                table.string('action')
                table.integer('position').unsigned()
            }).then(result => console.log('Connection successful' + result))
            console.log('Table created')
        }
    })
}

function initHandlers(win) {
    ipcMain.handle('showOpenDialog', (_event, options) => dialog.showOpenDialog(win, options))
    ipcMain.handle('showSaveDialog', (_event, options) => dialog.showSaveDialog(win, options))
    ipcMain.handle('importFile', (_event, filename, charset) => importFile(filename, charset))
    ipcMain.handle('exportFile', (_event, filePath, data, charset) => exportFile(filePath, data, charset))
    ipcMain.handle('launch', (_event, cmd) => shell.openExternal(cmd))
    ipcMain.handle('addShortcut', (_event, action, icon, size, title) => addShortcut(action, icon, size, title))
    ipcMain.handle('updateShortcut', (_event, id, action, icon, size, title, position) => updateShortcut(id, action, icon, size, title, position))
    ipcMain.handle('removeShortcut', (_event, id) => removeShortcut(id))
    ipcMain.handle('getAllShortcut', () => getAllShortcut())
    ipcMain.handle('countAllShortcut', () => countAllShortcut())
    ipcMain.handle('deleteAll', () => deleteAll())
}

function getAllShortcut() {
    return connection
        .select('id', 'title', 'action', 'icon', 'size')
        .table(shortcutTable)
        .orderBy('position', 'asc')
        .orderBy('title', 'asc')
}

function countAllShortcut() {
    return connection
        .count('*')
        .table(shortcutTable)
        .first()
}

function addShortcut(action, icon, size, title) {
    return connection
        .table(shortcutTable)
        .insert({
            action: action,
            icon: icon,
            size: size,
            title: title
        })
}

function updateShortcut(id, action, icon, size, title, position) {
    return connection
        .table(shortcutTable)
        .update({
            action: action,
            icon: icon,
            size: size,
            title: title,
            position: position
        })
        .where('id', '=', id)
}

function removeShortcut(id) {
    return connection
        .del()
        .table(shortcutTable)
        .where('id', id)
}

function deleteAll() {
    return connection
        .del()
        .table(shortcutTable)
}

async function importFile(filename, charset) {
    const data = await fs.readFileSync(filename, charset)
    return Promise.resolve(data)
}

async function exportFile(filePath, data, charset) {
    const result = await fs.writeFileSync(filePath, data, charset)
    return Promise.resolve(result)
}
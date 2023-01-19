import { remote, ipcRenderer } from 'electron'

export const fs = require('fs')

export function send(name) {
    return ipcRenderer.send(name)
}

export function getCurrentWindow() {
    return remote.getCurrentWindow()
}

export function showOpenDialog(window, options) {
    return remote.dialog.showOpenDialog(window, options)
}

export function showSaveDialog(window, options) {
    return remote.dialog.showSaveDialog(window, options)
}

export function readFile(filename, charset, callback) {
    return fs.readFile(filename, charset, callback)
}

export function writeFile(filePath, data, charset, callback) {
    return fs.writeFile(filePath, data, callback, callback)
}
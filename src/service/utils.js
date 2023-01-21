/* eslint-disable */
import { ipcRenderer } from 'electron';


export function send(name) {
    return ipcRenderer.send(name)
}

export function on(name, callback) {
    return ipcRenderer.on(name, callback)
}

export function showOpenDialog(options) {
    return ipcRenderer.invoke('showOpenDialog', options)
}

export function showSaveDialog(options) {
    return ipcRenderer.invoke('showSaveDialog', options)
}

export function importFile(filename, charset) {
    return ipcRenderer.invoke('importFile', filename, charset)
}

export function exportFile(filePath, data, charset) {
    return ipcRenderer.invoke('exportFile', filePath, data, charset)
}
import { ipcRenderer } from 'electron';
import { notificationSuccess } from "../component/Notification";


export function getAllShortcut() {
    return ipcRenderer.invoke('getAllShortcut')
}

export function countAllShortcut() {
    return ipcRenderer.invoke('countAllShortcut')
}

export function addShortcut(action, icon, size, title, showAlert, callback) {
    return ipcRenderer.invoke('addShortcut', action, icon, size, title)
        .then(result => {
            if (showAlert === true) {
                notificationSuccess({
                    message: 'Id ' + result + ' added successfully'
                });
            }
            if (callback != null && callback != undefined) {
                callback(result)
            }
        })
}


export function updateShortcut(id, action, icon, size, title, position, showAlert, callback) {
    return ipcRenderer.invoke('updateShortcut', id, action, icon, size, title, position)
        .then(result => {
            if (showAlert === true) {
                notificationSuccess({
                    message: 'Id ' + result + ' updated successfully'
                });
            }
            if (callback != null && callback != undefined) {
                callback(result)
            }
        })
}

export function removeShortcut(id, showAlert) {
    return ipcRenderer.invoke('removeShortcut', id)
        .then(() => {
            if (showAlert === true) {
                notificationSuccess({
                    message: 'Id ' + id + ' deleted successfully'
                });
            }
        })
}

export function deleteAll() {
    return ipcRenderer.invoke('deleteAll')
}
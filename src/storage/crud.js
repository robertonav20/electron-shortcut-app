import { ipcRenderer } from 'electron';
import { notification } from 'ant-design-vue';


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
                notification.success({
                    message: 'Id ' + result + ' added successfully'
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
                notification.success({
                    message: 'Id ' + id + ' deleted successfully'
                });
            }
        })
}

export function deleteAll() {
    return ipcRenderer.invoke('deleteAll')
}
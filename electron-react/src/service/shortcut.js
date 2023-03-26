import { ipcRenderer } from 'electron';

export function launch(cmd) {
    return ipcRenderer.invoke('launch', cmd)
        .then(response => {})
        .catch(error => console.log(error))
}
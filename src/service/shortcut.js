import { ipcRenderer } from 'electron';

export function launch(cmd) {
    return ipcRenderer.invoke('launch', cmd)
        .then(response => console.log(response))
        .catch(error => console.log(error))
}
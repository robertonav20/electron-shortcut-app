import { shell } from "electron";

export function shortcutLaunchByCMD(cmd) {
    shell.openExternal(cmd)
        .then(response => console.log(response))
        .catch(error => console.log(error))
}
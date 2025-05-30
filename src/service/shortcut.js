import { ipcRenderer } from 'electron';
import { notificationError, notificationSuccess } from "../component/Notification";

export function launch(cmd, showAlert, callback) {
    const openCommand = process.platform === 'win32'
        ? 'start'
        : process.platform === 'darwin'
            ? 'open'
            : 'xdg-open';
    return ipcRenderer.invoke('launch', openCommand, cmd)
        .then(({ stdout }) => {
            if (showAlert) {
                notificationSuccess({
                    message: "Command executed successfully: " + stdout,
                });
            }
        })
        .catch(({ stderr, code }) => {
            console.log(stderr, code);
            notificationError({
                message: "Command not executed, consult the error.log"
            });
        })
}
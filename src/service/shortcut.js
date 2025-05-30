import { ipcRenderer } from 'electron';
import { notificationError, notificationSuccess } from "../component/Notification";

export function launch(cmd, args, showAlert, callback) {
    return ipcRenderer.invoke('launch', cmd, args)
        .then(({stdout}) => {
            if (showAlert) {
                notificationSuccess({
                    message: "Command executed successfully: " + stdout,
                });
            }
        })
        .catch(({stderr, code}) => {
            console.log(stderr, code);
            notificationError({
                message: "Command not executed, consult the error.log"
            });
        })
}
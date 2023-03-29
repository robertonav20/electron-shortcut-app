import { ipcRenderer } from "electron";
import { notificationSuccess } from "../component/Notification";


export function getAllLayout() {
  return ipcRenderer.invoke("getAllLayout");
}

export function saveLayout(name, layout, showAlert, callback) {
  return ipcRenderer.invoke("saveLayout", name, layout).then((result) => {
    if (showAlert === true) {
      notificationSuccess({
        message: "Layout saved"
      });
    }
    if (callback != null && callback != undefined) {
      callback(result);
    }
  });
}

export function removeLayout(name, showAlert) {
  return ipcRenderer.invoke("removeLayout", name).then(() => {
    if (showAlert === true) {
      notificationSuccess({
        message: "Layout " + name + " deleted"
      });
    }
  });
}

export function getAllShortcut() {
  return ipcRenderer.invoke("getAllShortcut");
}

export function countAllShortcut() {
  return ipcRenderer.invoke("countAllShortcut");
}

export function addShortcut(action, icon, size, title, showAlert, callback) {
  return ipcRenderer
    .invoke("addShortcut", action, icon, size, title)
    .then((result) => {
      if (showAlert === true) {
        notificationSuccess({
          message: "Id " + result + " added"
        });
      }
      if (callback != null && callback != undefined) {
        callback(result);
      }
    });
}

export function updateShortcut(
  id,
  action,
  icon,
  size,
  title,
  showAlert,
  callback
) {
  return ipcRenderer
    .invoke("updateShortcut", id, action, icon, size, title)
    .then((result) => {
      if (showAlert === true) {
        notificationSuccess({
          message: "Id " + result + " updated"
        });
      }
      if (callback != null && callback != undefined) {
        callback(result);
      }
    });
}

export function removeShortcut(id, showAlert) {
  return ipcRenderer.invoke("removeShortcut", id).then(() => {
    if (showAlert === true) {
      notificationSuccess({
        message: "Id " + id + " deleted"
      });
    }
  });
}

export function deleteAll() {
  return ipcRenderer.invoke("deleteAll");
}

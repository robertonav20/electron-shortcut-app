const { ipcMain, shell, dialog } = require("electron");
const fs = require("fs");

const configuration = {
  client: "sqlite3",
  connection: {
    filename: `./data`,
    database: "data",
  },
  useNullAsDefault: true,
};
const connection = require("knex")(configuration);
const shortcutTable = "SHORTCUT";
const layoutTable = "LAYOUT";

export function initialize(win: any) {
  initDB();
  initHandlers(win);
}

function initDB() {
  connection.schema.hasTable(shortcutTable).then((result: any) => {
    if (result) {
      console.log("Table " + shortcutTable + " exists yet");
    } else {
      connection.schema
        .createTable(shortcutTable, (table: any) => {
          table.increments("id", { primaryKey: true });
          table.string("title");
          table.string("icon");
          table.string("size");
          table.string("action");
        })
        .then((result: any) =>
          console.log(shortcutTable + " table created" + result)
        );
    }
  });
  connection.schema.hasTable(layoutTable).then((result: any) => {
    if (result) {
      console.log("Table " + layoutTable + " exists yet");
    } else {
      connection.schema
        .createTable(layoutTable, (table: any) => {
          table.increments("id", { primaryKey: true });
          table.string("name").notNullable().unique({ indexName: 'layout_name_unique' });
          table.json("layout");
          table.boolean("active");
        })
        .then((result: any) =>
          console.log(layoutTable + " table created" + result)
        );
    }
  });
}

function initHandlers(win: any) {
  ipcMain.handle("showOpenDialog", (_event, options) =>
    dialog.showOpenDialog(win, options)
  );
  ipcMain.handle("showSaveDialog", (_event, options) =>
    dialog.showSaveDialog(win, options)
  );
  ipcMain.handle("importFile", (_event, filename, charset) =>
    importFile(filename, charset)
  );
  ipcMain.handle("exportFile", (_event, filePath, data, charset) =>
    exportFile(filePath, data, charset)
  );
  ipcMain.handle("launch", (_event, cmd) => shell.openExternal(cmd));
  ipcMain.handle("getAllLayout", (_event) => getAllLayout());
  ipcMain.handle("getLayout", (_event, name) => getLayout(name));
  ipcMain.handle("saveLayout", (_event, name, layout, active) =>
    saveLayout(name, layout, active)
  );
  ipcMain.handle("removeLayout", (_event, name) => removeLayout(name));
  ipcMain.handle("removeActiveLayout", (_event) => removeActiveLayout());
  ipcMain.handle("addShortcut", (_event, action, icon, size, title) =>
    addShortcut(action, icon, size, title)
  );
  ipcMain.handle("updateShortcut", (_event, id, action, icon, size, title) =>
    updateShortcut(id, action, icon, size, title)
  );
  ipcMain.handle("removeShortcut", (_event, id) => removeShortcut(id));
  ipcMain.handle("getAllShortcut", () => getAllShortcut());
  ipcMain.handle("countAllShortcut", () => countAllShortcut());
  ipcMain.handle("deleteAll", () => deleteAll());
}

function getAllShortcut() {
  return connection
    .select("id", "title", "action", "icon", "size")
    .table(shortcutTable)
    .orderBy("title", "asc");
}

function countAllShortcut() {
  return connection.count("id as total").table(shortcutTable).first();
}

function addShortcut(action: any, icon: any, size: any, title: any) {
  return connection.table(shortcutTable).insert({
    action,
    icon,
    size,
    title,
  });
}

function updateShortcut(
  id: any,
  action: any,
  icon: any,
  size: any,
  title: any
) {
  return connection
    .table(shortcutTable)
    .update({
      action,
      icon,
      size,
      title,
    })
    .where("id", id);
}

function removeShortcut(id: any) {
  return connection.del().table(shortcutTable).where("id", id);
}

function deleteAll() {
  connection.del().table(layoutTable);
  return connection.del().table(shortcutTable);
}

function getAllLayout() {
  return connection
    .select("id", "name", "layout")
    .table(layoutTable)
    .orderBy("name", "asc");
}

function getLayout(name: string) {
  return connection
    .select("name", "layout")
    .table(layoutTable)
    .where("name", name);
}

function saveLayout(name: string, layout: any, active: boolean) {
  return connection.table(layoutTable).insert({
    name,
    layout: JSON.stringify(layout),
    active
  })
    .onConflict("name")
    .merge(["layout"]);
}

function removeLayout(name: string) {
  return connection.del().table(layoutTable).where("name", name);
}

function removeActiveLayout() {
  return connection.del().table(layoutTable).where("active", true);
}

async function importFile(filename: any, charset: any) {
  const data = await fs.readFileSync(filename, charset);
  return Promise.resolve(data);
}

async function exportFile(filePath: any, data: any, charset: any) {
  const result = await fs.writeFileSync(filePath, data, charset);
  return Promise.resolve(result);
}

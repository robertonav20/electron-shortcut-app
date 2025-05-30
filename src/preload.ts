const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const process = require("child_process");

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
          table.string("color");
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
  ipcMain.handle("showOpenDialog", (_event: any, options: any) =>
    dialog.showOpenDialog(win, options)
  );
  ipcMain.handle("showSaveDialog", (_event: any, options: any) =>
    dialog.showSaveDialog(win, options)
  );
  ipcMain.handle("importFile", (_event: any, filename: any, charset: any) =>
    importFile(filename, charset)
  );
  ipcMain.handle("exportFile", (_event: any, filePath: any, data: any, charset: any) =>
    exportFile(filePath, data, charset)
  );
  ipcMain.handle("launch", async (_event: any, command: any, args: any) => {
  return new Promise((resolve, reject) => {
    const result = process.spawnSync(command, args, { shell: true });

    if (result.status === 0) {
      resolve({ stdout: result.stdout.toString() });
    } else {
      exportFile('error.log', JSON.stringify({ stderr: result.stderr.toString(), code: result.status }), 'utf-8')
      reject({ stderr: result.stderr.toString(), code: result.status });
    }
  });
});
  ipcMain.handle("getAllLayout", (_event: any) => getAllLayout());
  ipcMain.handle("getLayout", (_event: any, name: string) => getLayout(name));
  ipcMain.handle("saveLayout", (_event: any, name: string, layout: any, active: boolean) =>
    saveLayout(name, layout, active)
  );
  ipcMain.handle("removeLayout", (_event: any, name: string) => removeLayout(name));
  ipcMain.handle("removeActiveLayout", (_event: any) => removeActiveLayout());
  ipcMain.handle("addShortcut", (_event: any, action: any, color: any, icon: any, size: any, title: any) =>
    addShortcut(action, color, icon, size, title)
  );
  ipcMain.handle("updateShortcut", (_event: any, id: any, action: any, color: any, icon: any, size: any, title: any) =>
    updateShortcut(id, action, color, icon, size, title)
  );
  ipcMain.handle("removeShortcut", (_event: any, id: any) => removeShortcut(id));
  ipcMain.handle("getAllShortcut", () => getAllShortcut());
  ipcMain.handle("countAllShortcut", () => countAllShortcut());
  ipcMain.handle("deleteAll", () => deleteAll());
}

function getAllShortcut() {
  return connection
    .select("id", "title", "action", "color", "icon", "size")
    .table(shortcutTable)
    .orderBy("title", "asc");
}

function countAllShortcut() {
  return connection.count("id as total").table(shortcutTable).first();
}

function addShortcut(action: any, color: any, icon: any, size: any, title: any) {
  return connection.table(shortcutTable).insert({
    action,
    color,
    icon,
    size,
    title,
  });
}

function updateShortcut(
  id: any,
  action: any,
  color: any,
  icon: any,
  size: any,
  title: any
) {
  return connection
    .table(shortcutTable)
    .update({
      action,
      color,
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

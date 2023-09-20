import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainInvokeEvent,
  IpcMainEvent,
} from "electron";
import * as path from "path";
import {
  getData,
  insertToTable,
  getDataById,
  deleteById,
  updateTable,
  init,
} from "./ipc_function";

import { Sequelize } from "sequelize";

type IpcListener = (event: IpcMainEvent, ...data: any) => Promise<void>;
type IpcHandleListener = (event: IpcMainInvokeEvent, ...data: any) => any;

class App {
  private mainWindow: BrowserWindow;
  private ipcsHandle: Array<[string, IpcHandleListener]> = [
    ["insert-to-table", insertToTable] as any,
    ["get-data", getData],
    ["get-data-by-id", getDataById],
    ["delete-by-id", deleteById],
    ["update-table", updateTable],
  ];

  constructor() {
    app.whenReady().then(() => {
      this.createWindow();

      app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
      });
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }

  static async init() {
    await init();
    new App();
  }
  createWindow() {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      width: 800,
    });
    console.log("application is starting");

    for (const [channel, listener] of this.ipcsHandle) {
      ipcMain.handle(channel, listener);
    }

    this.mainWindow.loadFile(path.join(__dirname, "../index.html"));

    this.mainWindow.webContents.openDevTools();
  }
}

App.init();

import { table } from "console";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("database", {
  getData: (table: string) => ipcRenderer.invoke("get-data", table),
  getDataById: (table: string, id: number) =>
    ipcRenderer.invoke("get-data-by-id", table, id),
  insertDataToTable: (table: string, data: any) =>
    ipcRenderer.invoke("insert-to-table", table, data),
  deleteById: (table: string, id: number) =>
    ipcRenderer.invoke("delete-by-id", table, id),
  updateTable: (table: string, data: any, id: number) =>
    ipcRenderer.invoke("update-table", table, data, id),
});

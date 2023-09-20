const db: any = require("../models/index.js");

type Table = "kendaraan" | "pelanggan" | "transaksi";

export async function init() {
  db.pelanggan.sync({ alter: true });
  db.kendaraan.sync({ alter: true });
  db.transaksi.sync({ alter: true });
}

export async function insertToTable(
  event: Electron.IpcMainEvent,
  table: Table,
  data: any
) {
  try {
    console.log(data);
    await db[table].create(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getData(
  event: Electron.IpcMainInvokeEvent,
  table: Table
) {
  let result;
  if (table === "transaksi") {
    result = await db.transaksi.findAll({
      include: [db.kendaraan],
    });
  } else if (table === "kendaraan") {
    result = await db.kendaraan.findAll({
      include: [db.pelanggan],
    });
  } else if (table === "pelanggan") {
    result = await db.pelanggan.findAll();
  }
  console.log(result);
  return result.map((v: any) => v.dataValues);
}

export async function getDataById(
  event: Electron.IpcMainInvokeEvent,
  table: Table,
  id: number
) {
  let result;
  if (table === "transaksi") {
    result = await db.transaksi.findByPk(id, {
      include: [db.kendaraan],
    });
  } else if (table === "kendaraan") {
    result = await db.kendaraan.findByPk(id, {
      include: [db.pelanggan],
    });
  } else if (table === "pelanggan") {
    result = await db.pelanggan.findByPk(id);
  }
  console.log(result.dataValues);
  return result.dataValues;
}

export async function deleteById(
  event: Electron.IpcMainInvokeEvent,
  table: Table,
  id: number
) {
  await db[table].destroy({ where: { id: id } });
}

export async function updateTable(
  event: Electron.IpcMainInvokeEvent,
  table: Table,
  data: any,
  id: number
) {
  console.log(`${table} : Data ${JSON.stringify(data)} id: ${id} `);
  await db[table].update(data, { where: { id } });
}

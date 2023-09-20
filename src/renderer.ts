//@ts-nocheck
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

const setButton = document.getElementById("btn");
const list_mobil = document.getElementById("list-mobil");

setButton.addEventListener("click", () => {
  const vehicle = { platNomor: "CEF", jenisKendaraan: "mobil" };
  console.log("oio");
  window.electronAPI.insert_vehicle(vehicle);
});

function vehicleToList(vehicles) {
  for (const vehicle of vehicles) {
    list_mobil.innerHTML += `<li>${vehicle.dataValues.jenisKendaraan} - ${vehicle.dataValues.platNomor}</li>`;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const result = await window.database.get_vehicle();
  vehicleToList(result);
});

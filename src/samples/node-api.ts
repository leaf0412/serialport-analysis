import { lstat } from "node:fs/promises";
import { cwd } from "node:process";
import { ipcRenderer } from "electron";
import { SerialPort } from "serialport";

ipcRenderer.on("main-process-message", (_event: any, ...args: any) => {
  console.log("[Receive Main-process message]:", ...args);
});

lstat(cwd())
  .then((stats: any) => {
    console.log("[fs.lstat]", stats);
  })
  .catch((err: any) => {
    console.error(err);
  });

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

async function listSerialPorts() {
  const ports = await SerialPort.list();
  console.log(ports);
}

export async function listenSerialPort(path: string) {
  const port = new SerialPort(path, { autoOpen: false });
  port.on("data", (data: any) => {
    console.log("Received data:", data);
  });
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(listPorts, 2000);

listSerialPorts();

const { contextBridge, ipcRenderer, ipcMain } = require("electron");
const fs  =  require("fs");
const { readFileSync } = require('fs')
   
contextBridge.exposeInMainWorld("ipcRenderer", 
{
    download: (info) => ipcRenderer.send('download', info),
    delete: (info) => ipcRenderer.send('delete', info),
    fetch: async (info) => {
        path = await ipcRenderer.invoke("fetch",info)
        const fileData = fs.readFileSync(path);
        const blob = new Blob([fileData], { type: 'application/pdf' });
        return blob
    }
}); 
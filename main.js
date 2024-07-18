const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");
const fs = require("fs");
const request = require('request'); 

let mainWindow
let mainPath = path.join(process.env.HOME,"Archives")

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload:  path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/sae-front/browser/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.setMenu(null)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})


ipcMain.on("download", (event, info) => {
  const folderPath = path.join(mainPath, info.properties.directory);

  if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const fileName = info.properties.filename; // Extract the file name from the URL
  const filePath = path.join(folderPath, fileName); // Full path to the file

  const writeStream = fs.createWriteStream(filePath);

  request(info.url)
    .on('error', (error) => {
      event.sender.send('download-error', error.message); // Use event.sender to respond to the correct window
    })
    .pipe(writeStream)
    .on('finish', () => {
      event.sender.send('download-complete', filePath); // Send the full file path
    });
});

ipcMain.on("delete", (event, info)=>{
  const folderPath = path.join(mainPath, info.properties.directory);
  const filePath = path.join(folderPath, info.properties.filename)
  fs.unlink(filePath,  function (err) {            
    if (err) {                                                 
        console.error(err);                                    
    }                                                          
   console.log('File has been Deleted');                           
});                             
})

ipcMain.handle("fetch", (event, info) => {
  const folderPath = path.join(mainPath, info.properties.directory);
  const fileName = info.properties.filename
  const filePath = path.join(folderPath, fileName);
  return(filePath)
});
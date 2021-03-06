// const electron = require("electron");
// const ejse = require("ejs-electron");

// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;

// function createWindow() {
//     const win = new BrowserWindow({
//         width : 800,
//         height : 600,
//         webPreferences : {
//             nodeIntegeration : true
//         }
//     })
//     win.loadFile('index.ejs').then(function(){
//         win.fullScreen();
//         win.webContents.openDevTools();
//     })
// }

// app.whenReady().then(createWindow);

const electron = require("electron");
const ejse = require("ejs-electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true, // node enabled !,
        
      }
    })
  
    win.loadFile('index.ejs').then(function(){
        win.maximize();
        win.webContents.openDevTools();
    })
}
  
app.whenReady().then(createWindow)
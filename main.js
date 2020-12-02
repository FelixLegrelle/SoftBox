const {app, BrowserWindow} = require('electron');
let win = null


function boot() {
    win = new BrowserWindow({
        movable: true,
        frame: false,
        width: 5000,
        height: 2500,
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.webContents.openDevTools()
    win.loadURL(`file://${__dirname}/index.html`)
}

app.on("ready", boot);
const {app,BrowserWindow}=require("electron")
const path = require("path");

app.setPath("userData", path.join(__dirname, "user-data"))
function createwindow(){
    const win = new BrowserWindow({
        height:1080,
        width:1920,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        }
    })
    win.loadFile("index.html")
}

app.disableHardwareAcceleration()
app.whenReady().then(createwindow)
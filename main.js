const electron = require('electron')
const url = require('url')
const path = require('path')
const cons = require('console');
const {app, BrowserWindow, Menu, ipcMain} = electron
app.console = new cons.Console(process.stdout, process.stderr);
let mainWindow;

// set ENV
process.env.NODE_ENV = 'production'

// Listen for app to be ready
app.on('ready', ()=>{
    //create new window
    let iconPath
    if (process.platform == 'darwin'){ iconPath = 'assets/icons/mac/icon.icns'}
    if (process.platform == 'linux'){ iconPath = 'assets/icons/png/icon.png'}
    if (process.platform == 'win32'){ iconPath = 'assets/icons/win/icon.ico'}
    mainWindow = new BrowserWindow({
        //width,
        //height,
        //fullscreenable: true,
        //fullscreen: true,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.resolve(__dirname, iconPath)        
    });
    // load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    //Quit app whyen closed
    mainWindow.on('closed', ()=>{
        app.quit()
    })

    ipcMain.on('form-data', (event, arg) => {
        console.log( arg );
    })
    countDown()
})

function countDown(){
    setInterval(() => {
        // console.log(Date())
        mainWindow.webContents.send('item:add', Date())
    }, 5000);
}
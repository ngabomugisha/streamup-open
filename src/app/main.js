"use strict";
var electron_1 = require('electron');
var electron = require('electron');
var ipcMain = electron.ipcMain;
var app = electron.app;
// var BrowserWindow = electron.BrowserWindow;
var mainWindow;
var iconPath = __dirname + '/dist/img/app-icon.png';
// var isOnline = require('is-online');
var Menu = electron.Menu;
/**
 * We are loading all electron works(main process work here as for now we don't have a clear picture on how we can do it better this is a temporal solution we do have.)
 *
 */
//dir with main process so fast
// new Dir().create('Sbox');
var menuTemplate = [
    {
        label: 'Sbox',
        submenu: [
            {
                label: 'Exit',
                accelerator: 'Cmd+Q',
                click: function () {
                    // global.terminate();
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'Cmd+Z',
                selector: 'undo:'
            },
            {
                label: 'Redo',
                accelerator: 'Shift+Cmd+Z',
                selector: 'redo:'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'Cmd+X',
                selector: 'cut:'
            },
            {
                label: 'Copy',
                accelerator: 'Cmd+C',
                selector: 'copy:'
            },
            {
                label: 'Paste',
                accelerator: 'Cmd+V',
                selector: 'paste:'
            },
            {
                label: 'Select All',
                accelerator: 'Cmd+A',
                selector: 'selectAll:'
            }
        ]
    },
];
var menu = Menu.buildFromTemplate(menuTemplate);
var settingsWindow;
var shouldQuit = false;
// global.updateStatus = (function () {
//     var status = '';
//     return {
//         get: function () {
//             return status;
//         },
//         set: function (value) {
//             status = value;
//             if (settingsWindow) {
//                 settingsWindow.webContents.send('UPDATE_STATUS', value);
//             }
//         }
//     };
// })();
// global.terminate = function () {
//     shouldQuit = true;
//     app.quit();
// };
if (process.platform === 'linux') {
    app.commandLine.appendSwitch('enable-transparent-visuals');
    app.commandLine.appendSwitch('disable-gpu');
}
// var shouldStartInstance = app.makeSingleInstance(function(commandLine, workingDirectory) {
//     if (mainWindow) {
//         if (!mainWindow.isVisible()) {
//             mainWindow.show();
//         }
//         if (mainWindow.isMinimized()) {
//             mainWindow.restore();
//         }
//         mainWindow.focus();
//     }
//     return true;
// });
// if (shouldStartInstance) {
//     app.quit();
//     return;
// }
var path = require('path');
app.on('ready', function () {
    mainWindow = new electron_1.BrowserWindow({
        // width: 960,
        width: 1380,
        // height: 640,
        height: 740,
        frame: false,
        transparent: true,
        icon: path.join(__dirname, '../../assets/images/icon.png')
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // mainWindow.loadURL('http://localhost:4200/');
    // mainWindow.webContents.openDevTools();
    //deal with data back and forth
    //  const windowID = BrowserWindow.getFocusedWindow().id
    ipcMain.on('create-dir', function (event, arg) {
        console.log(arg);
    });
    mainWindow.on('close', function (e) {
        if (!shouldQuit) {
            e.preventDefault();
            mainWindow.hide();
        }
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    settingsWindow = new electron_1.BrowserWindow({
        width: 600,
        height: 480,
        frame: false,
        resizable: false,
        transparent: true,
        icon: path.join(__dirname, '../assets/images/icon.png')
    });
    settingsWindow.loadURL('file://' + __dirname + '/settings.html');
    settingsWindow.hide();
    // settingsWindow.webContents.openDevTools();
    settingsWindow.on('close', function (e) {
        if (!shouldQuit) {
            e.preventDefault();
            settingsWindow.hide();
        }
    });
    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
    // global.settingsWindow = settingsWindow;
    if (process.platform === 'darwin') {
        Menu.setApplicationMenu(menu);
    }
    ;
});

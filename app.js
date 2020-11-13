const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

// Handle shortcuts on windows
if (require('electron-squirrel-startup')) {
    app.quit();
}

// Global reference of window object
let main_window;

function create_window () {
    // Create browser window
    main_window = new BrowserWindow({
        width: 1370,
        height: 860,
        minWidth: 1370,
        minHeight: 860,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load index.html of the app
    main_window.loadURL(path.join('file://',__dirname, 'src', 'html', 'index.html'));

    // Disable menu bar when window started
    main_window.once('ready-to-show', function () {
        main_window.setMenu(null);
        main_window.show();
    });

    // Emit when the window is closed
    main_window.on('closed', function () {
        //  Dereference window object
        main_window = null;
    });

    // Enable DevTools
    main_window.removeMenu();
    enable_dev_tools();
}

// Enable developer tools for debugging
function enable_dev_tools () {
    // Detecting os and change keys
    if (process.platform === 'darwin') {
        globalShortcut.register('Command + Shift + I', function () {
            main_window.webContents.openDevTools();
        });
    } else if (process.platform === 'linux' || process.platform === 'win32') {
        globalShortcut.register('Control + Shift + I', function () {
            main_window.webContents.openDevTools();
        });
    }
}

// Initialize electron and create browser windows
app.on('ready', create_window);

// Quit when all windows are closed
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // Recreate window in the app when dock icon is clicked
    if (main_window === null) {
        create_window();
    }
});
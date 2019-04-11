/**
 *  This app file contains all the logic which electron will use as it's main file. It is exported to `main.js` where it will be initiated.
 *  The development environment can be set in main.js.
 */
import {
    app,
    BrowserWindow,
    Menu,
    MenuItemConstructorOptions
} from 'electron';
import url from 'url';
import path from 'path';

/**
 *  The App class initiates the entire electron app.
 */
export default class App {
    // Create variables for windows in app
    private mainWindow!: BrowserWindow;
    // Create top menu template
    private mainMenuTemplate: Array<MenuItemConstructorOptions>;

    constructor() {
        this.mainMenuTemplate = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Quit',
                        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                        click() {
                            app.quit();
                        }
                    },
                ]
            }
        ];
        this.run();
    }

    /**
     *  The run method will initiate the entire app and is ran in the constructor.
     */
    private run(): void {
        this.createMainWindow();

        // If on mac then add empty object to menu
        if (process.platform === 'darwin') {
            this.mainMenuTemplate.unshift({});
        }

        // Add dev tools if in dev env
        if (process.env.NODE_ENV !== 'production') {
            this.mainMenuTemplate.push({
                label: 'Dev Tools',
                submenu: [
                    {
                        label: 'Toggle Dev Tools',
                        accelerator: process.platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
                        click(item: any, focusedWindow: any) {
                            focusedWindow.toggleDevTools();
                        }
                    },
                    {
                        role: 'reload'
                    }
                ]
            });
        }
    }

    /**
     *  Create the main window with this method.
     */
    private createMainWindow(): void {
        app.on('ready', () => {
            // Create new window
            this.mainWindow = new BrowserWindow({
                webPreferences: {
                    nodeIntegration: false,
                    nodeIntegrationInWorker: false,
                },
                width: 960,
                height: 700
            });
            this.mainWindow.maximize();

            // Load the html file into the window
            this.mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, './renderer/components/dashboard/dashboard.html'),
                protocol: 'file:',
                slashes: true
            }));

            // Quit entire app when closed
            this.mainWindow.on('closed', () => {
                app.quit();
            });

            // Build menu from template
            const mainMenu = Menu.buildFromTemplate(this.mainMenuTemplate);
            // Insert the menu
            Menu.setApplicationMenu(mainMenu);
        });
    }
}

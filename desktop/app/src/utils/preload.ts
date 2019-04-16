/**
 *  Preload.js script to load all neccessary scripts before the renderer is loaded.
 *  We add global modules from the main processes to which the renderer can access, 
 *  such as `ipcRenderer`. We can also add global variables.
 */

import { ipcRenderer } from 'electron';

// so I know preload is being loaded properly.
console.log('preload script');

// Set global ipcRenderer function.
window.ipcRenderer = ipcRenderer;

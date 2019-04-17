/**
 *  Preload.js script to load all neccessary scripts before the renderer is loaded.
 *  We add global modules from the main processes to which the renderer can access, 
 *  such as `ipcRenderer`. We can also add global variables.
 */

import { ipcRenderer } from 'electron';
import { loadComponent, addScript } from '../utils/helpers';

// All helpers scoped into window.workers
window.helpers = {
    // Function to dynamically load the html components
    loadComponent: loadComponent,
    // Set global ipcRenderer function.
    ipcRenderer: ipcRenderer,
    addScript: addScript
}

/**
 *  Preload.js script to load all neccessary scripts before the renderer is loaded.
 *  We add global modules from the main processes to which the renderer can access, 
 *  such as `ipcRenderer`. We can also add global variables.
 */

import { ipcRenderer } from 'electron';
import Helpers from '../utils/helpers';

// Instantiate classes
const helpers: Helpers = new Helpers();

// All helpers scoped into window.workers
window.helpers = {
    // Set global ipcRenderer function.
    ipcRenderer: ipcRenderer,
    // Function to dynamically load the html components
    loadComponent: helpers.loadComponent,
    addScript: helpers.addScript,
    getHTML: helpers.getHTML
}

/**
 *  Preload.js script to load all neccessary scripts before the renderer is loaded.
 *  We add global modules from the main processes to which the renderer can access, 
 *  such as `ipcRenderer` and Class variations. We can also add global variables.
 */

import { ipcRenderer } from 'electron';
import Helpers from '../utils/helpers';
import Component from '../utils/component';
import State from '../utils/state';
import Router from '../utils/router/router';

// All helpers scoped into window.helpers
window.main = {
    // Set global ipcRenderer variables.
    ipcRenderer: ipcRenderer,
    Helpers: Helpers,
    Component: Component,
    State: State,
    Router: Router
}

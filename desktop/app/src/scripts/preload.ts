/**
 *  Preload.js script to load all neccessary scripts before the renderer is loaded.
 *  We add global modules from the main processes to which the renderer can access, 
 *  such as `ipcRenderer` and Class variations. We can also add global variables.
 */

import { ipcRenderer } from 'electron';
import Helpers from '../utils/helpers';
import Components from '../utils/components';
import State from '../utils/state';

// All helpers scoped into window.helpers
window.main = {
    // Set global ipcRenderer variables.
    ipcRenderer: ipcRenderer,
    Helpers: Helpers,
    Components: Components,
    State: new State() // we generate the state object at the highest possible level.
}

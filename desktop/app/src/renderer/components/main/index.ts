/**
 *  The main javascript file for the application. Any variables that is 
 *  used on any other scripts in this scope will go in here.
 */

// Get needed properties and methods from window scope inside preload.js.
const { Helpers, ipcRenderer, Components, State } = window.main;
const helpers = new Helpers();
const state = new State();

// include all the specified components on load.
helpers.includeHTML();

// // ipcRenderer
// ipcRenderer.send('ping', { pong: 'ding' });

// ipcRenderer.on('pong', (event: any, item: any) => {
//     console.log('index', item);
// });

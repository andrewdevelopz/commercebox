/**
 *  The main javascript file for the application. Any variables that is 
 *  used on any other scripts in this scope will go in here.
 */

// Get needed properties and methods from window scope inside preload.js.
const { Helpers, ipcRenderer, Components, State } = window.main;
const helpers = new Helpers();
const state = State;

// include the default scripts onload. the scripts will generate the html for us.
helpers.addScript('../shared/sidebar/sidebar.js');

// generate all the components in the `main` directory.
const mainComponents: string[] = ['dashboard', 'inventory', 'orders', 'todos', 'analytics'];
const generateMainComponents = (comps: string[]): void => {
    // loop through `comps` and add the scripts accordingly.
    for (const comp of comps) {
        helpers.addScript(`${comp}/${comp}.js`);
    }
}
generateMainComponents(mainComponents);

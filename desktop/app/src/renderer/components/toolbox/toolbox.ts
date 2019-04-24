/**
 *  The main javascript file for the application. Any variables that is 
 *  used on any other scripts in this scope will go in here.
 */

// Get needed properties and methods from window scope inside preload.js.
const { Helpers, ipcRenderer, Component, State, Router } = window.main;
const helpers: any = new Helpers();
const state: IState = new State();
const router = new Router();

// include the components script onload. the scripts will generate the html for us.
const toolboxComponents: ComponentInfo = [
    {
        dir: 'shared',
        comps: ['sidebar']
    },
    {
        dir: 'toolbox',
        comps: ['dashboard', 'inventory', 'orders', 'todos', 'analytics']
    }
];
const generateComponents = (comps: ComponentInfo): void => {
    // loop through `comps` and add the scripts accordingly.
    for (const comp of comps) {
        for (const name of comp.comps) {
            helpers.addScript(`../${comp.dir}/${name}/${name}.js`);
        }
    }
}
generateComponents(toolboxComponents);

window.addEventListener('load', async () => {
    // insert code when window is loaded.
    // console.log(window.location);
});

/**
 *  The main javascript file for the application. Any variables that is 
 *  used on any other scripts in this scope will go in here.
 */

// Get needed properties and methods from window scope inside preload.js.
const { Helpers, ipcRenderer, Component, State, Router } = window.main;
const helpers = new Helpers();
const state: IState = State;
const router = Router;

// include the default scripts onload. the scripts will generate the html for us.
const mainComponents: ComponentInfo = [
    {
        dir: 'shared',
        comps: ['sidebar']
    },
    {
        dir: 'main',
        comps: ['dashboard', 'inventory', 'orders', 'todos', 'analytics']
    }
];
const generateMainComponents = (comps: ComponentInfo): void => {
    // loop through `comps` and add the scripts accordingly.
    for (const comp of comps) {
        for (const name of comp.comps) {
            helpers.addScript(`../${comp.dir}/${name}/${name}.js`);
        }
    }
}
generateMainComponents(mainComponents);

router.routes.push({ name: '', element: '' as any })
console.log('index.ts\n', router.routes);

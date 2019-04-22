/**
 *  The router module will handle all routes inside the application on a
 *  given BrowserWindow. When the app is loaded all modules are loaded
 *  and should be passed into the router to determine which modules
 *  are to be shown at any given time based on events.
 */

export default class Router {
    routes: Route[];
    constructor(routes: Route[]) {
        this.routes = routes;
        console.log(this);
    }
}

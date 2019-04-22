/**
 *  The route module that defines the route object when a component is created.
 */

export default class Route {
    name: string;
    element: HTMLElement;
    defaultRoute: boolean;

    constructor(name: string, element: HTMLElement, defaultRoute: boolean = false) {
        this.name = name;
        this.element = element;
        this.defaultRoute = defaultRoute;
    }

    /**
     *  This method checks to see if the current component is the active route.
     * 
     *  @param path what the path should be in window.location.path
     */
    private isActiveRoute = (path: string): boolean => {
        return path === this.name;
    }
}

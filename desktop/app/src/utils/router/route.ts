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
        // console.log('\nRoute\n', this);
    }

    /**
     *  This method checks to see if the current component is the active route.
     * 
     *  @param hashedPath what the hashed path should be in window.location.hash
     */
    private isActiveRoute = (hashedPath: string): boolean => {
        return hashedPath.replace('#', '') === this.name;
    }
}

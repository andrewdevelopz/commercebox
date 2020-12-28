/**
 *  This module will create an object that scopes to it's unique namespace
 *  to keep track of any given state of the overall application.
 *      e.g. Hidethe current component that is loaded and reveal the newly
 *           requested component
 */

export default class State {
    currentComponent = '';
    components = {};
    constructor() { }

    /**
     *  This method will assign a property to components in state.
     * 
     *  @param object the object to add to components.
     */
    assignToComponents = (object: object): void => {
        Object.assign(this.components, object);
    }
}

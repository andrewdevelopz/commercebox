/**
 *  This module will create an object that scopes to it's unique namespace
 *  to keep track of any given state of the overall application.
 *      e.g. Hidethe current component that is loaded and reveal the newly
 *           requested component
 */

export default class State {
    state: IState = {
        currentComponent: ''
    };
    constructor() { }

    /**
     *  This method will assign a property to state.
     * 
     *  @param object the object to add to state.
     */
    assignToState = (object: object): void => {
        Object.assign(this.state, object);
        console.log(this.state.currentComponent);
    }
}

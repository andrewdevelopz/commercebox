/**
 *  Declare all types and interfaces for the entire desktop application.
 */

import { IpcRenderer } from 'electron';

// Declare global properties to be accessed in renderer.
declare global {
    // adding onto window interface
    interface Window {
        main: { 
            ipcRenderer: IpcRenderer;
            Helpers: any;
            Component: any;
            State: any;
            Router: any;
        };
    }

    // add path property to window.location object.
    interface Location {
        path: string;
    }

    // sidebar menu item object structure
    type SidebarItem = {
        name: string;
        icon: string;
    }

    // // the component info property inside Component class
    // type Component = {
    //     name?: string;  
    // }

    // holds the component directory in which it lives and the names in an array.
    type ComponentInfo = { dir: string, comps: string[] }[]

    type Route = {
        name: string;
        element: HTMLElement;
        defaultRoute?: boolean; // is it the default route?
    }

    // The response object returned from functions and methods. Local meaning it is local to this app.
    type LocalResponse = {
        status?: boolean;
        body?: any;
        element?: HTMLElement
    }

    // the structure of the overall state in the application.
    interface IState {
        currentComponent: string;
        components: object;
        assignToComponents: Function;
    }

    // the assemble structure when creating the object to assign to state.
    type Assemble = {
        [name: string]: HTMLElement
    }
}

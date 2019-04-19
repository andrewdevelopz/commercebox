/**
 *  Declare all types and interfaces for the entire desktop application.
 */

import { IpcRenderer } from 'electron';
import Helpers from './utils/helpers';

// Declare global properties to be accessed in renderer.
declare global {
    // adding onto window interface
    interface Window {
        main: { 
            ipcRenderer: IpcRenderer;
            Helpers: any;
            Components: any;
        };
    }

    // sidebar menu item object structure
    type SidebarItem = {
        name: string;
        icon: string;
    }

    type Component = {
        name?: string;
        element?: HTMLElement;
    }

    // The response object returned from functions and methods. Local meaning it is local to this app.
    type LocalResponse = {
        status?: boolean;
        body?: any;
        element?: HTMLElement
    }
}

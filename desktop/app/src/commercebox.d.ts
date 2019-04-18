/**
 *  Declare all types and interfaces for the entire desktop application.
 */

import { IpcRenderer } from 'electron';

// Declare global properties to be accessed in renderer.
declare global {
    // adding onto window interface
    interface Window {
        helpers: { 
            loadComponent: Function;
            ipcRenderer: IpcRenderer;
            addScript: Function;
            getHTML: Function;
        };
    }

    // sidebar menu item object structure
    type SidebarItem = {
        name: string;
        icon: string;
    }
}

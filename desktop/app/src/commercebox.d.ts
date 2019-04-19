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
        html?: string;
        path?: string;
    }
}

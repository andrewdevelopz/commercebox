/**
 *  The helper class file that will handle helper tasks for the renderer
 *  and main process in the application. One example of a helper will be the 
 *  script file to be loaded onto the main section (footer of index.html) of 
 *  the renderer.
 */

export default class Helpers {
    constructor() { }

    /**
     *  Add the script tag which should be included in the same directory of each render file (html file).
     * 
     *  @param src - the path to which to set the src of the script tag
     */
    private addScript = (src: string): HTMLScriptElement | void => {
        // loop through all scripts in html and exit the function if it has already been loaded.
        const filename: string = src.split('/').pop() as string;
        const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll('script');
        for (const script of scripts) {
            if (script.src.search(filename) > -1) {
                return;
            }
        }
        const s: HTMLScriptElement = document.createElement('script');
        s.setAttribute('src', src);
        s.setAttribute('type', 'text/javascript');
        document.body.appendChild(s);
        return s;
    }

    /**
     *  This function allows the import of html files acting as components in the html.
     */
    private includeHTML = async (): Promise<void> => {
        let tags: HTMLCollection, element: HTMLElement, file: any, xhttp: Response;
        // loop through a collection of all HTML elements:
        tags = document.getElementsByTagName('include');
        for (const tag of tags) {
            element = tag as HTMLElement;
            // search for elements with a certain atrribute:
            file = element.getAttribute('include-html');
            if (file) {
                try {
                    // make an HTTP request using the attribute value as the file name:
                    xhttp = await fetch(file);
                    element.innerHTML = await xhttp.text();
                    // get the loaded HTML element and set it's attribute id to filename
                    const loadedHTML: HTMLElement = element.querySelector('div') as HTMLElement;
                    const name: string = file.split('/').pop().replace('.html', '');
                    loadedHTML.setAttribute('id', name);
                    // we add script tag dynamically by replacing path file extension with .js
                    this.addScript(file.replace('.html', '.js'));
                } catch (e) {
                    console.error(e);
                    element.innerHTML = 'HTML component not found';
                } finally {
                    // remove the attribute, and call this function once more:
                    element.removeAttribute('include-html');
                    this.includeHTML();
                    // exit the function:
                    return;
                }
            }
        }
    }

    // /**
    //  *  Function to dynamically load the html && js components.
    //  * 
    //  *  @param element - the element to which the html should be loaded to.
    //  *  @param path - the path to which to fetch the html and js.
    //  *  @param loadScript - whether to load the script for the html.
    //  *  @param replaceInnerHTML - whether to replace the innerHTML or add on to it.
    //  */
    // public loadComponent = async (element: string, path: string, loadScript: boolean = true, replaceInnerHTML: boolean = true): Promise<void> => {
    //     try {
    //         // grab the container to which the html will be included to
    //         const currentComponent: HTMLElement = document.querySelector(element) as HTMLElement;
    //         const filename: string = (path.split('/').pop() as string);
    //         const name: string = filename.replace('.html', '');
    //         const shouldLoad: boolean = currentComponent.firstElementChild!.getAttribute('id') !== name;

    //         // if the component is not already loaded
    //         if (shouldLoad) {
    //             const html = await fetch(`../${path}`);
    //             // whether to replace or addon to the html
    //             if (replaceInnerHTML) {
    //                 currentComponent.innerHTML = await html.text();
    //             } else {
    //                 currentComponent.insertAdjacentHTML('beforeend', await html.text());
    //             }
    //             // capture the new element and set it's id to base of filename
    //             const loadedHTML: HTMLElement = currentComponent.querySelector('div') as HTMLDivElement;
    //             loadedHTML.setAttribute('id', name);

    //             // loop through all scripts in html and exit the function if it has already been loaded.
    //             const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll('script');
    //             for (const script of scripts) {
    //                 if (script.src.search(filename.replace('.html', '.js')) > -1) {
    //                     return;
    //                 }
    //             }

    //             // load js script respectively to it's component and remove the previous loaded script
    //             if (loadScript) {
    //                 // const script: HTMLScriptElement = this.addScript('../' + path.replace('.html', '.js'));
    //                 // script.previousElementSibling!.remove();
    //             }
    //         } else {
    //             return;
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // /**
    //  *  Method to only get the HTML text from a html file.
    //  * 
    //  *  @param path - the path to which the html resides.
    //  */
    // public getHTML = async (path: string): Promise<string> => {
    //     try {
    //         const html = await fetch(`../${path}`);
    //         return html.text();
    //     } catch (e) {
    //         console.error(e);
    //         return 'Could not fetch the html';
    //     }
    // }
}

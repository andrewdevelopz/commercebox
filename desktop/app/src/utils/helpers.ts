/**
 *  The helper class file that will handle helper tasks for the renderer
 *  and main process in the application. One example of a helper will be
 *  getting the html template to be loaded onto the includes section
 *  of the renderer.
 */

export default class Helpers {
    constructor() { }

    /**
     *  Function to dynamically load the html && js components.
     * 
     *  @param element - the element to which the html should be loaded to.
     *  @param path - the path to which to fetch the html and js.
     *  @param loadScript - whether to load the script for the html.
     *  @param replaceInnerHTML - whether to replace the innerHTML or add on to it.
     */
    public loadComponent = async (element: string, path: string, loadScript: boolean = true, replaceInnerHTML: boolean = true): Promise<void> => {
        try {
            // grab the container to which the html will be included to
            const currentComponent: HTMLElement = document.querySelector(element) as HTMLElement;
            const filename: string = (path.split('/').pop() as string);
            const name: string = filename.replace('.html', '');
            const shouldLoad: boolean = currentComponent.firstElementChild!.getAttribute('id') !== name;

            // if the component is not already loaded
            if (shouldLoad) {
                const html = await fetch(`../${path}`);
                // whether to replace or addon to the html
                if (replaceInnerHTML) {
                    currentComponent.innerHTML = await html.text();
                } else {
                    currentComponent.insertAdjacentHTML('beforeend', await html.text());
                }
                // capture the new element and set it's id to base of filename
                const loadedHTML: HTMLElement = currentComponent.querySelector('div') as HTMLDivElement;
                loadedHTML.setAttribute('id', name);

                // loop through all scripts in html and exit the function if it has already been loaded.
                const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll('script');
                for (const script of scripts) {
                    if (script.src.search(filename.replace('.html', '.js')) > -1) {
                        return;
                    }
                }

                // load js script respectively to it's component and remove the previous loaded script
                if (loadScript) {
                    // const script: HTMLScriptElement = this.addScript('../' + path.replace('.html', '.js'));
                    // script.previousElementSibling!.remove();
                }
            } else {
                return;
            }
        } catch (e) {
            console.error(e);
        }
    }

    /**
     *  Method to only get the HTML text from a html file.
     * 
     *  @param path - the path to which the html resides.
     */
    public getHTML = async (path: string): Promise<string> => {
        try {
            const html = await fetch(`../${path}`);
            return html.text();
        } catch (e) {
            console.error(e);
            return 'Could not fetch the html';
        }
    }

    /**
     *  Add the script tag which should be included in the same directory of each render file (html file).
     * 
     *  @param src - the path to which to set the src of the script tag
     */
    public addScript = (src: string): HTMLScriptElement | void => {
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
}

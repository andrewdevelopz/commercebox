/**
 *  The helper file that will handle helper tasks for the renderer and
 *  main process in the application. One example of a helper will be
 *  getting the html template to be loaded onto the includes section
 *  of the renderer.
 */

// Function to dynamically load the html components
export const loadComponent = async (path: string): Promise<void> => {
    const currentComponent: HTMLElement = document.querySelector('#includes') as HTMLElement;
    const name: string = (path.split('/').pop() as string).replace('.html', '');
    const shouldLoad: boolean = currentComponent.firstElementChild!.getAttribute('id') !== name;

    // if the component is not already loaded
    if (shouldLoad) {
        // grab the container for include elements
        const includes: HTMLElement = document.querySelector('#includes') as HTMLElement;
        const html = await fetch(`../${path}`);
        includes.innerHTML = await html.text();
        // capture the new element and set it's id to base of filename
        const loadedHTML: HTMLElement = includes.querySelector('div') as HTMLDivElement;
        loadedHTML.setAttribute('id', name);
        // load js script respectively to it's component and remove the previous loaded script
        const script: HTMLScriptElement = addScript('../' + path.replace('.html', '.js'));
        script.previousElementSibling!.remove();
    } else {
        return;
    }
}

// Add the script tag which should be included in the same directory of each render file (html file)
export const addScript = (src: string): HTMLScriptElement => {
    const s: HTMLScriptElement = document.createElement('script');
    s.setAttribute('src', src);
    s.setAttribute('type', 'text/javascript');
    document.body.appendChild(s);
    return s;
}

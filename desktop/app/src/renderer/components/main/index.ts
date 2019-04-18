/**
 *  The main javascript file for the application. Any variables that is 
 *  used on any other scripts in this scope will go in here.
 */

// Get needed properties and methods from window scope inside preload.js.
const { Helpers, ipcRenderer, Components } = window.main;
const helpers = new Helpers();

// This function allows the import of html files acting as components
const includeHTML = async (): Promise<void> => {
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
                helpers.addScript(file.replace('.html', '.js'));
            } catch (e) {
                console.error(e);
                element.innerHTML = 'HTML component not found';
            } finally {
                // remove the attribute, and call this function once more:
                element.removeAttribute('include-html');
                includeHTML();
                // exit the function:
                return;
            }
        }
    }
}
includeHTML();

// ipcRenderer
/* ipcRenderer.send('ping', { pong: 'ding' });

ipcRenderer.on('pong', (event: any, item: any) => {
    console.log('index', item);
}); */

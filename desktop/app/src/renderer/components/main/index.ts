/**
 *  The main javascript file for the application. Any globals will go in here.
 */

// This function allows the import of html files acting as components
const includeHTML = async () => {
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
                // we add script tag dynamically by replacing path file extension with .js
                addScript(file.replace('.html', '.js'));
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

// Add the script tag which should be included in the same directory of each render file (html file)
const addScript = (src: string) => {
    const s: HTMLElement = document.createElement('script');
    s.setAttribute('src', src);
    document.body.appendChild(s);
}

// ipcRenderer
/* window.ipcRenderer.send('ping', { pong: 'ding' });

window.ipcRenderer.on('pong', (event: any, item: any) => {
    console.log('index', item);
}); */

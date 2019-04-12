/**
 *  The main javascript file for the application. Any globals will go in here.
 */

// This function allows the import of html files acting as components
const includeHTML = async () => {
    let tags: HTMLCollection, elmnt: HTMLElement, file: any, xhttp: Response;
    // loop through a collection of all HTML elements:
    tags = document.getElementsByTagName('include');
    for (const tag of tags) {
        elmnt = tag as HTMLElement;
        // search for elements with a certain atrribute:
        file = elmnt.getAttribute('include-html');
        if (file) {
            try {
                // make an HTTP request using the attribute value as the file name:
                xhttp = await fetch(file);
                elmnt.innerHTML = await xhttp.text();
            } catch (e) {
                console.error(e);
                elmnt.innerHTML = 'HTML component not found';
            } finally {
                // remove the attribute, and call this function once more:
                elmnt.removeAttribute('include-html');
                includeHTML();
                // exit the function:
                return;
            }
        }
    }
}
includeHTML();

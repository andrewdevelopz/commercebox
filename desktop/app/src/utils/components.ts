/**
 *  This is the components class file. It is the base of all components that
 *  will be loaded to the main html. All other components should extend
 *  this class.
 */

export default class Components {
    // the object that will hold all neccessary information of the component.
    component: Component = {};

    constructor() { }

    /**
     *  Method to assemble the component before loading it to the dom.
     * 
     *  @param name the name of the component
     *  @param element the element to select for loading the component to.
     */
    private generateComponent = async (name: string, element: string): Promise<object> => {
        try {
            // get the `html` text from file and select the `includes` area element
            const html = await this.getHTML(`main/${name}/${name}.html`);
            const includes: HTMLElement = document.querySelector(element) as HTMLElement;

            // create a new element to insert the html component. 
            const container: HTMLDivElement = document.createElement('div');
            container.setAttribute('id', name);
            container.insertAdjacentHTML('afterbegin', html);
            includes.insertAdjacentElement('beforeend', container);
            this.includeHTML(container);
            return {
                status: true,
                message: 'component created successfuly',
                element: container
            }
        } catch (e) {
            return {
                status: false,
                message: e.message
            }
        }
    }

    /**
     *  Method to include the html files that are specified in the main file.
     *  e.g. `<include include-html="./path/path/path.html"></include>`.
     * 
     *  @param parent the parent element to which we will be including html files for.
     */
    private includeHTML = async (parent: HTMLElement): Promise<void> => {
        // loop through a collection of all HTML elements with tag name `include`
        const tags: HTMLCollection = parent.getElementsByTagName('include');
        for (const tag of tags) {
            // search for elements with a certain atrribute.
            const file = tag.getAttribute('include-html') as string;
            if (file) {
                // make an HTTP request using the attribute value as the file path.
                const html: string = await this.getHTML(file);
                tag.insertAdjacentHTML('afterbegin', html);
                // remove the attribute, and call this function once more
                tag.removeAttribute('include-html');
                this.includeHTML(parent);
                return;
            }
        }
    }

    /**
     *  This method will switch components based on the route clicked.
     */
    private switchComponents = () => { }

    /**
     *  Method to only get the HTML text from a html file.
     * 
     *  @param path - the path to which the html resides.
     */
    private getHTML = async (path: string): Promise<string> => {
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
    private addScript = (src: string): HTMLScriptElement => {
        const s: HTMLScriptElement = document.createElement('script');
        s.setAttribute('src', src);
        s.setAttribute('type', 'text/javascript');
        document.body.appendChild(s);
        return s;
    }
}

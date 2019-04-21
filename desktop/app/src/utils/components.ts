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
    private generateComponent = async (name: string, element: string, dir: string): Promise<LocalResponse> => {
        try {
            // select the `includes` area element
            const includes: HTMLElement = document.querySelector(element) as HTMLElement;
            if (includes) {
                // get the `html` text from file
                const html: LocalResponse = await this.getHTML(`../${dir}/${name}/${name}.html`);
                // create a new element to insert the html component.
                const container: HTMLDivElement = document.createElement('div');
                container.setAttribute('id', name);
                container.insertAdjacentHTML('afterbegin', html.body);
                includes.insertAdjacentElement('beforeend', container);
                await this.includeHTML(container);
                return {
                    status: true,
                    body: `${name} component created successfuly`,
                    element: container
                }
            } else {
                throw new Error('includes element could not be found');
            }
        } catch (e) {
            return Promise.reject({
                status: false,
                body: e.message
            });
        }
    }

    /**
     *  Method to include the html files that are specified in the html files.
     *  e.g. `<include include-html="./path/path/path.html"></include>`.
     * 
     *  @param parent the parent element to which we will be including html files for.
     */
    private includeHTML = async (parent: HTMLElement): Promise<void> => {
        // loop through a collection of all HTML elements with tag name `include`
        const tags: HTMLCollection = parent.getElementsByTagName('include');
        for (const tag of tags) {
            // search for elements with a certain atrribute.
            const file: string = tag.getAttribute('include-html') as string;
            if (file) {
                // make an HTTP request using the attribute value as the file path.
                const html: LocalResponse = await this.getHTML(file);
                // insert `html` into the <include> tag.
                tag.insertAdjacentHTML('afterbegin', html.body);
                // create fragment and append child elements of `tag` into fragment.
                const fragment: DocumentFragment = document.createDocumentFragment();
                while (tag.firstChild) {
                    fragment.appendChild(tag.firstChild);
                }
                // replace the include element with the document fragment.
                tag.parentNode!.replaceChild(fragment, tag);
                // apply recursion.
                await this.includeHTML(parent);
            }
        }
        return;
    }

    /**
     *  This method will switch components based on the route clicked.
     */
    private switchComponents = () => {
        console.log(state.components);
    }

    /**
     *  Method to only get the HTML text from a html file.
     * 
     *  @param path - the path to which the html resides.
     */
    private getHTML = async (path: string): Promise<LocalResponse> => {
        try {
            const html: Body = await fetch(`${path}`);
            return {
                status: true,
                body: await html.text()
            }
        } catch (e) {
            return {
                status: false,
                body: e.message
            }
        }
    }
}

/**
 *  This shared sidebar is dynamically determined based off the body id of the 
 *  html file (BrowserWindow) it is being loaded from.
 */

namespace Sidebar {
    class Sidebar extends Components {
        menuItems: SidebarItem[];
        title: string;

        constructor(name: string, menuItems: SidebarItem[], title: string) {
            super();
            this.component.name = name;
            this.menuItems = menuItems;
            this.title = title;
            this.render();
        }

        private render = async (): Promise<void> => {
            const { name } = this.component;
            const { menuItems, title } = this;

            const component = await this.generateComponent(name, '#main', 'shared');
            if (component.status) {
                // dynamically generating the sidebar.
                // insert the title of the sidebar.
                component.element.firstElementChild.insertAdjacentHTML('afterbegin', `
                    <span id="title" class="item">
                        ${title}
                    </span>
                `.trim());
                // map the array of sidebar items into a html element
                menuItems.map((item: SidebarItem): void => {
                    const { name, icon } = item;
                    component.element.firstElementChild.insertAdjacentHTML('beforeend', `
                        <a class="item">
                            <i class="${icon} icon"></i>
                            ${name}
                        </a>
                    `.trim());

                    // add the event listener function to the menu item that has just been added.
                    component.element.querySelector('div').lastChild!.addEventListener('click', () => {
                        helpers.addScript(`${name}/${name}.js`);
                        console.log(state.components[name]);
                    });
                });

                // set/update the global state object
                const { element } = component;
                const assemble: any = {};
                assemble[name] = element;
                state.assignToComponents(assemble);
            }
        }

    }

    // Get the body of the html and it's id to determine which section we are on.
    const mainPath: string = (document.querySelector('body') as HTMLBodyElement).getAttribute('id') as string;

    // Load dynamic content depending on the renderer being used
    switch (mainPath) {
        case 'mainWindow':
            const menuItems: SidebarItem[] = [
                {
                    name: 'dashboard',
                    icon: 'dashboard'
                },
                {
                    name: 'inventory',
                    icon: 'sitemap'
                },
                {
                    name: 'orders',
                    icon: 'shipping'
                },
                {
                    name: 'todos',
                    icon: 'ordered list'
                },
                {
                    name: 'analytics',
                    icon: 'line graph'
                },
            ];
            const title: string = 'toolbox';
            new Sidebar('sidebar', menuItems, title);
            break;
        case 'someOtherWindow':
            null;
            break;
        default:
            console.log('Something went wrong finding the body tag of the main html file');
            break;
    }
}

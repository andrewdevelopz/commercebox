/**
 *  This shared sidebar is dynamically determined based off the body id of the 
 *  html file (BrowserWindow) it is being loaded from.
 */

namespace Sidebar {
    class Sidebar extends Component {
        menuItems: SidebarItem[];
        title: string;

        constructor(name: string, controller: boolean, menuItems: SidebarItem[], title: string) {
            super(name, controller);
            this.menuItems = menuItems;
            this.title = title;
            this.render();
        }

        private render = async (): Promise<void> => {
            const { menuItems, title } = this;

            const component = await this.generateComponent(this.name, '#main', 'shared', state, router, false, true);
            if (component.status) {
                // dynamically generating the sidebar.
                // insert the title of the sidebar.
                component.element.firstElementChild.insertAdjacentHTML('afterbegin', `
                    <span id="title" class="item" style="background: #000;">
                        ${title}
                    </span>
                `.trim());
                // map the array of sidebar items into a html element
                menuItems.map((item: SidebarItem): void => {
                    const { name, icon } = item;
                    component.element.firstElementChild.insertAdjacentHTML('beforeend', `
                        <a class="item" route="${name}">
                            <i class="${icon} icon killPointerEvent"></i>
                            ${name}
                        </a>
                    `.trim());

                    // add the event listener function to the menu item that has just been added.
                    component.element.firstElementChild.lastChild.addEventListener('click', (e: Event) => {
                        e.preventDefault();
                        window.location.path = (<HTMLElement>e.target).getAttribute('route') as string;
                        router.goToRoute();
                    });
                });
            }
        }
    }

    // Get the body of the html and it's id to determine which section we are on.
    const section: string = (document.querySelector('body') as HTMLBodyElement).getAttribute('id') as string;

    // Load dynamic content depending on the renderer being used
    switch (section) {
        case 'toolbox':
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
            new Sidebar('sidebar', true, menuItems, title);
            break;
        case 'someOtherWindow':
            null;
            break;
        default:
            console.log('Something went wrong finding the body tag of the main html file');
            break;
    }
}

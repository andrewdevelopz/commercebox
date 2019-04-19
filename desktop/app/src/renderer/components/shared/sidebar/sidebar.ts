/**
 *  This shared sidebar is dynamically determined based off the body id of the 
 *  html file (BrowserWindow) it is being loaded from.
 */

// Get the body of the html and it's id to determine which section we are on.
const mainPath: string = (document.querySelector('body') as HTMLBodyElement).getAttribute('id') as string;

// Function to add menu items to the sidebar depending on the BrowserWindow or section of the page
const createDynamicSidebar = (menuItems: SidebarItem[], title: string, sidebar: HTMLElement): void => {
    // insert the title of the sidebar
    sidebar.insertAdjacentHTML('afterbegin', `
        <span id="title" class="item">
            ${title}
        </span>
    `.trim());

    // map the array of siebar items into a html element
    menuItems.map((item: SidebarItem): void => {
        const { name, icon } = item;
        sidebar.insertAdjacentHTML('beforeend', `
            <a class="item">
                <i class="${icon} icon"></i>
                ${name}
            </a>
        `.trim());
        // add the event listener function to the menu item that has just been added.
        sidebar.lastChild!.addEventListener('click', () => {
            // helpers.loadComponent('#includes', `main/${name}/${name}.html`);
            helpers.addScript(`${name}/${name}.js`);
            // this is where we will handle components
        });
    });
}

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
        const sidebar: HTMLElement = document.querySelector('#sidebar') as HTMLDivElement;

        createDynamicSidebar(menuItems, title, sidebar);
        break;
    case 'someOtherWindow':
        null;
        break;
    default:
        console.log('Something went wrong finding the body tag of the main html file');
        break;
}

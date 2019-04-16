/**
 *  This shared sidebar is dynamically determied based off the main file (BrowserWindow) it is being loaded from.
 */

// Get the main path to the renderer. (e.g. index.html)
const mainPath = window.location.pathname.split('/').pop();

// Function to add menu items to the sidebar depending on the BrowserWindow or section of the page
const createDynamicSidebar = (menuItems: SidebarItems[], title: HTMLElement, sidebar: HTMLElement): void => {
    menuItems.map(item => {
        sidebar.insertAdjacentHTML('beforeend', `
            <a class="item">
                <i class="${item.icon} icon"></i>
                ${item.name}
            </a>
        `.trim());
    });
}

// Load dynamic content depending on the renderer being used
if (mainPath === 'index.html') {
    const menuItems: SidebarItems[] = [
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
    const title: HTMLElement = document.querySelector('#sidebar #title') as HTMLDivElement;
    const sidebar: HTMLElement = document.querySelector('#sidebar') as HTMLDivElement;

    createDynamicSidebar(menuItems, title, sidebar);
}

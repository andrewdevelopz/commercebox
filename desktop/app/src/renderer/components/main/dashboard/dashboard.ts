/**
 *  This script file will handle all javascript needed for the dashboard
 *  section of the application.
 */

class Dashboard extends Components {
    constructor(name: string) {
        super();
        this.component.name = name;
        this.render();
    }

    public render = async (): Promise<string> => {
        const { name } = this.component;
        const dashboard: string = await this.getHTML('main/dashboard/dashboard.html');
        const includes: HTMLElement = document.querySelector('#includes') as HTMLElement;

        console.log(this.component);

        includes.insertAdjacentHTML('afterbegin', dashboard);
        const newC: HTMLElement = includes.querySelector('div') as HTMLDivElement;
        newC.setAttribute('id', name);

        return dashboard;
    }
}
const dashboard = new Dashboard('dashboard');

console.log(dashboard);

// namespace Dashboard {
//     const { getHTML } = window.helpers;

//     const generateDashboard = async (): Promise<void> => {
//         const dashboard: HTMLElement = document.getElementById('dashboard') as HTMLElement;
//         const card: string = await getHTML('main/dashboard/card/card.html');

//         dashboard.insertAdjacentHTML('afterbegin', `
//             <div class ="four wide column">
//                 ${card}
//             </div>
//         `.trim());
//     }
//     generateDashboard();

//     // getHTML('main/dashboard/card/card.html')
//     //     .then((x: any) => {
//     //         grid.insertAdjacentHTML('afterbegin', `
//     //             <div class="four wide column inverted">
//     //                 ${x}
//     //             </div>
//     //         `);
//     //     })
//     //     .catch((e: any) => console.log(e));
// }

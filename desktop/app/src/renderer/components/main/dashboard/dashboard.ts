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

    private render = async (): Promise<void> => {
        try {
            const { name } = this.component;
            const generated = await this.generateComponent(name, '#includes');
        } catch (e) {
            console.error(e);
        }
    }
}
const dashboard = new Dashboard('dashboard');

// console.log(dashboard);

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

/**
 *  This script file will handle all javascript needed for the dashboard
 *  section of the application.
 */

class Dashboard extends Components {
    constructor() {
        super();
        this.render();
    }

    private render = (): string => {
        document.querySelector('#test')!.addEventListener('click', () => {
            console.log('clicked');
        })
        console.log('<div>Dash Render</div>');
        return '<div>Dash Render</div>'
    }
}
new Dashboard();

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

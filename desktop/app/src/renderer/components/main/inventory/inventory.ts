/**
 *  This script file will handle all javascript needed for the inventory
 *  section of the application.
 */

class Inventory extends Components {
    constructor() {
        super();
        this.component.path = '/inventory';
        this.render();
    }

    generateDashboard = async (): Promise<string> => {
        const card: string = await this.getHTML('main/inventory/inventory.html');

        // return (`
        //     <div class ="four wide column">
        //         ${card}
        //     </div>
        // `);
        return card;
    }

    public render = async (): Promise<string> => {
        const inventory: HTMLElement = document.querySelector('#includes') as HTMLElement;
        const html: string = await this.generateDashboard();
        this.component.id = 'inventory';

        console.log(this.component);

        inventory.insertAdjacentHTML('afterbegin', html);
        return html;
        return '';
    }
}
const inventory = new Inventory();

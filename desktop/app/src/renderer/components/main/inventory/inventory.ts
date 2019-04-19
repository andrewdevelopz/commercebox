/**
 *  This script file will handle all javascript needed for the inventory
 *  section of the application.
 */

class Inventory extends Components {
    constructor(name: string) {
        super();
        this.component.name = name;
        this.render();
    }

    private render = async (): Promise<void> => {
        const { name } = this.component;
        await this.generateComponent(name, '#includes');
    }
}
const inventory = new Inventory('inventory');

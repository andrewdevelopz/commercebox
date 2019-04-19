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

    public render = async (): Promise<void> => {
        try {
            const { name } = this.component;
            const generated = await this.generateComponent(name, '#includes');
            // await this.generateComponent('card', `main/${name}/card/card`, `#${generated.element.id}`);
        } catch (e) {
            console.error(e);
        }
    }
}
const inventory = new Inventory('inventory');

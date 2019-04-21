/**
 *  This script file will handle all javascript needed for the inventory
 *  section of the application.
 */

namespace Inventory {
    class Inventory extends Components {
        constructor(name: string) {
            super();
            this.component.name = name;
            this.render();
        }

        private render = async (): Promise<void> => {
            const { name } = this.component;
            const component = await this.generateComponent(name, '#includes', 'main');
            if (component) {
                const { element } = component;
                const assemble: any = {};
                assemble[name] = element;
                state.assignToComponents(assemble);
            }
        }
    }
    new Inventory('inventory');
}

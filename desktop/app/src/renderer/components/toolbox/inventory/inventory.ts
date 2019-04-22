/**
 *  This script file will handle all javascript needed for the inventory
 *  section of the application.
 */

namespace Inventory {
    class Inventory extends Component {
        constructor(name: string) {
            super(name);
            this.render();
        }

        private render = async (): Promise<void> => {
            const component = await this.generateComponent(this.name, '#includes', 'toolbox', state, router);
        }
    }
    new Inventory('inventory');
}

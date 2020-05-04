/**
 *  This script file will handle all javascript needed for the inventory
 *  section of the application.
 */

namespace Inventory {
    class Inventory extends Component {
        constructor(name: string) {
            super(name);
            let self = this;
            (async function() {
                await self.render();

            }())
        }

        private render = async (): Promise<void> => {
            await this.generateComponent(this.name, '#includes', 'toolbox', state, router);
        }
    }
    new Inventory('inventory');
    const edit = document.querySelector('#edit');
    console.log(edit);
}

/**
 *  This script file will handle all javascript needed for the inventory
 *  section of the application.
 */

namespace Inventory {
    class Inventory extends Components {
        constructor() {
            super();
            console.log('inventory instance created');
            this.render();
        }

        private render = (): string => {
            console.log('<div>Inv Render</div>');
            return '<div>Inv Render</div>'
        }
    }
    new Inventory();
}

/**
 *  This script file will handle all javascript needed for the dashboard
 *  section of the application.
 */

namespace Dashboard {
    class Dashboard extends Components {
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
    new Dashboard('dashboard');
}

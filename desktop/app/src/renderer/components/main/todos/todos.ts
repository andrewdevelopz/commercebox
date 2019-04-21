/**
 *  This script file will handle all javascript needed for the todos
 *  section of the application.
 */

namespace ToDos {
    class ToDos extends Components {
        constructor(name: string) {
            super();
            this.component.name = name;
            this.render();
        }

        private render = async (): Promise<void> => {
            const { name } = this.component;
            const component = await this.generateComponent(name, '#includes', 'main');
            if (component.status) {
                // set/update the global state object
                const { element } = component;
                const assemble: any = {};
                assemble[name] = element;
                state.assignToComponents(assemble);
            }
        }
    }
    new ToDos('todos');
}

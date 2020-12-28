/**
 *  This script file will handle all javascript needed for the analytics
 *  section of the application.
 */

namespace Analytics {
    class Analytics extends Component {
        constructor(name: string) {
            super(name);
            this.render();
        }

        private render = (): void => {
            this.generateComponent(this.name, '#includes', 'toolbox', state, router);
        }
    }
    new Analytics('analytics');
}

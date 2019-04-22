/**
 *  This script file will handle all javascript needed for the dashboard
 *  section of the application.
 */

namespace Dashboard {
    class Dashboard extends Component {
        constructor(name: string) {
            super(name);
            this.render();
        }

        private render = async (): Promise<void> => {
            await this.generateComponent(this.name, '#includes', 'main', state, true);
        }
    }
    new Dashboard('dashboard');
}

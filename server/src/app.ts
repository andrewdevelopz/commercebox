/**
 * @overview: The main application file for the back-end api. 
 * @todo write more description about this...
 */

// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Database from './config/database/Database';
import passport from 'passport';
import { jwtStrat } from './config/auth/passport';
import './config/Env';

// Importing routes class
import Auth from './routes/auth/Auth';
import Inventory from './routes/toolbox/Inventory';
import Orders from './routes/toolbox/Orders';
import Shipping from './routes/toolbox/Shipping';
import Todos from './routes/toolbox/Todos';

class App {
    private db: Database;
    private app: express.Application;
    private env: string;
    private port: string | number;
    private serverListen: any;

    constructor(env: string, port: string | number) {
        this.db = new Database();
        this.app = express();
        this.port = port;
        this.env = env;

        // if the env is `test` we manually start and stop the server in /src/tests/globalSetup.ts and /src/tests/globalTeardown.ts
        this.env === 'test' ? false : this.startServer(this.app);
        // Connect to db with mongoose
        mongoose.connect((<string>this.db.getConnectionString().database), { useNewUrlParser: true, useFindAndModify: false })
            .then(() => console.log('Connected to MongoDB...'))
            .catch(err => console.log(err));
    }

    // All server logic for the http and https server
    private unifiedServer(app: express.Application): void {
        // Execute npm libraries

        /**
         * @todo Currently we have cors enabled for all routes. Make sure to configure this properly in the future.
         * @link https://expressjs.com/en/resources/middleware/cors.html
         */
        app.use(cors());
        app.use(bodyParser.json());

        // Passport middleware
        app.use(passport.initialize());
        app.use(passport.session());

        jwtStrat(passport);

        // Instantiate routes class
        new Auth('/api/auth', app);
        new Inventory('/api/inventory', app);
        new Orders('/api/orders', app);
        new Shipping('/api/shipping', app);
        new Todos('/api/todos', app);

        app.get('/', (req: express.Request, res: express.Response) => {
            res.send('Invalid Endpoint');
        });

        app.get('/api', (req: express.Request, res: express.Response) => {
            res.send('Commercebox API end point');
        });
    }

    // Instantate the HTTP server
    private async httpServer(app: express.Application): Promise<void> {
        this.unifiedServer(app);

        // listen on PORT
        const port = process.env.PORT || 2995;
        const serverListen = await app.listen(port);
        // log the port the server started or the error if something goes wrong.
        serverListen ? console.log(`Server started on port: ${port}`) : console.log(serverListen);
    }

    // Initialize the script to start the http server
    public startServer = (app: express.Application): void => {
        this.httpServer(app);
    }

    // Stop the server for jest and other situations that may require to stop the server.
    public stopServer = () => {
        this.serverListen.close();
        this.serverListen = null;
        console.log('Server has been stopped');
    }
}

export { App };
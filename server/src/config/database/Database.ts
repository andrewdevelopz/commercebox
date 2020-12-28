/**
 * @overview: This class takes care of all the business logic for communicating with the Database
 */

import '../Env';
import {
    DatabaseConfig
} from 'definitions';

class Database {
    getConnectionString(): DatabaseConfig {
        return {
            database: process.env.DB_ROUTE as string,
            secret: process.env.DB_SECRET as string
        }
    }
}

export default Database;

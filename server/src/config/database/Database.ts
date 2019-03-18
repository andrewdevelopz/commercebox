/**
 * @overview: This class takes care of all the business logic for communicating with the Database
 */

import '../Env'

class Database {
    getConnectionString() {
        return {
            database: process.env.DB_ROUTE,
            secret: process.env.DB_SECRET
        }
    }
}

export default Database

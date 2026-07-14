// Controller of Postgres DB Connection
import { Sequelize, Model, QueryTypes } from "sequelize";
import Types from "./sequelize_types.js";
import { GLOBAL_VARS as env } from "../ENV/env_vars_config.js";
class SequilizeController {
    connectionURI;
    sequelize;
    Types;
    Model;
    QueryTypes;
    query;
    define;
    constructor(connectionURI) {
        // Set connection URI for PostgreSQL 
        this.connectionURI = connectionURI;
        // Initialize sequilize instance with provided URI
        this.sequelize = new Sequelize(this.connectionURI);
        // Pass sequilize Types, Model, QueryTypes for convenience
        this.Types = Types;
        this.Model = Model;
        this.QueryTypes = QueryTypes;
        // Define methods of sequilize on current class for convenience
        this.query = this.sequelize.query.bind(this.sequelize);
        this.define = this.sequelize.define.bind(this.sequelize);
    }
    // Returns true if connection established, otherwise false
    async checkConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            return true;
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            return false;
        }
    }
}
// Если используется порт отличный от стандартного, или у вас установлен пароль, 
// Передавайте URI типа: 
// postgresql://postgres:mysecretpassword@localhost:${YOUR_PORT}/${env.DB_NAME}
// Initialize Defined Controller with connection URI
const sequelizeCT = new SequilizeController(`postgresql://localhost/${env.DB_NAME}`);
export default sequelizeCT;

import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;

const db = new Sequelize(database,user,pass,{
    host: host,
    port: port,
    dialect: dialect
});

export default db
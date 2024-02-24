const { Sequelize } = require("sequelize");
const NODE_ENV = process.env.NODE_ENV;

const database = (NODE_ENV === "test") ? process.env.SQL_DATABASE_TEST : process.env.SQL_DATABASE;
const username = process.env.SQL_USERNAME
const password = process.env.SQL_PASSWORD
const host = process.env.SQL_HOST

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"mysql",
    }
)

const dbConnectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexion MySql Correcta");
    } catch (e) {
        console.log("Errr Conexion",e)
    }

}

module.exports = { sequelize , dbConnectMySql }
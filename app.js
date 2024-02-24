require("dotenv").config()
const express = require("express"); //Lo define como API / Servicios
const cors = require("cors"); //plaugin para definir conexiones
const swaggerUI = require("swagger-ui-express"); // Importamos libreria para generear doc de API
const openApiConfiguration = require("./docs/swagger");
const dbConnectNoSql = require('./config/mongo');
const {  dbConnectMySql } = require("./config/mysql");
const app = express(); // definimos aplicacion

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors()); // usamos cors
app.use(express.json()) // config para realizar post
app.use(express.static("storage")) // hacer public una carpeta de archivos


const port = process.env.PORT || 3000

/**
 * Definir Ruta de documentacion
 */

app.use('/documentation',swaggerUI.serve, swaggerUI.setup(openApiConfiguration))


/** 
*Aqui invocamos las rutas
*/
app.use("/api", require("./routes"))


if(NODE_ENV !== 'test'){
    app.listen(port);
};

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql();


module.exports = app
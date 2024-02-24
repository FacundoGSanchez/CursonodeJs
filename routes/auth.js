const express = require("express");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { registerCtrl , loginCtrol} = require("../controllers/auth");


/**
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - Auth
 *          summary: "Registrar nuevo usario"
 *          description: "Esta ruta es para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: El usuario se registra de manera correcta
 *                  '403':
 *                      description: Error por validacion
 */
router.post("/register", validatorRegister, registerCtrl);


/**
 * Route register new user
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *              - Auth
 *          summary: "Login de usuario"
 *          description: "Esta ruta es para validar usuario y generar Token"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *          responses:
 *                  '200':
 *                      description: Data del usuario
 *                  '403':
 *                      description: Error por validacion de usuario
 */
router.post("/login", validatorLogin, loginCtrol);

module.exports = router

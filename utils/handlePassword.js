const bcryptjs = require("bcryptjs");
//const { isColString } = require("sequelize/types/utils");

/**
 * 
 * @param {*} passwordPlain 
 */

const encrypt = async ( passwordPlain ) => {
    const hash = await bcryptjs.hash(passwordPlain, 10);
    return hash;
}

/**
 * Pasar contraseña plana y encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async ( passwordPlain, hashPassword ) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)   
}

module.exports = {encrypt , compare}
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertyEngine");
const propertiesKey = getProperties();

/**
 * 
 * @param {*} user 
 * @returns 
 */
const tokenSign = async (user) => {
    const sign = await jwt.sign(
        {
            [propertiesKey.id] : user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn:"2h",
        }
    )
    return sign
}

/**
 * 
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async ( tokenJwt ) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }
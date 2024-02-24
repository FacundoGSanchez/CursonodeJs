const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");
const getProperties = require("../utils/handlePropertyEngine");
const propertiesKey = getProperties();

const handleMiddleware = async (req, res, next) => {
  try {
    //console.log(req.headers)
    
    if(!req.headers.authorization){
        handleHttpError(res,"NEED_SESSION",401)
        return
    }

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token) 

    if(!dataToken){
        handleHttpError(res, "NOT_PAYLOAD",401)
        return
    }

    // Validamos si existe usuario y lo pasamos al request para se usado en las otras rutas
    const query = {
      [propertiesKey.id] : dataToken[propertiesKey.id]
    };

    const user = await userModel.findOne(query);
    if(!user){
      handleHttpError(res, "USER_NOT_EXIST",401)
      return
    }
    req.user = user
    
    next()

  } catch (e) {
    handleHttpError(res, "ERROR_AUTHORIZATION", 401);
  }
};

module.exports = handleMiddleware

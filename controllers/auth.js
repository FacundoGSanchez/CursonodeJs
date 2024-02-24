const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { userModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } =require("../utils/handleError");

/**
 * Controlar para registrar usuarios
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {

    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password };
        const dataUser = await userModel.create(body);
        dataUser.set("password", undefined, {strict: false});
    
        const data = {
          token: await tokenSign(dataUser),
          user: dataUser
        }
        res.status(201);
        res.send({ data });
      } catch (e) {
        handleHttpError(res,"ErrorRegistrerController"); 
      }
} 

/**
 * Este controlador es el encargado de logear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrol = async (req, res) => {
  try{
        req = matchedData(req);
        const user = await userModel.findOne({email:req.email})

        if(!user){
        handleHttpError(res,"USER_NOT_EXISTS", 404);
        return
      }

    const hashPassword = user.get('password');
    const check = await compare(req.password, hashPassword)

    if(!check){
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return
    }

    user.set('password', undefined, {strict:false})
    const data = {
      token: await tokenSign(user),
      user
    }

    res.send({data})


  }catch(e){
    console.log(e)
    handleHttpError(res, "ERROR_LOGIN_USER")
  }
}


module.exports = {registerCtrl , loginCtrol};
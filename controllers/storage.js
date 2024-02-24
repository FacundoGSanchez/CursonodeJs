const fs = require("fs");
const { storageModel } =  require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");


const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_URL = `${__dirname}/../storage`;
 

/** 
 * Obtener lista de la db
 * @param {*} req
 * @param {*} res
*/
const getItems = async (req, res) => {
    try {
        const data =  await storageModel.find({})
        res.send({ data });
      } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS");
      }
}

/** 
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
*/
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({ data });
      } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_GET_ITEM");
      }
}


/** 
 * Insertarun Registro en la db
 * @param {*} req
 * @param {*} res
*/
const createItem = async (req, res) => {
    const { body, file } = req
    console.log(file)

    //armamos objeto para registrar
    const fileData = {
        filename: file.filename,
        url:`${PUBLIC_URL}/${file.filename}`
    }

    // guardamos en base de datos
    const data = await storageModel.create(fileData)
    res.status(201);
    res.send({data})
}


/** 
 * eleiminar un registro en db
 * @param {*} req
 * @param {*} res
*/
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile   = await storageModel.findById(id);
    const deleteResponse = await storageModel.delete({ _id: id });
    const {filename} = dataFile;
    
    const filePath = `${MEDIA_URL}/${filename}` //TODO : Ruta + nombre archivo
    fs.unlinkSync(filePath)

    const data = {
      filePath,
      deleted: deleteResponse.matchedCount,
    }
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
}

module.exports = { getItems, getItem, createItem , deleteItem };


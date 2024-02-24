const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");


/**
 * Obtener lista de la db
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {

  try {
    const user = req.user
    user.set('password', undefined, {strict:false})
    const data = await tracksModel.findAllData({});
    res.send({ data , user });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await tracksModel.findOneData(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

/**
 * Insertarun Registro en la db
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    console.log("metodo: " + data)
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR CREATE ITEM");
  }
};

/**
 * actualizar un registro de la db
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};

/**
 * eleiminar un registro en db
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const {id} = req;
    const deleteResponse = await tracksModel.delete({_id:id});
    const data = {
      deleted: deleteResponse.matchedCount
    }
    res.send({ data });
  } catch (e) {
    console.log(e)
    handleHttpError(res,"ERROR_DELETE_ITEM")
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

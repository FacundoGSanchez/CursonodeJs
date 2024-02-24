const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateItem = [
  check("name").exists().notEmpty(),
  check("albun").exists().notEmpty(),
  check("cover").exists().notEmpty(),
  check("artist").exists().notEmpty(),
  check("artist.name").exists().notEmpty(),
  check("artist.nikname").exists().notEmpty(),
  check("artist.nationality").exists().notEmpty(),
  check("mediaId").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
]

module.exports = { validatorCreateItem , validatorGetItem};

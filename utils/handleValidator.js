const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    try{
        validationResult(req).throw();
        return next();
    }catch (err) {
        console.log({ errors: err.array()})
        res.status(403);
        res.send({ errors: err.array()})
    }
}

module.exports = validateResults
const handleHttpError = (res, messge = "algo Ocurrio", code = 403) => {
    res.status(code);
    res.send({error: messge});
};

module.exports = { handleHttpError };
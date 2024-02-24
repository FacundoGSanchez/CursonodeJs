const mongoose = require("mongoose");

const NODE_ENV = process.env.NODE_ENV;

const dbConnect = () => {
  try {
    const DB_URI = (NODE_ENV === "test") ? process.env.DB_URI_TEST : process.env.DB_URI;
    mongoose.connect(
      DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, res) => {
        if (!err) {
          console.log("*** Conexion Correcta ***");
        } else {
          console.log("*** Error en la Conexion ****");
        }
      }
    );
  } catch (error) {
    console.error("*** Error en Conexion ***", error);
  }
};

module.exports = dbConnect;

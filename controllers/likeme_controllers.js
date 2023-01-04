const { addLike, getLikes } = require("./consultas");
const ErrorResponse = require("../helper/errorResponse");

exports.createLike = async (req, res, next) => {
  const { titulo, url, descripcion } = req.body;

  try {
    await addLike(titulo, url, descripcion);

    res.status(200).json({
      status: 200,
      estado: "Generado exitosamente",
    });
  } catch (err) {
    console.log(err);
    next(
      new ErrorResponse(
        "Error, no ha sido posible generar la solicitud" + err.message + 404
      )
    );
  }
};

exports.getResp = async (req, res, next) => {
  try {

    const posts = await getLikes();

    return res.json(posts)
    
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible generar la solicitud" + err.message + 404
      )
    );
  }
};

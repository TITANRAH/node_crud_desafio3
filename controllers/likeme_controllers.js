const {
  addPost,
  obtenerPosts,
  addLike,
  borrarPost,
  modificarPost,
} = require("./consultas");
const ErrorResponse = require("../helper/errorResponse");

exports.createPost = async (req, res, next) => {
  const { titulo, url, descripcion } = req.body;

  try {
    if ([titulo, url, descripcion].includes("")) {
      res.status(400).json({
        status: 400,
        estado: "Error,Los campos no pueden ir vacíos",
      });
    } else {
      await addPost(titulo, url, descripcion);
      res.status(200).json({
        status: 200,
        estado: "Generado exitósamente",
      });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible agregar un nuevo post, error: " +
          err.message +
          404
      )
    );
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await obtenerPosts();

    return res.json(posts);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener los posts" + err + 404
      )
    );
  }
};

exports.darLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id != "") {
      await addLike(id);
      res.status(200).json({
        status: 200,
        estado: `Like agregado con éxito en el post con id: ${id}`,
      });
    } else {
      res.status(400).json({
        status: 400,
        estado: "Error, id no detectado",
      });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        `Error, no ha sido posible dar el like al post con el id ${id}` +
          err.message +
          404
      )
    );
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id != "") {
      await borrarPost(id);

      res.status(200).json({
        status: 200,
        estado: `Post con el id ${id}, eliminado exitósamente`,
      });
    } else {
      res.status(400).json({
        status: 400,
        estado: "Error, id no detectado",
      });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible eliminar el post " + err.message + 404
      )
    );
  }
};

exports.putTitulo = async (req, res, next) => {
  try {
    if (![id, titulo].includes("")) {
      // el id viene del params en la url
      const { id } = req.params;
      // el titulo viene del body
      const { titulo } = req.body;
      // le paso el titulo y el id a la funcion que hace la consulta
      await modificarPost(titulo, id);

      res.status(200).json({
        status: 200,
        estado: `Título del post con id ${id}, ha sido modificado exitósamente `,
      });
    } else {
      res.status(400).json({
        status: 400,
        estado: "Error, id o título no detectados",
      });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible modificar el post " + err.message + 404
      )
    );
  }
};

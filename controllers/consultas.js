const { clienteDB } = require("../config/conexionBD");
const ErrorResponse = require("../helper/errorResponse");

exports.addPost = async (titulo, url, descripcion) => {
  try {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)";
    const valores = [titulo, url, descripcion];
    const resultado = await clienteDB.query(consulta, valores);
    // console.log("like agregado", resultado);
    return resultado;
  } catch (error) {
    console.log("No se pudo insertar en la base de datos", error);
    return error;
  }
};

exports.obtenerPosts = async () => {
  try {
    const consulta = "SELECT * FROM posts";
    const { rows } = await clienteDB.query(consulta);
    // console.log("el resultado", rows);
    return rows;
  } catch (error) {
    console.log("No se pudo llevar a cabo la consulta", error);
    return error;
  }
};

exports.addLike = async (id) => {
  try {
    const consulta =
      "UPDATE posts SET likes = COALESCE(likes,0) + 1 WHERE id = $1";
    const valores = [id];
    const resultado = await clienteDB.query(consulta, valores);
    return resultado;
  } catch (error) {
    console.log("No se pudo llevar a cabo la actualizacicón", error);
    return error;
  }
};

exports.borrarPost = async (id) => {
  try {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const valores = [id];
    const resultado = await clienteDB.query(consulta, valores);
    return resultado;
  } catch (error) {
    console.log("No se pudo llevar a cabo la eliminación", error);
    return error;
  }

};

//Editar solamente título
exports.modificarPost = async (titulo, id) => {
  try {
    const consulta = "UPDATE posts SET titulo = $1 WHERE id = $2";
    const values = [titulo, id];
    const result = await clienteDB.query(consulta, values);
    return result;
  } catch (error) {
    console.log('no se pudo actualizar el título del post',error);
  }
};

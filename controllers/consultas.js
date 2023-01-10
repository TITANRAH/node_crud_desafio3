const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const credenciales = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
  allowExitOnIdle: true,
};

const clienteDB = new Pool(credenciales);

exports.addPost = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)";
  const valores = [titulo, url, descripcion];
  const resultado = await clienteDB.query(consulta, valores);
  // console.log("like agregado", resultado);
  return resultado;
};

exports.obtenerPosts = async () => {
  const consulta = "SELECT * FROM posts";
  const { rows } = await clienteDB.query(consulta);
  // console.log("el resultado", rows);
  return rows;
};

exports.addLike = async (id) => {
  const consulta =
    "UPDATE posts SET likes = COALESCE(likes,0) + 1 WHERE id = $1";
  const valores = [id];
  const resultado = await clienteDB.query(consulta, valores);
  return resultado;
};

exports.borrarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const valores = [id];
  const resultado = await clienteDB.query(consulta, valores);
  return resultado;
};

// puedo modificar mas campos segun yoq uiera en este caso solo titulo
exports.modificarPost = async (titulo, id) => {
  try {
    const consulta = "UPDATE posts SET titulo = $1 WHERE id = $2";
    const values = [titulo, id];
    const result = await clienteDB.query(consulta, values);
    return result;
  } catch (err) {
    console.log(err);
    // montar helper aqui tambien
  }
};

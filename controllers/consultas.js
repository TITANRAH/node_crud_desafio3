
const {Pool} = require('pg');
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

exports.addLike = async (titulo, url, descripcion) => {
    
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)";
    const valores = [titulo, url, descripcion];
    const resultado = await clienteDB.query(consulta, valores);
    console.log('like agregado',resultado);
    return resultado;
}

exports.getLikes = async () => {
    const consulta ="SELECT * FROM posts"
    const {rows} = await clienteDB.query(consulta)
    console.log('el resultado', rows);
    return rows
}
const express = require("express");
const ruta = express.Router();
const { createPost, getPosts, darLike, deletePost, putTitulo } = require("../controllers/likeme_controllers");

ruta.route('/posts')
    .post(createPost)
    .get(getPosts)
    
ruta.route('/posts/like/:id')
    .put(darLike)
    
ruta.route('/posts/:id')
    .delete(deletePost)
    .put(putTitulo)
    
module.exports = ruta;


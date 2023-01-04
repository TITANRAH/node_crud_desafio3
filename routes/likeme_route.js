const express = require("express");
const ruta = express.Router();
const { createPost, getPosts } = require("../controllers/likeme_controllers");


ruta.route('/posts')
    .post(createPost)
    .get(getPosts);

module.exports = ruta;


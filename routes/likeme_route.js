const express = require("express");
const ruta = express.Router();
const { createLike, getResp } = require("../controllers/likeme_controllers");


ruta.route('/posts')
    .post(createLike)
    .get(getResp);

module.exports = ruta;


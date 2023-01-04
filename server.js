const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const rutas = require("./routes/likeme_route");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/",rutas);
app.use(express.static("public"));
app.get("/", (req, res) => {
   res.sendFile(path.resolve("./public/index.html"));
});


const PORT = process.env.portServer;
app.listen(PORT, console.log(`el servidor esta activo en el puerto ${PORT}`));

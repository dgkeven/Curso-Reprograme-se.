//BIBLIOTECAS/MODULOS UTILIZADOS
const database = require("./db/db");
const express = require("express");
const app = express();
const Video = require("./models/Videos");
const VideoRoutes = require("./routes/routesVideos");
const hand = require("express-handlebars");

//CONTROLLERS
const VideosControllers = require("./controllers/ControllersVideo");
app.engine("handlebars", hand.engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true, }));

app.use(express.json());
app.use(express.static("public"));

//ROTAS
app.use("/", VideoRoutes);


//SINCRONISMO COM O BANCO DE DADOS
try {
  database.sync().then(() => {
    app.listen(9443, () => { console.log('Servidor rodando') });
  })
}
catch (erro) {
  console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};
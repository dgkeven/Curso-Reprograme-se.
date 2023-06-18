//INSTALAÇÃO BIBLIOTECAS/MÓDULOS
const express = require("express");
const app = express();
const hand = require("express-handlebars");
const Services = require("./services/services");
const routes = require("./routes/routes");
//MODELS

app.engine("handlebars", hand.engine());
app.set("view engine", "handlebars");

//CODIFICAÇÃO JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//ROTA PRINCIPAL
app.use("/",routes);

try {
    database.sync().then(() => {
    })
}
catch(erro) {
    console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};

app.listen(3000);
const express = require("express");
const app = express();
const porta = 3000;

//CONFIGURAÇÃO DO HANDLEBARS
const hand = require("express-handlebars");
app.set('view engine', 'html');
app.engine("handlebars", hand.engine());
app.set("view engine", "handlebars");

//ROTAS
var route = require('./routes/Routes');

//CONFIGURANDO A UTILZAÇÃO DOS DADOS JSON
app.use(express.urlencoded({ extended: true }));

// CAMINHO DAS ROTAS
app.use('/', route);

//SERVIDOR
app.listen(3000, () => {
  console.log('Funcionando o servidor');
});

//BIBLIOTECAS/MODULOS UTILIZADOS
const express = require('express');
const app = express();
const database = require("./db/db");
const Cliente = require("./models/clienteModels");
const clienteController = require("./controller/clienteController");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SINCRONISMO COM O BANCO DE DADOS
try {
  database.sync().then(() => {
  })
}
catch (erro) {
  console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};

app.get('/', (req, res) => {
  return res.json({ message: 'Bem-vindo a nossa API' });
});
app.post("/Cadastrar", clienteController.ClienteCreate);

// GET - LISTAR
app.get("/Clientes", clienteController.ClienteListar);

// PUT - UPDATE
app.put("/Clientes/:id",clienteController.ClienteUpdate);

// DELETE - EXCLUIR
app.delete("/Clientes/:id",clienteController.ClienteDelete);


app.listen(3000);
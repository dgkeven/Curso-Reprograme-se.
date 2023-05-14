/// importando bibliotecas e arquivos
const database = require('./db');
const Cliente = require('./models/cliente');
const Fornecedor = require('./models/fornecedor');
const path = require('path');
const { clienteDatabase, fornecedorDatabase } = require('./db');

/// criando o servidor
const express = require('express');
const app = express();
const porta = 9443;
const bodyParser = require('body-parser');

// Setar os valores da view e engine
app.use(bodyParser.json())
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname));

/// Definindo rotas
app.get('/', (req, res) => {
    res.send('Bem vindo ao cadastro de clientes.');
});

app.get("/cadcliente", function (req, res) {
    res.render('formCliente');
});


app.post("/addcliente", function (req, res) {
    Cliente.create({
        nome: req.body.nome,
        nascimento: req.body.nascimento,
        cidade: req.body.cidade,
        telefone: req.body.telefone
    }).then(function () {
        res.send("Cliente cadastrado com sucesso!");
    })
})

app.get('/', (req, res) => {
    res.send('Bem vindo ao cadastro de Fornecedores!');
});

app.get("/cadfornecedor", function (req, res) {
    res.render('formFornecedor');
})

app.post("/addfornecedor", function (req, res) {
    Fornecedor.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email
    }).then(function () {
        res.send("Fornecedor cadastrado com sucesso!");
    })
})

app.listen(porta, () => { console.log('Servidor rodando') });

(async () => {

    try {
        const resultado = await database.sync();
        console.log(resultado);
        const clientes = await Cliente.findAll();
        console.log("Lista de Clientes \n", clientes);
    } catch (error) {
        console.log(error);
    }
})();
const express = require('express');
const router = express.Router();

//LISTA DE ESTADOS
var lista = [];

// ROTA GET 
router.get('/', (req, res) => {
  res.render('form', { quantidade: lista.length });
});

// LISTANDO ESTADOS
 router.get('/lista', (req, res) => {
   return res.json(lista);
 });

// ROTA POST
router.post('/estado/cadastrar', (req, res) => {
  let nome = req.body.nome;
 lista.push(nome)
  return res.json([lista[(lista.length -1)]]);
});

module.exports = router;
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const porta = 443;

app.use(session({ secret: '1234567890' }));

app.use(bodyParser.urlencoded({ extended: true }));

var login = 'admin';
var senha = '1234';

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname + '/'));

app.get('/', (req, res) => {
  if (req.session.login) {
    res.render('logado')
    console.log('Usuário logado: ' + req.session.login)
  }
  else {
    res.render('home')
  }
})

app.get('/email', (req, res) => {
  res.render("email");
});

app.post('/', (req, res) => {
  if (req.body.password == senha && req.body.login == login) {
    req.session.login = login;
    res.render('logado');
  }
  else {
    res.render('home');
  }
});

app.post('/sendemail', async (req, res) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c9a578a941479f",
      pass: "20dac18d2a9495"
    }
  });
  var message = {
    from: "dgkeven@outlook.com",
    to: "req.body.email",
    subject: "Atividade Prática 4",
    text: "Olá Renato, segue e-mail da minha atividade",
    html: "<p>Olá Renato, segue e-mail da minha atividade</p>"
  }

  transport.sendMail(message, (err) => {
    if (err)
      return res.status(400).json({
        erro: true,
        mensagem: 'Erro: mensagem não foi enviada.'
      })
    else {
      return res.json({
        erro: false,
        mensagem: 'Email enviado com sucesso!'
      })
    }
  })
});

app.listen(porta, () => { console.log('Servidor rodando!') });
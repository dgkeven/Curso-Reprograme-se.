const express = require('express');
const app = express();
const http = require('http');
const porta = 443;
const formidavel = require('formidable');
const fs = require('fs');

app.use(express.static(__dirname + "/public"));

const servidor = http.createServer((req, res) => {

  if (req.url != '/uploads') {
  const file = fs.readFileSync('index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(file);
  return res.end();
}

  else {
  const form = new formidavel.IncomingForm();
  form.parse(req, (erro, campos, arquivos) => {
  const urlAntiga = arquivos.filetoupload.filepath
  const urlNova = './uploads/' + arquivos.filetoupload.originalFilename
var rawData = fs.readFileSync(urlAntiga);
fs.writeFile(urlNova, rawData, function(err){
  if (err) console.log(err);
  res.write("Arquivo enviado com sucesso!");
  res.end();
})
})
}
})

function list_files(filepath) {
   let files = fs.readdirSync(filepath);
   console.log(files);
}

list_files('uploads');

servidor.listen(porta, () => { console.log('Servidor Rodando'); })
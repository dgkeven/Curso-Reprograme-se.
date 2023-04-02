const http = require('http');
const fs = require('fs');
const readLine = require('readline');

const porta = 443;
const servidor = http.createServer((req, res) => {
  fs.readFile('index.html', (err, arquivo) => {
    if (err) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Erro interno do servidor');
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(arquivo);
    const txt = 'arquivo.txt';
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis at ex eu ultricies. In ullamcorper, eros blandit euismod eleifend, erat lacus mattis tortor, et ultricies justo enim eget enim. Praesent ac pellentesque neque, hendrerit elementum ligula. Suspendisse pellentesque convallis bibendum. Nulla sed lectus eu nulla dapibus ultricies et sit amet ex. Phasellus pulvinar lorem ut turpis dictum, eu posuere odio imperdiet. Aliquam at dictum lectus. Donec sit amet cursus lacus.';
    fs.appendFile(txt, lorem, (err) => {
      if (err) throw err;
      console.log(`Arquivo ${txt} criado com sucesso`);
    });
    readFileByLine('arquivo.txt');
    res.end();
  });
});

async function readFileByLine(file) {
  const fileStream = fs.createReadStream(file);
  const rl = readLine.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    console.log(line);
  }
}

servidor.listen(porta, () => { console.log('Servidor Rodando'); });
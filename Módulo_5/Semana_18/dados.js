const fs = require('fs');

fs.readFile('./dados.json', 'utf-8', (err, dados) => {

  const json = JSON.parse(dados);

  console.log(json);
});
const prompt = require('prompt-sync')();
var array_monitores = [];
var codigo = 0;

do {
  console.log("Sistema de Cadastro de Monitores");
  console.log("1 - Inserir Monitor");
  console.log("2 - Excluir Monitor");
  console.log("3 - Listar Monitores");
  console.log("4 - Atualizar Monitores");
  console.log("0 - Sair");

  var opcao = prompt("Digite sua opção: ");

  if (opcao == 1) {
    console.log("\n\nInserindo Monitor...\n");
    let codigo = parseInt(prompt("Digite o código: "));
    codigo++
    let marca = prompt("Digite a marca: ");
    let quantidade = prompt("Digite a quantidade: ");
    let polegada = prompt("Digite a polegada: ");
    let preco = prompt("Digite o preço: ");

    // Neste trecho estamos declarando um objeto
    const monitor = {
      codigo: codigo,
      marca: marca,
      quantidade: quantidade,
      polegada: polegada,
      preco: preco
    }
    // Chamar a função inserir
    inserir_monitor(monitor);
  } else if (opcao == 2) {
    console.log("\n\nExcluindo Monitor...\n");
    let codigo = prompt("Digite o código do monitor: ");
    // Chamar a função excluir
    excluir_monitor(codigo);
  } else if (opcao == 3) {
    console.log("\n\nListando Monitores...\n");
    // Chamar a função listar
    listar_monitores();
  } else if (opcao == 4) {
    console.log("\n\nAtualizando Monitores...\n");
    let codigo = prompt("Digite o código do monitor: ");
    // Chamar a função atualizar
    atualizar_monitor(codigo);
  } else {
    console.log("\n\nSaindo do programa...\n");
  }

  prompt("\nEnter para continuar...");
  console.clear();
} while (opcao != 0)


function inserir_monitor(monitor) {
  // Implementar corpo da função
  array_monitores.push(monitor);
}

function excluir_monitor(codigo) {
  // Implementar corpo da função
  let result = false;
  for (let i = 0; i < array_monitores.length; i++) {
    if (array_monitores[i]['codigo'] == codigo) {
      array_monitores.splice(i, 1);
      result = true;
    }
  }
}

function listar_monitores() {
  // Implementar corpo da função
  for (let i = 0; i < array_monitores.length; i++) {
    console.log(`${array_monitores[i]['codigo']}: ${array_monitores[i]['marca']} - ${array_monitores[i]['quantidade']} - ${array_monitores[i]['polegada']} - ${array_monitores[i]['preco']}`);
  }

}

function atualizar_monitor(codigo) {
  let result = false;
  let marca = prompt("Digite a marca: ");
  let quantidade = prompt("Digite a quantidade: ");
  let polegada = prompt("Digite a polegada: ");
  let preco = prompt("Digite o preço: ");
  for (let i = 0; i < array_monitores.length; i++) {
    if (array_monitores[i]['codigo'] == codigo) {
      array_monitores[i]['marca'] = marca;
      array_monitores[i]['quantidade'] = quantidade;
      array_monitores[i]['polegada'] = polegada;
      array_monitores[i]['preço'] = preco;
      array_monitores = array_monitores;
      result = true;
    }
  }
}

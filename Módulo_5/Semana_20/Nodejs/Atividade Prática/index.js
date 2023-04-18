const axios = require('./api.js');
const fs = require('fs');
const readlineSync = require('readline-sync');
const db = require('./db.json');

function main() {
  console.log('Bem-vindo ao sistema de gerenciamento de tarefas!');
  let opcao = '';
  while (opcao !== '0') {
    console.log('O que você quer fazer?\n');
    console.log('1 - Cadastrar nova tarefa.');
    console.log('2 - Alterar uma tarefa.');
    console.log('3 - Marcar tarefa como concluída.');
    console.log('4 - Excluir uma tarefa.');
    console.log('5 - Listar tarefas pendentes.');
    console.log('6 - Listar tarefas concluídas.');
    console.log('0 - Sair do sistema.\n');

    opcao = readlineSync.question('Digite sua opção: ');
    switch (opcao) {
      case '1':
        cadastrarTarefa();
        break;
      case '2':
        alterarTarefa();
        break;
      case '3':
        marcarTarefaConcluida();
        break;
      case '4':
        excluirTarefa();
        break;
      case '5':
        listarTarefasPendentes();
        break;
      case '6':
        listarTarefasConcluidas();
        break;
      case '0':
        console.log('Obrigado por usar o sistema. Até mais!');
        break;
      default:
        console.log('Opção inválida!');
    }
    console.log('');
  }
}

async function cadastrarTarefa() {
  console.log('Cadastrar nova tarefa');
  const id = readlineSync.question('Digite o ID da tarefa: ');
  const descricao = readlineSync.question('Digite a descrição da tarefa: ');
  const status = 'Pendente';
  const novaTarefa = { id, descricao, status };

  db.tarefas.push(novaTarefa);

  try {
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    console.log('Tarefa cadastrada com sucesso!');
  } catch (error) {
    console.log('Erro ao cadastrar tarefa:', error.message);
  }
}

function alterarTarefa() {
  console.log('Alterar tarefa');
  const id = readlineSync.question('Digite o ID da tarefa que será alterada: ');
  const tarefaEncontrada = db.tarefas.find(tarefa => tarefa.id === id);

  if (!tarefaEncontrada) {
    console.log(`Tarefa com ID ${id} não encontrada.`);
    return;
  }

  const novaDescricao = readlineSync.question(`Digite a nova descrição da tarefa ${id}: `);
  tarefaEncontrada.descricao = novaDescricao;

  try {
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    console.log(`Tarefa ${id} alterada com sucesso!`);
  } catch (error) {
    console.log('Erro ao alterar tarefa:', error.message);
  }
}

function marcarTarefaConcluida() {
  console.log('Marcar tarefa como concluída');
  const id = readlineSync.question('Digite o ID da tarefa a ser marcada como concluída: ');
  const tarefaEncontrada = db.tarefas.find(tarefa => tarefa.id === id);

  if (!tarefaEncontrada) {
    console.log(`Tarefa com ID ${id} não encontrada.`);
    return;
  }

  tarefaEncontrada.status = 'Concluída';

  try {
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    console.log(`Tarefa ${id} marcada como concluída!`);
  } catch (error) {
    console.log('Erro ao marcar tarefa como concluída:', error.message);
  }
}

function excluirTarefa() {
  console.log('Excluir tarefa');
  const id = readlineSync.question('Digite o ID da tarefa a ser excluída: ');
  const index = db.tarefas.findIndex(tarefa => tarefa.id === id);

  if (index === -1) {
    console.log(`Tarefa com ID ${id} não encontrada.`);
    return;
  }

  db.tarefas.splice(index, 1);

  try {
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    console.log(`Tarefa ${id} excluída com sucesso!`);
  } catch (error) {
    console.log('Erro ao excluir tarefa:', error.message);
  }
}

function listarTarefasPendentes() {
  console.log('Listar tarefas pendentes');
  const tarefasPendentes = db.tarefas.filter(tarefa => tarefa.status === 'Pendente');

  if (tarefasPendentes.length === 0) {
    console.log('Não há tarefas pendentes.');
    return;
  }

  console.table(tarefasPendentes, ["id", 'descricao', 'status']);
}

function listarTarefasConcluidas() {
  console.log('Listar tarefas concluídas');
  const tarefasPendentes = db.tarefas.filter(tarefa => tarefa.status === 'Concluída');

  if (tarefasPendentes.length === 0) {
    console.log('Não há tarefas concluídas.');
    return;
  }

  console.table(tarefasPendentes, ["id", 'descricao', 'status']);
}

main();
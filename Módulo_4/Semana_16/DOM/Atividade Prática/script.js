(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_bebidas')) ?? [];
}

function setLocalStorage(bd_bebidas) {
  localStorage.setItem('bd_bebidas', JSON.stringify(bd_bebidas));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_bebidas = getLocalStorage();
  let index = 0;
  for (bebida of bd_bebidas) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${bebida.nome}</td>
        <td>${bebida.fabricante}</td>
        <td>${bebida.quantidade}</td>
        <td>${bebida.sabor}</td>
        <td>${bebida.litragem}</td>
        <td>${bebida.preco}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const bebida = {
    nome: document.getElementById('nome').value,
    fabricante: document.getElementById('fabricante').value,
    quantidade: document.getElementById('quantidade').value,
    sabor: document.getElementById('sabor').value,
    litragem: document.getElementById('litragem').value,
    preco: document.getElementById('preco').value
  }
  const bd_bebidas = getLocalStorage();
  bd_bebidas.push(bebida);
  setLocalStorage(bd_bebidas);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_bebidas = getLocalStorage();
  bd_bebidas.splice(index, 1);
  setLocalStorage(bd_bebidas);
  atualizarTabela();
}

function validarSabor() { // Adaptação da função validar (10 pontos)
  const bd_bebidas = getLocalStorage();
  for (bebida of bd_bebidas) {
    if (sabor.value == bebida.sabor) {
      sabor.setCustomValidity("Este sabor já está selecionado!");
      feedbackSabor.innerText = "Este sabor já está selecionado!";
      return false;
    } else {
      sabor.setCustomValidity("");
      feedbackSabor.innerText = "Informe o sabor corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const sabor = document.getElementById("sabor");
const feedbackSabor = document.getElementById("feedbackSabor");
sabor.addEventListener('input', validarSabor);
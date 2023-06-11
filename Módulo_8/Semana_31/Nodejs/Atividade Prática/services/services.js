const axios = require("axios");

module.exports = class Services {
  static async UsuarioCreate(req, res) {
    let valores = req.body;
    const options = {
      url: 'https://listatarefas.dgkeven.repl.co/usuarios/Cadastrar',
      method: 'POST',
      data: valores
    };
    axios(options);
    const mensagem = "Cadastro realizado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // LISTAR
 static async UsuarioListar(req,res){
 const options = {
 url: 'https://listatarefas.dgkeven.repl.co/usuarios',
 method: 'GET',
 data: {}
 };
 axios(options).then(response => {
 console.log(response.data);
 const usuario =response.data
 res.render("usuarios/listar",{usuario});
 });
 }

  // UPDATE
 static async UsuarioUpdate(req,res){
 
 let valores = req.body;
 const options = {
 url: 'https://listatarefas.dgkeven.repl.co/usuarios/'+valores.id_usuario,
 method: 'PUT',
 data: valores 
 };
 axios(options);
 const mensagem = "Registro atualizado com sucesso";
 res.render("mensagem",{mensagem});
 }

// DELETE
 static async UsuarioDelete(req,res){
 let id_usuario = req.body.id_usuario;
 const options = {
 url: 'https://listatarefas.dgkeven.repl.co/usuarios/'+id_usuario,
 method: 'DELETE'
 };
 axios(options);
 const mensagem = "Usuário excluído com sucesso!";
 res.render("mensagem",{mensagem});
 }

  
}

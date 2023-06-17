const Funcionario = require("../model/funcionarioModel");
const jwt = require("jsonwebtoken");
module.exports = class funcionarioController{
  //CREATE
  static async FuncionarioCreate(req,res){
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    const funcionario = {
      nome: nome,
      email: email,
      senha: senha
    }
    await Funcionario.create(funcionario);
    res.json({message: "Funcionário cadastrado com sucesso!"});
  }
//READ - LISTAR
  static async FuncionarioListar(req,res){
    const id_funcionario = req.params.id;
    if(id_funcionario){
      const funcionario = await Funcionario.findOne({where: {id_funcionario: id_funcionario}});
      res.json(funcionario);
    }else{
      const funcionario = await Funcionario.findAll({raw:true});
      res.json(funcionario);
    }
}
//UPDATE
  static async FuncionarioUpdate(req, res){
    const id_funcionario = req.params.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    const funcionario = {
      nome: nome,
      email: email,
      senha: senha
    };
    await Funcionario.update(funcionario,{where: {id_funcionario:id_funcionario}});
    res.json({message: "Cadastro atualizado com sucesso! Foram atualizados as sequintes informações: ", dados: funcionario});
  }
//Função FuncionarioDelete responsável pela exclusão do usuário.
  static async FuncionarioDelete(req,res){
    const id_funcionario = req.params.id;
    await Funcionario.destroy({where:{id_funcionario: id_funcionario}});
    res.json({message: "Funcionário excluído com sucesso!"});
  }

static async FuncionarioVerificaLogin(req,res){
  var email = req.body.email;
  var senha = req.body.senha;
  const dados={
    email: email,
    senha: senha
  };
  const funcionario = await Funcionario.findOne({where: {email: email, senha: senha}}).then((funcionario)=>{
    if(funcionario!= undefined){
      const id = funcionario.id_funcionario;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expira em 5min
      });
      return res.json({ auth: true, token: token }); //Criação do token
    }else{
      res.status(402).json({message: "Erro ao logar no sistema"});
    }
  })
}
// VERIFICA SE O TOKEN FOI CRIADO  
static async verificaJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token criado.' });
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação com o token.' });
      
      // Salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
} 

}
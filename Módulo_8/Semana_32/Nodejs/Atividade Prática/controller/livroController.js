const Livro = require("../model/livroModel");

module.exports = class livroController{
  //CREATE
  static async livroCreate(req,res){
    let nome = req.body.nome;
    let descricao = req.body.descricao;
    let preco = req.body.preco;
    let link = req.body.link;
  
    const livro = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      link: link
    }
    await Livro.create(livro);
    res.json({message: "Livro cadastrado com sucesso!"});
  }
//READ - LISTAR
  static async LivroListar(req,res){
    const id_livro = req.params.id;
    if(id_livro){
      const livro = await Livro.findOne({where: {id_livro: id_livro}});
      res.json(livro);
    }else{
      const livro = await Livro.findAll({raw:true});
      res.json(livro);
    }
}
//UPDATE
  static async LivroUpdate(req, res){
    const id_livro = req.params.id;
    let nome = req.body.nome;
    let descricao = req.body.descricao;
    let preco = req.body.preco;
    let link = req.body.link;
    const livro = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      link: link
    };
    await Livro.update(livro,{where: {id_livro:id_livro}});
    res.json({message: "Cadastro atualizado com sucesso! Foram atualizados as sequintes informações: ", dados: livro});
  }
//Função LivroDelete responsável pela exclusão do usuário.
  static async LivroDelete(req,res){
    const id_livro = req.params.id;
    await Livro.destroy({where:{id_livro: id_livro}});

    res.json({message: "Livro excluído com sucesso!"});
  }
}
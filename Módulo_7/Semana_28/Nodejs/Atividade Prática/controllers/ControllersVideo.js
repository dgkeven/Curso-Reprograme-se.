const Video = require("../models/Videos");

module.exports = class VideoController {
  
 static cadastrarVideo(req,res) {
 res.render("videos/Cadastrar");
 }
//CREATE
static async VideoCreate(req,res) {
 const video = {
 titulo: req.body.titulo,
 categoria: req.body.categoria,
 genero: req.body.genero,
 sinopse: req.body.sinopse,
 link: req.body.link
 }
 await Video.create(video);
 res.send("Cadastro realizado com sucesso!");
 }

  //READ
  static async listarVideos(req,res) {
 const video = await Video.findAll({ raw:true })
 res.render("videos/listar", {video});
 }

  //UPDATE
  static async UpdateVideo(req,res) {
 const id_filme = req.params.id_video;
 const video = await Video.findOne({where: {id_filme: id_filme}, raw : true})
 res.render("videos/update", {video})
 }
 static async VideoUpdate(req, res) {
 const id_filme = req.body.id_filme
   
 const video = {
 titulo: req.body.titulo,
 categoria: req.body.categoria,
 genero: req.body.genero,
 sinopse: req.body.sinopse,
 link: req.body.link
 }
 await Video.update(video, { where: { id_filme:id_filme }})
 res.redirect("/")
 }
  //DELETE
  static async removerVideo(req,res) {
 const id_filme = req.body.id_filme;
 await Video.destroy({ where: { id_filme: id_filme }})
 res.redirect("/")
 } 
}
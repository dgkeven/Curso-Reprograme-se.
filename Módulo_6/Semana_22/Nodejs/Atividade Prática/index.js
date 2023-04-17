const express = require("express");
const app = express();
port = 443

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/produtos", (req, res) => {
  res.sendFile(__dirname + "/produtos.html");
});

app.get("/sobre", (req, res) => {
  res.sendFile(__dirname + "/sobre.html")
});

app.get("/contato", (req, res) => {
  res.sendFile(__dirname + "/contato.html");
});

app.use("/static", express.static(__dirname + "/public"));


app.listen(port, () => { console.log("Servidor rodando!")});
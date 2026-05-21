var express = require("express");
var router  = express.Router();
var usuarioController = require("../controllers/usuarioController");
 
router.post("/cadastrar",  (req, res) => usuarioController.cadastrar(req, res));
router.post("/autenticar", (req, res) => usuarioController.autenticar(req, res));
router.put("/:id/perfil",  (req, res) => usuarioController.atualizarPerfil(req, res));
router.get("/alunos",      (req, res) => usuarioController.listarAlunos(req, res));
 
module.exports = router;
 
var express = require("express");
var router  = express.Router();
var treinoController = require("../controllers/treinoController");


router.post("/criar", function(req, res) {
    treinoController.criar(req, res);
});

router.get("/aluno/:alunoId", function(req, res) {
    treinoController.buscarTodos(req, res);
});

router.get("/professor/:professorId", function(req, res) {
    treinoController.buscarPorProfessor(req, res);
});

router.put("/concluir/:treinoId", function(req, res) {
    treinoController.concluir(req, res);
});

module.exports = router;
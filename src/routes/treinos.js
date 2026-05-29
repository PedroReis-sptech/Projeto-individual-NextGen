var express = require("express");
var router  = express.Router();
var treinoController = require("../controllers/treinoController");

// POST /treinos/criar → cria treino vinculado a um aluno
router.post("/criar", function(req, res) {
    treinoController.criar(req, res);
});

// GET /treinos/pendentes/:alunoId → lista treinos pendentes do aluno
router.get("/pendentes/:alunoId", function(req, res) {
    treinoController.buscarPendentes(req, res);
});

// PUT /treinos/concluir/:treinoId → marca treino como concluído
router.put("/concluir/:treinoId", function(req, res) {
    treinoController.concluir(req, res);
});

module.exports = router;
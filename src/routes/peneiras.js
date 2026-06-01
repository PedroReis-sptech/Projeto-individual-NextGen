var express = require("express");
var router  = express.Router();
var ctrl    = require("../controllers/peneiraController");

// GET /peneiras -> lista todas as peneiras ativas
router.get("/", function(req, res) {
    ctrl.listar(req, res);
});

// GET /peneiras/criador/:idCriador -> peneiras de um criador
// IMPORTANTE: esta rota precisa vir ANTES de /:id
// senao o Express confunde "criador" com um id
router.get("/criador/:idCriador", function(req, res) {
    ctrl.listarPorCriador(req, res);
});

// GET /peneiras/:id -> detalhes de uma peneira
router.get("/:id", function(req, res) {
    ctrl.buscarPorId(req, res);
});

// POST /peneiras/criar -> cria nova peneira
router.post("/criar", function(req, res) {
    ctrl.criar(req, res);
});

// DELETE /peneiras/desativar/:id -> desativa peneira
router.delete("/desativar/:id", function(req, res) {
    ctrl.desativar(req, res);
});

module.exports = router;

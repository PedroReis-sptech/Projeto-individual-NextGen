var express = require("express");
var router  = express.Router();
var ctrl    = require("../controllers/estatisticasController");

// GET /estatisticas/admin → dados do dashboard admin
router.get("/admin", function(req, res) {
    ctrl.admin(req, res);
});

// GET /estatisticas/aluno/:id → dados do dashboard do aluno
router.get("/aluno/:id", function(req, res) {
    ctrl.aluno(req, res);
});

module.exports = router;
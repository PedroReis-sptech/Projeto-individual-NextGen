var express = require("express");
var router  = express.Router();
var ctrl    = require("../controllers/peneiraController");

router.get("/", function(req, res) {
    ctrl.listar(req, res);
});

router.get("/criador/:idCriador", function(req, res) {
    ctrl.listarPorCriador(req, res);
});

router.get("/:id", function(req, res) {
    ctrl.buscarPorId(req, res);
});

router.post("/criar", function(req, res) {
    ctrl.criar(req, res);
});

router.delete("/desativar/:id", function(req, res) {
    ctrl.desativar(req, res);
});

module.exports = router;

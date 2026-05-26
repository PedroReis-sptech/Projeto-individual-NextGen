var express = require("express");
var router  = express.Router();
var ctrl    = require("../controllers/inscricaoController");

// POST /inscricoes/inscrever → inscreve atleta em peneira
router.post("/inscrever", function(req, res) {
    ctrl.inscrever(req, res);
});

// GET /inscricoes/atleta/:id → lista inscrições do atleta
router.get("/atleta/:id", function(req, res) {
    ctrl.listarPorAtleta(req, res);
});

// GET /inscricoes/:idAtleta → compatibilidade com front (perfil.html)
router.get("/:idAtleta", function(req, res) {
    // reaproveita o mesmo controller
    req.params.id = req.params.idAtleta;
    ctrl.listarPorAtleta(req, res);
});


module.exports = router;
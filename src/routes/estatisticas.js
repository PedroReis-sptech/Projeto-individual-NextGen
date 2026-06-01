var express = require("express");
var router  = express.Router();
var ctrl    = require("../controllers/estatisticasController");

router.get("/admin", function(req, res) {
    ctrl.admin(req, res);
});

router.get("/aluno/:id", function(req, res) {
    ctrl.aluno(req, res);
});

module.exports = router;
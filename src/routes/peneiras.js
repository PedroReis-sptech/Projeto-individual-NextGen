var express   = require("express");
var router    = express.Router();
var ctrl      = require("../controllers/peneiraController");

router.get("/",                       (req, res) => ctrl.listar(req, res));
router.get("/criador/:idCriador",     (req, res) => ctrl.listarPorCriador(req, res));
router.post("/criar",                 (req, res) => ctrl.criar(req, res));
router.delete("/desativar/:id",       (req, res) => ctrl.desativar(req, res));

module.exports = router;
var inscricaoModel = require("../models/inscricaoModel");

// ============================================================
// Controller de Inscrição
// ============================================================

// POST /inscricoes/inscrever
// Body: { idAtleta, idPeneira }
function inscrever(req, res) {
    var idAtleta  = req.body.idAtleta;
    var idPeneira = req.body.idPeneira;

    if (!idAtleta || !idPeneira) {
        return res.status(400).json({ mensagem: "idAtleta e idPeneira são obrigatórios." });
    }

    inscricaoModel.inscrever(idAtleta, idPeneira)
        .then(function(resultado) {
            res.status(201).json({ mensagem: "Inscrição realizada com sucesso!" });
        })
        .catch(function(erro) {
            console.error("Erro ao inscrever:", erro);
            // Se for a mensagem de "já inscrito", retorna 409 (conflito)
            if (erro.mensagem) {
                return res.status(409).json({ mensagem: erro.mensagem });
            }
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

// GET /inscricoes/atleta/:id
// Retorna todas as inscrições do atleta com detalhes
function listarPorAtleta(req, res) {
    var idAtleta = req.params.id;

    inscricaoModel.listarPorAtleta(idAtleta)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.error("Erro ao listar inscrições:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

module.exports = { inscrever, listarPorAtleta };
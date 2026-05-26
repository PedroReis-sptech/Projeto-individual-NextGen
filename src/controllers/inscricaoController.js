var inscricaoModel = require("../models/inscricaoModel");

function inscrever(req, res) {
    var idAtleta  = req.body.idAtleta;
    var idPeneira = req.body.idPeneira;

    if (!idAtleta || !idPeneira) {
        return res.status(400).json({ mensagem: "idAtleta e idPeneira são obrigatórios." });
    }

    inscricaoModel.inscrever(idAtleta, idPeneira)
        .then(function(resultado) {
            res.status(201).json({ mensagem: "Inscricao realizada com sucesso!" });
        })
        .catch(function(erro) {
            console.error("Erro ao inscrever:", erro);
            if (erro.mensagem) {
                return res.status(409).json({ mensagem: erro.mensagem });
            }
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

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
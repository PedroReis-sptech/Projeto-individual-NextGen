var treinoModel = require("../models/treinoModel");

function criar(req, res) {
    var professorId = req.body.professorId;
    var alunoId     = req.body.alunoId;
    var descricao   = req.body.descricao;

    if (!professorId) return res.status(400).json({ mensagem: "professorId não informado." });
    if (!alunoId)     return res.status(400).json({ mensagem: "alunoId não informado." });
    if (!descricao)   return res.status(400).json({ mensagem: "descricao não informada." });

    treinoModel.criar(professorId, alunoId, descricao)
        .then(function(resultado) {
            res.status(201).json({ id: resultado.insertId, mensagem: "Treino criado com sucesso!" });
        })
        .catch(function(erro) {
            console.error("Erro ao criar treino:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

function buscarPendentes(req, res) {
    var alunoId = req.params.alunoId;

    if (!alunoId) return res.status(400).json({ mensagem: "alunoId não informado." });

    treinoModel.buscarPendentesPorAluno(alunoId)
        .then(function(resultado) {
            if (resultado.length === 0) {
                return res.status(204).send();
            }
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.error("Erro ao buscar treinos:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

function concluir(req, res) {
    var treinoId = req.params.treinoId;

    if (!treinoId) return res.status(400).json({ mensagem: "treinoId não informado." });

    treinoModel.concluir(treinoId)
        .then(function(resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensagem: "Treino não encontrado." });
            }
            res.status(200).json({ mensagem: "Treino concluído!" });
        })
        .catch(function(erro) {
            console.error("Erro ao concluir treino:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

module.exports = { criar, buscarPendentes, concluir };
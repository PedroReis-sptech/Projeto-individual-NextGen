var peneiraModel = require("../models/peneiraModel");

// ============================================================
// Controller de Peneira
// ============================================================

// GET /peneiras → lista todas as peneiras ativas
function listar(req, res) {
    peneiraModel.listar()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.error("Erro ao listar peneiras:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

// GET /peneiras/criador/:idCriador → peneiras criadas por um usuário
function listarPorCriador(req, res) {
    peneiraModel.listarPorCriador(req.params.idCriador)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.error("Erro ao listar peneiras do criador:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

// GET /peneiras/:id → detalhes de uma peneira específica
function buscarPorId(req, res) {
    peneiraModel.buscarPorId(req.params.id)
        .then(function(resultado) {
            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: "Peneira não encontrada." });
            }
            res.status(200).json(resultado[0]);
        })
        .catch(function(erro) {
            console.error("Erro ao buscar peneira:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

// POST /peneiras/criar → cria nova peneira
function criar(req, res) {
    var { nome, dataRealizacao, localEndereco, categoria, fkCriador } = req.body;

    if (!nome || !dataRealizacao || !localEndereco || !categoria || !fkCriador) {
        return res.status(400).json({ mensagem: "Campos obrigatórios faltando." });
    }

    peneiraModel.criar(req.body)
        .then(function(resultado) {
            res.status(201).json({ id: resultado.insertId, mensagem: "Peneira criada com sucesso." });
        })
        .catch(function(erro) {
            console.error("Erro ao criar peneira:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

// DELETE /peneiras/desativar/:id → desativa uma peneira
function desativar(req, res) {
    peneiraModel.desativar(req.params.id)
        .then(function() {
            res.status(200).json({ mensagem: "Peneira desativada." });
        })
        .catch(function(erro) {
            console.error("Erro ao desativar peneira:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

module.exports = { listar, listarPorCriador, buscarPorId, criar, desativar };
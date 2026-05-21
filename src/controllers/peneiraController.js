var peneiraModel = require("../models/peneiraModel");

function listar(req, res) {
    peneiraModel.listar()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json({ mensagem: e.sqlMessage }));
}

function listarPorCriador(req, res) {
    peneiraModel.listarPorCriador(req.params.idCriador)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json({ mensagem: e.sqlMessage }));
}

function criar(req, res) {
    const { nome, dataRealizacao, localEndereco, categoria, fkCriador } = req.body;
    if (!nome || !dataRealizacao || !localEndereco || !categoria || !fkCriador) {
        return res.status(400).json({ mensagem: "Campos obrigatórios faltando." });
    }
    peneiraModel.criar(req.body)
        .then(r => res.status(201).json({ id: r.insertId, mensagem: "Peneira criada." }))
        .catch(e => res.status(500).json({ mensagem: e.sqlMessage }));
}

function desativar(req, res) {
    peneiraModel.desativar(req.params.id)
        .then(() => res.status(200).json({ mensagem: "Peneira desativada." }))
        .catch(e => res.status(500).json({ mensagem: e.sqlMessage }));
}

module.exports = { listar, listarPorCriador, criar, desativar };
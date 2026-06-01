var treinoModel = require("../models/treinoModel");

function criar(req, res) {
    var professorId = req.body.professorId;
    var alunoId     = req.body.alunoId;
    var descricao   = req.body.descricao;

    if (!professorId) return res.status(400).json({ mensagem: "professorId nao informado." });
    if (!alunoId)     return res.status(400).json({ mensagem: "alunoId nao informado." });
    if (!descricao)   return res.status(400).json({ mensagem: "descricao nao informada." });

    treinoModel.criar(professorId, alunoId, descricao)
        .then(function(resultado) {
            res.status(201).json({ id: resultado.insertId, mensagem: "Treino criado com sucesso!" });
        })
        .catch(function(erro) {
            console.error("Erro ao criar treino:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

function buscarTodos(req, res) {
    var alunoId = req.params.alunoId;

    if (!alunoId) return res.status(400).json({ mensagem: "alunoId nao informado." });

    treinoModel.buscarTodosPorAluno(alunoId)
        .then(function(resultado) {
            if (resultado.length === 0) {
                return res.status(204).send();
            }
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.error("Erro ao buscar treinos do aluno:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

function buscarPorProfessor(req, res) {
    var professorId = req.params.professorId;

    if (!professorId) return res.status(400).json({ mensagem: "professorId nao informado." });

    treinoModel.buscarPorProfessor(professorId)
        .then(function(resultado) {
            if (resultado.length === 0) {
                return res.status(204).send();
            }
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.error("Erro ao buscar treinos do professor:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

function concluir(req, res) {
    var treinoId = req.params.treinoId;
    var alunoId = null;

    if (!treinoId) return res.status(400).json({ mensagem: "treinoId nao informado." });

    treinoModel.buscarPorId(treinoId)
        .then(function(treinos) {
            if (treinos.length === 0) {
                return null;
            }

            if (treinos[0].status_treino === 'concluido') {
                return 'ja_concluido';
            }

            alunoId = treinos[0].aluno_id;
            return treinoModel.concluir(treinoId);
        })
        .then(function(resultado) {
            if (resultado === null) {
                return res.status(404).json({ mensagem: "Treino nao encontrado." });
            }

            if (resultado === 'ja_concluido') {
                return res.status(200).json({ mensagem: "Treino ja estava concluido." });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensagem: "Treino nao encontrado." });
            }

            return treinoModel.aumentarDesempenho(alunoId);
        })
        .then(function(resultado) {
            if (!resultado) {
                return;
            }

            res.status(200).json({ mensagem: "Treino concluido!" });
        })
        .catch(function(erro) {
            console.error("Erro ao concluir treino:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

module.exports = { criar, buscarTodos, buscarPorProfessor, concluir };

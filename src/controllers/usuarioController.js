var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) return res.status(400).json({ mensagem: "E-mail não informado." });
    if (!senha) return res.status(400).json({ mensagem: "Senha não informada." });

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.status(403).json({ mensagem: "E-mail e/ou senha inválido(s)." });
            }
            if (resultado.length > 1) {
                return res.status(500).json({ mensagem: "Mais de um usuário com o mesmo login." });
            }
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.error("Erro ao autenticar:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var posicao = req.body.posicao;
    var categoria = req.body.categoria;
    var timeCoracao = req.body.timeCoracao;
    var dataNasc = req.body.dataNascimento;
    var cidade = req.body.cidade;
    var altura = req.body.alturaCm;
    var peso = req.body.pesoKg;

    if (!nome)  return res.status(400).json({ mensagem: "Nome não informado." });
    if (!email) return res.status(400).json({ mensagem: "E-mail não informado." });
    if (!senha) return res.status(400).json({ mensagem: "Senha não informada." });

    usuarioModel.cadastrar(nome, email, senha, posicao, categoria, timeCoracao, dataNasc, cidade, altura, peso)
        .then(function (resultado) {
            res.status(201).json({ id: resultado.insertId, mensagem: "Usuário cadastrado com sucesso." });
        })
        .catch(function (erro) {
            console.error("Erro ao cadastrar:", erro);
            if (erro.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ mensagem: "E-mail já cadastrado." });
            }
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

function atualizarPerfil(req, res) {
    var id = req.params.id;
    var {
        nome, email, senha, foto_perfil,
        posicao, categoria, time_coracao,
        data_nascimento, cidade, altura_cm, peso_kg
    } = req.body;

    const dados = { nome, email, senha, foto_perfil, posicao, categoria,
                    time_coracao, data_nascimento, cidade, altura_cm, peso_kg };

    usuarioModel.atualizarPerfil(id, dados)
        .then(function(resultado) {
            return usuarioModel.buscarPorId(id)
                .then(function(usuarioAtualizado) {
                    if (!usuarioAtualizado || usuarioAtualizado.length === 0) {
                        return res.status(404).json({ mensagem: "Usuário não encontrado." });
                    }

                    res.status(200).json({
                        mensagem: "Perfil atualizado.",
                        usuario: usuarioAtualizado[0]
                    });
                });
        })
        .catch(function(erro) {
            console.error("Erro ao atualizar perfil:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

function listarAlunos(req, res) {
    usuarioModel.listarAlunos()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.error("Erro ao listar alunos:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
        });
}

module.exports = { autenticar, cadastrar, atualizarPerfil, listarAlunos };
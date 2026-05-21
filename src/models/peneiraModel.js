// ── model ──────────────────────────────────────────────────
var database = require("../database/config");

function listar() {
    return database.executar(`
        SELECT p.*, c.nome AS nome_clube, u.nome AS criador_nome
        FROM peneira p
        LEFT JOIN clube c ON p.fk_clube = c.id
        LEFT JOIN usuario u ON p.fk_criador = u.id
        WHERE p.ativa = 1
        ORDER BY p.data_realizacao ASC;
    `);
}

function listarPorCriador(idCriador) {
    return database.executar(`
        SELECT p.*, c.nome AS nome_clube
        FROM peneira p
        LEFT JOIN clube c ON p.fk_clube = c.id
        WHERE p.fk_criador = ${idCriador}
        ORDER BY p.data_realizacao DESC;
    `);
}

function criar(dados) {
    const { nome, descricao, dataRealizacao, horario, localEndereco, cidade, categoria, vagas, fkClube, fkCriador } = dados;
    return database.executar(`
        INSERT INTO peneira (nome, descricao, data_realizacao, horario, local_endereco, cidade, categoria, vagas, fk_clube, fk_criador)
        VALUES (
            '${nome}', '${descricao || ''}', '${dataRealizacao}', '${horario || '00:00'}',
            '${localEndereco || ''}', '${cidade || ''}', '${categoria || ''}',
            ${vagas || 'NULL'}, ${fkClube || 'NULL'}, ${fkCriador}
        );
    `);
}

function desativar(id) {
    return database.executar(`UPDATE peneira SET ativa = 0 WHERE id = ${id};`);
}

module.exports = { listar, listarPorCriador, criar, desativar };
var database = require("../database/config");

function listar() {
    return database.executar(`
        SELECT
            p.*,
            CASE WHEN p.ativa = 1 THEN 'ativa' ELSE 'desativada' END AS status,
            p.ativa AS ativo,
            COALESCE(c.nome, 'Sem clube') AS nome_clube,
            c.escudo_url,
            u.nome AS criador_nome
        FROM peneira p
        LEFT JOIN clube c ON p.fk_clube = c.id
        LEFT JOIN usuario u ON p.fk_criador = u.id
        WHERE p.ativa = 1
        ORDER BY p.data_realizacao ASC
    `);
}

function listarPorCriador(idCriador) {
    return database.executar(`
        SELECT
            p.*,
            CASE WHEN p.ativa = 1 THEN 'ativa' ELSE 'desativada' END AS status,
            p.ativa AS ativo,
            COALESCE(c.nome, 'Sem clube') AS nome_clube,
            c.escudo_url
        FROM peneira p
        LEFT JOIN clube c ON p.fk_clube = c.id
        WHERE p.fk_criador = ${idCriador}
        ORDER BY p.data_realizacao DESC
    `);
}

function buscarPorId(id) {
    return database.executar(`
        SELECT
            p.*,
            CASE WHEN p.ativa = 1 THEN 'ativa' ELSE 'desativada' END AS status,
            p.ativa AS ativo,
            COALESCE(c.nome, 'Sem clube') AS nome_clube,
            c.escudo_url,
            u.nome AS criador_nome
        FROM peneira p
        LEFT JOIN clube c ON p.fk_clube = c.id
        LEFT JOIN usuario u ON p.fk_criador = u.id
        WHERE p.id = ${id}
    `);
}

function criar(dados) {
    var { nome, descricao, dataRealizacao, horario, localEndereco, cidade, categoria, vagas, fkClube, fkCriador } = dados;
    var clubeId = fkClube ? fkClube : 'NULL';
    var qtdVagas = vagas ? vagas : 'NULL';

    return database.executar(`
        INSERT INTO peneira
            (nome, descricao, data_realizacao, horario, local_endereco, cidade, categoria, vagas, fk_clube, fk_criador, ativa)
        VALUES (
            '${nome}',
            '${descricao || ''}',
            '${dataRealizacao}',
            '${horario || '00:00'}',
            '${localEndereco || ''}',
            '${cidade || ''}',
            '${categoria}',
            ${qtdVagas},
            ${clubeId},
            ${fkCriador},
            1
        );
    `);
}

function desativar(id) {
    return database.executar(`UPDATE peneira SET ativa = 0 WHERE id = ${id}`);
}

module.exports = { listar, listarPorCriador, buscarPorId, criar, desativar };

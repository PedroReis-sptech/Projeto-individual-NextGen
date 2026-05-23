var database = require("../database/config");

// ============================================================
// Model de Peneira
// ============================================================

// Lista todas as peneiras ativas com nome do clube e criador
function listar() {
    return database.executar(`
        SELECT
            p.*,
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

// Lista peneiras criadas por um usuário específico
function listarPorCriador(idCriador) {
    return database.executar(`
        SELECT
            p.*,
            COALESCE(c.nome, 'Sem clube') AS nome_clube,
            c.escudo_url
        FROM peneira p
        LEFT JOIN clube c ON p.fk_clube = c.id
        WHERE p.fk_criador = ${idCriador}
        ORDER BY p.data_realizacao DESC
    `);
}

// Busca uma peneira pelo ID com todos os detalhes
function buscarPorId(id) {
    return database.executar(`
        SELECT
            p.*,
            COALESCE(c.nome, 'Sem clube') AS nome_clube,
            c.escudo_url,
            u.nome AS criador_nome
        FROM peneira p
        LEFT JOIN clube c ON p.fk_clube = c.id
        LEFT JOIN usuario u ON p.fk_criador = u.id
        WHERE p.id = ${id}
    `);
}

// Cria uma nova peneira
function criar(dados) {
    var { nome, descricao, dataRealizacao, horario, localEndereco, cidade, categoria, vagas, fkClube, fkCriador } = dados;
    return database.executar(`
        INSERT INTO peneira
            (nome, descricao, data_realizacao, horario, local_endereco, cidade, categoria, vagas, fk_clube, fk_criador)
        VALUES (
            '${nome}',
            '${descricao || ''}',
            '${dataRealizacao}',
            '${horario || '00:00'}',
            '${localEndereco || ''}',
            '${cidade || ''}',
            '${categoria || ''}',
            ${vagas || 'NULL'},
            ${fkClube || 'NULL'},
            ${fkCriador}
        )
    `);
}

// Desativa uma peneira (não apaga, só marca como inativa)
function desativar(id) {
    return database.executar(`UPDATE peneira SET ativa = 0 WHERE id = ${id}`);
}

module.exports = { listar, listarPorCriador, buscarPorId, criar, desativar };
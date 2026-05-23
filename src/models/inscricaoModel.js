var database = require("../database/config");

// ============================================================
// Model de Inscrição
// Cuida de inscrever atletas em peneiras e listar inscrições
// ============================================================

// Inscreve um atleta em uma peneira
// Verifica antes se ele já está inscrito
function inscrever(idAtleta, idPeneira) {

    // Primeiro verifica se já existe uma inscrição
    var sqlVerifica = `
        SELECT id FROM inscricao
        WHERE fk_atleta = ${idAtleta}
          AND fk_peneira = ${idPeneira}
    `;

    return database.executar(sqlVerifica).then(function(resultado) {

        // Se já existe, rejeita com mensagem amigável
        if (resultado.length > 0) {
            return Promise.reject({ mensagem: "Você já está inscrito nesta peneira." });
        }

        // Se não existe, faz a inscrição com status 'pendente'
        var sqlInsert = `
            INSERT INTO inscricao (fk_atleta, fk_peneira, status)
            VALUES (${idAtleta}, ${idPeneira}, 'pendente')
        `;
        return database.executar(sqlInsert);
    });
}

// Lista todas as inscrições de um atleta com detalhes da peneira
function listarPorAtleta(idAtleta) {
    var sql = `
        SELECT
            i.id,
            i.status,
            i.dt_inscricao,
            p.nome        AS nome_peneira,
            p.data_realizacao,
            p.horario,
            p.categoria,
            p.local_endereco,
            p.cidade,
            COALESCE(c.nome, 'Sem clube') AS nome_clube
        FROM inscricao i
        JOIN peneira p ON i.fk_peneira = p.id
        LEFT JOIN clube c ON p.fk_clube = c.id
        WHERE i.fk_atleta = ${idAtleta}
        ORDER BY i.dt_inscricao DESC
    `;
    return database.executar(sql);
}

module.exports = { inscrever, listarPorAtleta };
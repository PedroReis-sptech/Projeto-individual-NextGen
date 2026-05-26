var database = require("../database/config");

function inscrever(idAtleta, idPeneira) {
    var sqlVerifica = `
        SELECT id FROM inscricao
        WHERE fk_atleta = ${idAtleta}
          AND fk_peneira = ${idPeneira}
    `;

    return database.executar(sqlVerifica).then(function(resultado) {
        if (resultado.length > 0) {
            return Promise.reject({ mensagem: "Você já está inscrito nesta peneira." });
        }

        var sqlInsert = `
            INSERT INTO inscricao (fk_atleta, fk_peneira, status)
            VALUES (${idAtleta}, ${idPeneira}, 'pendente')
        `;
        return database.executar(sqlInsert);
    });
}

function listarPorAtleta(idAtleta) {
    return database.executar(`
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
    `);
}

module.exports = { inscrever, listarPorAtleta };
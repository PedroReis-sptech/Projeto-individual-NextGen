var database = require("../database/config");

//KPIs ADM

function totalAtletas() {
    var instrucaoSql = "SELECT COUNT(*) AS total FROM usuario WHERE tipo = 'aluno'";
    return database.executar(instrucaoSql);
}

function totalPeneiras() {
    var instrucaoSql = "SELECT COUNT(*) AS total FROM peneira WHERE ativa = 1";
    return database.executar(instrucaoSql);
}

function totalTreinosConcluidos() {
    var instrucaoSql = "SELECT COUNT(*) AS total FROM treino WHERE status_treino = 'concluido'";
    return database.executar(instrucaoSql);
}

function taxaConclusaoTreinos() {
    var instrucaoSql = `
        SELECT 
            ROUND(
                COUNT(CASE WHEN status_treino = 'concluido' THEN 1 END) * 100.0
                / CASE WHEN COUNT(*) = 0 THEN 1 ELSE COUNT(*) END
            , 1) AS taxa
        FROM treino
    `;
    return database.executar(instrucaoSql);
}

//GRÁFICOS ADMIN

function atletasPorPosicao() {
    var instrucaoSql = `
        SELECT posicao AS label, COUNT(*) AS total
        FROM usuario
        WHERE tipo = 'aluno'
          AND posicao IS NOT NULL
          AND posicao != ''
        GROUP BY posicao
        ORDER BY total DESC
    `;
    return database.executar(instrucaoSql);
}

function peneirasPorClube() {
    var instrucaoSql = `
        SELECT
            COALESCE(c.nome, 'Sem clube') AS label,
            COUNT(p.id) AS total
        FROM peneira p
        LEFT JOIN clube c ON p.fk_clube = c.id
        WHERE p.ativa = 1
        GROUP BY c.nome
        ORDER BY total DESC
        LIMIT 6
    `;
    return database.executar(instrucaoSql);
}

function atletasPorCategoria() {
    var instrucaoSql = `
        SELECT categoria AS label, COUNT(*) AS total
        FROM usuario
        WHERE tipo = 'aluno'
          AND categoria IS NOT NULL
          AND categoria != ''
        GROUP BY categoria
        ORDER BY total DESC
    `;
    return database.executar(instrucaoSql);
}

function cadastrosPorMes() {
    var instrucaoSql = `
        SELECT
            MONTH(dt_cadastro) AS mes,
            COUNT(*) AS total
        FROM usuario
        WHERE tipo = 'aluno'
          AND YEAR(dt_cadastro) = YEAR(CURDATE())
        GROUP BY MONTH(dt_cadastro)
        ORDER BY mes
    `;
    return database.executar(instrucaoSql);
}

function treinosConcluidosPorCategoria() {
    var instrucaoSql = `
        SELECT
            u.categoria AS label,
            COUNT(t.id) AS total
        FROM treino t
        JOIN usuario u ON t.aluno_id = u.id
        WHERE t.status_treino = 'concluido'
          AND u.categoria IS NOT NULL
          AND u.categoria != ''
        GROUP BY u.categoria
        ORDER BY total DESC
    `;
    return database.executar(instrucaoSql);
}

// ── KPIs E GRÁFICOS DO ALUNO 

function kpisAluno(idAtleta) {
    var instrucaoSql = `
        SELECT
            (SELECT COUNT(*)
             FROM treino
             WHERE aluno_id = ${idAtleta}
               AND MONTH(criado_em) = MONTH(CURDATE())
               AND YEAR(criado_em)  = YEAR(CURDATE())
            ) AS treinos_mes,

            (SELECT ROUND(
                COUNT(CASE WHEN status_treino = 'concluido' THEN 1 END) * 100.0
                / CASE WHEN COUNT(*) = 0 THEN 1 ELSE COUNT(*) END
             , 1)
             FROM treino
             WHERE aluno_id = ${idAtleta}
            ) AS taxa_presenca,

            (SELECT COUNT(*)
             FROM treino
             WHERE aluno_id = ${idAtleta}
               AND status_treino = 'concluido'
            ) AS treinos_concluidos,

            (SELECT desempenho
             FROM usuario
             WHERE id = ${idAtleta}
            ) AS desempenho
    `;
    return database.executar(instrucaoSql);
}

function presencaPorSemana(idAtleta) {
    var instrucaoSql = `
        SELECT
            WEEK(data_conclusao) AS num_semana,
            COUNT(*) AS presentes,
            0 AS ausencias
        FROM treino
        WHERE aluno_id = ${idAtleta}
          AND status_treino = 'concluido'
          AND data_conclusao >= DATE_SUB(CURDATE(), INTERVAL 8 WEEK)
        GROUP BY WEEK(data_conclusao)
        ORDER BY WEEK(data_conclusao)
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    totalAtletas,
    totalPeneiras,
    totalTreinosConcluidos,
    taxaConclusaoTreinos,
    atletasPorPosicao,
    peneirasPorClube,
    atletasPorCategoria,
    cadastrosPorMes,
    treinosConcluidosPorCategoria,
    kpisAluno,
    presencaPorSemana
};

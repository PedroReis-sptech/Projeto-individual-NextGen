var database = require("../database/config");

// ============================================================
// Este model contém todas as consultas SQL para os gráficos
// e KPIs dos dashboards (admin e aluno)
// ============================================================

// ── KPIs DO ADMIN ─────────────────────────────────────────

// Conta quantos alunos estão cadastrados
function totalAtletas() {
    var sql = "SELECT COUNT(*) AS total FROM usuario WHERE tipo = 'aluno'";
    return database.executar(sql);
}

// Conta quantas peneiras estão ativas
function totalPeneiras() {
    var sql = "SELECT COUNT(*) AS total FROM peneira WHERE ativa = 1";
    return database.executar(sql);
}

// Conta quantas inscrições têm status 'aprovado'
function totalAprovados() {
    var sql = "SELECT COUNT(*) AS total FROM inscricao WHERE status = 'aprovado'";
    return database.executar(sql);
}

// Calcula a porcentagem de aprovados sobre o total de inscrições
function taxaAprovacao() {
    var sql = `
        SELECT 
            ROUND(
                COUNT(CASE WHEN status = 'aprovado' THEN 1 END) * 100.0
                / CASE WHEN COUNT(*) = 0 THEN 1 ELSE COUNT(*) END
            , 1) AS taxa
        FROM inscricao
    `;
    return database.executar(sql);
}

// ── GRÁFICOS DO ADMIN ─────────────────────────────────────

// Agrupa atletas por posição (ex: 5 Atacantes, 3 Goleiros...)
function atletasPorPosicao() {
    var sql = `
        SELECT posicao AS label, COUNT(*) AS total
        FROM usuario
        WHERE tipo = 'aluno'
          AND posicao IS NOT NULL
          AND posicao != ''
        GROUP BY posicao
        ORDER BY total DESC
    `;
    return database.executar(sql);
}

// Conta quantas peneiras ativas cada clube tem
function peneirasPorClube() {
    var sql = `
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
    return database.executar(sql);
}

// Agrupa atletas por categoria (ex: 6 Sub-17, 4 Sub-15...)
function atletasPorCategoria() {
    var sql = `
        SELECT categoria AS label, COUNT(*) AS total
        FROM usuario
        WHERE tipo = 'aluno'
          AND categoria IS NOT NULL
          AND categoria != ''
        GROUP BY categoria
        ORDER BY total DESC
    `;
    return database.executar(sql);
}

// Conta inscrições agrupadas por mês (ano atual)
function inscricoesPorMes() {
    var sql = `
        SELECT
            MONTH(dt_inscricao) AS mes,
            COUNT(*) AS total
        FROM inscricao
        WHERE YEAR(dt_inscricao) = YEAR(CURDATE())
        GROUP BY MONTH(dt_inscricao)
        ORDER BY mes
    `;
    return database.executar(sql);
}

// Conta aprovados agrupados por categoria da peneira
function aprovadosPorCategoria() {
    var sql = `
        SELECT
            p.categoria AS label,
            COUNT(i.id) AS total
        FROM inscricao i
        JOIN peneira p ON i.fk_peneira = p.id
        WHERE i.status = 'aprovado'
          AND p.categoria IS NOT NULL
          AND p.categoria != ''
        GROUP BY p.categoria
        ORDER BY total DESC
    `;
    return database.executar(sql);
}

// Taxa de aprovação por clube (para o gráfico radar)
function taxaAprovacaoPorClube() {
    var sql = `
        SELECT
            COALESCE(c.nome, 'Sem clube') AS label,
            COUNT(CASE WHEN i.status = 'aprovado' THEN 1 END) AS aprovados,
            COUNT(i.id) AS total_inscricoes
        FROM clube c
        JOIN peneira p ON p.fk_clube = c.id
        JOIN inscricao i ON i.fk_peneira = p.id
        GROUP BY c.nome
        HAVING COUNT(i.id) > 0
    `;
    return database.executar(sql);
}

// ── KPIs E GRÁFICOS DO ALUNO ──────────────────────────────

// Retorna os 4 KPIs do dashboard do aluno em uma só consulta
function kpisAluno(idAtleta) {
    var sql = `
        SELECT
            (SELECT COUNT(*)
             FROM treino
             WHERE fk_atleta = ${idAtleta}
               AND MONTH(data_treino) = MONTH(CURDATE())
               AND YEAR(data_treino)  = YEAR(CURDATE())
            ) AS treinos_mes,

            (SELECT ROUND(
                SUM(presente) * 100.0
                / CASE WHEN COUNT(*) = 0 THEN 1 ELSE COUNT(*) END
             , 1)
             FROM treino
             WHERE fk_atleta = ${idAtleta}
            ) AS taxa_presenca,

            (SELECT COUNT(*)
             FROM inscricao
             WHERE fk_atleta = ${idAtleta}
            ) AS peneiras_inscritas,

            (SELECT COUNT(*)
             FROM inscricao
             WHERE fk_atleta = ${idAtleta}
               AND status = 'aprovado'
            ) AS aprovacoes
    `;
    return database.executar(sql);
}

// Retorna presença agrupada por semana (últimas 8 semanas)
function presencaPorSemana(idAtleta) {
    var sql = `
        SELECT
            WEEK(data_treino)                                AS num_semana,
            SUM(presente)                                    AS presentes,
            SUM(CASE WHEN presente = 0 THEN 1 ELSE 0 END)   AS ausencias
        FROM treino
        WHERE fk_atleta = ${idAtleta}
          AND data_treino >= DATE_SUB(CURDATE(), INTERVAL 8 WEEK)
        GROUP BY WEEK(data_treino)
        ORDER BY WEEK(data_treino)
    `;
    return database.executar(sql);
}

module.exports = {
    totalAtletas,
    totalPeneiras,
    totalAprovados,
    taxaAprovacao,
    atletasPorPosicao,
    peneirasPorClube,
    atletasPorCategoria,
    inscricoesPorMes,
    aprovadosPorCategoria,
    taxaAprovacaoPorClube,
    kpisAluno,
    presencaPorSemana
};
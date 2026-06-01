var modelo = require("../models/estatisticasModel");

// ============================================================
// Controller de Estatísticas
// Chama o model e devolve os dados combinados em JSON
// ============================================================

// GET /estatisticas/admin
// Retorna todos os KPIs e dados para gráficos do dashboard admin
function admin(req, res) {

    // Promise.all espera TODAS as consultas terminarem antes de responder
    Promise.all([
        modelo.totalAtletas(),
        modelo.totalPeneiras(),
        modelo.totalTreinosConcluidos(),
        modelo.taxaConclusaoTreinos(),
        modelo.atletasPorPosicao(),
        modelo.peneirasPorClube(),
        modelo.atletasPorCategoria(),
        modelo.cadastrosPorMes(),
        modelo.treinosConcluidosPorCategoria()
    ])
    .then(function(resultados) {
        // Cada item de resultados corresponde à posição no Promise.all acima
        res.status(200).json({
            kpis: {
                totalAtletas:  resultados[0][0].total,
                totalPeneiras: resultados[1][0].total,
                totalTreinosConcluidos: resultados[2][0].total,
                taxaConclusaoTreinos:  resultados[3][0].taxa || 0
            },
            atletasPorPosicao:    resultados[4],
            peneirasPorClube:     resultados[5],
            atletasPorCategoria:  resultados[6],
            cadastrosPorMes:      resultados[7],
            treinosConcluidosPorCategoria: resultados[8]
        });
    })
    .catch(function(erro) {
        console.error("Erro ao buscar estatísticas admin:", erro);
        res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
    });
}

// GET /estatisticas/aluno/:id
// Retorna KPIs e gráfico de presença do aluno logado
function aluno(req, res) {
    var idAtleta = req.params.id;

    Promise.all([
        modelo.kpisAluno(idAtleta),
        modelo.presencaPorSemana(idAtleta)
    ])
    .then(function(resultados) {
        var kpis = resultados[0][0] || {};

        res.status(200).json({
            kpis: {
                treinosNoMes:      kpis.treinos_mes      || 0,
                taxaPresenca:      kpis.taxa_presenca     || 0,
                treinosConcluidos: kpis.treinos_concluidos || 0,
                desempenho:        kpis.desempenho         || 50
            },
            presencaPorSemana: resultados[1]
        });
    })
    .catch(function(erro) {
        console.error("Erro ao buscar estatísticas aluno:", erro);
        res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno." });
    });
}

module.exports = { admin, aluno };

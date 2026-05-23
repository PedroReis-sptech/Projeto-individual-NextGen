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
        modelo.totalAprovados(),
        modelo.taxaAprovacao(),
        modelo.atletasPorPosicao(),
        modelo.peneirasPorClube(),
        modelo.atletasPorCategoria(),
        modelo.inscricoesPorMes(),
        modelo.aprovadosPorCategoria(),
        modelo.taxaAprovacaoPorClube()
    ])
    .then(function(resultados) {
        // Cada item de resultados corresponde à posição no Promise.all acima
        res.status(200).json({
            kpis: {
                totalAtletas:  resultados[0][0].total,
                totalPeneiras: resultados[1][0].total,
                totalAprovados: resultados[2][0].total,
                taxaAprovacao:  resultados[3][0].taxa || 0
            },
            atletasPorPosicao:    resultados[4],
            peneirasPorClube:     resultados[5],
            atletasPorCategoria:  resultados[6],
            inscricoesPorMes:     resultados[7],
            aprovadosPorCategoria: resultados[8],
            taxaAprovacaoPorClube: resultados[9]
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
                peneiraInscritas:  kpis.peneiras_inscritas || 0,
                aprovacoes:        kpis.aprovacoes         || 0
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
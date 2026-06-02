var modelo = require("../models/estatisticasModel");

function admin(req, res) {

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

function aluno(req, res) {
    var idAtleta = req.params.id;

    Promise.all([
        modelo.kpisAluno(idAtleta),
        modelo.presencaPorSemana(idAtleta)
    ])
.then(function(resultados) {
        var kpis = resultados[0][0];

        res.status(200).json({
            kpis: {
                treinosNoMes:      kpis.treinos_mes      || 0,
                taxaPresenca:      kpis.taxa_presenca     || 0,
                treinosConcluidos: kpis.treinos_concluidos || 0,
                desempenho:        kpis.desempenho         
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

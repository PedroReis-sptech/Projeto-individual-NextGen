var database = require("../database/config");

// Cria um novo treino vinculando professor e aluno
function criar(professorId, alunoId, descricao) {
    var instrucaoSql = `
        INSERT INTO treino (professor_id, aluno_id, descricao)
        VALUES (${professorId}, ${alunoId}, '${descricao}')
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Busca todos os treinos PENDENTES de um aluno específico
function buscarPendentesPorAluno(alunoId) {
    var instrucaoSql = `
        SELECT
            t.id,
            t.descricao,
            t.status_treino AS status, -- Mudou de t.status para t.status_treino (com apelido para o JS não quebrar)
            t.criado_em,
            u.nome AS professor_nome
        FROM treino t
        INNER JOIN usuario u ON t.professor_id = u.id
        WHERE t.aluno_id = ${alunoId}
          AND t.status_treino = 'pendente' -- Mudou de t.status para t.status_treino
        ORDER BY t.criado_em DESC
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Marca um treino como concluído e grava a data atual
function concluir(treinoId) {
    var instrucaoSql = `
        UPDATE treino
        SET status_treino = 'concluido', -- Mudou de status para status_treino
            data_conclusao = NOW()
        WHERE id = ${treinoId}
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { criar, buscarPendentesPorAluno, concluir };
var database = require("../database/config");

function criar(professorId, alunoId, descricao) {
    var instrucaoSql = `
        INSERT INTO treino (professor_id, aluno_id, descricao, status_treino, criado_em)
        VALUES (${professorId}, ${alunoId}, '${descricao}', 'pendente', NOW())
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTodosPorAluno(alunoId) {
    var instrucaoSql = `
        SELECT
            t.id,
            t.descricao,
            t.status_treino AS status,
            t.criado_em,
            t.data_conclusao,
            u.nome AS professor_nome
        FROM treino t
        INNER JOIN usuario u ON t.professor_id = u.id
        WHERE t.aluno_id = ${alunoId}
        ORDER BY t.criado_em DESC
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorProfessor(professorId) {
    var instrucaoSql = `
        SELECT
            t.id,
            t.descricao,
            t.status_treino AS status,
            t.criado_em,
            t.data_conclusao,
            u.nome AS aluno_nome,
            u.posicao AS aluno_posicao
        FROM treino t
        INNER JOIN usuario u ON t.aluno_id = u.id
        WHERE t.professor_id = ${professorId}
        ORDER BY t.criado_em DESC
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarPorId(treinoId) {
    var instrucaoSql = `
        SELECT id, aluno_id, status_treino
        FROM treino
        WHERE id = ${treinoId}
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function concluir(treinoId) {
    var instrucaoSql = `
        UPDATE treino
        SET status_treino = 'concluido',
            data_conclusao = NOW()
        WHERE id = ${treinoId}
          AND status_treino != 'concluido'
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function aumentarDesempenho(alunoId) {
    var instrucaoSql = `
        UPDATE usuario
        SET desempenho = desempenho + 1
        WHERE id = ${alunoId}
    `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { criar, buscarTodosPorAluno, buscarPorProfessor, buscarPorId, concluir, aumentarDesempenho };

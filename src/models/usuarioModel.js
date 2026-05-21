var database = require("../database/config");

/**
 * Autentica usuário e retorna tipo + dados completos
 */
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT 
            id, nome, email, tipo,
            foto_perfil, posicao, categoria, time_coracao,
            data_nascimento, cidade, altura_cm, peso_kg,
            fk_empresa
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

/**
 * Cadastra novo usuário — tipo sempre 'aluno' por padrão
 */
function cadastrar(nome, email, senha, posicao, categoria, timeCoracao, dataNascimento, cidade, alturaCm, pesoKg) {
    var instrucaoSql = `
        INSERT INTO usuario 
            (nome, email, senha, tipo, posicao, categoria, time_coracao, data_nascimento, cidade, altura_cm, peso_kg)
        VALUES 
            ('${nome}', '${email}', '${senha}', 'aluno',
             '${posicao || ''}', '${categoria || ''}', '${timeCoracao || ''}',
             ${dataNascimento ? `'${dataNascimento}'` : 'NULL'},
             '${cidade || ''}',
             ${alturaCm || 'NULL'},
             ${pesoKg   || 'NULL'});
    `;
    return database.executar(instrucaoSql);
}

/**
 * Atualiza dados do perfil
 */
function atualizarPerfil(id, dados) {
    const sets = Object.entries(dados)
        .filter(([_, v]) => v !== undefined && v !== '')
        .map(([k, v]) => `${k} = '${v}'`)
        .join(', ');

    if (!sets) return Promise.resolve({ affectedRows: 0 });

    var instrucaoSql = `UPDATE usuario SET ${sets} WHERE id = ${id};`;
    return database.executar(instrucaoSql);
}

/**
 * Listar todos os alunos (para admin)
 */
function listarAlunos() {
    var instrucaoSql = `
        SELECT id, nome, email, tipo, posicao, categoria, time_coracao, dt_cadastro
        FROM usuario
        WHERE tipo = 'aluno'
        ORDER BY dt_cadastro DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = { autenticar, cadastrar, atualizarPerfil, listarAlunos };
var database = require("../database/config");

/*
  Função: autenticar
  Recebe: email e senha do usuário
  Retorna: dados completos do usuário se encontrado
*/
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT 
            id, nome, email, tipo,
            foto_perfil, posicao, categoria, time_coracao,
            data_nascimento, cidade, altura_cm, peso_kg
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

/*
  Função: cadastrar
  Recebe: todos os campos do formulário de cadastro
  Insere um novo usuário do tipo 'aluno' no banco
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

/*
  Função: atualizarPerfil
  Recebe: id do usuário e um objeto com os campos a atualizar
  Atualiza somente os campos que foram enviados
*/
function atualizarPerfil(id, dados) {
    // Filtra os campos que não são vazios ou indefinidos
    var sets = Object.entries(dados)
        .filter(function(item) {
            return item[1] !== undefined && item[1] !== '';
        })
        .map(function(item) {
            return item[0] + " = '" + item[1] + "'";
        })
        .join(', ');

    // Se não há nada para atualizar, encerra sem fazer query
    if (!sets) {
        return Promise.resolve({ affectedRows: 0 });
    }

    var instrucaoSql = "UPDATE usuario SET " + sets + " WHERE id = " + id + ";";
    return database.executar(instrucaoSql);
}

/*
  Função: listarAlunos
  Retorna: todos os usuários do tipo 'aluno' ordenados pelo mais recente
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
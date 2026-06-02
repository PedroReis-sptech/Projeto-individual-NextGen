var database = require("../database/config");

function autenticar(email, senha) {
    return database.executar(`
        SELECT 
            id, nome, email, tipo,
            foto_perfil, posicao, categoria, time_coracao, desempenho,
            data_nascimento, cidade, altura_cm, peso_kg
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}'
    `);
}

function cadastrar(nome, email, senha, posicao, categoria, timeCoracao, dataNascimento, cidade, alturaCm, pesoKg) {
    return database.executar(`
        INSERT INTO usuario 
            (nome, email, senha, tipo, posicao, categoria, time_coracao, data_nascimento, cidade, altura_cm, peso_kg, desempenho)
        VALUES 
            ('${nome}', '${email}', '${senha}', 'aluno',
             '${posicao || ''}', '${categoria || ''}', '${timeCoracao || ''}',
             ${dataNascimento ? `'${dataNascimento}'` : 'NULL'},
             '${cidade || ''}',
             ${alturaCm || 'NULL'},
             ${pesoKg   || 'NULL'},
             50)
    `);
}

function atualizarPerfil(id, dados) {
    function escapeSql(value) {
        return String(value).replace(/'/g, "''");
    }

    var sets = Object.entries(dados)
        .filter(function(item) {
            return item[1] !== undefined && item[1] !== '';
        })
        .map(function(item) {
            var chave = item[0];
            var valor = item[1];
            return chave + " = '" + escapeSql(valor) + "'";
        })
        .join(', ');

    if (!sets) {
        return Promise.resolve({ affectedRows: 0 });
    }

    return database.executar("UPDATE usuario SET " + sets + " WHERE id = " + id);
}

function buscarPorId(id) {
    return database.executar(`
        SELECT id, nome, email, tipo, foto_perfil, posicao, categoria, time_coracao, desempenho,
               data_nascimento, cidade, altura_cm, peso_kg
        FROM usuario
        WHERE id = ${id}
    `);
}

function listarAlunos() {
    return database.executar(`
        SELECT id, nome, email, tipo, posicao, categoria, time_coracao, dt_cadastro
        FROM usuario
        WHERE tipo = 'aluno'
        ORDER BY dt_cadastro DESC
    `);
}

module.exports = { autenticar, cadastrar, atualizarPerfil, buscarPorId, listarAlunos };

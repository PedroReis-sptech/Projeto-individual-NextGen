var mysql = require("mysql2");

// ──────────────────────────────────────────────
// Pega as configurações do arquivo .env.dev
// ──────────────────────────────────────────────
var mySqlConfig = {
    host:     process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port:     process.env.DB_PORT
};

// ──────────────────────────────────────────────
// Função principal: executa uma instrução SQL
// Retorna uma Promise (resultado ou erro)
// ──────────────────────────────────────────────
function executar(instrucao) {

    // Verifica se o ambiente foi definido corretamente
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\n❌ AMBIENTE NÃO CONFIGURADO! Verifique o arquivo .env.dev\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {

        // Cria e abre a conexão
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();

        // Executa a instrução SQL
        conexao.query(instrucao, function (erro, resultados) {

            // Fecha a conexão depois de usar
            conexao.end();

            if (erro) {
                reject(erro);
                return;
            }

            resolve(resultados);
        });

        // Captura erros de conexão (ex: MySQL desligado)
        conexao.on('error', function (erro) {
            if (erro.code === 'ECONNREFUSED') {
                console.log("\n❌ ERRO DE CONEXÃO: MySQL não está rodando!");
                console.log("👉 Inicie o serviço MySQL no seu computador.");
                console.log("👉 Windows: rode 'net start mysql' como administrador.");
                console.log("👉 Verifique também as credenciais no arquivo .env.dev\n");
            }
            reject(erro);
        });
    });
}

module.exports = { executar };
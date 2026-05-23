// ─────────────────────────────────────────────
// Define o ambiente: 'producao' ou 'desenvolvimento'
// ─────────────────────────────────────────────
var ambiente_processo = 'desenvolvimento';
// var ambiente_processo = 'producao';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors    = require("cors");
var path    = require("path");

var PORTA_APP = process.env.APP_PORT || 3000;
var HOST_APP  = process.env.APP_HOST || 'localhost';

var app = express();

// ─────────────────────────────────────────────
// Importa todas as rotas
// ─────────────────────────────────────────────
var indexRouter        = require("./src/routes/index");
var usuarioRouter      = require("./src/routes/usuarios");
var avisosRouter       = require("./src/routes/avisos");
var medidasRouter      = require("./src/routes/medidas");
var aquariosRouter     = require("./src/routes/aquarios");
var empresasRouter     = require("./src/routes/empresas");
var peneirasRouter     = require("./src/routes/peneiras");
var estatisticasRouter = require("./src/routes/estatisticas");  // NOVO
var inscricoesRouter   = require("./src/routes/inscricoes");    // NOVO

// ─────────────────────────────────────────────
// Middlewares (configurações globais do Express)
// ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// ─────────────────────────────────────────────
// Registra as rotas com seus prefixos de URL
// ─────────────────────────────────────────────
app.use("/",             indexRouter);
app.use("/usuarios",     usuarioRouter);
app.use("/avisos",       avisosRouter);
app.use("/medidas",      medidasRouter);
app.use("/aquarios",     aquariosRouter);
app.use("/empresas",     empresasRouter);
app.use("/peneiras",     peneirasRouter);
app.use("/estatisticas", estatisticasRouter);  // NOVO
app.use("/inscricoes",   inscricoesRouter);    // NOVO

// ─────────────────────────────────────────────
// Inicia o servidor
// '0.0.0.0' permite acesso de outros computadores na mesma rede
// ─────────────────────────────────────────────
app.listen(PORTA_APP, '0.0.0.0', function () {
    console.log("\n✅ Servidor rodando!");
    console.log("   Acesse no seu PC:        http://localhost:" + PORTA_APP);
    console.log("   Acesse de outro PC:      http://<seu-ip-local>:" + PORTA_APP);
    console.log("   Ambiente: " + process.env.AMBIENTE_PROCESSO + "\n");
});
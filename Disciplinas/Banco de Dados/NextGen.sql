-- ============================================================
-- NextGen · Script completo do banco de dados
-- ============================================================

CREATE DATABASE IF NOT EXISTS nextgen;
USE nextgen;

-- ------------------------------------------------------------
-- CLUBE
-- ------------------------------------------------------------
CREATE TABLE clube (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    nome          VARCHAR(100) NOT NULL,
    escudo_url    VARCHAR(300),
    cidade        VARCHAR(100),
    estado        CHAR(2) DEFAULT 'SP'
);

-- ------------------------------------------------------------
-- USUARIO
-- Tipo: 'aluno' (padrão) | 'time' | 'professor'
-- ------------------------------------------------------------
CREATE TABLE usuario (
    id               INT PRIMARY KEY AUTO_INCREMENT,
    nome             VARCHAR(100) NOT NULL,
    email            VARCHAR(100) NOT NULL UNIQUE,
    senha            VARCHAR(100) NOT NULL,
    tipo             ENUM('aluno','time','professor') DEFAULT 'aluno',
    foto_perfil      VARCHAR(300) DEFAULT NULL,
    data_nascimento  DATE,
    cidade           VARCHAR(100),
    posicao          VARCHAR(50),
    categoria        VARCHAR(20),   -- Sub-11, Sub-13, Sub-15 …
    time_coracao     VARCHAR(100),
    altura_cm        DECIMAL(5,2),
    peso_kg          DECIMAL(5,2),
    dt_cadastro      DATETIME DEFAULT NOW()
);

-- ------------------------------------------------------------
-- PENEIRA
-- ------------------------------------------------------------
CREATE TABLE peneira (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(100) NOT NULL,
    descricao       VARCHAR(500),
    data_realizacao DATE NOT NULL,
    horario         TIME,
    local_endereco  VARCHAR(200),
    cidade          VARCHAR(100),
    categoria       VARCHAR(20),
    vagas           INT,
    fk_clube        INT,
    fk_criador      INT NOT NULL,   -- usuário tipo 'time' ou 'professor'
    ativa           TINYINT DEFAULT 1,
    FOREIGN KEY (fk_clube)    REFERENCES clube(id),
    FOREIGN KEY (fk_criador)  REFERENCES usuario(id)
);

-- ------------------------------------------------------------
-- INSCRICAO
-- ------------------------------------------------------------
CREATE TABLE inscricao (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    fk_atleta    INT NOT NULL,
    fk_peneira   INT NOT NULL,
    dt_inscricao DATETIME DEFAULT NOW(),
    status       VARCHAR(30) DEFAULT 'pendente',
    FOREIGN KEY (fk_atleta)  REFERENCES usuario(id),
    FOREIGN KEY (fk_peneira) REFERENCES peneira(id)
);

-- ------------------------------------------------------------
-- TREINO  (para estatísticas do aluno)
-- ------------------------------------------------------------
CREATE TABLE treino (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    fk_atleta   INT NOT NULL,
    data_treino DATE NOT NULL,
    presente    TINYINT DEFAULT 1,
    FOREIGN KEY (fk_atleta) REFERENCES usuario(id)
);

-- ============================================================
-- DADOS DE EXEMPLO
-- ============================================================

INSERT INTO clube (nome, cidade) VALUES
    ('Corinthians',       'São Paulo'),
    ('Palmeiras',         'São Paulo'),
    ('São Paulo FC',      'São Paulo'),
    ('Santos',            'Santos'),
    ('Portuguesa',        'São Paulo'),
    ('São Caetano',       'São Caetano do Sul'),
    ('Red Bull Bragantino','Bragança Paulista');

-- Admin (tipo time)
INSERT INTO usuario (nome, email, senha, tipo)
    VALUES ('Admin NextGen', 'admin@nextgen.com', '123', 'time');

-- Aluno de exemplo
INSERT INTO usuario (nome, email, senha, tipo, posicao, categoria, time_coracao, data_nascimento)
    VALUES ('Pedro Reis', 'pedro.dreis@sptech.school', '123', 'aluno', 'atacante', 'Sub-17', 'Corinthians', '2007-03-15');

INSERT INTO peneira (nome, descricao, data_realizacao, horario, local_endereco, cidade, categoria, vagas, fk_clube, fk_criador)
VALUES
    ('Peneira Sub-17 Corinthians','Seletiva para categoria Sub-17','2026-05-10','09:00','CT Joaquim Grava','São Paulo','Sub-17',30,1,1),
    ('Peneira Sub-15 Palmeiras',  'Avaliação técnica Sub-15',      '2026-05-17','10:00','Academia de Futebol','São Paulo','Sub-15',25,2,1);

INSERT INTO treino (fk_atleta, data_treino, presente) VALUES
    (2,'2026-04-01',1),(2,'2026-04-03',1),(2,'2026-04-05',0),
    (2,'2026-04-08',1),(2,'2026-04-10',1),(2,'2026-04-12',1),
    (2,'2026-04-15',0),(2,'2026-04-17',1),(2,'2026-04-19',1),
    (2,'2026-04-22',1),(2,'2026-04-24',1),(2,'2026-04-26',1);

INSERT INTO inscricao (fk_atleta, fk_peneira, status) VALUES (2,1,'aprovado'),(2,2,'pendente');
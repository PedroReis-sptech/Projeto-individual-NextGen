CREATE DATABASE nextgen;
USE nextgen;

CREATE TABLE clube (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    escudo_url VARCHAR(300),
    cidade VARCHAR(100),
    estado CHAR(2) DEFAULT 'SP'
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    cidade VARCHAR(100),
    posicao VARCHAR(50),
    dt_cadastro DATETIME DEFAULT NOW()
);

CREATE TABLE peneira (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    data_realizacao DATE NOT NULL,
    horario TIME,
    local_endereco VARCHAR(200),
    cidade VARCHAR(100),
    categoria VARCHAR(20),
    vagas INT,
    fk_clube INT NOT NULL,
    ativa TINYINT DEFAULT 1,
    FOREIGN KEY (fk_clube) REFERENCES clube(id)
);

CREATE TABLE inscricao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_atleta INT NOT NULL,
    fk_peneira INT NOT NULL,
    dt_inscricao DATETIME DEFAULT NOW(),
    status VARCHAR(30) DEFAULT 'pendente',
    FOREIGN KEY (fk_atleta) REFERENCES usuario(id),
    FOREIGN KEY (fk_peneira) REFERENCES peneira(id)
);

INSERT INTO clube (nome, cidade) VALUES ('Corinthians', 'São Paulo');
INSERT INTO clube (nome, cidade) VALUES ('Palmeiras', 'São Paulo');
INSERT INTO clube (nome, cidade) VALUES ('São Paulo FC', 'São Paulo');
INSERT INTO clube (nome, cidade) VALUES ('Santos', 'Santos');
INSERT INTO clube (nome, cidade) VALUES ('Portuguesa', 'São Paulo');
INSERT INTO clube (nome, cidade) VALUES ('São Caetano', 'São Caetano do Sul');
INSERT INTO clube (nome, cidade) VALUES ('Red Bull Bragantino', 'Bragança Paulista');

INSERT INTO peneira (titulo, descricao, data_realizacao, horario, local_endereco, cidade, categoria, vagas, fk_clube)
VALUES ('Peneira Sub-17 Corinthians', 'Seletiva para categoria Sub-17', '2026-05-10', '09:00', 'CT Joaquim Grava', 'São Paulo', 'Sub-17', 30, 1);

INSERT INTO peneira (titulo, descricao, data_realizacao, horario, local_endereco, cidade, categoria, vagas, fk_clube)
VALUES ('Peneira Sub-15 Palmeiras', 'Avaliação técnica para Sub-15', '2026-05-17', '10:00', 'Academia de Futebol', 'São Paulo', 'Sub-15', 25, 2);

select * from usuario;
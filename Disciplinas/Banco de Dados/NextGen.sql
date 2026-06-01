CREATE DATABASE IF NOT EXISTS nextgen;
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
    tipo VARCHAR(30) DEFAULT 'aluno',
    foto_perfil VARCHAR(300) DEFAULT NULL,
    data_nascimento DATE,
    cidade VARCHAR(100),
    posicao VARCHAR(50),
    categoria VARCHAR(20),
    time_coracao VARCHAR(100),
    altura_cm DECIMAL(5, 2),
    peso_kg DECIMAL(5, 2),
    dt_cadastro DATETIME DEFAULT NOW(),
    CONSTRAINT chk_tipo CHECK (tipo IN ('aluno','time','professor'))
);

CREATE TABLE peneira (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    data_realizacao DATE NOT NULL,
    horario TIME,
    local_endereco VARCHAR(200),
    cidade VARCHAR(100),
    categoria VARCHAR(20),
    vagas INT,
    fk_clube INT,
    fk_criador INT NOT NULL,
    ativa TINYINT DEFAULT 1,
    FOREIGN KEY (fk_clube) REFERENCES clube(id),
    FOREIGN KEY (fk_criador) REFERENCES usuario(id)
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

CREATE TABLE treino (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    professor_id  INT NOT NULL,
    aluno_id      INT NOT NULL,
    descricao     VARCHAR(500) NOT NULL,
    status_treino VARCHAR(15) DEFAULT 'pendente',
    data_conclusao DATETIME DEFAULT NULL,
    criado_em     DATETIME DEFAULT NOW(),
    FOREIGN KEY (professor_id) REFERENCES usuario(id),
    FOREIGN KEY (aluno_id)     REFERENCES usuario(id),
	CONSTRAINT status_treino CHECK (status_treino IN ('pendente', 'concluido'))
);

INSERT INTO clube (nome, escudo_url, cidade, estado) VALUES
  ('Corinthians', 'https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png', 'São Paulo', 'SP'),
  ('Palmeiras', 'https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg', 'São Paulo', 'SP'),
  ('São Paulo FC', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/3840px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png', 'São Paulo', 'SP'),
  ('Santos', 'https://upload.wikimedia.org/wikipedia/commons/3/35/Santos_logo.svg', 'Santos', 'SP'),
  ('Portuguesa', 'https://upload.wikimedia.org/wikipedia/pt/b/bb/Portuguesa_symbol.png', 'São Paulo', 'SP'),
  ('São Caetano', 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Associacao_Desportiva_Sao_Caetano.png', 'São Caetano do Sul', 'SP'),
  ('Red Bull Bragantino', 'https://upload.wikimedia.org/wikipedia/pt/9/9e/RedBullBragantino.png', 'Bragança Paulista', 'SP');

INSERT INTO usuario (nome, email, senha, tipo) VALUES
  ('Admin NextGen', 'admin@nextgen.com', '123', 'time');

INSERT INTO usuario (nome, email, senha, tipo) VALUES
  ('Prof. Carlos Costa', 'carlos.costa@nextgen.com', '123', 'professor'),
  ('Prof. Marcos Almeida', 'marcos.almeida@nextgen.com', '123', 'professor');

INSERT INTO usuario (nome, email, senha, tipo, posicao, categoria, time_coracao, data_nascimento, cidade, altura_cm, peso_kg) VALUES
  ('Pedro Reis', 'pedro@email.com', '123', 'aluno', 'Atacante', 'Sub-17', 'Corinthians', '2007-03-15', 'São Paulo', 178.00, 72.00),
  ('Lucas Oliveira', 'lucas@email.com', '123', 'aluno', 'Goleiro', 'Sub-15', 'Palmeiras', '2009-07-22', 'São Paulo', 182.00, 78.00),
  ('Rafael Souza', 'rafael@email.com', '123', 'aluno', 'Zagueiro', 'Sub-13', 'São Paulo FC', '2011-01-10', 'Guarulhos', 170.00, 65.00),
  ('Gabriel Silva', 'gabriel@email.com', '123', 'aluno', 'Meia', 'Sub-17', 'Corinthians', '2007-11-05', 'Osasco', 173.00, 68.00),
  ('Matheus Costa', 'matheus@email.com', '123', 'aluno', 'Lateral', 'Sub-20', 'Santos', '2005-09-18', 'Santos', 175.00, 70.00),
  ('João Ferreira', 'joao@email.com', '123', 'aluno', 'Volante', 'Sub-15', 'Palmeiras', '2009-04-30', 'São Bernardo', 169.00, 63.00),
  ('Bruno Martins', 'bruno@email.com', '123', 'aluno', 'Atacante', 'Sub-17', 'Santos', '2007-06-14', 'Santo André', 176.00, 71.00),
  ('Diego Rocha', 'diego@email.com', '123', 'aluno', 'Meia', 'Sub-13', 'Corinthians', '2011-08-20', 'Mauá', 165.00, 58.00),
  ('Felipe Nunes', 'felipe@email.com', '123', 'aluno', 'Zagueiro', 'Sub-20', 'São Paulo FC', '2004-12-03', 'Diadema', 181.00, 80.00),
  ('Gustavo Lima', 'gustavo@email.com', '123', 'aluno', 'Goleiro', 'Sub-17', 'Red Bull', '2007-02-28', 'Campinas', 184.00, 82.00),
  ('Henrique Alves', 'henrique@email.com', '123', 'aluno', 'Lateral', 'Sub-15', 'Santos', '2009-10-15', 'São Paulo', 168.00, 62.00),
  ('Igor Santos', 'igor@email.com', '123', 'aluno', 'Volante', 'Sub-13', 'Palmeiras', '2011-03-07', 'São Paulo', 163.00, 55.00),
  ('Jorge Pereira', 'jorge@email.com', '123', 'aluno', 'Atacante', 'Sub-20', 'Corinthians', '2005-05-25', 'São Paulo', 177.00, 74.00),
  ('Kaique Barros', 'kaique@email.com', '123', 'aluno', 'Meia', 'Sub-17', 'Palmeiras', '2007-07-19', 'Barueri', 172.00, 67.00),
  ('Leonardo Cruz', 'leonardo@email.com', '123', 'aluno', 'Zagueiro', 'Sub-15', 'São Paulo FC', '2009-09-09', 'São Paulo', 174.00, 69.00),
  ('Murilo Dias', 'murilo@email.com', '123', 'aluno', 'Atacante', 'Sub-13', 'Santos', '2011-11-11', 'São Paulo', 161.00, 54.00),
  ('Natan Pires', 'natan@email.com', '123', 'aluno', 'Goleiro', 'Sub-20', 'Portuguesa', '2004-04-04', 'São Paulo', 186.00, 85.00),
  ('Otávio Ramos', 'otavio@email.com', '123', 'aluno', 'Lateral', 'Sub-17', 'São Caetano', '2007-01-23', 'São Caetano do Sul', 171.00, 66.00),
  ('Paulo Teixeira', 'paulo@email.com', '123', 'aluno', 'Volante', 'Sub-15', 'Corinthians', '2009-06-16', 'São Paulo', 167.00, 60.00),
  ('Rafael Mendes', 'rafaelm@email.com', '123', 'aluno', 'Meia', 'Sub-17', 'Palmeiras', '2006-08-08', 'São Paulo', 175.00, 70.00);

INSERT INTO peneira (nome, descricao, data_realizacao, horario, local_endereco, cidade, categoria, vagas, fk_clube, fk_criador) VALUES
  ('Peneira Sub-17 Corinthians', 'Seletiva para categoria Sub-17. Levar atestado médico e RG.', '2026-05-10', '09:00', 'CT Joaquim Grava, Av. Miguel Inácio Cury, 1 - Parque São Jorge', 'São Paulo', 'Sub-17', 30, 1, 1),
  ('Peneira Sub-15 Palmeiras', 'Avaliação técnica Sub-15. Chuteiras e meias obrigatórias.', '2026-05-17', '10:00', 'Academia de Futebol, Av. Turiassú, 871 - Perdizes', 'São Paulo', 'Sub-15', 25, 2, 1),
  ('Seletiva Sub-20 São Paulo FC', 'Seletiva para o plantel Sub-20. Apresentar certidão de nascimento.', '2026-05-24', '08:30', 'CT de Cotia, Estrada Sítio do Morro, km 10', 'Cotia', 'Sub-20', 20, 3, 1),
  ('Meninos da Vila - Sub-15', 'Peneira Santos FC para categoria Sub-15. Vagas limitadas.', '2026-06-01', '09:00', 'CT Rei Pelé, Via Mário Covas, 510 - Zona Noroeste', 'Santos', 'Sub-15', 20, 4, 1),
  ('Avaliação Sub-13 Corinthians', 'Peneira para garotos do Sub-13. Pais ou responsáveis devem estar presentes.', '2026-06-07', '09:00', 'CT Joaquim Grava, Av. Miguel Inácio Cury, 1', 'São Paulo', 'Sub-13', 35, 1, 1),
  ('Peneira Sub-17 Palmeiras', 'Seletiva Palmeiras Sub-17. Trazer uniforme esportivo.', '2026-06-14', '10:00', 'Academia de Futebol, Av. Turiassú, 871 - Perdizes', 'São Paulo', 'Sub-17', 28, 2, 1),
  ('Seletiva Sub-11 Santos', 'Peneira Santos para categoria Sub-11. Foco no desenvolvimento técnico.', '2026-06-21', '09:00', 'CT Rei Pelé, Via Mário Covas, 510', 'Santos', 'Sub-11', 40, 4, 1),
  ('Peneira Sub-20 Corinthians', 'Peneira para atletas Sub-20 com foco em posição de Goleiro e Meia.', '2026-07-05', '08:00', 'CT Joaquim Grava, Av. Miguel Inácio Cury, 1', 'São Paulo', 'Sub-20', 15, 1, 1),
  ('Bragantino Sub-13', 'Red Bull Bragantino Sub-13. Centro de formação do interior paulista.', '2026-07-12', '10:00', 'CT Red Bull, Rod. Bragança Paulista-Atibaia, km 2', 'Bragança Paulista', 'Sub-13', 30, 7, 1),
  ('Peneira Sub-15 São Paulo FC', 'São Paulo FC busca talentos Sub-15 para a base.', '2026-07-19', '09:00', 'CT de Cotia, Estrada Sítio do Morro, km 10', 'Cotia', 'Sub-15', 25, 3, 1),
  ('Portuguesa Sub-17', 'Portuguesa SP busca atacantes e meias Sub-17.', '2026-07-26', '09:30', 'Estádio do Canindé, R. Comendador Nestor Pereira, 85', 'São Paulo', 'Sub-17', 20, 5, 1),
  ('São Caetano Sub-20', 'Azulão busca reforços para o Sub-20. Apresentar documentos.', '2026-08-02', '08:30', 'Est. Anacleto Campanella, Av. Presidente Juscelino K., 1700', 'São Caetano do Sul', 'Sub-20', 18, 6, 1);

INSERT INTO inscricao (fk_atleta, fk_peneira, status, dt_inscricao) VALUES
-- Inscrições de JANEIRO 2026 (Começo do ano, ritmo mais lento)
(1, 1, 'aprovado',  '2026-01-10 10:15:00'),
(2, 1, 'reprovado', '2026-01-15 14:30:00'),
(3, 2, 'pendente',  '2026-01-22 09:00:00'),

-- Inscrições de FEVEREIRO 2026 (Aumento de procura)
(1, 2, 'pendente',  '2026-02-05 11:20:00'),
(4, 1, 'aprovado',  '2026-02-12 16:45:00'),
(2, 3, 'pendente',  '2026-02-18 10:00:00'),
(3, 3, 'reprovado', '2026-02-26 15:10:00'),

-- Inscrições de MARÇO 2026 (Pico de inscrições antes dos campeonatos)
(1, 3, 'aprovado',  '2026-03-02 08:30:00'),
(4, 2, 'pendente',  '2026-03-11 13:25:00'),
(2, 4, 'aprovado',  '2026-03-14 09:40:00'),
(3, 4, 'pendente',  '2026-03-19 17:05:00'),
(1, 4, 'reprovado', '2026-03-25 11:15:00'),
(4, 3, 'pendente',  '2026-03-29 14:20:00'),

-- Inscrições de ABRIL 2026 (Estabilização com novos testes)
(2, 2, 'pendente',  '2026-04-04 10:50:00'),
(3, 1, 'aprovado',  '2026-04-12 15:30:00'),
(4, 4, 'reprovado', '2026-04-18 16:00:00'),
(1, 5, 'pendente',  '2026-04-26 09:10:00'),

-- Inscrições de MAIO 2026 (Dados mais recentes do mês atual)
(2, 5, 'aprovado',  '2026-05-02 14:00:00'),
(3, 5, 'pendente',  '2026-05-10 11:35:00'),
(4, 5, 'pendente',  '2026-05-15 13:15:00'),
(1, 6, 'pendente',  '2026-05-22 16:40:00'),
(2, 6, 'pendente',  '2026-05-25 10:20:00');

INSERT INTO treino (professor_id, aluno_id, descricao, status_treino, data_conclusao, criado_em) VALUES
-- ID 4: Pedro Reis (Atacante)
(2, 4, 'Treino de finalização e posicionamento dentro da área simulando pivô.', 'concluido', '2026-05-25 11:00:00', '2026-05-25 09:00:00'),

-- ID 5: Lucas Oliveira (Goleiro)
(3, 5, 'Treino específico de fundamentos: pegada firme e saída de bola rasteira.', 'concluido', '2026-05-25 16:30:00', '2026-05-25 15:00:00'),

-- ID 6: Rafael Souza (Zagueiro)
(2, 6, 'Exercício de tempo de bola aérea e posicionamento de linha defensiva.', 'concluido', '2026-05-26 10:00:00', '2026-05-26 08:30:00'),

-- ID 7: Gabriel Silva (Meia)
(3, 7, 'Trabalho de transição ofensiva rápida e passes em profundidade quebrando linhas.', 'concluido', '2026-05-26 15:30:00', '2026-05-26 14:00:00'),

-- ID 8: Matheus Costa (Lateral)
(2, 8, 'Treino de cruzamento após ultrapassagem em velocidade e recomposição.', 'pendente', NULL, '2026-05-27 09:00:00'),

-- ID 9: João Ferreira (Volante)
(3, 9, 'Combate no meio-campo, técnicas de desarme limpo e distribuição de primeira.', 'pendente', NULL, '2026-05-27 10:00:00'),

-- ID 10: Bruno Martins (Atacante)
(2, 10, 'Treino focado em drible curto para infiltração lateral e finalização rápida.', 'pendente', NULL, '2026-05-27 14:00:00'),

-- ID 11: Diego Rocha (Meia)
(3, 11, 'Controle de bola sob pressão e visão de jogo para inversão de jogadas.', 'concluido', '2026-05-27 17:30:00', '2026-05-27 16:00:00'),

-- ID 12: Felipe Nunes (Zagueiro)
(2, 12, 'Simulação de situações de 1x1 defensivo e cobertura das costas dos laterais.', 'concluido', '2026-05-28 09:30:00', '2026-05-28 08:00:00'),

-- ID 13: Gustavo Lima (Goleiro)
(3, 13, 'Treino de reações rápidas em chutes à queima-roupa e espalmar direcionado.', 'pendente', NULL, '2026-05-28 10:30:00'),

-- ID 14: Henrique Alves (Lateral)
(2, 14, 'Aprimoramento de corrida de fundo e passes precisos em direção à linha de fundo.', 'pendente', NULL, '2026-05-28 14:30:00'),

-- ID 15: Igor Santos (Volante)
(3, 15, 'Posicionamento tático para interceptação de passes e proteção da zaga central.', 'concluido', '2026-05-28 17:00:00', '2026-05-28 15:30:00'),

-- ID 16: Jorge Pereira (Atacante)
(2, 16, 'Movimentação sem bola no último terço do campo e quebra de linha de impedimento.', 'pendente', NULL, '2026-05-29 08:00:00'),

-- ID 17: Kaique Barros (Meia)
(3, 17, 'Treino de bola parada: cobrança de faltas frontais e escanteios fechados.', 'pendente', NULL, '2026-05-29 08:30:00'),

-- ID 18: Leonardo Cruz (Zagueiro)
(2, 18, 'Trabalho de impulsão, força muscular e cabeceio defensivo em escanteios.', 'pendente', NULL, '2026-05-29 09:00:00'),

-- ID 19: Murilo Dias (Atacante)
(3, 19, 'Fundamento de finalização com a perna não dominante (trabalho de perna esquerda).', 'pendente', NULL, '2026-05-29 09:30:00'),

-- ID 20: Natan Pires (Goleiro)
(2, 20, 'Treino de posicionamento geométrico da barreira e leitura de batedores.', 'pendente', NULL, '2026-05-29 10:00:00'),

-- ID 21: Otávio Ramos (Lateral)
(3, 21, 'Simulação de jogo de apoio associado com o meio-campo e ultrapassagem dinâmica.', 'pendente', NULL, '2026-05-29 10:30:00'),

-- ID 22: Paulo Teixeira (Volante)
(2, 22, 'Trabalho de saída de três (volante recuando entre os zagueiros para iniciar o jogo).', 'pendente', NULL, '2026-05-29 11:00:00'),

-- ID 23: Rafael Mendes (Meia)
(3, 23, 'Treino de posse de bola em espaço reduzido e drible voltado para progressão.', 'pendente', NULL, '2026-05-29 11:30:00');

SELECT * FROM usuario;


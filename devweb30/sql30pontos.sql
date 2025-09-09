CREATE DATABASE IF NOT EXISTS sistema_escolar;

USE sistema_escolar;

-- Tabela de alunos (já utilizada pelo sistema)

DROP TABLE IF EXISTS alunos;

CREATE TABLE alunos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

DROP TABLE IF EXISTS professores;

CREATE TABLE professores (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    disciplina VARCHAR(100) NOT NULL,
    titulacao VARCHAR(80) DEFAULT 'Graduado',
    telefone VARCHAR(20),
    carga_horaria_semanal TINYINT DEFAULT 20,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM alunos;

SELECT * FROM professores;
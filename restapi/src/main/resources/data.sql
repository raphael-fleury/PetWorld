-- 1
INSERT INTO CLINICA(nome, codigo, email, senha) VALUES('Petz', 'B3C0L0', 'admin@petz.com.br', '123456');

INSERT INTO CLIENTE(nome, email, endereco, telefone, clinica_id) VALUES
('Manoel Siqueira', 'manoelsiqueira@example.com', 'Rua Rubens Lara, 32 - Santos/SP', '139XXXX6177', 1),
('Laura Alves', 'lalves@example.com', 'Rua Aristóteles Ferreira, 64 - Santos/SP', '139XXXX4787', 1),
('José Damasceno', 'jdamasceno3@example.com', 'Rua Escolástica Rosa, 4 - São Vicente/SP', '139XXXX4617', 1),
('Mariella Campos', 'maricampos@example.com', 'Rua Branco Fatec da Silva, 50 - Santos/SP', '139XXXX6194', 1),
('João Mendes', 'joaomendes10@example.com', 'Rua A, 52 - Santos/SP', '139XXXX4164', 1),
('Maria dos Anjos', 'mdosanjos@example.com', 'Rua B, 17 - Santos/SP', '139XXXX5286', 1),
('Thiago Magalhães', 'thimagalhaes@example.com', 'Rua C, 41 - Santos/SP', '139XXXX6166', 1),
('Elisa José Isidorio', 'elisidorio@example.com', 'Rua D, 27 - Santos/SP', '139XXXX3433', 1),
('Sarah Andrade', 'sarahandrade@example.com', 'Rua Ceilândia, 26 - Santos/SP', '139XXXX2422', 1),
('Arthur Schneider', 'arthurschneider@example.com', 'Rua Alemanha, 26 - Santos/SP', '139XXXX3636', 1),
('Kléber di Cesar', 'dicesar@example.com', 'Rua Itália, 131 - Santos/SP', '139XXXX2222', 1),
('Natália de Oliveira', 'olinatalia@example.com', 'Rua Ucrânia, 131 - Santos/SP', '139XXXX2222', 1);

INSERT INTO PET(nome, especie, raca, sexo, castrado, clinica_id, dono_id) VALUES
('Rex', 'Cachorro', 'Labrador', 'MASCULINO', true, 1, 1),
('Mel', 'Gato', '', 'FEMININO', true, 1, 2),
('Tonkay', 'Gato', '', 'MASCULINO', false, 1, 3),
('José', 'Papagaio', '', 'MASCULINO', false, 1, 4),
('Branco', 'Gato', 'Munchkin', 'MASCULINO', true, 1, 5),
('Adolfo', 'Cachorro', 'Pastor Alemão', 'MASCULINO', true, 1, 6),
('Jake', 'Cachorro', 'Vira-lata', 'MASCULINO', true, 1, 7),
('Agata', 'Gato', 'Persa', 'FEMININO', true, 1, 8),
('Gabiru', 'Hamster', '', 'MASCULINO', false, 1, 9),
('Pikachu', 'Hamster', '', 'MASCULINO', false, 1, 10),
('Alpha', 'Cachorro', 'Pastor Alemão', 'MASCULINO', false, 1, 11),
('Eminem', 'Cachorro', 'Pitbull', 'MASCULINO', true, 1, 12);

INSERT INTO VETERINARIO(nome, email, endereco, telefone, clinica_id) VALUES
('Doctor Rey', 'drrey@petz.com.br', 'Rua João Caetano, 112 - Santos/SP', '139XXXX6868', 1),
('Marco dos Anjos', 'mdosanjos@petz.com.br', 'Rua Teixeira de Freitas, 215 - Santos/SP', '139XXXX7776', 1);

insert into ATENDIMENTO(data, clinica_id, pet_id, veterinario_id) VALUES
('2022-05-21 16:30:00', 1, 1, 1),
('2021-06-15 15:00:00', 1, 2, 1);

INSERT INTO CONSULTA(atendimento_id, prescricao, sintomas) VALUES
(1, 'Dipirona kkkkk', 'Espirro'),
(2, 'Antibiotico', 'Coceira');

INSERT INTO EXAME(data_resultado, nome, descricao, atendimento_id) VALUES
('2022-06-01', 'Exame de sangue', 'Para detectar possíveis vermes', 2);

INSERT INTO VACINACAO(vacina, detalhes, atendimento_id) VALUES
('Vacina antirrábica', '', 1);

-- 2
INSERT INTO CLINICA(nome, codigo, email, senha) VALUES('Castro Alves', 'R3D4L8', 'castroalves@exemplo.com', '123456');

INSERT INTO CLIENTE(nome, email, endereco, telefone, clinica_id) VALUES
('João Luiz', 'joaoluiz@example.com', 'Rua Santos Dumont, 114 - Santos/SP', '139XXXX8178', 2);

INSERT INTO PET(nome, especie, raca, sexo, castrado, clinica_id, dono_id) VALUES
('Thor', 'Cachorro', 'Vira lata', 'MASCULINO', true, 2, 5),
('Mia', 'Gato', '', 'FEMININO', true, 2, 5);
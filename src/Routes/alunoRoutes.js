const express = require("express");

const router = express.Router() //instancia o router como objeto do express usado para definir rotas de forma modular e organizada.

const {alunoController} = require('../controllers/alunoController');

// Rotas de alunos

router.get("/", alunoController.listarAlunos)

router.post("/", alunoController.cadastrarAluno); // Rota responsável por cadastrar um novo aluno.

router.put("/:ID_Aluno", alunoController.atualizarAluno); // Rota responsável por atualizar os dados de um aluno

router.delete("/:ID_Aluno", alunoController.deletarAluno); // Rota responsável por deletar os dados de um aluno

module.exports  = { rotasAlunos: router };

 
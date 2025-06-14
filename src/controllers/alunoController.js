const { alunoModel } = require('../models/alunoModels');
const { Op } = require('sequelize');
const { parseDateBd } = require('../Utils/dateUtils');

const alunoController = {
    listarAlunos: async (req, res) => {
        try {
            let alunos = await alunoModel.findAll();


            // Mapeia o array de alunos para ajustar a data ede nascimento de cada aluno
            //Utiliza a função  parseDateBd para corrigir possiveis problemas de fuso horario
            //Retorna um novo array com as datas corrigidas

            alunos = alunos.map(aluno => {
                aluno.dataNascimentoAluno = parseDateBd(aluno.dataNascimentoAluno);
                return aluno;
            });

            return res.status(200).json(alunos);


        } catch (error) {
            console.error("Erro ao listar alunos:", error);
            return res.status(500).json({ message: "Erro ao listar alunos" });
        }

    },
    cadastrarAluno: async (req, res) => {
        try {

            const { nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno } = req.body;

            //validação para garantir que todos os campos obrigatorios sejam preenchidos
            if (!nomeAluno || !cpfAluno || !dataNascimentoAluno || !emailAluno) {
                return res.status(400).json({ message: "campos obrigatorios não preenchidos" })
            };

            let aluno = await alunoModel.findOne({
                where: {
                    [Op.or]: [
                        { cpfAluno },
                        { emailAluno }
                    ]
                }
            });

            if (aluno) {
                return res.status(409).json({ message: "Aluno ja cadastrado" })
            }

            await alunoModel.create({ nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno });

            return res.status(201).json({ message: "Aluno cadastrado com Sucesso" });

        } catch (error) {
            console.error("Erro ao cadastrar o Aluno!", error);

            return res.status(500).json({ message: "Erro ao cadastrar Aluno!" })
        }

    },
    atualizarAluno: async (req, res) => {

        try {

            const { ID_Aluno } = req.params;
            const { nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno } = req.body;

            let aluno = await alunoModel.findByPk(ID_Aluno);

            if (!aluno) {
                return res.status(404).json({ message: "Aluno não existe!" })
            }

            if (cpfAluno || emailAluno) {
                aluno = await alunoModel.findOne({
                    where: {
                        [Op.or]: [
                            { cpfAluno },
                            { emailAluno }
                        ]
                    }
                });

                if (aluno) {
                    return res.status(409).json({ message: "CPF ou E-mail em duplicidade" });
                }
            };


            let dadosAtualizados = { nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno };

            await alunoModel.update(dadosAtualizados, { where: { ID_Aluno } });

            aluno = await alunoModel.findByPk(ID_Aluno)
            aluno.dataNascimentoAluno = parseDateBd(aluno.dataNascimentoAluno);

            return res.status(200).json({ message: "Aluno atualizado com sucesso: ", Aluno: aluno });

        } catch (error) {
            console.error("erro ao atualizar o aluno!", error);

            res.status(500).json({ message: "erro ao atualizar o aluno" })
        }
    },

    deletarAluno: async (req, res) => {

        try {
            const { ID_Aluno } = req.params;

            let aluno = await alunoModel.findByPk(ID_Aluno);

            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado!" })
            }

            let nomeAluno = aluno.nomeAluno;

            let result = await alunoModel.destroy({ where: { ID_Aluno } });

            if (result > 0) {
                return res.status(200).json({ message: `o(a) aluno(a) ${nomeAluno} foi excluído com sucesso!` })
            } else {
                return res.status(404).json({ message: "Erro ao excluir o aluno!" });
            }

        } catch (error) {
            console.error("Erro ao excluir o erro", error);
            return res.status(500).json({ message: "erro ao excluir o aluno!" })
        }

    }

};

module.exports = { alunoController };


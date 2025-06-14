const { alunoModel } = require('../models/alunoModels');
const { Op } = require('sequelize')

const alunoController = {
    listarAlunos: async (req, res) => {
        try {
            let alunos = await alunoModel.findAll();
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

            let dadosAtualizados = {nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno};

            await alunoModel.update(dadosAtualizados, { where: { ID_Aluno } });

            aluno = await alunoModel.findByPk(ID_Aluno)

            return res.status(200).json({ message: "Aluno atualizado com sucesso: ", Aluno: aluno });

        } catch (error) {
            console.error("erro ao atualizar o aluno!", error);

            res.status(500).json({message: "erro ao atualizar o aluno"})
        }
    },

    deletarAluno: (req, res) => {
        const { ID_Aluno } = req.params;

        res.send(`Usuario ${ID_Aluno} foi deletado com sucesso!`);
    }

};

module.exports = { alunoController };
const { sequelize } = require('../Config/db');
const { DataTypes } = require('sequelize');

const alunoModel = sequelize.define('Alunos', {
    ID_Aluno:{
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    },
    nomeAluno:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpfAluno:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    dataNascimentoAluno:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    emailAluno:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefoneAluno:{
        type: DataTypes.STRING,
        allowNull: true
    },
    enderecoAluno:{
        type:DataTypes.STRING,
        allowNull: true 
    }
},{
    tableName: 'Alunos',
    timestamps: false
});

module.exports = {alunoModel};

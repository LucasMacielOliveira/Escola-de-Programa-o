const Sequelize = require ('sequelize');

const MSSQL_HOST = 'localhost'; // Servidor local

const MSSQL_USER = 'sa'; // Usuário do servidor de banco de dados

const MSSQL_PASSWORD = '123456789'; // senha de acesso ao servidor de banco de dados

const MSSQL_DB = 'escolaDeProgramacao';// nome do banco de dados

const MSSQL_PORT = '1433';// Porta de acesso ao servidor SQL Server

const MSSQL_DIALECT = 'mssql'; // Deinição do dialeto de banco de dados (Sistema  de gerenciamento de  banco de dados ) como microsoft SQL Server


const sequelize = new Sequelize(MSSQL_DB, MSSQL_USER, MSSQL_PASSWORD, {
    dialect:MSSQL_DIALECT,
    host: MSSQL_HOST,
    port: MSSQL_PORT
});

async function testConnection () {
    try {
        await sequelize.authenticate();
        console.log('conexão estabelecida com sucesso')

    } catch (error) {
        console.error('não foi possível conectar ao banco de dados')
    }
}

module.exports = {sequelize};







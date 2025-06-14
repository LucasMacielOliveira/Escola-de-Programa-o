const express = require("express"); 
//Importação de rotas

const {rotasAlunos} = require('./src/Routes/alunoRoutes')

//APP

const app = express(); // cria uma instancia do express armazenando todos os metodos e funcionalidades em 'app'

const PORT = 8081;// Define a porta em que o servidor irá escutar as requisições

app.use(express.json());// Configura o body-parser para interpretar corpos de requisição no formato Json.

app.use("/alunos", rotasAlunos)

app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
});

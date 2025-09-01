const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação das tabelas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS cadastro (
            email TEXT PRIMARY KEY,
            senha TEXT
        )

        CREATE TABLE IF NOT EXISTS turma (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            desc TEXT
        )
    `);
    
    console.log('Tabelas criadas com sucesso.');
});


///////////////////////////// Rotas para Cadastro /////////////////////////////
///////////////////////////// Rotas para Cadastro /////////////////////////////
///////////////////////////// Rotas para Cadastro /////////////////////////////

// Cadastrar porra
app.post('/cadastro', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send('email e senha são obrigatórios.');
    }

    const query = `INSERT INTO cadastro (email, senha) VALUES (?, ?)`;
    db.run(query, [email, senha], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar.');
        }
        res.status(201).send({ id: this.lastID, message: 'cadastrado com sucesso.' });
    });

});

///////////////////////////// Rotas para Turma /////////////////////////////
///////////////////////////// Rotas para Turma /////////////////////////////
///////////////////////////// Rotas para Turma /////////////////////////////

// Cadastrar turma
app.post('/turma', (req, res) => {
    const { nome, desc } = req.body;

    if (!nome) {
        return res.status(400).send('nome são obrigatórios.');
    }

    const query = `INSERT INTO turma (nome, desc) VALUES (?, ?)`;
    db.run(query, [nome, desc], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar.');
        }
        res.status(201).send({ id: this.lastID, message: 'cadastrado com sucesso.' });
    });

});

// Iniciar o servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});

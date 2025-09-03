const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000;

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
    `);
    db.run(`
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

// Listar cadastros
// Endpoint para listar todos os cadastros ou buscar por email
app.get('/cadastro', (req, res) => {
    const email = req.query.email || '';  // Recebe o email da query string (se houver)

    if (email) {
        // Se email foi passado, busca cadastros que possuam esse email ou parte dele
        const query = `SELECT * FROM cadastro WHERE email LIKE ?`;

        db.all(query, [`%${email}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar cadastros.' });
            }
            res.json(rows);  // Retorna os cadastros encontrados ou um array vazio
        });
    } else {
        // Se email não foi passado, retorna todos os cadastros
        const query = `SELECT * FROM cadastro`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar cadastros.' });
            }
            res.json(rows);  // Retorna todos os cadastros
        });
    }
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

// Teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor está rodando e tabelas criadas!');
});

// Iniciando o servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});

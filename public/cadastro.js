async function cadastrarAluno(event) {
    event.preventDefault();

    const aluno = {
        email: document.getElementById("al_email").value,
        nome: document.getElementById("al_nome").value,
        senha: document.getElementById("al_senha").value
    };

    try {
        const response = await fetch('/aluno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });

        const result = await response.json();
        if (response.ok) {
            alert("cadastrado com sucesso!");
            document.getElementById("al_formolario").reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar aluno.");
    }
}

async function cadastrarProf(event) {
    event.preventDefault();

    const aluno = {
        email: document.getElementById("pr_email").value,
        nome: document.getElementById("pr_nome").value,
        senha: document.getElementById("pr_senha").value
    };

    try {
        const response = await fetch('/prof', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prof)
        });

        const result = await response.json();
        if (response.ok) {
            alert("cadastrado com sucesso!");
            document.getElementById("pr_formolario").reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar professor.");
    }
}

// Função para listar todos os cadastros ou buscar clientes por email
async function listarCadastro() {
    const email = document.getElementById('email').value.trim();  // Pega o valor do email digitado no input

    let url = '/cadastro';  // URL padrão para todos os clientes

    if (email) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?email=${email}`;
    }

    try {
        const response = await fetch(url);
        const cadastro = await response.json();

        const tabela = document.getElementById('tabelabunda');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (cadastro.length === 0) {
            // Caso não encontre cadastros, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="2">Nenhum cadastro encontrado.</td></tr>';
        } else {
            cadastro.forEach(cadastro => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${cadastro.email}</td>
                    <td>${cadastro.senha}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar cadastros:', error);
    }
}
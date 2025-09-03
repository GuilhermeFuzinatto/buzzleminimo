async function cadastrarPorra(event) {
    event.preventDefault();

    const cadastro = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    try {
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastro)
        });

        const result = await response.json();
        if (response.ok) {
            alert("cadastrado com sucesso!");
            document.getElementById("formolario").reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar cliente.");
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
                    <td>${cliente.email}</td>
                    <td>${cliente.senha}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar cadastros:', error);
    }
}
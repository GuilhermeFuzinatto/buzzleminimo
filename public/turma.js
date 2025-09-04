async function cadastrarTurma(event) {
    event.preventDefault();

    const turma = {
        nome: document.getElementById("nome").value,
        desc: document.getElementById("desc").value
    };

    try {
        const response = await fetch('/turma', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(turma)
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
        alert("Erro ao cadastrar turma.");
    }
}

// Função para listar as turmas
async function listarTurma() {
const nome = document.getElementById('nome').value.trim();  // Pega o valor do nome digitado no input
    
    let url = '/turma';  // URL padrão para todos os clientes

    if (nome) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?nome=${nome}`;
    }

    try {
        const response = await fetch(url);
        const turma = await response.json();

        const sec = document.getElementById('secsoturmas');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (turma.length === 0) {
            // Caso não encontre cadastros, exibe uma mensagem
            sec.innerHTML = '<div>n tem turma<div>';
        } else {
            turma.forEach(turma => {
                /*sec.innerHTML = `
                    <td>${turma.email}</td>
                    <td>${turma.senha}</td>
                `;
                */
                sec.innerHTML = `
                    <div>${turma.nome}${turma.desc}</div>
                `
            });
        }
    } catch (error) {
        console.error('Erro ao listar cadastros:', error);
    }
}
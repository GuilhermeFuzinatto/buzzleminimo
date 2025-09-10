async function cadastrarTurma(event) {
    event.preventDefault();

    const turma = {
        nome: document.getElementById("nome").value,
        desc: document.getElementById("desc").value,
        prid: document.getElementById("prid").value
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
            listarTurma(); // atualiza lista automaticamente
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
        sec.innerHTML = ''; // Limpa a tabela antes de preencher

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
                sec.innerHTML += `
                    <div>
                        ${turma.tu_id}
                        ${turma.tu_nome}
                        ${turma.tu_desc}
                        ${turma.tu_pr_id}
                    </div>
                `
            });
        }
    } catch (error) {
        console.error('Erro ao listar cadastros:', error);
    }
}

// Função para atualizar as informações da turma
async function atualizarTurma() {
    const nome = document.getElementById('tu_nome').value;
    const desc = document.getElementById('tu_desc').value;

    const turmaAtualizado = {
        nome,
        desc
    };

    try {
        const response = await fetch(`/turma/id/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(turmaAtualizado)
        });

        if (response.ok) {
            alert('Turma atualizada com sucesso!');
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar turma: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar turma:', error);
        alert('Erro ao atualizar turma.');
    }
}
async function cadastrarTurma(event) {
    event.preventDefault();
    const tu_id = document.getElementById("id").value;

    if(tu_id){
        alert("O ID é atribuído automaticamente, sendo utilizado apenas para atualização.");
    }

    const turma = {
        tu_nome: document.getElementById("nome").value,
        tu_desc: document.getElementById("desc").value,
        tu_pr_id: document.getElementById("prid").value
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
const tu_nome = document.getElementById('nome').value.trim();  // Pega o valor do nome digitado no input
    
    let url = '/turma';  // URL padrão para todos os clientes

    if (tu_nome) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?tu_nome=${tu_nome}`;
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
    const tu_id = document.getElementById('id').value;
    const tu_nome = document.getElementById('nome').value;
    const tu_desc = document.getElementById('desc').value;
    const tu_prid = document.getElementById('prid').value;

    const turmaAtualizado = {
        tu_nome,
        tu_desc
    };

    if(tu_prid){
        alert('Não é possível alterar o id do professor que criou a turma.');
    }

    if(tu_id){
        try {
            const response = await fetch(`/turma/tu_id/${tu_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(turmaAtualizado)
            });

            if (response.ok) {
                alert('Turma atualizada com sucesso!');
                listarTurma(); // atualiza lista automaticamente
            } else {
                const errorMessage = await response.text();
                alert('Erro ao atualizar turma: ' + errorMessage);
            }
        } catch (error) {
            console.error('Erro ao atualizar turma:', error);
            alert('Erro ao atualizar turma.');
        }
    }else{
        alert('ID é um campo necessário para atualização.');
    }
}
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
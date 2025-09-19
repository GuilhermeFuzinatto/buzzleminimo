let idatual = null;

async function maisPergunta(){
    const fml = document.getElementById("formolario");
    const totalp = fml.querySelectorAll('.pergunta').length;

    // remove ids de TODAS as perguntas anteriores
    fml.querySelectorAll('#divpe').forEach(div => div.removeAttribute("id"));
    fml.querySelectorAll('#diva').forEach(div => div.removeAttribute("id"));

    fml.insertAdjacentHTML("beforeend", `
        <div id="divpe">
            <p class="pergunta">Pergunta ${totalp + 1}</p>
            <input type="text" class="en" placeholder="enunciado">
            <div id="diva"></div>
            <button type="button" onclick="maisAlternativa()">Adicionar Alternativa</button>
        </div>
    `);
}

async function maisAlternativa(){
    const divatual = document.getElementById("diva");
    const totala = divatual.querySelectorAll('.alt').length;

    divatual.insertAdjacentHTML("beforeend", `
        <p class="alt">Alternativa ${totala + 1}</p>
        <input type="text" class="en" placeholder="enunciado">
    `);
}

async function cadastrarQuiz(event) {
    event.preventDefault();

    const quiz = {
        qz_nome: document.getElementById("nome").value,
        qz_valor: document.getElementById("valor").value,
        qz_prazo: document.getElementById("prazo").value
    };

    try {
        const response = await fetch('/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quiz)
        });

        const result = await response.json();
        if (response.ok) {
            alert("cadastrado com sucesso!");
            document.getElementById("formolario").reset();
            idatual = result.id;
            window.location.href = "quiz2.html";
            listarQuiz(); // atualiza lista automaticamente
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar quiz.");
    }
}
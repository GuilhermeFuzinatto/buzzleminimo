async function maisPergunta(){
    const fml = document.getElementById("formolario");
    const totalp = fml.querySelectorAll('.pergunta').length;

    if(totalp > 1){
        const divpassado = document.getElementById("divpe");
        divpassado.removeAttribute("id");
    }

    fml.innerHTML += `
        <div id="divpe">
            <p>Pergunta ${totalp}</p>
            <input type="text" class="en" placeholder="enunciado">
            <button onclick="maisAlternativa()">Adicionar Alternativa</button>
        </div>
    `
}

async function maisAlternativa(){
    const div = document.getElementById("div");
    const totalp = fml.querySelectorAll('.pergunta').length;

    fml.innerHTML += `
        <p>Pergunta ${totalp}</p>
        <input type="text" class="en" placeholder="enunciado">
        <button onclick="maisAlternativa()">Adicionar Alternativa</button>
    `
}
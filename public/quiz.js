async function maisPergunta(){
    const fml = document.getElementById("formolario");
    const totalp = fml.querySelectorAll('.pergunta').length;

    if(totalp > 1){
        const divpassado = document.getElementById("divpe");
        divpassado.removeAttribute("id");
        const divapassado = document.getElementById("diva");
        divapassado.removeAttribute("id");
    }

    fml.insertAdjacentHTML("beforeend", `
        <div id="divpe">
            <p class="pergunta">Pergunta ${totalp + 1}</p>
            <input type="text" class="en" placeholder="enunciado">
            <div class="diva"></div>
            <button type="button" onclick="maisAlternativa()">Adicionar Alternativa</button>
        </div>
    `);
}

async function maisAlternativa(){
    const divatual = document.getElementById(".diva");
    const totala = divatual.querySelectorAll('.alt').length;

    fml.innerHTML += `
        <p class="alt">Alternativa ${totala + 1}</p>
        <input type="text" class="en" placeholder="enunciado">
        <button onclick="maisAlternativa()">Adicionar Alternativa</button>
    `
}
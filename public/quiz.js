async function maisPergunta(){
    const fml = document.getElementById("formolario");
    const totalp = fml.querySelectorAll('.pergunta').length;

    if(totalp > 1){
        // remove ids de TODAS as perguntas anteriores
        fml.querySelectorAll('#divpe').forEach(div => div.removeAttribute("id"));
        fml.querySelectorAll('#diva').forEach(div => div.removeAttribute("id"));
    }

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
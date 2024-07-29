var btnfalar = document.querySelector('#btnfalar');
var input = document.querySelector('#inputTexto');
var voz = document.querySelector('#voz');
var apiSpeech = window.speechSynthesis;
var tiposVozes = [];

getVozes();
if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = getVozes;
}

btnfalar.addEventListener('click', () => {
    var falar = new SpeechSynthesisUtterance(input.value);
    var vozSelecionada = voz.selectedOptions[0].getAttribute('data-name');
    tiposVozes.forEach((fala) => {
        if (fala.name === vozSelecionada) {
            falar.voice = fala;
        }
    });
    apiSpeech.speak(falar);
});

function getVozes() {
    tiposVozes = apiSpeech.getVoices();
    var indexVozSelecionada = voz.selectedIndex < 0 ? 0 : voz.selectedIndex;
    voz.innerHTML = '';
    tiposVozes.forEach((vozSelecionada) => {
        var itemLista = document.createElement('option');
        itemLista.textContent = vozSelecionada.name + ' (' + vozSelecionada.lang + ')';
        itemLista.setAttribute('data-lang', vozSelecionada.lang);
        itemLista.setAttribute('data-name', vozSelecionada.name);
        voz.appendChild(itemLista);
    });
    voz.selectedIndex = indexVozSelecionada;
}

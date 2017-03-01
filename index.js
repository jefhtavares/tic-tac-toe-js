(function(doc){
    if (/^(interactive|complete)$/i.test(doc.readyState)) {
        ready();
    } else {
        doc.addEventListener('DOMContentLoaded', ready);
    }
})(document);

var matriz = [];
var jogadorAtual = 0;

function ready(){
    criarTabuleiro(document.getElementById('tabuleiro'));
}

function initArray(){
    matriz = new Array(3);

    for(var i = 0; i < 3; i++){
        matriz[i] = new Array(3);
    }
}

function criarTabuleiro(divTabuleiro){
    initArray();

    var templateHtml = document.getElementById('tpl-casa').innerHTML;

    var linha = 0, coluna = 0;
    for(var i = 0; i < 9; i++){
        divTabuleiro.insertAdjacentHTML('beforeend', templateHtml);

        matriz[linha][coluna] = divTabuleiro.lastElementChild;

        matriz[linha][coluna].addEventListener('click', marcarCasa);

        if((coluna + 1) % 3 === 0){
            linha++;
            coluna = 0;
        }else{
            coluna += 1;
        }
    }
}

function marcarCasa(){
    var casa = this;
    var casaMarcada = casa.getAttribute('data-marcado');

    if(casaMarcada == 'true'){
        return;
    }

    casa.className += ' marcado ' + (jogadorAtual == 0 ? 'x' : 'o');
    casa.setAttribute('data-marcado', true);
    jogadorAtual = !jogadorAtual;
}

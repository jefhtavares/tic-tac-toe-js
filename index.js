(function(doc){
    if (/^(interactive|complete)$/i.test(doc.readyState)) {
        ready();
    } else {
        doc.addEventListener('DOMContentLoaded', ready);
    }
})(document);

var tabuleiro = undefined;
var jogadorAtual = 0;

function ready(){
    initArray();
    criarTabuleiro(document.getElementById('tabuleiro'));
    mostrarJogadorAtual();
}

function initArray(){
    tabuleiro = new Array(3);

    for(var i = 0; i < 3; i++){
        tabuleiro[i] = new Array(3);
    }
}

function criarTabuleiro(divTabuleiro){
    var templateHtml = document.getElementById('tpl-casa').innerHTML;

    var linha = 0, coluna = 0;
    for(var i = 0; i < 9; i++){
        divTabuleiro.insertAdjacentHTML('beforeend', templateHtml);

        tabuleiro[linha][coluna] = divTabuleiro.lastElementChild;

        tabuleiro[linha][coluna].addEventListener('click', marcarCasa);

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
    mostrarJogadorAtual();
}

function mostrarJogadorAtual(){
    var elemento = document.getElementById('jogador-atual');
    elemento.innerText = 'Jogador ' + (Number(jogadorAtual) + 1);
}

function verificaVencedor(){
    //var linha 
}

function marcarVencedores(elementos){
    document.getElementById('tabuleiro').className += ' fim';

    for(var i = 0; i < 3; i++){
        elementos[i].className += ' ganhou';
    }
}

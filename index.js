(function(doc){
    if (/^(interactive|complete)$/i.test(doc.readyState)) {
        ready();
    } else {
        doc.addEventListener('DOMContentLoaded', ready);
    }
})(document);

var linha1 = [], linha2 = [], linha3 = [];
var jogadorAtual = 0;

function ready(){    
    criarTabuleiro(document.getElementById('tabuleiro'));
}

function criarTabuleiro(divTabuleiro){
    var templateHtml = document.getElementById('tpl-casa').innerHTML;

    for(var i = 0; i < 9; i++){
        divTabuleiro.insertAdjacentHTML('beforeend', templateHtml);

        linha1[i] = divTabuleiro.lastElementChild;

        linha1[i].addEventListener('click', function(){
            var casa = this;
            casa.className += ' marcado ' + (jogadorAtual == 0 ? 'x' : 'o');
            jogadorAtual = !jogadorAtual;
        });
    }
}

function verificaVencedor(linha1, linha2, linha3){
    
}
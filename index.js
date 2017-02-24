(function(doc){
    if (/^(interactive|complete)$/i.test(doc.readyState)) {
        ready();
    } else {
        doc.addEventListener('DOMContentLoaded', ready);
    }
})(document);

var matriz = [[]];
var jogadorAtual = 0;

function ready(){    
    criarTabuleiro(document.getElementById('tabuleiro'));
}

function criarTabuleiro(divTabuleiro){
    var templateHtml = document.getElementById('tpl-casa').innerHTML;

    var linha = 0, coluna = 0;
    for(var i = 0; i < 9; i++){
        divTabuleiro.insertAdjacentHTML('beforeend', templateHtml);

        matriz[linha][coluna] = divTabuleiro.lastElementChild;

        matriz[linha][coluna].addEventListener('click', function(){
            var casa = this;
            casa.className += ' marcado ' + (jogadorAtual == 0 ? 'x' : 'o');
            jogadorAtual = !jogadorAtual;
        });

        if((coluna + 1) % 3 === 0){
            linha++;
            coluna = 0;
        }else{
            coluna += 1;
        }
    }
}

function verificaVencedor(linha1, linha2, linha3){
    
}
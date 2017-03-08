(function(doc){
    if (/^(interactive|complete)$/i.test(doc.readyState)) {
        ready();
    } else {
        doc.addEventListener('DOMContentLoaded', ready);
    }
})(document);

var tabuleiro = undefined;
var jogadorAtual = 1;

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
    
    for(var linha = 0; linha < 3; linha++){
        for(var coluna = 0; coluna < 3; coluna++){
            var htmlCasa = templateHtml.replace("LINHA", linha).replace("COLUNA", coluna);
            divTabuleiro.insertAdjacentHTML('beforeend', htmlCasa);

            divTabuleiro.lastElementChild.addEventListener('click', marcarCasa);
            tabuleiro[linha][coluna] = 0;
        }
    }    
}

function marcarCasa(){
    var casa = this;
    var casaMarcada = casa.getAttribute('data-marcado');

    if(casaMarcada == 'true'){
        return;
    }

    casa.className += ' marcado ' + (jogadorAtual === 1 ? 'x' : 'o');
    casa.setAttribute('data-marcado', true);
    var linha = Number(casa.getAttribute('data-linha'));
    var coluna = Number(casa.getAttribute('data-coluna'));

    tabuleiro[linha][coluna] = jogadorAtual;

    verificaVencedor();
    toggleJogador();
    mostrarJogadorAtual();
}

function toggleJogador(){
    jogadorAtual = (jogadorAtual === 1) ? 2 : 1;
}

function mostrarJogadorAtual(){
    var elemento = document.getElementById('jogador-atual');
    elemento.innerText = 'Jogador ' + (Number(jogadorAtual));
}

function verificaVencedor(){
    var somasLinhas = [0, 0, 0];
    var somasColunas = [0, 0, 0];
    var somasDiagonais = [0, 0];

    for(var linha = 0; linha < tabuleiro.length; linha++){
        for(var coluna = 0; coluna < tabuleiro[linha].length; coluna++){
            somasLinhas[linha] += tabuleiro[linha][coluna];
            somasColunas[coluna] += tabuleiro[linha][coluna];

            if(linha === coluna)
                somasDiagonais[0] += tabuleiro[linha][coluna];
            
            if(linha + coluna === (tabuleiro.length - 1))
                somasDiagonais[1] += tabuleiro[linha][coluna];
        }
    }

    var l = somasLinhas.filter(function(item, index){
        if(item === 3 || item === 6)
            return { item: item, index: index };
    });

    console.log(l);
}

function marcarVencedores(elementos){
    document.getElementById('tabuleiro').className += ' fim';

    for(var i = 0; i < 3; i++){
        elementos[i].className += ' ganhou';
    }
}

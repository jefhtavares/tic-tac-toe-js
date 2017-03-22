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

    var valorJogador = (jogadorAtual === 1) ? 3 : 5;    
    tabuleiro[linha][coluna] = valorJogador;

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

    for(var l = 0; l < tabuleiro.length; l++){        
        for(var c = 0; c < tabuleiro[l].length; c++){
            somasLinhas[l] += tabuleiro[l][c];
            somasColunas[c] += tabuleiro[l][c];
 
            if(l === c)
               somasDiagonais[0] += tabuleiro[l][c];
            
            if(l + c === 2)
                somasDiagonais[1] += tabuleiro[l][c];
        }
    }

    for(var i = 0; i < somasLinhas.length; i++){
        if(somasLinhas[i] === 9 || somasLinhas[i] === 15){
            marcarVencedores(linha = i);
        }

        if(somasColunas[i] === 9 || somasColunas[i] === 15){
            marcarVencedores(undefined, i);
        }

        if(i != 3 && (somasDiagonais[i] === 9 || somasDiagonais[i] === 15)){
            marcarVencedores(undefined, undefined, i);
        }
    }
}

function marcarVencedores(linha = undefined, coluna = undefined, diagonal = undefined){
    document.getElementById('tabuleiro').className += ' fim';
    
    var childDivs = document.getElementById('tabuleiro').getElementsByTagName('div');
    for(var i = 0; i < childDivs.length; i++ ) {        
        var casa = childDivs[i];
        var linhaCasa = casa.getAttribute('data-linha');
        var colunaCasa = casa.getAttribute('data-coluna');

        if(linha === linhaCasa || coluna === colunaCasa){
            casa.setAttribute('class', 'ganhou');
        }
    }
}

function logTabuleiro(){
    var str = '';

    for(var l = 0; l < 3; l++){
        for(var c = 0; c < 3; c++){
            str += tabuleiro[l][c] + '   ';
        }

        str += '\n';
    }

    console.log(str);
}

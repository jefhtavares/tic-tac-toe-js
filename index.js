(function(doc){
    if (/^(interactive|complete)$/i.test(doc.readyState)) {
        ready();
    } else {
        doc.addEventListener('DOMContentLoaded', ready);
    }
})(document);

var tabuleiro = undefined;
var jogadorAtual = 1;

var somasTabuleiro = { linhas: [0, 0, 0], colunas: [0, 0, 0], diagonais: [0, 0] };

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
            tabuleiro[linha][coluna] = htmlCasa;
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

    //tabuleiro[linha][coluna] = jogadorAtual === 1 ? 3 : 5;

    var s = (jogadorAtual === 1) ? 3 : 5;

    somasTabuleiro.linhas[linha] += s;
    somasTabuleiro.colunas[coluna] += s;

    if(linha === coluna)
        somasTabuleiro.diagonais[0] += s;
    
    if(linha + coluna === (tabuleiro.length - 1))
        somasTabuleiro.diagonais[1] += s;

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
    for(var linha in somasTabuleiro.linhas){
        if(linha === 9 || linha === 15){
            marcarVencedores(tabuleiro[0]);
        }
    }

    for(var coluna in somasTabuleiro.colunas){
        if(linha === 9 || linha === 15){
            // Alguém venceu
        }
    }

    for(var diag in somasTabuleiro.diagonais){
        if(linha === 9 || linha === 15){
            // Alguém venceu
        }
    }
}

function marcarVencedores(elementos){
    document.getElementById('tabuleiro').className += ' fim';

    for(var i = 0; i < 3; i++){
        elementos[i].className += ' ganhou';
    }
}

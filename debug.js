var DEBUG = false;

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
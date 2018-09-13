//JavaScript

var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a']['1'] = 0;
matriz_jogo['a']['2'] = 0;
matriz_jogo['a']['3'] = 0;

matriz_jogo['b']['1'] = 0;
matriz_jogo['b']['2'] = 0;
matriz_jogo['b']['3'] = 0;

matriz_jogo['c']['1'] = 0;
matriz_jogo['c']['2'] = 0;
matriz_jogo['c']['3'] = 0;

$(document).ready(function(){

    $('#btn_iniciar_jogo').click(function(){

        if($('#apelido_1').val() == ''){
            alert('Preecha o apelido do jogador 1');
            return false;
        }

        if($('#apelido_2').val() == ''){
            alert('Preencha o apelido do jogador 2');
            return false;
        }

        //exibir nome dos jogadores
        $('#nome_jogador_1').html($('#apelido_1').val());
        $('#nome_jogador_2').html($('#apelido_2').val());

        //controla visualizações das divs
        $('#palco-jogo').show();
        $('#menu_jogo').hide();


        $('.jogada').click(function(){
            
            var id_div = this.id;
            $('#'+id_div).off();
            jogada(id_div);
        });

        function jogada(id){
            var icone = '';
            var ponto = 0;

            if((rodada % 2) == 1){
                icone = "url(imagens/marcacao_1.png)";
                ponto = 1;
            } else {
                icone = "url(imagens/marcacao_2.png)";
                ponto = -1;
            }

            rodada++;

            $('#'+id).css('background-image', icone);

            var linha_coluna = id.split('-');

            matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

            verifica_combinacao();
        }

        function verifica_combinacao(){
            //verifica na horizontal
            contador = 0;

            for(var i = 1; i <= 3; i++){
                contador += matriz_jogo['a'][i];
                console.log(contador); 
            }
            ganhador(contador);
            
            contador = 0;
            for(var i = 1; i <= 3; i++){
                contador += matriz_jogo['b'][i];
                console.log(contador); 
            }
            ganhador(contador); 

            contador = 0;
            for(var i = 1; i <= 3; i++){
                contador += matriz_jogo['c'][i];
            }
            ganhador(contador);

            //verificar vertical
            for(var i = 1; i <= 3; i++){
                pontos = 0;
                pontos += matriz_jogo['a'][i];
                pontos += matriz_jogo['b'][i];
                pontos += matriz_jogo['c'][i];

                ganhador(pontos);
            }

            //verificar diagonal
            pontos = 0;
            pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
            ganhador(pontos);

            pontos = 0;
            pontos = matriz_jogo['c'][1] + matriz_jogo['b'][2] + matriz_jogo['a'][3];
            ganhador(pontos);            
        }    

        function ganhador(pontos){

            if(pontos == -3){
                alert($('#apelido_2').val()+' é o vencedor');
                $('.jogada').off();
            } 
            else if(pontos == 3){
                alert($('#apelido_1').val()+' é o vencedor');
                $('.jogada').off();
            }
        }

    });

});
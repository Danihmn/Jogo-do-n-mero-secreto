let listaSorteados = []; //Criei um array para números sorteados
let numeroLimiteDeSortear = 10; //Limite para serem criados os números
let numeroSecreto = gerarNumeroSecreto(); //Chamando função que gera p número
let tentativas = 1; //Criando um número de tentativas, que começa em 1

//Veja que foram colocados parâmetros na função
function exibirTextoNaTela(tag, texto){
    //Pegando um elemento no html sem ser pelo id
    let campo = document.querySelector(tag); //Dizendo que será uma tag no html
    campo.innerHTML = texto; //Dizendo que será um texto
    //Agora eu posso estar essa função para escrever onde e o que eu quero

    //JS pronto que permite que sejam narrados em voz alta textos escritos
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.3});
    //Recebe o parâmetro texto, linguagem em português e a velocidade em 1.3
}

//Mensagem de novo jogo
function mensagemNovoJogo(){
    //Modifiquei os parâmetros da função acima
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

mensagemNovoJogo(); //Chamando a função da mensagem de novo jogo

function gerarNumeroSecreto(){
    //Sorteando um número para ser o número secreto
    let numeroEscolhido = parseInt(Math.random() * numeroLimiteDeSortear + 1);

    //Definindo para a variável o tamanho da lista
    let tamanhoArray = listaSorteados.length;

    //Se todos os números possíveis forem sorteados, limpar a lista
    if(tamanhoArray == numeroLimiteDeSortear){
        listaSorteados = [];
    }

    if(listaSorteados.includes(numeroEscolhido)){ //Se estiver incluso no array:
        return gerarNumeroSecreto();
    }else{
        listaSorteados.push(numeroEscolhido); //Adiciona no array o numero sorteado
        console.log(listaSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input"); //Selecionando o input no html
    chute.value = ""; //Atribuindo uma string vazia para que ele seja limpo
}

function verificarChute(){
    //Pegar o valor inserido no input
    let chute = document.querySelector("input").value;

    //Valor do tipo Booleano, que é um valor que é verdadeiro, ou falso
    console.log(chute == numeroSecreto);

    //Se for mais que uma tentativas ou não
    let palavraTentativa = (tentativas > 1) ? " tentativas" : " tentativa";

    //Verificar se o chute foi correto
    if(numeroSecreto == chute){
        exibirTextoNaTela("h1", "Parabéns");
        exibirTextoNaTela("p", "Você acertou com " + tentativas + palavraTentativa);
        
        //Caso acertar, o botão de reiniciar funcionará
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        //Atribuindo as mensagens se o número for maior ou menor
        let maiorOuMenor = chute < numeroSecreto ?
        "O número secreto é maior" : "O número secreto é menor";
        exibirTextoNaTela("p", maiorOuMenor);
        
        tentativas++; //A cada erro, será contada uma tentativa a mais
        limparCampo(); //Chamando a função que limpa o input
    }
}

function reiniciarJogo(){ //Se acertar, eu posso reiniciar o jogo
    numeroSecreto = gerarNumeroSecreto(); //Gerando um novo número secreto
    tentativas = 1; //Retornando tentativas para 1, já que será um novo jogo
    limparCampo(); //Limpando o campo do input
    mensagemNovoJogo(); //Retirando a mensagem de vitória e pondo a de boas vindas

    //Atribuindo que o botão seja novamente desabilitado
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
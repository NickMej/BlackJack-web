let deck =[];
const tipos=['C','D','H','S'];
const especiales=['A','J','Q','K'];

let puntosJugador = 0,
    puntosCompu = 0;

//Referencias del HTML
const btnPedir= document.querySelector('#btnPedir');
const btnDetener= document.querySelector('#btnDetener');
const btnNuevo= document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML= document.querySelectorAll('small');



//esta funcion crea un nuevo deck
const crearDeck =()=>{
    for(let i=2; i<=10; i++){
        for(let tipo of tipos ){
        deck.push(i + tipo); //añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
    }
}
    for(let tipo of tipos ){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    //console.log(deck);
    deck = _.shuffle(deck);// (reordene de forma aleatoria) los elementos del array. 
    console.log(deck);
     return deck;
}

crearDeck();

//esta funcion me permite crear una nueva carta
const pedirCarta = () =>{

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
        //lanza una excepción, expresion especifica el valor de la excepción.
    }
    const carta = deck.pop(); //el pop sirve para remover cada carta
    return carta;
}
//pedirCarta();
const valorCarta = ( carta ) =>{

    const valor = carta.substring(0, carta.length -1 ); //Devuelve el subconjunto de una cadena basado en la posición inicial especificada
    return (isNaN( valor) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
}
//turno de la Computadora
const turnoComputadora = ( puntosMinimos ) => {

    do{        
    const carta = pedirCarta();

    puntosCompu = puntosCompu + valorCarta ( carta );
    puntosHTML[1].innerText = puntosCompu;

    // <img class="carta" src="assets/cartas/7C.png" alt="">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //Esto sirve para agregar codigo dentro de la solicitud-->``<--
    imgCarta.classList.add('carta');
    divCartasComputadora.append( imgCarta );

    if( puntosMinimos > 21){
        break;
    }
    }while( (puntosCompu < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
        if(puntosCompu === puntosMinimos){
            alert('Nadie gana :(');
        }else if(puntosMinimos > 21){
            alert('Computadora Gana')
        }else if(puntosCompu >21 ){
            alert('Jugador Gana');
        }else{
            alert('Computadora Gana')
        }
    }, 100 );
}
//Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta ( carta );
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/7C.png" alt="">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //Esto sirve para agregar codigo dentro de la solicitud-->``<--
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );
    
    if(puntosJugador > 21){
        console.warn('lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if (puntosJugador === 21) {
        console.warn('21, Genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );

});

btnNuevo.addEventListener('click',() => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosCompu = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});
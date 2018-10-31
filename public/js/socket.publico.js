//Comando para establecer la comunicación
var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');


var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lbsEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

//Conexión entre el front-end y el servidor por socket
//Aquí el front-end establece una conexión con el servidor
//Los on son para escuchar
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//Cuando el front-end pierde la conexión con el servidor
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(data) {
    console.log(data);
    actualizaHTML(data.ultimos4);
});

//on 'ultimos4'
socket.on('ultimos4', function(ultimos4) {

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(ultimos4);



});

function actualizaHTML(ultimos4) {

    for (var i = 0; i <= ultimos4.length - 1; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lbsEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }

}
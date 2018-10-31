//Comando para establecer la comunicación
var socket = io();

var label = $('#lblNuevoTicket');
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

//on, que escuche el evento 'estadoActual'
socket.on('estadoActual', function(estadoActual) {
    label.text(estadoActual.actual);
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(numTicketSig) {
        label.text(numTicketSig);
    });
});
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

// On, está escuchándo las conexiones desde el cliente
io.on('connection', (client) => {

    //Escucha los eventos 'siguienteTicket' y crea el siguiente ticket, devolviendo el número del siguiente ticket al cliente
    client.on('siguienteTicket', (data, callback) => {

        // Obtiene el siguiente ticket, llamando a la función 'siguienteTicket()' de la clase TicketControl
        let numSiguienteTicket = ticketControl.siguienteTicket();

        //Envia- emite al cliente el número del siguiente ticket
        callback(numSiguienteTicket);

    });

    //Emitir un evento 'estadoActual'
    let ticketActual = { actual: ticketControl.getUltimoTicket(), ultimos4: ticketControl.getUltimos4() };
    client.emit('estadoActual', ticketActual);

    //Escucha el evento 'atenderTicket'
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //emitir 'ultimos4'
        let ultimos4Atendidos = ticketControl.getUltimos4();
        client.broadcast.emit('ultimos4', ultimos4Atendidos);

    });

});
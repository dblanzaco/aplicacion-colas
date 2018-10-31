const fs = require('fs');

//Clase de ticket
class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

//Clase para controlar el orden de los tickets
class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        //Si la fecha que hay guardada en el data.json es la misma a la fecha de hoy, entonces el 
        //último ticket gestionado es el que pone en el data.json
        //Si la fecha no coincide con la de hoy, entonces se reinicia la cuenta de tickets
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }

    //Función para indicar el siguiente ticket
    siguienteTicket() {

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        //Verifica la cantidad de tickets sin atender
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //Extrae el número del primer ticket de la lista
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); // Con este comando se elimina la primera posicion del array

        let atenderTicket = new Ticket(numeroTicket, escritorio); // Crear un nuevo ticket, es el que se va atender

        this.ultimos4.unshift(atenderTicket); // Aañade el ticket al inicio del array  'ultimos4'

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //Borra el último elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo(); // Guarda el fichero de datos

        return atenderTicket; // Devuelve el ticket a atender

    }

    //Función para  reiniciar la cuenta de tickets para el día de hoy
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }

}


module.exports = { TicketControl }
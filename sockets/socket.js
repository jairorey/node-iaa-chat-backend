const {io} = require('../index');
const Cand = require('../models/cand');

const Cands = require('../models/cands');
const cands = new Cands();
cands.addCand( new Cand('Alvarito'));
cands.addCand( new Cand('Leon'));
cands.addCand( new Cand('Correa'));
cands.addCand( new Cand('Novoa'));
cands.addCand( new Cand('Roldos'));


// mensajes de sockets
io.on('connection', client => { 
    console.log('Cliente  conectado al Servidor');
    client.emit('active-cands', cands.getCands());
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) =>{
        console.log('Mensaje!!!', payload);
        io.emit('server_mensaje', {admin:'nuevo mensaje'});
    });

    client.on('emitir-mensaje', (payload) => {
        client.broadcast.emit('nuevo-mensaje',payload);
        //console.log('Payload',payload);
    });

    client.on('vote-cand', (payload) => {
        cands.voteCand(payload.id);
        io.emit('active-cands', cands.getCands());
        //console.log('Payload',payload);
    });

    client.on('add-cand', (payload) => {
        cands.addCand(new Cand(payload.name));
        io.emit('active-cands', cands.getCands());
        //console.log('Payload',payload);
    });

    client.on('delete-cand', (payload) => {
        cands.deleteCand(payload.id);
        io.emit('active-cands', cands.getCands());
        //console.log('Payload',payload);
    });

    
});
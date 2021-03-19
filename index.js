const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

//Lectura y Parseo del Body
app.use(express.json());




require('./database/config').dbConnection();    


// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Path Publico
const publicPath = path.resolve(__dirname, 'public');

app.use( express.static( publicPath));


// Mis Rutas
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err) => {
    if ( err ) throw new Error(err);
    console.log('Servidor corriendo en puerto!!!', process.env.PORT);
});
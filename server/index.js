//const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
var http = require('http').createServer(app);
var io = require("socket.io").listen(http);

voices = [];

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile("C:/Users/Юлия/Desktop/Task-2/client/index.html");
});

app.get("/", (req, res) => {
    res.sendFile("C:/Users/Юлия/Desktop/Task-2/client/dist/app.js");
});

app.get("/", (req, res) => {
    res.sendFile("C:/Users/Юлия/Desktop/Task-2/client/dist/app.css");
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

app.get("/voices", (req, res) => {
    res.send(voices);
});

io.on('connection', (socket) => {
    console.log('A user connected');    
    let connected = socket.client.conn.server.clientsCount;
    console.log(connected + ' users connected.');    
    io.emit('user', connected);   
    
    socket.on('disconnect', () => {
        let disconnected = socket.client.conn.server.clientsCount;
        console.log(disconnected + ' users connected.');
        io.emit('user', disconnected);
    });
    
    socket.on('audioMessage', (audio) => {
        voices.push({timeStamp: newDate().toISOString(), audioBlob: audio});
        io.emit('audioMessage', audio);
        console.log('Message sent.');
    });
});


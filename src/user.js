var io = require("socket.io-client")
//import io from 'socket.io-client';
var socket = io.connect("https://voicy-speaker.herokuapp.com/");
//const socket = io('https://voicy-speaker.herokuapp.com/');

socket.on('connect', function() {
    console.log("Connection to the server is successfull!");
});


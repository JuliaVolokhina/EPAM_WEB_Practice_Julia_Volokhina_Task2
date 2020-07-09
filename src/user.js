var io = require("socket.io-client")
var socket = io.connect("https://voicy-speaker.herokuapp.com/");
var users = io.sockets.clients();
console.log(users);

socket.on('connect', function() {
    console.log("Connection to the server is successfull!");
});

socket.on('audioMessage', function (audioChunks) {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
});
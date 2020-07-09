//var io = require("socket.io-client")
//var socket = io.connect("https://voicy-speaker.herokuapp.com/");

//var users = io.sockets.clients();
//console.log(users);

//socket.on('audioMessage', function (audioChunks) {
//  const audioBlob = new Blob(audioChunks);
//  const audioUrl = URL.createObjectURL(audioBlob);
//  const audio = new Audio(audioUrl);
//  audio.play();
//});

function button1() {
  response = document.getElementById("response"),
    output = "Active: voices list";
  response.innerHTML = output;
}
document.getElementById("voicesid").addEventListener("click", button1);

function button2() {
  response = document.getElementById("response"),
    output = "Active: speaker-mode";
  response.innerHTML = output;
  //socket.emit('audioMessage', audioChunks);
}
document.getElementById("microphoneid").addEventListener("click", button2);

function button3() {
  response = document.getElementById("response"),
    output = "Active: listener-mode";
  response.innerHTML = output;
}
document.getElementById("streamid").addEventListener("click", button3);
var io = require("socket.io-client")
//import io from 'socket.io-client';
var socket = io.connect("https://voicy-speaker.herokuapp.com/");
//const socket = io('https://voicy-speaker.herokuapp.com/');

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
}
document.getElementById("microphoneid").addEventListener("click", button2);
document.getElementById("microphoneid").addEventListener("click", button2_recordandsend);

function button2_recordandsend() {
  navigator.mediaDevices.getUserMedia({ audio: true})
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        var audioChunks = [];
        audioChunks.push(event.data);
        socket.emit("audioMessage", audioChunks);
        mediaRecorder.start();

        document.getElementById("microphoneid").addEventListener("click", stopRecord);
    });
}

function stopRecord() {
  mediaRecorder.stopRecord
}

function button3() {
  response = document.getElementById("response"),
    output = "Active: listener-mode";
  response.innerHTML = output;
  button3_stream()
}
document.getElementById("streamid").addEventListener("click", button3);

function button3_stream() {
  socket.on('audioMessage', function (audioChunks) {
  const audioBlob = new Blob(audioChunks);
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);    
  audio.play();
  console.log("Message streamed!");
});
}
//document.getElementById("microphoneid").addEventListener("click", button3_stream);
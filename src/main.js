var io = require("socket.io-client")
//import io from 'socket.io-client';
var socket = io.connect("https://voicy-speaker.herokuapp.com/");
//const socket = io('https://voicy-speaker.herokuapp.com/');

function button1() {
  response = document.getElementById("response"),
    output = "Active: voices list";
  response.innerHTML = output;
  button1_getallvoices();
}
document.getElementById("voicesid").addEventListener("click", button1);

async function button1_getallvoices() {
  const info = document.getElementById("response");
  info.innerHTML = "";
  const ul = document.createElement('ul');
  info.appendChild(ul);
  const response = await fetch("https://voicy-speaker.herokuapp.com/voices");
  const data = await response.json();
  console.log(data);
  for (let i=0; i<data.length; i++) {
    const li = document.createElement('li');
    const audioBlob = new Blob([new Uint8Array(data[i].audioBlob[0].data).buffer]);
    li.innerHTML = `Voice: ${data[i].timeStamp.slice(0, -38)}`;
    ul.appendChild(li);
    li.addEventListener('click', ()=>{
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    });
  };
}

function button2() {
  response = document.getElementById("response"),
    output = "Active: speaker-mode";
  response.innerHTML = output;
}
document.getElementById("microphoneid").addEventListener("click", button2);
document.getElementById("microphoneid").addEventListener("click", button2_recordandsend);

function button2_recordandsend() {
  navigator.mediaDevices.getUserMedia({ audio: true}).then((mediaStream) => {
    const mediaRecorder = new MediaRecorder(mediaStream);
    var audioChunks = [];

    mediaRecorder.addEventListener("dataavailable",function(event) {
      audioChunks.push(event.data);
      socket.emit("audioMessage", audioChunks);
      console.log("Message sent!");
    });

    mediaRecorder.start();
    document.getElementById("microphoneid").addEventListener("click", function(){
      mediaRecorder.stop();
    });
  });
}

function button3() {
  response = document.getElementById("response"),
    output = "Active: listener-mode";
  response.innerHTML = output;
  //button3_stream();
}
document.getElementById("streamid").addEventListener("click", button3);
document.getElementById("streamid").addEventListener("click", button3_stream);

function button3_stream() {
  socket.on("audioMessage", function (audioChunks) {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    console.log("Message streamed!");
  });
}
//document.getElementById("streamid").addEventListener("click", button3_stream);
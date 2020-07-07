function button1() {
  (response = document.getElementById("response")),
    (output = "Active: voices list");
  response.innerHTML = output;
}
document.getElementById("voicesid").onclick = button1;

function button2() {
  (response = document.getElementById("response")),
    (output = "Active: speaker-mode");
  response.innerHTML = output;
}
document.getElementById("microphoneid").onclick = button2;

function button3() {
  (response = document.getElementById("response")),
    (output = "Active: listener-mode");
  response.innerHTML = output;
}
document.getElementById("streamid").onclick = button3;
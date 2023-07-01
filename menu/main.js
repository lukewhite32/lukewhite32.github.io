var webSock = new WebSocket("ws://localhost:54321");//("wss://swaous.asuscomm.com/pookie/foodapp/foods");

function highlightButton(buttonObj) {
    buttonObj.style.backgroundColor = "white";
    buttonObj.style.color = "darkred";
}

function resetButtonColors(buttonObj) {
    buttonObj.style.backgroundColor = "darkred";
    buttonObj.style.color = "white";
}

function submitReport(text) {
    webSock.send("S:" + text);
}
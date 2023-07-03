var webSock = new WebSocket("ws://localhost:54321"); //("wss://swaous.asuscomm.com/pookie/foodapp/foods");

function highlightButton(buttonObj) {
    buttonObj.style.backgroundColor = "white";
    buttonObj.style.color = "darkred";
}

function resetButtonColors(buttonObj) {
    buttonObj.style.backgroundColor = "darkred";
    buttonObj.style.color = "white";
}

webSock.addEventListener('message', function (message) {
    if (message.data == "S:0") {
        document.getElementById("cooldown").innerHTML = "Wait! You are submitting reports too fast!";
    }
    else {
        document.getElementById("cooldown").value = "";
    }
});

function submitReport(text) {
    if (text != "") {
        webSock.send("S:"+text);
    }
}
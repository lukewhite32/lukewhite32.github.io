var webSock = new WebSocket("wss://swaous.asuscomm.com/pookie/foodapp/foods");

var hasItems = false;
var isGathering = false;
var allSuggestions = [];
webSock.addEventListener('message', function (message) {
    if (isGathering) {
        if (message.data.substring(0, 3) == "S?:") {
            if (message.data == "S?:EOF") {
                isGathering = false;
                hasItems = true;
                webSock.send("S?Y");
            }
            else {
                let i = message.data.split("S?:")[1];
                if ((i != "") || (i != "")) {
                    allSuggestions.push(i);
                }
                webSock.send("S?");
            }
        }

    }
});

function displaySuggestions() {
    document.getElementById("suggestions").innerHTML = "Loading suggestions...";
    if (webSock.readyState == WebSocket.CLOSED) {
        document.getElementById("conn-status").innerText = "Loading...";
    }
    else {
        document.getElementById("conn-status").innerText = "";
    }
    if (!isGathering && !hasItems) {
        allSuggestions = [];
        webSock.send("S?");
        isGathering = true;
    }
    if (hasItems) {
        document.getElementById("suggestions").innerHTML = "";
        allSuggestions.forEach(item => {
            let c = document.createElement('div');
            c.className = "content";
            c.innerText = item;
            document.getElementById("suggestions").appendChild(c);
        });
        if (document.getElementById("suggestions").innerHTML == "") {
            document.getElementById("suggestions").innerHTML = "(No suggestions have been made)";
        }
        clearInterval(_displaySuggestionsInterval);
    }

}

var _displaySuggestionsInterval = setInterval(displaySuggestions, 100);
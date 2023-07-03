var webSock = new WebSocket("wss://swaous.asuscomm.com/pookie/foodapp/foods");

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
        document.getElementById("submit-error").innerHTML = "Wait! You are submitting reports too fast!";
    }
    else {
        document.getElementById("submit-error").style.color = "green";
        document.getElementById("submit-error").innerHTML = "Submit successful";
    }
});

function submitReport(text) {
    document.getElementById("submit-error").style.color = "red";
    if (text != "") {
        if (text.length > 120) {
            document.getElementById("submit-error").innerHTML = "Your suggestion cannot exceed 120 characters! Current: " + text.length;
        }
        else {
            webSock.send("S:"+text);
            var sendDelay = false;
            var submitInterval = setInterval(function () {
                if (sendDelay) {
                    if (document.getElementById("submit-error").innerHTML == "Sending suggestion...") {
                        document.getElementById("submit-error").innerHTML = "Could not access server at this minute!";
                    }
                    clearInterval(submitInterval);
                }
                sendDelay = true;
            }, 1000)
            document.getElementById("submit-error").innerHTML = "Sending suggestion...";
        }
    }
}
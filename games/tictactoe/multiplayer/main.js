var webSock = new WebSocket("ws://192.168.12.112:8080")
var lastMessage = ""
var onHold = true;
var checkIfHold = 5;
var player = 0;
var connectionState = 0;
var isTurn = false;
var hasSetOnclicks = false;
var board = document.getElementById("the-grid");
var rows = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function isWin() {
    for (let x = 0; x < 3; x ++) {
        if (allEqual(rows[x], rows[x+3], rows[x+6]) && (rows[x] != 0)) {
            return true;
        }
    }
    for (let x = 0; x < 9; x += 3) {
        if (allEqual(rows[x], rows[x+1], rows[x+2]) && (rows[x] != 0)) {
            return true;
        }
    }
    if (allEqual(rows[0], rows[4], rows[8]) && rows[0] != 0) {
        return true;
    }
    if (allEqual(rows[2], rows[4], rows[6]) && rows[2] != 0) {
        return true;
    }
    return false;
}

webSock.addEventListener("message", (event) => {
    lastMessage = event.data;
});

function Send(v) {
    //if (!(webSock.readyState == WebSocket.CLOSED)) {
        webSock.send(v);
    //}
}

function isReady() {
    return !onHold && player;
}

function getOpposingPiece() {
    if (player == 1) {
        return 2;
    }
    return 1;
}

function setButtonOnclicks() {
    hasSetOnclicks = true;
    for (let x = 1; x < 10; x ++) {
        document.getElementById("slot-" + x).onclick = () => {
            Send(x-1);
            isTurn = false;
            rows[x] = player;
        }
    }
}

function displayBoard() {

}

function hideBoard() {

}

for (let x = 0; x < 9; x ++) {
    document.getElementsByClassName("grid-container")[0].children[x].children[0].onclick = () => {
        Send(x);
        isTurn = false;
        rows[x] = player;
    }
}

setInterval(() => {
    if (webSock.readyState == WebSocket.CLOSED) {
        if (connectionState != 0) {
            document.getElementById("all").innerHTML = '<h1>No connection to server!</h1><p>The server is not currently online. Try again another time.</p>';
            connectionState = 0;
        }
    }
    else if (onHold) {
        if (connectionState != 1) {
            document.getElementById("all").innerHTML = '<h1>You are currently on hold.</h1> <p>Searching for available games...</p>';
            connectionState = 1;
        }
    }
    else if (!onHold) {
        if (connectionState != 2) {
            connectionState = 2;
            document.getElementById("all").innerHTML = '<h1>Game founded!</h1><div class="grid-container"><div class="grid-item"><button id="slot-1" class="click-button"></button></div><div class="grid-item"><button id="slot-2" class="click-button"></button></div><div class="grid-item"><button id="slot-3" class="click-button"></button></div><div class="grid-item"><button id="slot-4" class="click-button"></button></div><div class="grid-item"><button id="slot-5" class="click-button"></button></div><div class="grid-item"><button id="slot-6" class="click-button"></button></div><div class="grid-item"><button id="slot-7" class="click-button"></button></div><div class="grid-item"><button id="slot-8" class="click-button"></button></div><div class="grid-item"><button id="slot-9" class="click-button"></button></div></div>'
        }
    }
    checkIfHold ++;
    console.log(checkIfHold);
    if (lastMessage[0] == "p" && (!player)) {
        player = lastMessage[lastMessage.length - 1];
        if (player == 1) {
            isTurn = true;
        }
        else {
            isTurn = false;
        }
    }
    else {
        if (!player) {
            Send("getPiece");
        }
    }
    if (player) {
        if (lastMessage[0] == "h") {
            
            if (lastMessage[lastMessage.length - 1] == "1") {
                onHold = true;
            }
            else {
                onHold = false;
            }
        }
        if (checkIfHold > 5) {
            checkIfHold = 0;
            Send("getHold");
        }
    }

    if (player && !onHold) {
        setButtonOnclicks();
        if (isTurn) {
            for (let x = 0; x < 9; x ++) {
                if (rows[x] == 1) {
                    let add = document.createElement('DIV');
                    x.className = "x-piece";
                    document.getElementsByClassName("grid-container")[0].children.splice(x, 1, add);
                    console.log(document.getElementsByClassName("grid-container")[0].children);
                }
                else if (rows[x] == 2) {
                    let add = document.createElement('DIV');
                    add.className = "o-piece";
                    document.getElementsByClassName("grid-container")[0].children.splice(x, 1, add);
                }
            }
        }
        else {
            for (let x = 0; x < document.getElementsByClassName("click-button").length; x ++) {
                document.getElementsByClassName("click-button")[x].disabled = true;
                document.getElementsByClassName("click-button")[x].style.visibility = 'hidden';
            }
            if (lastMessage[0] >= '0' && lastMessage[0] <= '9') {
                rows[lastMessage[0]] = getOpposingPiece();
            }
        }
    }
    board = document.getElementById("the-grid");
}, 200);
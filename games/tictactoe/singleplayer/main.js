var rows = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var player = 1;
var frozen = false;

function changeSlot(s, val) {
    rows[s] = val;
}

function changePlayer() {
    if (player == 1) {
        player = 2;
        return;
    }
    player = 1;
}

function allEqual(val1, val2, val3) {
    return (val1 == val3) && (val2 == val3) && (val1 == val2);
}

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

function updateBoard() {
    if (frozen) {
        return;
    }
    if (player == 1) {
        if (isWin()) {
            document.getElementById("turn").innerText = "O wins!";
            frozen = true;
        }
        else {
            document.getElementById("turn").innerText = "X's turn";
        }
    }
    else {
        if (isWin()) {
            document.getElementById("turn").innerText = "X wins!";
            frozen = true;
        }
        else {
            document.getElementById("turn").innerText = "O's turn";
        }
    }
    var board = document.getElementsByClassName("grid-container")[0];
    
    board.innerHTML = "";

    for (let x = 0; x < 9; x ++) {
        let add = document.createElement('DIV');
        add.className = "grid-item";
        if (rows[x] == 0) {
            let butt = document.createElement('BUTTON');
            butt.className = "click-button";
            if (!frozen) {            
                butt.onclick = () => { 
                    changeSlot(x, player);
                    changePlayer();
                    updateBoard();
                }
            }
            add.appendChild(butt);
        }
        else if (rows[x] == 1) {
            let x = document.createElement('DIV');
            x.className = "x-piece";
            add.appendChild(x);
        }
        else {
            let o = document.createElement('DIV');
            o.className = "o-piece";
            add.appendChild(o);
        }
        board.appendChild(add);
    }
}

function clear() {
    rows = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    player = 1;
    document.getElementById("turn").style.animationPlayState = "paused";
}

document.getElementById("c").onclick = () => {
    clear();
    frozen = false;
    updateBoard();
}
updateBoard();
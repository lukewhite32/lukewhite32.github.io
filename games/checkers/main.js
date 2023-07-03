var RED_PIECE = 1;
var BLACK_PIECE = 2;
var c = document.getElementById("the-canvas");
var ctx = c.getContext("2d");
var board = [0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0]

var activePiece = -1;   /* No active piece being selected */
var turn = BLACK_PIECE;

function getMousePosition(canvas, event) {       /* thanks stackoverflow */
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function changeTurn() {
    if (turn == RED_PIECE) {
        turn = BLACK_PIECE;
        document.getElementById("turn").innerText = "Black's turn";
        return;
    }
    document.getElementById("turn").innerText = "Red's turn";
    turn = RED_PIECE;
}

function convertCoordsToIndex(x, y) {
    return x + (8*y);
}

function isOddRow(i) {
    return (i % 16) > 8 && (i % 16) < 17;
}

function isValidMove(start, end, king, i) {
    if (board[end] != 0) {
        return false;
    }
    if (king) {
        if (((start - end) == 9) || ((start - end) == 7) || ((start - end) == -9) || ((start - end) == -7)) {
            return true;
        }
    }
    else { 
        if (i == RED_PIECE) {
            if ((start - end == -9) || (start - end == -7)) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (i == BLACK_PIECE) {
            if ((start - end == 9) || (start - end == 7)) {
                return true;
            }
            else {
                return false;
            }
        }
    
    }
    return false;
}

class Piece {
    constructor(srcNorm, srcKing, s) {
        this.srcNorm = srcNorm;
        this.srcKing = srcKing;
        this.pos = s;
        this.isKing = false;
        this.identifier = 0;
    }
    move(s) {
        board[pos] = 0;
        this.pos = s;
        board[s] = this;
    }

    init() {
        if (this.isKing) {
            ctx.drawImage(this.srcKing, (this.pos % 8) * 601/8, parseInt(this.pos / 8) * 601/8);
        }
        else {
            ctx.drawImage(this.srcNorm, (this.pos % 8) * 601/8, parseInt(this.pos / 8) * 601/8);
        }
    }

    moveSquare(x, y) {
        this.pos = convertCoordsToIndex(x, y);
        this.init();
        animateAll();
    }

    moveToSquare(i) {
        board[this.pos] = 0;
        this.pos = i;
        board[this.pos] = this;
        this.init();
        animateAll();
    }
};

class RedPiece extends Piece {
    constructor(srcNorm, srcKing, s) {
        super(srcNorm, srcKing, s);
        this.identifier = RED_PIECE;
    }
};

class BlackPiece extends Piece {
    constructor(srcNorm, srcKing, s) {
        super(srcNorm, srcKing, s);
        this.identifier = BLACK_PIECE;
    }
};

function drawBoard() {
    for (let x = 0; x < 601; x += 601/4) {
        for (let y = 0; y < 601; y += 601/4) {
            ctx.rect(x, y, 601/8, 601/8);
            ctx.rect(x+(601/8), y+(601/8), 601/8, 601/8);
            ctx.fill();
        }
    }
}

function drawPieces() {
    var blackKing = document.createElement('img');
    blackKing.src = "images/black-king.png";
    blackKing.style.position = "absolute";
    var blackNorm = document.createElement('img');
    blackNorm.src = "images/black-norm.png";
    blackNorm.style.position = "absolute";
    var redKing = document.createElement('img');
    redKing.src = "images/red-king.png";
    redKing.style.position = "absolute";
    var redNorm = document.createElement('img');
    redNorm.src = "images/red-norm.png";8
    redNorm.style.position = "absolute";

    for (let x = 0; x < 23; x += 2) {
        if ((x > 6) && (x < 16)) {
            board[x+1] = new RedPiece(redNorm, redKing, x + 1);
        }
        else {
            board[x] = new RedPiece(redNorm, redKing, x);
        }
    }
    for (let x = 40; x < 63; x += 2) {
        if ((x > 46) && (x < 56)) {
            board[x] = new BlackPiece(blackNorm, blackKing, x);
        }
        else {
            board[x+1] = new BlackPiece(blackNorm, blackKing, x + 1);
        }
    }
}

function updateAllPieces() {
    checkForKing();
    board.forEach(piece => {
        if (piece != 0) {
            piece.init();
        }
    });
}

function flipBoard() {
    board.reverse();
}

function animateAll() {
    ctx.clearRect(0, 0, c.width, c.height)
    drawBoard();
    updateAllPieces();
}

function checkForKing() {
    for (let x = 0; x < board.length; x ++) {
        if (board[x].identifier == RED_PIECE) {
            if (x >= 56 && x <= 63) {
                board[x].isKing = true;
            }
        }
        else if (board[x].identifier == BLACK_PIECE) {
            if (x >= 0 && x <= 7) {
                board[x].isKing = true;
            }
        }
    }
}

c.addEventListener("mousedown", function(e) {
    console.log("before: " + activePiece);
    let mousePos = getMousePosition(c, e);
    if (activePiece == -1) {
        if (isOddRow(convertCoordsToIndex(parseInt(mousePos.x / (601/8)), parseInt(mousePos.y / (601/8))))) {
            if (board[convertCoordsToIndex(parseInt(mousePos.x / (601/8)), parseInt(mousePos.y / (601/8)))] != 0) {      // if is valid square
                activePiece = convertCoordsToIndex(parseInt(mousePos.x / (601/8)), parseInt(mousePos.y / (601/8)));
            } 
        }
        else {
            if (((mousePos.x) % (601/4) < (601/8)) && board[convertCoordsToIndex(parseInt(mousePos.x / (601/8)))] != 0) {      // if is valid square
                activePiece = convertCoordsToIndex(parseInt(mousePos.x / (601/8)), parseInt(mousePos.y / (601/8)));
            }
        }
    }
    else {
        if (turn == board[activePiece].identifier) {
            if (isValidMove(activePiece, convertCoordsToIndex(parseInt(mousePos.x / (601/8)), parseInt(mousePos.y / (601/8))), board[activePiece].isKing, board[activePiece].identifier)) {
                board[activePiece].moveToSquare(convertCoordsToIndex(parseInt(mousePos.x / (601/8)), parseInt(mousePos.y / (601/8))));
                activePiece = -1;
                changeTurn();
            }
        }
        else {
            activePiece = -1;
        }
    }
});

drawPieces();
animateAll();
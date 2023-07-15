const RED_PIECE = 1;
const BLACK_PIECE = 2;
var canvasWidth;
const c = document.getElementById("the-canvas");
const ctx = c.getContext("2d");

if (window.innerWidth > window.innerHeight) {
    ctx.canvas.width = window.innerHeight * .9;
    ctx.canvas.height = window.innerHeight * .9;

    canvasWidth = window.innerHeight * .9;
}
else {
    ctx.canvas.width = window.innerWidth * .9;
    ctx.canvas.height = window.innerWidth * .9;

    canvasWidth = window.innerWidth * .9;
}
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

const blackKing = document.createElement('img');
blackKing.src = "images/black-king.png";
blackKing.style.position = "absolute";

const blackNorm = document.createElement('img');
blackNorm.src = "images/black-norm.png";
blackNorm.style.position = "absolute";

const redKing = document.createElement('img');
redKing.src = "images/red-king.png";
redKing.style.position = "absolute";

const redNorm = document.createElement('img');
redNorm.src = "images/red-norm.png";8
redNorm.style.position = "absolute";

const blackKingSel = document.createElement('img');
blackKingSel.src = "images/black-king-sel.png";
blackKingSel.style.position = "absolute";

const blackNormSel = document.createElement('img');
blackNormSel.src = "images/black-norm-sel.png";
blackNormSel.style.position = "absolute";

const redKingSel = document.createElement('img');
redKingSel.src = "images/red-king-sel.png";
redKingSel.style.position = "absolute";

const redNormSel = document.createElement('img');
redNormSel.src = "images/red-norm-sel.png";
redNormSel.style.position = "absolute";

function getMousePosition(canvas, event) {       /* thanks stackoverflow */
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function winBlack() {
    document.getElementById("winner").innerText = "Black wins!";
    document.getElementById("main-content").style.opacity = "50%";
    document.getElementById("winner-page").style.display = "block";
}

function winRed() {
    document.getElementById("winner").innerText = "Red wins!";
    document.getElementById("main-content").style.opacity = "50%";
    document.getElementById("winner-page").style.display = "block";
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

function colorWins(color) {
    for (let x = 0; x < board.length; x ++) {
        if (board[x] != 0) {
            if (board[x].identifier == color) {
                return false;
            }
        }
    }
    return true;
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
        else if (((start - end) == 18) || ((start - end) == 14) || ((start - end) == -18) || ((start - end) == -14) && board[start - ((start - end) / 2)] != 0) {
            if (board[start - ((start - end) / 2)].identifier != i) {
                board[start - ((start - end) / 2)] = 0;
                return true;
            }
        }
        else if (((start - end) == -36)) {
            if ((board[start - 9] != 0) && (board[start - 27] != 0)) {
                if ((board[start - 9].identifier != i) && (board[start - 27].identifier != i)) {
                    board[start - 9] = 0;
                    board[start - 27] = 0;
                    return true;
                }
            }
        }
        else if (((start - end) == -28)) {
            if ((board[start - 7] != 0) && (board[start - 21] != 0)) {
                if ((board[start - 7].identifier != i) && (board[start - 21].identifier != i)) {
                    board[start - 7] = 0;
                    board[start - 21] = 0;
                    return true;
                }
            }
        }
        else if (((start - end) == 36)) {
            if ((board[begin + 9] != 0) && (board[begin + 27] != 0)) {
                if ((board[begin + 9].identifier != i) && (board[begin + 27].identifier != i)) {
                    board[begin + 9] = 0;
                    board[begin + 27] = 0;
                    return true;
                }
            }
        }
        else if (((start - end) == 28)) {
            if ((board[start + 7] != 0) && (board[start + 21] != 0)) {
                if ((board[start + 7].identifier != i) && (board[start + 21].identifier != i)) {
                    board[start + 7] = 0;
                    board[start + 21] = 0;
                    return true;
                }
            }
        }
        else if (((start - end) == 32)) {
            if (board[start - 9] != 0 && board[start - 25] != 0 && board[start - 18] == 0) {
                if (board[start - 9].identifier != i && board[start - 25].identifier != i) {
                    return true;
                }
            }
            else if (board[start - 7] != 0 && board[start - 23] != 0 && board[start - 14] == 0) {
                if (board[start - 7].identifier != i && board[start - 23].identifier != i) {
                    return true;
                }
            }
        }
        else if (((start - end) == -32)) {
            if (board[start + 9] != 0 && board[start + 25] != 0 && board[start + 18] == 0) {
                if (board[start + 9].identifier != i && board[start + 25].identifier != i) {
                    return true;
                }
            }
            else if (board[start + 7] != 0 && board[start + 23] != 0 && board[start + 14] == 0) {
                if (board[start + 7].identifier != i && board[start + 23].identifier != i) {
                    return true;
                }
            }   
        }
    }
    else { 
        if (i == RED_PIECE) {
            if ((start - end == -9) || (start - end == -7)) {
                return true;
            }
            else if (((start - end) == -18) || ((start - end) == -14)) {
                if (board[start - ((start - end) / 2)] != 0) {
                    if (board[start - ((start - end) / 2)].identifier != i) {
                        board[start - ((start - end) / 2)] = 0;
                        return true;
                    }
                }
            }
            else if (((start - end) == -36)) {
                if ((board[start - 9] != 0) && (board[start - 27] != 0)) {
                    if ((board[start - 9].identifier != i) && (board[start - 27].identifier != i)) {
                        board[start - 9] = 0;
                        board[start - 27] = 0;
                        return true;
                    }
                }
            }
            else if (((start - end) == -28)) {
                if ((board[start - 7] != 0) && (board[start - 21] != 0)) {
                    if ((board[start - 7].identifier != i) && (board[start - 21].identifier != i)) {
                        board[start - 7] = 0;
                        board[start - 21] = 0;
                        return true;
                    }
                }
            }
            else if (((start - end) == -32)) {
                if (board[start + 9] != 0 && board[start + 25] != 0 && board[start + 18] == 0) {
                    if (board[start + 9].identifier != i && board[start + 25].identifier != i) {
                        board[start + 9] = 0;
                        board[start + 25] = 0;
                        return true;
                    }
                }
                else if (board[start + 7] != 0 && board[start + 23] != 0 && board[start + 14] == 0) {
                    if (board[start + 7].identifier != i && board[start + 23].identifier != i) {
                        board[start + 7] = 0;
                        board[start + 23] = 0;
                        return true;
                    }
                }   
            }
        }
        else if (i == BLACK_PIECE) {
            if ((start - end == 9) || (start - end == 7)) {
                return true;
            }
            else if (((start - end) == 18) || ((start - end) == 14)) {
                if (board[start - ((start - end) / 2)] != 0) {
                    if (board[start - ((start - end) / 2)].identifier != i) {
                        board[start - ((start - end) / 2)] = 0;
                        return true;                        
                    }
                }
            }
            else if (((start - end) == 36) || ((start - end) == 21) && board[start - ((start - end) / 2)] != 0) {
                if (board[start - ((start - end) / 2)].identifier != i) {
                    board[start - ((start - end) / 2)] = 0;
                    return true;
                }
            }
            else if (((start - end) == 28)) {
                if ((board[start - 7] != 0) && (board[start - 21] != 0)) {
                    if ((board[start - 7].identifier != i) && (board[start - 21].identifier != i)) {
                        board[start - 7] = 0;
                        board[start - 21] = 0;
                        return true;
                    }
                }
            }
            else if (((start - end) == 32)) {
                if (board[start - 9] != 0 && board[start - 25] != 0 && board[start - 18] == 0) {
                    if (board[start - 9].identifier != i && board[start - 25].identifier != i) {
                        board[start - 9] = 0;
                        board[start - 25] = 0;
                        return true;
                    }
                }
                else if (board[start - 7] != 0 && board[start - 23] != 0 && board[start - 14] == 0) {
                    if (board[start - 7].identifier != i && board[start - 23].identifier != i) {
                        board[start - 7] = 0;
                        board[start - 23] = 0;
                        return true;
                    }
                }
            }
        }
    
    }
    return false;
}

class Piece {
    constructor(srcNorm, srcKing, srcNormSel, srcKingSel, s) {
        this.srcNorm = srcNorm;
        this.srcKing = srcKing;
        this.srcNormSel = srcNormSel;
        this.srcKingSel = srcKingSel;
        this.pos = s;
        this.isKing = false;
        this.identifier = 0;
        this.currNorm = srcNorm;
        this.currKing = srcKing;
    }
    move(s) {
        board[pos] = 0;
        this.pos = s;
        board[s] = this;
    }

    init() {
        if (this.isKing) {
            ctx.drawImage(this.currKing, (this.pos % 8) * canvasWidth/8, parseInt(this.pos / 8) * canvasWidth/8, canvasWidth/8, canvasWidth/8);
        }
        else {
            ctx.drawImage(this.currNorm, (this.pos % 8) * canvasWidth/8, parseInt(this.pos / 8) * canvasWidth/8, canvasWidth/8, canvasWidth/8);
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
    constructor(srcNorm, srcKing, srcNormSel, srcKingSel, s) {
        super(srcNorm, srcKing, srcNormSel, srcKingSel, s);
        this.identifier = RED_PIECE;
    }

    select() {
        this.currKing = this.srcKingSel;
        this.currNorm = this.srcNormSel;
    }

    unselect() {
        this.currKing = this.srcKing;
        this.currNorm = this.srcNorm;
    }
};

class BlackPiece extends Piece {
    constructor(srcNorm, srcKing, srcNormSel, srcKingSel, s) {
        super(srcNorm, srcKing, srcNormSel, srcKingSel, s);
        this.identifier = BLACK_PIECE;
    }

    select() {
        this.currKing = this.srcKingSel;
        this.currNorm = this.srcNormSel;
    }

    unselect() {
        this.currKing = this.srcKing;
        this.currNorm = this.srcNorm;
    }
};

function drawBoard() {
    for (let x = 0; x < canvasWidth; x += canvasWidth/4) {
        for (let y = 0; y < canvasWidth; y += canvasWidth/4) {
            ctx.rect(x, y, canvasWidth/8, canvasWidth/8);
            ctx.rect(x+(canvasWidth/8), y+(canvasWidth/8), canvasWidth/8, canvasWidth/8);
            ctx.fill();
        }
    }
}

function drawPieces() {
    for (let x = 0; x < 23; x += 2) {
        if ((x > 6) && (x < 16)) {
            board[x+1] = new RedPiece(redNorm, redKing, redNormSel, redKingSel, x + 1);
        }
        else {
            board[x] = new RedPiece(redNorm, redKing, redNormSel, redKingSel, x);
        }
    }
    for (let x = 40; x < 63; x += 2) {
        if ((x > 46) && (x < 56)) {
            board[x] = new BlackPiece(blackNorm, blackKing, blackNormSel, blackKingSel, x);
        }
        else {
            board[x+1] = new BlackPiece(blackNorm, blackKing, blackNormSel, blackKingSel, x + 1);
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
    let mousePos = getMousePosition(c, e);
    if (activePiece == -1) {
        if (isOddRow(convertCoordsToIndex(parseInt(mousePos.x / (canvasWidth/8)), parseInt(mousePos.y / (canvasWidth/8))))) {
            if (board[convertCoordsToIndex(parseInt(mousePos.x / (canvasWidth/8)), parseInt(mousePos.y / (canvasWidth/8)))] != 0) {      // if is valid square
                activePiece = convertCoordsToIndex(parseInt(mousePos.x / (canvasWidth/8)), parseInt(mousePos.y / (canvasWidth/8)));
                if (board[activePiece].identifier != turn) {
                    activePiece = -1;
                }
                else {
                    board[activePiece].select();
                    animateAll();
                }
            } 
        }
        else {
            if (((mousePos.x) % (canvasWidth/4) < (canvasWidth/8)) && board[convertCoordsToIndex(parseInt(mousePos.x / (canvasWidth/8)))] != 0) {      // if is valid square
                activePiece = convertCoordsToIndex(parseInt(mousePos.x / (canvasWidth/8)), parseInt(mousePos.y / (canvasWidth/8)));
                if (board[activePiece].identifier != turn) {
                    activePiece = -1;
                }
                else {
                    board[activePiece].select();
                    animateAll();
                }
            }
        }
    }
    else {
        if (isValidMove(activePiece, convertCoordsToIndex(parseInt(mousePos.x / (canvasWidth/8)), parseInt(mousePos.y / (canvasWidth/8))), board[activePiece].isKing, board[activePiece].identifier)) {
            board[activePiece].unselect();
            board[activePiece].moveToSquare(convertCoordsToIndex(parseInt(mousePos.x / (canvasWidth/8)), parseInt(mousePos.y / (canvasWidth/8))));
            activePiece = -1;
            if (colorWins(turn)) {
                if (turn == RED_PIECE) {
                    winRed();
                }
                else {
                    winBlack();
                }
            }
            changeTurn();
        }
        else {
            board[activePiece].unselect();
            activePiece = -1;
            animateAll();
        }
    }
});

drawPieces();
animateAll();

document.body.onresize = (event) => {
    if (window.innerWidth > window.innerHeight) {
        ctx.canvas.width = window.innerHeight * .9;
        ctx.canvas.height = window.innerHeight * .9;
    
        canvasWidth = window.innerHeight * .9;
    }
    else {
        ctx.canvas.width = window.innerWidth * .9;
        ctx.canvas.height = window.innerWidth * .9;
    
        canvasWidth = window.innerWidth * .9;
    }
    animateAll();
};
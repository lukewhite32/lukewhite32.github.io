const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "24px Impact";

const HOLEMIN = 100;
const HOLEMAX = 400;
const PIPE_DISTANCE = 200;
const STARTING_DISTANCE = 250;
const BIRD_SIZE = 50;
const PIPE_WIDTH = 30;

var FORCE_UPWARD = 1.5;
var GRAVITY = .3;
var PIPE_SPEED = 3;

function isWithin(x1, sizeX1, x2, sizeX2) {
    return ((x1 < (x2 + sizeX2)) && ((x1 + sizeX1) > x2));
}

class Bird extends Sprite {
    constructor(plats, x=0, y=0, sX=50, sY=50) {
        super(x, y, sX, sY, false, 100, 20, true);
        this.plats = plats;

        this.vY = 0;

        this.FRAME = 20;
    }

    reset() {
        this.x = 120;
        this.y = 150;
        this.vY = 0;
    }

    jump() {
        bird.vY = -5*(1/FORCE_UPWARD);
    }

    updateVelocity() {
        this.prevY = this.y;
        this.y += this.vY;
        this.vY += GRAVITY;

        this.plats.forEach(p => {
            if ((!isWithin(this.prevX, this.sizeX, p.x, p.sizeX)) && isWithin(this.x, this.sizeX, p.x, p.sizeX) && isWithin(this.y, this.sizeY, p.y, p.sizeY)) {
                if (this.prevX > this.x) {
                    this.x = p.x + p.sizeX;
                }
                else {
                    this.x = p.x - this.sizeX;
                }
            }
            if ((!isWithin(this.prevY, this.sizeY, p.y, p.sizeY)) && isWithin(this.y, this.sizeY, p.y, p.sizeY) && isWithin(this.x, this.sizeX, p.x, p.sizeX)) {
                if (this.prevY > this.y) {
                    this.y = p.y + p.sizeY;
                }
                else {
                    this.y = p.y - this.sizeY;
                }
                this.vY = 0;
            }
        });
    }

    draw(ctx, x=this.x, y=this.y) {
        ctx.fillRect(x, y, this.sizeX, this.sizeY);
    }
}
var camera = new Camera(canvas, ctx, 0, -400);
var bird = new Bird(plats, 27, -30, 10, 50);

camera.addObj(bird);

plats.forEach(p => {
    camera.addObj(p);
});

var score = 0;

var leftButton = false;
var rightButton = false;

function main() {
    bird.updateVelocity();
    if (leftButton) {
        bird.moveX(-3);
    }
    if (rightButton) {
        bird.moveX(3);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    camera.update();
    ctx.fillText(bird.x, 10, 30);
    ctx.fillText(bird.y, 10, 60);

    requestAnimationFrame(main);
}

requestAnimationFrame(main);

document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    if (keyPressed == " ") {
        bird.jump();
        velocityUpdated = true;
    }
    if (keyPressed == "d") {
        rightButton = true;
    }
    else if (keyPressed == "a") {
        leftButton = true;
    }
  });

document.addEventListener('keyup', (event) => {
    const keyReleased = event.key;
    if (keyReleased == "d") {
        rightButton = false;
    }
    else if (keyReleased == "a") {
        leftButton = false;
    }
});


document.getElementById("gravity").addEventListener('change', () => {
    GRAVITY = (document.getElementById("gravity").value) / 100;
    
});

document.getElementById("force").addEventListener('change', () => {
    FORCE_UPWARD = (20 - document.getElementById("force").value) / 10;
});
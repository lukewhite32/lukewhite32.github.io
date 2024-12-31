const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "24px Impact";

const HOLEMIN = 100;
const HOLEMAX = 400;
const PIPE_DISTANCE = 200;
const STARTING_DISTANCE = 250;
const BIRD_SIZE = 50;
const PIPE_WIDTH = 30;

var FORCE_UPWARD = 1.15;
var GRAVITY = .2;
var PIPE_SPEED = 2.2;

class Bird {
    constructor() {
        
        this.x = 120;
        this.y = 250;
        this.vY = -4;
    }

    reset() {
        this.x = 120;
        this.y = 150;
        this.vY = -4;
    }

    updateVelocity() {
        this.y += this.vY;
        this.vY += GRAVITY;
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, BIRD_SIZE, BIRD_SIZE);
    }
}
//Math.floor(Math.random() * 101);

class Pipe {
    constructor(x) {
        this.x = x;
        this.holeY = Math.floor(Math.random() * 300) + 101;
        this.gap = 60;
        this.width = PIPE_WIDTH;
        this.countedScore = false;
    }

    draw(ctx) {
        ctx.fillRect(this.x, 0, this.width, (this.holeY - this.gap));
        ctx.fillRect(this.x, (this.holeY + this.gap), this.width, canvas.height - (this.holeY - this.gap));
    }
}

var velocityUpdated = false;

var bird = new Bird();
var pipes = [
    new Pipe(STARTING_DISTANCE),
    new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE)),
    new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE * 2)),
    new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE * 3)), //850
    new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE * 4))  //1050-280 + 200
];

function resetPipes() {
    pipes = [
        new Pipe(STARTING_DISTANCE),
        new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE)),
        new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE * 2)),
        new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE * 3)), //850
        new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE * 4))  //1050-280 + 200
    ];

    pipes[0].holeY = 125;

    score = 0;
}

var score = 0;

pipes[0].holeY = 125;

function main() {
    if (velocityUpdated) {
        bird.updateVelocity();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(score, 10, 30);

    bird.draw(ctx);
    for (var x = 0; x < 5; x ++) {
        if (((pipes[x].x + pipes[x].width) < bird.x) && !pipes[x].countedScore) {
            pipes[x].countedScore = true;
            score ++;
        }
        if (((bird.x + BIRD_SIZE) > pipes[x].x) && (bird.x < (pipes[x].x + pipes[x].width))) {
            if (((bird.y + BIRD_SIZE) > (pipes[x].holeY + pipes[x].gap)) || (bird.y < (pipes[x].holeY - pipes[x].gap))) {
                velocityUpdated = false;
                bird.reset();
                resetPipes();
            }
        }
        if ((pipes[x].x + pipes[x].width) <= 0) {
            pipes.splice(x, 1);
            pipes.push(new Pipe(STARTING_DISTANCE + (PIPE_DISTANCE * 4) - (STARTING_DISTANCE + pipes[x].width) + PIPE_DISTANCE));
            x --;
        }
        else {
            pipes[x].draw(ctx);
            if (velocityUpdated) {
                pipes[x].x -= PIPE_SPEED;
            }

        }
    }
    if ((bird.y <= 0) || (bird.y >= canvas.height)) {
        velocityUpdated = false;
        bird.reset();
        resetPipes();
    }

    requestAnimationFrame(main);
}
requestAnimationFrame(main);
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    if (keyPressed == " ") {
        bird.vY = -5*(1/FORCE_UPWARD);
    }
    velocityUpdated = true;
  });


document.getElementById("gravity").addEventListener('change', () => {
    GRAVITY = (document.getElementById("gravity").value) / 100;
});
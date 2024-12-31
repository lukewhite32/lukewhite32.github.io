class Sprite {
    constructor(x, y, sizeX, sizeY, isSolid, cameraLimitX, cameraLimitY, isFirstPerson) {
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.prevX = x;
        this.prevY = y;

        this.isSolid = isSolid;

        this.cameraLimitX = cameraLimitX;
        this.cameraLimitY = cameraLimitY;

        this.isFirstPerson = isFirstPerson;
    }

    moveX(amt) {
        this.prevX = this.x;
        this.x += amt;
    }

    moveY(amt) {
        this.prevY = this.y;
        this.y += amt;
    }

    draw(ctx, x, y) {

    }
}
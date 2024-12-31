class Platform extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h, true, 20, 20, false);
    }
    draw(ctx, x=this.x, y=this.y) {
        ctx.fillRect(x, y, this.sizeX, this.sizeY);
    }
}
class Camera {
    constructor(canvas, ctx, x=0, y=0) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.obj = [];
    }
    addObj(obj) {
        this.obj.push(obj);
    }

    update() {
        this.obj.forEach(o => {
            if (o.isFirstPerson) {
                if ((o.y + o.sizeY) > (this.y + this.canvas.height - o.cameraLimitY)) {
                    this.y += (o.y + o.sizeY) - (this.y + this.canvas.height - o.cameraLimitY)
                }
                if ((o.y) < (this.y + o.cameraLimitY)) {
                    this.y += (o.y) - (this.y + o.cameraLimitY);
                }

                if ((o.x + o.sizeX) > (this.x + this.canvas.width - o.cameraLimitX)) {
                    this.x += (o.x + o.sizeX) - (this.x + this.canvas.width - o.cameraLimitX)
                }
                if ((o.x) < (this.x + o.cameraLimitX)) {
                    this.x += (o.x) - (this.x + o.cameraLimitX);
                }
            }

            let absX = o.x - this.x;
            let absY = o.y - this.y;
            o.draw(this.ctx, absX, absY);
        });
    }
}
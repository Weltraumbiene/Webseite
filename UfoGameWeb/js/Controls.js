class Controls {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    show() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#00FF00";
        this.ctx.font = "20px 'Press Start 2P', Courier, sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Controls Placeholder", this.canvas.width / 2, this.canvas.height / 2);
    }
}

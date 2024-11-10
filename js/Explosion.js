class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'images/explosion.png'; // Pfad zum Bild
        this.frame = 0;  // Aktuelles Frame der Explosion
        this.frameLimit = 10; // Maximale Anzahl Frames für die Explosion
    }

    draw(ctx) {
        if (this.frame < this.frameLimit) {
            ctx.drawImage(this.image, this.x, this.y);
            this.frame++;
        }
    }

    isComplete() {
        return this.frame >= this.frameLimit;
    }
}
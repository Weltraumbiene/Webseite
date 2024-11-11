class Traktor2 {
    constructor(x, y) {
        this.x = x;  // Traktor startet von der rechten Seite
        this.y = y;
        this.width = 50;
        this.height = 50;

        // Traktor-Bild von rechts
        this.image = new Image();
        this.image.src = 'images/tractorRight.png';
    }

    // Traktor bewegt sich nach links
    move() {
        this.x -= 2;  // Geschwindigkeit von 2 nach links
    }

    // Zeichnen des Traktors auf dem Canvas
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Kollisionsprüfung mit dem UFO
    collidesWith(ufo) {
        return (
            this.x < ufo.getX() + ufo.width &&
            this.x + this.width > ufo.getX() &&
            this.y < ufo.getY() + ufo.height &&
            this.y + this.height > ufo.getY()
        );
    }
}

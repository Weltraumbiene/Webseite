class Traktor2 {
    constructor(x, y) {
        // Position des Traktors
        this.x = x;
        this.y = y;

        // Größe des Traktors
        this.width = 50;
        this.height = 50;

        // Bild des Traktors
        this.image = new Image();
        this.image.src = 'images/tractorRight.png';
    }

    // Diese Methode bewegt den Traktor nach links
    move() {
        // Der Traktor bewegt sich mit einer Geschwindigkeit von 2 nach links
        this.x -= 2; // Traktor bewegt sich nach links
    }

    // Diese Methode zeichnet den Traktor auf dem Canvas
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Diese Methode prüft, ob der Traktor mit dem UFO kollidiert
    collidesWith(ufo) {
        return (
            this.x < ufo.getX() + ufo.width &&
            this.x + this.width > ufo.getX() &&
            this.y < ufo.getY() + ufo.height &&
            this.y + this.height > ufo.getY()
        );
    }
}

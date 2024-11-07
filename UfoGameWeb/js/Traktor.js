class Traktor {
    constructor(x, y) {
        // Position des Traktors
        this.x = x;
        this.y = y;
        
        // Größe des Traktors
        this.width = 50;
        this.height = 50;

        // Bild des Traktors
        this.image = new Image();
        this.image.src = 'images/tractor.png';
    }

    // Diese Methode bewegt den Traktor nach rechts
    move() {
        // Der Traktor bewegt sich mit einer Geschwindigkeit von 2 nach rechts
        this.x += 2; // Traktor bewegt sich nach rechts
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

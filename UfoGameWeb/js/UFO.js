// Definiert die UFO-Klasse
class UFO {
    constructor(x, y) {
        // Position des UFOs auf dem Canvas
        this.x = x;
        this.y = y;
        
        // Größe des UFOs (Breite und Höhe)
        this.width = 100;
        this.height = 60;

        // Geschwindigkeit des UFOs
        this.dx = 0;
        this.dy = 0;

        // Erzeugt ein neues Image-Objekt für das UFO-Bild
        this.image = new Image();

        // Setzt das Bild des UFOs, das aus dem 'images/ufo.png' geladen wird
        this.image.src = 'images/ufo.png';
    }

    // Diese Methode bewegt das UFO basierend auf der Geschwindigkeit dx und dy
    move() {
        // Bewege das UFO basierend auf der Geschwindigkeit in x- und y-Richtung
        this.x += this.dx;
        this.y += this.dy;
    
        // Begrenze das UFO innerhalb des Canvas:
        // Canvas-Größe: 1000x500
        if (this.x < 0) this.x = 0; // Verhindert, dass das UFO links aus dem Canvas herausgeht
        if (this.x > 1000 - this.width) this.x = 1000 - this.width; // Verhindert, dass das UFO rechts aus dem Canvas herausgeht
        if (this.y < 0) this.y = 0; // Verhindert, dass das UFO oben aus dem Canvas herausgeht
        if (this.y > 500 - this.height) this.y = 500 - this.height; // Verhindert, dass das UFO unten aus dem Canvas herausgeht
    }

    // Diese Methode zeichnet das UFO auf dem Canvas
    draw(ctx) {
        // Zeichnet das UFO-Bild auf dem Canvas
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Diese Methode prüft, ob das UFO mit einem anderen Objekt kollidiert
    collidesWith(other) {
        return (
            // Prüft, ob die Rechtecke (UFO und anderes Objekt) sich überschneiden
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    // Setzt die Geschwindigkeit des UFOs in der x-Richtung
    setDx(dx) {
        this.dx = dx;
    }

    // Setzt die Geschwindigkeit des UFOs in der y-Richtung
    setDy(dy) {
        this.dy = dy;
    }

    // Gibt die x-Position des UFOs zurück
    getX() {
        return this.x;
    }

    // Gibt die y-Position des UFOs zurück
    getY() {
        return this.y;
    }
}

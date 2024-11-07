// Definiert eine Kuh-Klasse
class Kuh {
    constructor(x, y) {
        // Position der Kuh auf dem Canvas
        this.x = x;  
        this.y = y;
        
        // Größe der Kuh (Breite und Höhe)
        this.width = 50;
        this.height = 35;

        // Erzeugt ein neues Image-Objekt für das Kuh-Bild
        this.image = new Image();
        
        // Setzt das Bild der Kuh, das aus dem 'images/cow.png' geladen wird
        this.image.src = 'images/cow.png';
    }

    // Diese Methode zeichnet die Kuh auf dem Canvas
    draw(ctx) {
        // Zeichnet das Kuh-Bild auf dem Canvas, basierend auf x, y, width und height
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

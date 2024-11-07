class UfoGame {
    constructor() {
        // Holt sich das Canvas-Element aus der HTML-Seite
        this.canvas = document.getElementById('gameCanvas');
        
        // Holt sich den 2D-Kontext, um auf dem Canvas zu zeichnen
        this.ctx = this.canvas.getContext('2d');
        
        // Erstellt ein neues UFO-Objekt an der Position (300, 100)
        this.ufo = new UFO(300, 100);

        // Arrays für Traktoren und Kühe
        this.traktoren = [];
        this.kuehe = [];

        // Spiel-Status (Spiel ist zu Beginn nicht vorbei)
        this.gameOver = false;

        // Hintergrundbild laden
        this.background = new Image();
        this.background.src = 'images/background.png';  // Pfad zu deinem Hintergrundbild

        // Setzt die Größe des Canvas
        this.canvas.width = 1000;
        this.canvas.height = 500;

        // Punktestand initialisieren
        this.cowsCollected = 0;

        // Intervall-Id für Traktor-Spawning
        this.traktorSpawnInterval = null;

        // Startet die Traktoren und Kühe
        this.spawnTraktorMitZufallsIntervall();
        this.spawnKuh();

        // Hört auf Tastaturereignisse für die Bewegung des UFOs
        document.addEventListener('keydown', (e) => this.keyPressed(e));
        document.addEventListener('keyup', (e) => this.keyReleased(e));

        // Fügt einen Event-Listener für das Neustarten des Spiels hinzu
        document.addEventListener('keydown', (e) => this.restartGame(e));

        // Startet das Spiel-Update alle 15 Millisekunden (ca. 60 FPS)
        this.gameLoop = setInterval(() => this.update(), 15);
    }

    // Diese Methode startet die Traktoren-Spawning mit einem zufälligen Intervall
    spawnTraktorMitZufallsIntervall() {
        // Spawnt einen neuen Traktor
        this.spawnTraktoren();
    
        // Berechnet ein zufälliges Intervall zwischen 2000 und 5000 Millisekunden
        const zufallsIntervall = 2000 + Math.random() * 3000;
    
        // Setzt den Timeout mit dem zufälligen Intervall
        this.traktorSpawnInterval = setTimeout(() => this.spawnTraktorMitZufallsIntervall(), zufallsIntervall);
    }

    // Diese Methode erstellt Traktoren an zufälligen Positionen im unteren Drittel des Canvas
    spawnTraktoren() {
        // Erzeugt einen Traktor, der immer von links außerhalb des Canvas kommt
        let x = -50;  // Startet immer außerhalb des sichtbaren Bereichs links
        
        // Zufällige y-Position für den Traktor im unteren Drittel des Canvas (zwischen 300 und 500)
        let y = 410 + Math.random() * 45;
    
        // Fügt einen neuen Traktor zum Array hinzu
        this.traktoren.push(new Traktor(x, y));
    }

    // Diese Methode erstellt Kühe an zufälligen Positionen
    spawnKuh() {
        // Zufällige x-Position für die Kuh, innerhalb des Canvas (mit Abstand zu den Rändern)
        let x = 50 + Math.random() * 900;  // Kühe erscheinen irgendwo zwischen 50 und 950

        // Zufällige y-Position für die Kuh, zwischen 300 und 480 (unterer Bereich)
        let y = 425 + Math.random() * 40; // Bereich von 5 bis 150

        // Fügt eine neue Kuh zum Array hinzu
        this.kuehe.push(new Kuh(x, y));
    }

    // Diese Methode wird in jedem Frame aufgerufen, um das Spiel zu aktualisieren
    update() {
        if (!this.gameOver) {
            this.ufo.move();  // UFO bewegt sich
    
            // Traktoren bewegen und Kollision prüfen
            this.traktoren.forEach((traktor, index) => {
                traktor.move();  // Traktor bewegt sich
                if (traktor.collidesWith(this.ufo)) {
                    this.gameOver = true;  // Spiel endet bei Kollision
                    clearInterval(this.gameLoop);  // Stoppt das Spiel
                    clearTimeout(this.traktorSpawnInterval);  // Stoppt das Traktor-Spawning-Intervall
                }
    
                // Entfernt Traktoren, die den Bildschirm verlassen haben
                if (traktor.x > this.canvas.width || traktor.x + traktor.width < 0) {
                    this.traktoren.splice(index, 1);  // Entfernt den Traktor
                }
            });
    
            // Kühe spawnen und Kollision prüfen
            this.kuehe.forEach((kuh, index) => {
                if (this.ufo.collidesWith(kuh)) {
                    this.kuehe.splice(index, 1);  // Entfernt die kollidierte Kuh
                    this.spawnKuh();  // Spawnt eine neue Kuh

                    // Erhöht den Punktestand um 1
                    this.cowsCollected += 1;
                }
            });
    
            // Spiel aktualisieren und zeichnen
            this.draw();
        }
    }

    // Diese Methode zeichnet das gesamte Spiel auf dem Canvas
    draw() {
        // Hintergrundbild zeichnen
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

        // Zeichnet das UFO
        this.ufo.draw(this.ctx);

        // Zeichnet alle Traktoren
        this.traktoren.forEach(traktor => traktor.draw(this.ctx));
        
        // Zeichnet alle Kühe
        this.kuehe.forEach(kuh => kuh.draw(this.ctx));

        // Zeichnet den Punktestand oben rechts
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Collected Cows: " + this.cowsCollected.toString().padStart(3, '0'), this.canvas.width - 200, 30);

        // Wenn das Spiel vorbei ist, zeigt es "Game Over" an
        if (this.gameOver) {
            this.ctx.fillStyle = "white";
            this.ctx.font = "30px Arial";
            this.ctx.fillText("Game Over", 250, 200);
            this.ctx.fillText("Press Enter to Restart", 250, 250);
        }
    }

    // Diese Methode wird aufgerufen, wenn eine Taste gedrückt wird
    keyPressed(e) {
        // Bewegt das UFO in die entsprechende Richtung
        if (e.key === 'w') this.ufo.setDy(-5);
        if (e.key === 's') this.ufo.setDy(5);
        if (e.key === 'a') this.ufo.setDx(-5);
        if (e.key === 'd') this.ufo.setDx(5);
    }

    // Diese Methode wird aufgerufen, wenn eine Taste losgelassen wird
    keyReleased(e) {
        // Stoppt die Bewegung des UFOs, wenn die Taste losgelassen wird
        if (e.key === 'w' || e.key === 's') this.ufo.setDy(0);
        if (e.key === 'a' || e.key === 'd') this.ufo.setDx(0);
    }

    // Diese Methode startet das Spiel neu, wenn "Enter" gedrückt wird
    restartGame(e) {
        if (e.key === 'Enter' && this.gameOver) {
            // Setzt alle Spielvariablen zurück
            this.gameOver = false;
            this.cowsCollected = 0;
            this.traktoren = [];
            this.kuehe = [];
            this.ufo = new UFO(300, 100);

            // Stoppt das vorherige Intervall für das Traktor-Spawning, falls vorhanden
            clearTimeout(this.traktorSpawnInterval);

            // Startet die Traktoren und Kühe neu
            this.spawnTraktorMitZufallsIntervall();
            this.spawnKuh();

            // Startet die Spiel-Logik neu
            this.gameLoop = setInterval(() => this.update(), 15);
        }
    }
}

// Startet das Spiel
const game = new UfoGame();

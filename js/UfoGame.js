class UfoGame {
    constructor() {
        // Canvas und Startwerte
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ufo = new UFO(300, 100);
        this.traktoren = [];
        this.traktorRechts = [];
        this.kuehe = [];
        this.explosions = [];
        this.gameOver = false;
        this.showGameOverMessage = false;
        this.cowsCollected = 0;

        // Gegner-Verwaltung
        this.gegner = new Gegner(this);

        // Hintergrundbild
        this.background = new Image();
        this.background.src = 'images/background.png';

        // Canvas-Größe
        this.canvas.width = 1000;
        this.canvas.height = 500;

        // Event-Listener
        document.addEventListener('keydown', (e) => this.keyPressed(e));
        document.addEventListener('keyup', (e) => this.keyReleased(e));
        document.addEventListener('keydown', (e) => this.restartGame(e));

        // Startet das Spiel
        this.gameLoop = setInterval(() => this.update(), 15);

        // Initialisiert das Spiel
        this.startGame();
    }

    update() {
        if (!this.gameOver) {
            // UFO-Bewegung
            this.ufo.move();

            // Traktoren
            this.traktoren.forEach((traktor, index) => {
                traktor.move();

                // Kollisionsprüfung mit UFO
                if (traktor.collidesWith(this.ufo)) {
                    this.explosions.push(new Explosion(this.ufo.x, this.ufo.y));
                    this.gameOver = true;
                    setTimeout(() => {
                        this.showGameOverMessage = true;
                    }, 1500);
                }

                if (traktor.x > this.canvas.width) {
                    this.traktoren.splice(index, 1); // Entferne den Traktor, wenn er aus dem Bildschirm ist
                }
            });

            // Traktor von rechts
            this.traktorRechts.forEach((traktorRechts, index) => {
                traktorRechts.move();

                // Kollisionsprüfung mit UFO
                if (traktorRechts.collidesWith(this.ufo)) {
                    this.explosions.push(new Explosion(this.ufo.x, this.ufo.y));
                    this.gameOver = true;
                    setTimeout(() => {
                        this.showGameOverMessage = true;
                    }, 1500);
                }

                if (traktorRechts.x < -50) { // Wenn der Traktor aus dem Bildschirm links verschwindet
                    this.traktorRechts.splice(index, 1); // Entfernen
                }
            });

            // Explosionen aktualisieren
            this.explosions = this.explosions.filter(explosion => !explosion.isComplete());

            // Kühe prüfen und sammeln
            this.kuehe.forEach((kuh, index) => {
                if (this.ufo.collidesWith(kuh)) {
                    this.kuehe.splice(index, 1);
                    this.spawnKuh();
                    this.cowsCollected += 1;
                    this.checkKuhSammlung(); // Überprüfen, ob die 30 Kühe erreicht wurden
                }
            });
        }
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

        // Zeichne UFO, wenn kein Game Over
        if (!this.showGameOverMessage && !this.gameOver) {
            this.ufo.draw(this.ctx);
        }

        // Zeichne Traktoren und Kühe
        if (!this.gameOver) {
            this.traktoren.forEach(traktor => traktor.draw(this.ctx));
            this.traktorRechts.forEach(traktorRechts => traktorRechts.draw(this.ctx));
            this.kuehe.forEach(kuh => kuh.draw(this.ctx));
        }

        // Explosionen anzeigen
        this.explosions.forEach(explosion => explosion.draw(this.ctx));

        // Anzeigen von gesammelten Kühen
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Collected Cows: " + this.cowsCollected.toString().padStart(3, '0'), this.canvas.width - 200, 30);

        // Game Over Nachricht
        if (this.showGameOverMessage) {
            this.ctx.fillStyle = "#00FF00";
            this.ctx.font = "bold 30px 'Press Start 2P', Courier, sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2 - 30);
            this.ctx.fillText("Press Enter to Restart", this.canvas.width / 2, this.canvas.height / 2 + 30);
        }
    }

    keyPressed(e) {
        if (!this.gameOver) {
            if (e.key === 'w') this.ufo.setDy(-5);
            if (e.key === 's') this.ufo.setDy(5);
            if (e.key === 'a') this.ufo.setDx(-5);
            if (e.key === 'd') this.ufo.setDx(5);
        }
    }

    keyReleased(e) {
        if (e.key === 'w' || e.key === 's') this.ufo.setDy(0);
        if (e.key === 'a' || e.key === 'd') this.ufo.setDx(0);
    }

    startGame() {
        this.ufo = new UFO(300, 100);
        this.traktoren = [];
        this.traktorRechts = [];
        this.kuehe = [];
        this.explosions = [];
        this.cowsCollected = 0;
        this.gameOver = false;
        this.showGameOverMessage = false;

        // Gegner-Starten
        this.gegner.spawnTraktorMitZufallsIntervall();
        this.gegner.spawnTraktorRechtsMitZufallsIntervall();
        this.spawnKuh();
    }

    restartGame(e) {
        if (e.key === 'Enter' && this.showGameOverMessage) {
            clearInterval(this.gameLoop);

            this.gameOver = false;
            this.showGameOverMessage = false;
            this.cowsCollected = 0;
            this.traktoren = [];
            this.traktorRechts = [];
            this.kuehe = [];
            this.explosions = [];
            this.ufo = new UFO(300, 100);
            this.ufo.setDx(0);
            this.ufo.setDy(0);

            this.gegner.stopTraktorSpawnen();
            this.gegner.resetTraktorSpawnRate(); // Reset der Spawnrate

            this.gegner.stopTraktorRechtsSpawnen();
            this.gegner.resetTraktorRechtsSpawnRate();

            this.gegner.spawnTraktorMitZufallsIntervall();
            this.gegner.spawnTraktorRechtsMitZufallsIntervall();
            this.spawnKuh();

            this.gameLoop = setInterval(() => this.update(), 15);
        }
    }

    spawnKuh() {
        let x = 50 + Math.random() * 900;
        let y = 425 + Math.random() * 40;
        this.kuehe.push(new Kuh(x, y));
    }

    checkKuhSammlung() {
        if (this.cowsCollected === 10) {
            this.gegner.increaseTraktorSpawnRate();
        }
        if (this.cowsCollected === 30) {
            this.gegner.increaseTraktorRechtsSpawnRate();
        }
    }
}

const game = new UfoGame();

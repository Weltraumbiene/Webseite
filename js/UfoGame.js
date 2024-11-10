class UfoGame {
    constructor() {
        // Canvas und Startwerte
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ufo = new UFO(300, 100);
        this.traktoren = [];
        this.kuehe = [];
        this.explosions = [];
        this.gameOver = false;
        this.showGameOverMessage = false;
        this.cowsCollected = 0;

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

            // Explosionen aktualisieren
            this.explosions = this.explosions.filter(explosion => !explosion.isComplete());

            // Kühe prüfen und sammeln
            this.kuehe.forEach((kuh, index) => {
                if (this.ufo.collidesWith(kuh)) {
                    this.kuehe.splice(index, 1);
                    this.spawnKuh();
                    this.cowsCollected += 1;
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
        this.kuehe = [];
        this.explosions = [];
        this.cowsCollected = 0;
        this.gameOver = false;
        this.showGameOverMessage = false;

        this.spawnTraktorMitZufallsIntervall();
        this.spawnKuh();
    }

    restartGame(e) {
        if (e.key === 'Enter' && this.showGameOverMessage) {
            clearInterval(this.gameLoop);

            this.gameOver = false;
            this.showGameOverMessage = false;
            this.cowsCollected = 0;
            this.traktoren = [];
            this.kuehe = [];
            this.explosions = [];
            this.ufo = new UFO(300, 100);
            this.ufo.setDx(0);
            this.ufo.setDy(0);

            clearTimeout(this.traktorSpawnInterval);

            this.spawnTraktorMitZufallsIntervall();
            this.spawnKuh();

            this.gameLoop = setInterval(() => this.update(), 15);
        }
    }

    spawnTraktorMitZufallsIntervall() {
        this.spawnTraktoren();
        const zufallsIntervall = 2000 + Math.random() * 3000;
        this.traktorSpawnInterval = setTimeout(() => this.spawnTraktorMitZufallsIntervall(), zufallsIntervall);
    }

    spawnTraktoren() {
        let x = -50;
        let y = 410 + Math.random() * 45;
        this.traktoren.push(new Traktor(x, y));
    }

    spawnKuh() {
        let x = 50 + Math.random() * 900;
        let y = 425 + Math.random() * 40;
        this.kuehe.push(new Kuh(x, y));
    }
}

const game = new UfoGame();

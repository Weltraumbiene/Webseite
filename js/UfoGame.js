class UfoGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ufo = new UFO(300, 100);
        this.traktoren = [];
        this.traktorRechts = [];
        this.kuehe = [];
        this.redCows = [];
        this.explosions = [];
        this.gameOver = false;
        this.showGameOverMessage = false;
        this.cowsCollected = 0;

        // Gegner-Management
        this.gegner = new Gegner(this);

        // Hintergrundbild
        this.background = new Image();
        this.background.src = 'images/background.png';

        this.canvas.width = 1000;
        this.canvas.height = 500;

        document.addEventListener('keydown', (e) => this.keyPressed(e));
        document.addEventListener('keyup', (e) => this.keyReleased(e));
        document.addEventListener('keydown', (e) => this.restartGame(e));

        this.gameLoop = setInterval(() => this.update(), 15);
        this.startGame();
    }

    update() {
        if (!this.gameOver) {
            this.ufo.move();

            this.traktoren.forEach((traktor, index) => {
                traktor.move();
                if (traktor.collidesWith(this.ufo)) {
                    this.explosions.push(new Explosion(this.ufo.x, this.ufo.y));
                    this.gameOver = true;
                    setTimeout(() => {
                        this.showGameOverMessage = true;
                    }, 100);
                }
                if (traktor.x > this.canvas.width) {
                    this.traktoren.splice(index, 1);
                }
            });

            if (this.cowsCollected >= 2) {
                this.traktorRechts.forEach((traktorRechts, index) => {
                    traktorRechts.move();
                    if (traktorRechts.collidesWith(this.ufo)) {
                        this.explosions.push(new Explosion(this.ufo.x, this.ufo.y));
                        this.gameOver = true;
                        setTimeout(() => {
                            this.showGameOverMessage = true;
                        }, 1500);
                    }
                    if (traktorRechts.x < -50) {
                        this.traktorRechts.splice(index, 1);
                    }
                });
            }

            this.redCows.forEach((redCow, index) => {
                if (this.ufo.collidesWith(redCow)) {
                    this.explosions.push(new Explosion(this.ufo.x, this.ufo.y));
                    this.gameOver = true;
                    setTimeout(() => {
                        this.showGameOverMessage = true;
                    }, 100);
                }
            });

            this.explosions = this.explosions.filter(explosion => !explosion.isComplete());

            this.kuehe.forEach((kuh, index) => {
                if (this.ufo.collidesWith(kuh)) {
                    this.kuehe.splice(index, 1);
                    this.spawnKuh();
                    this.cowsCollected += 1;
                    this.checkKuhSammlung();
                }
            });
        }
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

        if (!this.gameOver) {
            this.ufo.draw(this.ctx);
            this.traktoren.forEach(traktor => traktor.draw(this.ctx));
            this.traktorRechts.forEach(traktorRechts => traktorRechts.draw(this.ctx));
            this.kuehe.forEach(kuh => kuh.draw(this.ctx));
            this.redCows.forEach(redCow => redCow.draw(this.ctx));
        }

        this.explosions.forEach(explosion => explosion.draw(this.ctx));

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Collected Cows: ${this.cowsCollected.toString().padStart(3, '0')}`, this.canvas.width - 200, 30);

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
        if (['w', 's'].includes(e.key)) this.ufo.setDy(0);
        if (['a', 'd'].includes(e.key)) this.ufo.setDx(0);
    }

    startGame() {
        this.gegner.spawnTraktorMitZufallsIntervall();
        this.spawnKuh();
        // Spawn anderer Einheiten wird nicht automatisch gestartet, sondern durch checkKuhSammlung aktiviert
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
            this.redCows = [];
            this.explosions = [];
            this.ufo = new UFO(300, 100);
            this.ufo.setDx(0);
            this.ufo.setDy(0);

            this.gegner.stopTraktorSpawnen();
            this.gegner.stopRedCowSpawning();
            this.gegner.resetTraktorSpawnRate();
            this.gegner.resetTraktorRechtsSpawnRate();

            this.startGame();
            this.gameLoop = setInterval(() => this.update(), 15);
        }
    }

    spawnKuh() {
        let x = 50 + Math.random() * 900;
        let y = 425 + Math.random() * 40;
        this.kuehe.push(new Kuh(x, y));
    }

    checkKuhSammlung() {
        if (this.cowsCollected === 15) {
            this.gegner.increaseTraktorSpawnRate();
        }
        if (this.cowsCollected === 30) {
            this.gegner.spawnRedCowWithRandomInterval();
        }
        if (this.cowsCollected === 45) {
            this.gegner.spawnTraktorRechtsMitZufallsIntervall();
        }
    }
}

const game = new UfoGame();

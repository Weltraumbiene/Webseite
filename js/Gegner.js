class Gegner {
    constructor(game) {
        this.game = game;
        this.traktorSpawnInterval = null;
        this.traktorRechtsSpawnInterval = null;
        this.spawnRate = { min: 3000, max: 4000 }; // Anfangs-Spawnrate für Traktoren
        this.spawnRateRechts = { min: 4000, max: 5000 }; // Anfangs-Spawnrate für Traktoren von rechts
    }

    spawnTraktorMitZufallsIntervall() {
        this.spawnTraktoren();
        const zufallsIntervall = this.spawnRate.min + Math.random() * (this.spawnRate.max - this.spawnRate.min);
        this.traktorSpawnInterval = setTimeout(() => this.spawnTraktorMitZufallsIntervall(), zufallsIntervall);
    }

    spawnTraktorRechtsMitZufallsIntervall() {
        this.spawnTraktorRechts();
        const zufallsIntervall = this.spawnRateRechts.min + Math.random() * (this.spawnRateRechts.max - this.spawnRateRechts.min);
        this.traktorRechtsSpawnInterval = setTimeout(() => this.spawnTraktorRechtsMitZufallsIntervall(), zufallsIntervall);
    }

    spawnTraktoren() {
        let x = -50;
        let y = 410 + Math.random() * 45;
        this.game.traktoren.push(new Traktor(x, y));
    }

    spawnTraktorRechts() {
        let x = this.game.canvas.width + 50;
        let y = 410 + Math.random() * 45;
        this.game.traktorRechts.push(new Traktor2(x, y));
    }

    stopTraktorSpawnen() {
        clearTimeout(this.traktorSpawnInterval);
    }

    stopTraktorRechtsSpawnen() {
        clearTimeout(this.traktorRechtsSpawnInterval);
    }

    increaseTraktorSpawnRate() {
        // Reduziere das Intervall für Traktoren von links
        this.spawnRate = { min: 2000, max: 3000 };
    }

    resetTraktorSpawnRate() {
        this.spawnRate = { min: 3000, max: 4000 };
    }

    increaseTraktorRechtsSpawnRate() {
        // Reduziere das Intervall für Traktoren von rechts
        this.spawnRateRechts = { min: 3000, max: 4000 };
    }

    resetTraktorRechtsSpawnRate() {
        this.spawnRateRechts = { min: 4000, max: 5000 };
    }
}

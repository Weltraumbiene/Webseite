class Gegner {
    constructor(game) {
        this.game = game;
        this.traktorSpawnInterval = null;
        this.spawnRate = { min: 3000, max: 4000 }; // Anfangs-Spawnrate
    }

    spawnTraktorMitZufallsIntervall() {
        this.spawnTraktoren();
        const zufallsIntervall = this.spawnRate.min + Math.random() * (this.spawnRate.max - this.spawnRate.min);
        this.traktorSpawnInterval = setTimeout(() => this.spawnTraktorMitZufallsIntervall(), zufallsIntervall);
    }

    spawnTraktoren() {
        let x = -50;
        let y = 410 + Math.random() * 45;
        this.game.traktoren.push(new Traktor(x, y));
    }

    stopTraktorSpawnen() {
        clearTimeout(this.traktorSpawnInterval);
    }

    increaseTraktorSpawnRate() {
        // Reduziere das Intervall auf 2000-3000 Millisekunden, wenn 15 Kühe gesammelt wurden
        this.spawnRate = { min: 2000, max: 3000 };
    }

    resetTraktorSpawnRate() {
        // Setze die Spawnrate zurück auf die Anfangswerte
        this.spawnRate = { min: 3000, max: 4000 };
    }
}
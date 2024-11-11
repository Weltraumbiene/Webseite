class Gegner {
    constructor(game) {
        this.game = game;
        this.traktorSpawnInterval = null;
        this.traktorRechtsSpawnInterval = null;
        this.redCowSpawnInterval = null; // Intervall für das Spawnen der Roten Kuh
        this.spawnRate = { min: 5000, max: 6000 }; // Spawnrate für Traktoren von links
        this.spawnRateRechts = { min: 4000, max: 5000 }; // Spawnrate für Traktoren von rechts
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

    spawnRedCowWithRandomInterval() {
        const interval = 10000 + Math.random() * 16000; // Spawnt alle 20–40 Sekunden
        this.redCowSpawnInterval = setTimeout(() => {
            this.spawnRedCow();
            this.spawnRedCowWithRandomInterval(); // Nächstes Spawnen der Roten Kuh planen
        }, interval);
    }

    spawnRedCow() {
        let x = 50 + Math.random() * 900;
        let y = 425 + Math.random() * 40;
        const redCow = new RedCow(x, y);
        this.game.redCows.push(redCow);

        // Rote Kuh bleibt für 5 Sekunden sichtbar und wird danach entfernt
        setTimeout(() => {
            const index = this.game.redCows.indexOf(redCow);
            if (index > -1) {
                this.game.redCows.splice(index, 1);
            }
        }, 5000);
    }

    stopTraktorSpawnen() {
        clearTimeout(this.traktorSpawnInterval);
    }

    stopTraktorRechtsSpawnen() {
        clearTimeout(this.traktorRechtsSpawnInterval);
    }

    stopRedCowSpawning() {
        clearTimeout(this.redCowSpawnInterval);
    }

    increaseTraktorSpawnRate() {
        this.spawnRate = { min: 2000, max: 3000 };
    }

    resetTraktorSpawnRate() {
        this.spawnRate = { min: 3000, max: 4000 };
    }

    increaseTraktorRechtsSpawnRate() {
        this.spawnRateRechts = { min: 3000, max: 4000 };
    }

    resetTraktorRechtsSpawnRate() {
        this.spawnRateRechts = { min: 4000, max: 5000 };
    }
}

class GameMenu {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.startLogo = new Image();
        this.startLogo.src = 'images/startlogo.png'; // Bitte sicherstellen, dass der Pfad korrekt ist

        this.menuOptions = ["Start Game", "Story", "Controls", "Highscores", "Credits"];
        this.selectedOption = 0; // Standardmäßig die erste Option auswählen

        this.startLogo.onload = () => {
            this.logoWidth = this.startLogo.width / 2;
            this.logoHeight = this.startLogo.height / 2;
        };

        this.menuStartY = this.canvas.height / 2 + 35;

        this.canvas.addEventListener('click', (e) => this.handleMouseClick(e));
    }

    drawMenu() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const logoX = this.canvas.width / 2 - this.logoWidth / 2;
        const logoY = this.canvas.height / 2 - 200;
        this.ctx.drawImage(this.startLogo, logoX, logoY, this.logoWidth, this.logoHeight);

        this.ctx.fillStyle = "#00FF00";
        this.ctx.font = "bold 20px 'Press Start 2P', Courier, sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.menuOptions.forEach((option, index) => {
            const yPosition = this.menuStartY + index * 40;

            if (this.selectedOption === index) {
                this.ctx.fillStyle = "#FF0000";
            } else {
                this.ctx.fillStyle = "#00FF00";
            }
            this.ctx.fillText(option, this.canvas.width / 2, yPosition);
        });
    }

    handleKeyPress(e) {
        if (e.key === "w" || e.key === "ArrowUp") {
            this.selectedOption = (this.selectedOption === 0) ? this.menuOptions.length - 1 : this.selectedOption - 1;
        } else if (e.key === "s" || e.key === "ArrowDown") {
            this.selectedOption = (this.selectedOption === this.menuOptions.length - 1) ? 0 : this.selectedOption + 1;
        } else if (e.key === "Enter") {
            return this.menuOptions[this.selectedOption];
        }
        return null;
    }

    handleMouseClick(e) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        this.menuOptions.forEach((option, index) => {
            const yPosition = this.menuStartY + index * 40;
            if (mouseX >= this.canvas.width / 2 - 100 && mouseX <= this.canvas.width / 2 + 100 &&
                mouseY >= yPosition - 20 && mouseY <= yPosition + 20) {
                this.selectedOption = index;
                console.log(`Option "${option}" gewählt.`);
                this.executeOption(option); // Direkt ausführen, sobald angeklickt wird
            }
        });
    }

    executeOption(option) {
        if (option === "Start Game") {
            this.startGame();
        } else if (option === "Story") {
            this.showStory();
        } else if (option === "Controls") {
            this.showControls();
        } else if (option === "Highscores") {
            this.showHighscores();
        } else if (option === "Credits") {
            this.showCredits();
        }
    }

    startGame() {
        console.log("Start Game");
        this.isMenu = false;
    }

    showStory() {
        console.log("Story anzeigen");
    }

    showControls() {
        console.log("Steuerung anzeigen");
    }

    showHighscores() {
        console.log("Highscores anzeigen");
    }

    showCredits() {
        console.log("Credits anzeigen");
    }
}
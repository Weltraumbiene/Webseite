class Story {
    constructor(ctx, canvas, menu) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.menu = menu;  // Übergebene Menü-Instanz für den "Zurück"-Button
    }

    show() {
        // Hintergrund auf schwarz setzen
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Textfarbe auf grün setzen
        this.ctx.fillStyle = "#00FF00"; 
        this.ctx.font = "20px 'Press Start 2P', Courier, sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        
        // Story-Text anzeigen
        this.ctx.fillText("Story Placeholder", this.canvas.width / 2, this.canvas.height / 2);

        // Zurück-Button
        this.showBackButton();
    }

    showBackButton() {
        const backText = "Back to Menu";
        this.ctx.fillText(backText, this.canvas.width / 2, this.canvas.height - 50);
    }

    handleMouseClick(e) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        // Überprüfen, ob der Zurück-Button geklickt wurde
        const backButtonY = this.canvas.height - 50;
        if (mouseX >= this.canvas.width / 2 - 100 && mouseX <= this.canvas.width / 2 + 100 &&
            mouseY >= backButtonY - 20 && mouseY <= backButtonY + 20) {
            console.log("Back to menu clicked");
            this.menu.showMenu(); // Zeigt das Hauptmenü an
            this.game.isMenu = true; // Setzt das Spiel auf Menü zurück
        }
    }
}

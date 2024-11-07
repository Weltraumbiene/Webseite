// Die JSON-Datei laden
fetch('news.json')
  .then(response => response.json())  // Antwort als JSON parsen
  .then(news => {
    // Das News-Container-Element finden
    const newsContainer = document.getElementById('news-container');

    // Für jede Nachricht in der JSON-Daten
    news.forEach(item => {
      // Ein neues HTML-Element für jede Nachricht erstellen
      const article = document.createElement('article');
      
      // Den Inhalt der Nachricht einfügen
      article.innerHTML = `
        <h2>${item.title}</h2>
        <p><strong>${item.date}</strong></p>
        <p>${item.content}</p>
      `;
      
      // Die Nachricht zum Container hinzufügen
      newsContainer.appendChild(article);
    });
  })
  .catch(error => {
    console.error('Fehler beim Laden der Nachrichten:', error);
  });

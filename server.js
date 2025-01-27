const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const messagesFilePath = path.join(__dirname, 'messages.json');

app.use(bodyParser.json());
app.use(express.static('public'));

// Route, um alle Nachrichten abzurufen
app.get('/api/messages', (req, res) => {
  fs.readFile(messagesFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Fehler beim Laden der Nachrichten' });
    const messages = JSON.parse(data);
    res.json(messages);
  });
});

// Route, um eine neue Nachricht zu speichern
app.post('/api/messages', (req, res) => {
  const { title, detail } = req.body;
  if (title && detail) {
    fs.readFile(messagesFilePath, 'utf-8', (err, data) => {
      if (err) return res.status(500).json({ message: 'Fehler beim Speichern der Nachricht' });

      const messages = JSON.parse(data);
      messages.push({ id: messages.length + 1, title, detail });

      fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
        if (err) return res.status(500).json({ message: 'Fehler beim Speichern der Nachricht' });
        res.status(201).json({ message: 'Nachricht gespeichert' });
      });
    });
  } else {
    res.status(400).json({ message: 'Fehlende Daten' });
  }
});

// Route, um eine Nachricht nach ID abzurufen
app.get('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(messagesFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Fehler beim Laden der Nachricht' });

    const messages = JSON.parse(data);
    const message = messages.find(m => m.id == id);

    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ message: 'Nachricht nicht gefunden' });
    }
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

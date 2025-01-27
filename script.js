document.addEventListener('DOMContentLoaded', () => {
      const messageForm = document.getElementById('message-form');
      const titleInput = document.getElementById('title');
      const detailInput = document.getElementById('detail');
    
      if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
          e.preventDefault();
    
          const title = titleInput.value;
          const detail = detailInput.value;
    
          fetch('/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, detail })
          })
          .then(response => response.json())
          .then(() => {
            loadMessages();
            titleInput.value = '';
            detailInput.value = '';
          })
          .catch(error => console.error('Fehler beim Posten der Nachricht:', error));
        });
      }
    
      // Nachrichten auf der Index-Seite laden
      function loadMessages() {
        fetch('/api/messages')
          .then(response => response.json())
          .then(messages => {
            const container = document.getElementById('news-container');
            container.innerHTML = ''; // Alte Nachrichten löschen
    
            messages.forEach(message => {
              const div = document.createElement('div');
              div.innerHTML = `<h3><a href="deiteils.html?id=${message.id}">${message.title}</a></h3><p>${message.detail.substring(0, 100)}...</p>`;
              container.appendChild(div);
            });
          })
          .catch(error => console.error('Fehler beim Laden der Nachrichten:', error));
      }
    
      // Nachrichtendetails auf der deiteils.html Seite laden
      if (window.location.pathname === '/deiteils.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const messageId = urlParams.get('id');
    
        fetch(`/api/messages/${messageId}`)
          .then(response => response.json())
          .then(message => {
            const detailContainer = document.getElementById('message-detail');
            detailContainer.innerHTML = `<h2>${message.title}</h2><p>${message.detail}</p>`;
          })
          .catch(error => console.error('Fehler beim Laden der Nachricht:', error));
      }
    
      // Initiales Laden der Nachrichten
      if (window.location.pathname === '/index.html') {
        loadMessages();
      }
    });
    
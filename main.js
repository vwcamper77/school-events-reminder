document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('event-form');
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');
    const eventEmailInput = document.getElementById('event-email');
    const eventsList = document.getElementById('events-list');
  
    eventForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const eventName = eventNameInput.value.trim();
      const eventDate = eventDateInput.value;
      const eventEmail = eventEmailInput.value.trim();
  
      if (!eventName || !eventDate || !eventEmail) {
        alert('Please fill in all fields.');
        return;
      }
  
      const eventData = {
        name: eventName,
        date: eventDate,
        email: eventEmail,
      };
  
      saveEvent(eventData);
      displayEvent(eventData);
      eventForm.reset();
    });
  
    function saveEvent(eventData) {
      let events = localStorage.getItem('events');
      if (events) {
        events = JSON.parse(events);
      } else {
        events = [];
      }
  
      events.push(eventData);
      localStorage.setItem('events', JSON.stringify(events));
    }
  
    function displayEvent(eventData) {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event';
      eventDiv.innerHTML = `
        <h3>${eventData.name}</h3>
        <p>Date: ${eventData.date}</p>
        <p>Email: ${eventData.email}</p>
      `;
  
      eventsList.appendChild(eventDiv);
    }
  
    function loadEvents() {
      let events = localStorage.getItem('events');
      if (events) {
        events = JSON.parse(events);
        events.forEach(eventData => {
          displayEvent(eventData);
        });
      }
    }
  
    loadEvents();
  });
  
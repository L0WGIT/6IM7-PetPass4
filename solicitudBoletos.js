document.querySelectorAll('.zone').forEach(zone => {
    zone.addEventListener('click', function () {
      const zoneName = this.getAttribute('data-zone');
      document.getElementById('zoneInfo').innerText = `Zona Seleccionada: ${zoneName}`;
      updateTicketOptions(zoneName);
    });
  });
  
  function updateTicketOptions(zone) {
    const ticketOptions = {
      'PERF D1': [
        { fila: 'P', precio: 800 },
        { fila: 'Q', precio: 800 },
        { fila: 'R', precio: 800 }
      ],
      'PERF D2': [
        { fila: 'S', precio: 765 },
        { fila: 'T', precio: 765 }
      ],
      'PERF D3': [
        { fila: 'V', precio: 665 },
        { fila: 'W', precio: 665 },
        { fila: 'X', precio: 665 }
      ],
      'PERF D4': [
        { fila: 'Y', precio: 765 },
        { fila: 'Z', precio: 765 }
      ],
      'PERF D5': [
        { fila: 'A', precio: 800 },
        { fila: 'B', precio: 800 },
        { fila: 'C', precio: 800 }
      ],
      'PERF D6': [
        { fila: 'C', precio: 1265 },
        { fila: 'D', precio: 1265 }
      ],
      'PERF D7': [
        { fila: 'E', precio: 1265 },
        { fila: 'F', precio: 1265 }
      ],
      'PERF D8': [
        { fila: 'G', precio: 1265 },
        { fila: 'H', precio: 1265 }
      ]
      // Añadir más zonas y sus boletos disponibles aquí
    };
  
    const options = ticketOptions[zone] || [];
    const container = document.getElementById('ticketOptions');
    container.innerHTML = '';
  
    options.forEach(option => {
      const ticketInfo = document.createElement('div');
      ticketInfo.className = 'ticket-info';
      ticketInfo.innerHTML = `
          <img src="Resources/icon_ticket.png" alt="Ticket">
          <div class="details">
              <p>Sección ${zone} Fila ${option.fila}</p>
              <p>3 MSI Citibanamex (compra mínima $3000.00)</p>
          </div>
          <div class="price">$${option.precio}.00 cada uno</div>
      `;
      ticketInfo.addEventListener('click', function () {
        showTicketModal(zone, option);
      });
      container.appendChild(ticketInfo);
    });
  }
  
  function showTicketModal(zone, option) {
    const ticketDetails = document.getElementById('ticketDetails');
    ticketDetails.innerHTML = `
      <p><strong>Sección:</strong> ${zone}</p>
      <p><strong>Fila:</strong> ${option.fila}</p>
      <p><strong>Precio:</strong> $${option.precio}.00 cada uno</p>
      <div class="d-flex justify-content-between align-items-center mt-2">
          <button type="button" class="btn btn-secondary" onclick="updateQuantity(-1)">-</button>
          <span id="ticketQuantity">1</span>
          <button type="button" class="btn btn-secondary" onclick="updateQuantity(1)">+</button>
      </div>
    `;
    const ticketModal = new bootstrap.Modal(document.getElementById('ticketModal'));
    ticketModal.show();
  
    document.getElementById('buyTicketsButton').onclick = function() {
      window.location.href = "AsignacionBoletos.html"; // Cambia esto a la URL correcta
    };
  }
  
  function updateQuantity(change) {
    const quantityElement = document.getElementById('ticketQuantity');
    let quantity = parseInt(quantityElement.innerText);
    quantity = Math.max(1, quantity + change);
    quantityElement.innerText = quantity;
  }
  
// index.js

document.querySelectorAll('.event-img').forEach(img => {
    img.addEventListener('click', function() {
        window.location.href = 'solicitudBoletos.html'; // Cambia a la URL de tu página de selección de boletos
    });
});
    
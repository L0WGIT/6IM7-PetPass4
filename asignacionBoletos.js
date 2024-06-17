// Simula la actualización de la barra de progreso
let progress = 80;
const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
    if (progress < 100) {
        progress++;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
        
        if (progress < 100) {
            setTimeout(updateProgressBar, 100); // Actualiza cada 100 ms
        } else {
            showRaffleResult();
        }
    }
}

function showRaffleResult() {
    const won = Math.random() < 0.5; // Simula el resultado del sorteo
    const postRaffleMessage = document.getElementById('postRaffleMessage');
    if (won) {
        const winnerModal = new bootstrap.Modal(document.getElementById('winnerModal'));
        winnerModal.show();
        document.getElementById('winnerMessage').classList.remove('d-none');
    } else {
        const loserModal = new bootstrap.Modal(document.getElementById('loserModal'));
        loserModal.show();
        document.getElementById('loserMessage').classList.remove('d-none');
    }
    postRaffleMessage.classList.remove('d-none');
    disableForm();
}

function disableForm() {
    document.getElementById('email').disabled = true;
    document.getElementById('interestedButton').disabled = true;
}

function redirectToPayment() {
    window.location.href = 'compraBoletos.html'; // Cambia a la URL de tu página de pago
}

function redirectToIndex() {
    window.location.href = 'index.html'; // Cambia a la URL de tu página de inicio
}

// Inicia la simulación de la actualización de la barra de progreso
updateProgressBar();

// Añade eventos de cierre a los modales para actualizar el estado de la página
const winnerModalEl = document.getElementById('winnerModal');
winnerModalEl.addEventListener('hidden.bs.modal', () => {
    document.getElementById('winnerMessage').classList.remove('d-none');
});

const loserModalEl = document.getElementById('loserModal');
loserModalEl.addEventListener('hidden.bs.modal', () => {
    document.getElementById('loserMessage').classList.remove('d-none');
});
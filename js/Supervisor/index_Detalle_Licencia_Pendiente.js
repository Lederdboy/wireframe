// Asegurar que los modales estén ocultos al cargar la página
window.onload = function() {
    document.getElementById('confirmModal').style.display = 'none';
    document.getElementById('rejectModal').style.display = 'none';
}

// Funciones para mostrar/ocultar modales
function showConfirmModal() {
    document.getElementById('confirmModal').style.display = 'flex';
}

function showRejectModal() {
    document.getElementById('rejectModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Funciones de acción
function confirmLicense() {
    alert('Licencia confirmada exitosamente. Se ha notificado al solicitante.');
    closeModal('confirmModal');
    // Aquí redirigiría al dashboard
}

function rejectLicense() {
    const reason = document.getElementById('rejectReason').value;
    if (!reason) {
        alert('Debe seleccionar un motivo de rechazo.');
        return;
    }

    const description = document.querySelector('#rejectModal textarea').value;
    if (!description.trim()) {
        alert('Debe proporcionar una descripción detallada del motivo.');
        return;
    }

    alert('Licencia rechazada. Se ha notificado al solicitante con el motivo detallado.');
    closeModal('rejectModal');
    // Aquí redirigiría al dashboard
}

function goBack() {
    if (confirm('¿Está seguro de que desea volver al dashboard? Los cambios no guardados se perderán.')) {
        // Aquí redirigiría al dashboard
        alert('Volviendo al dashboard...');
    }
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

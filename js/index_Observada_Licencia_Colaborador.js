
// Funcionalidad básica para los botones
document.querySelector('.btn-salir').addEventListener('click', function () {
    alert('Cerrando sesión...');
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.textContent.includes('Adjuntar')) {
            alert('Abriendo ventana para adjuntar documentos adicionales...');
        } else if (this.textContent.includes('Corregir')) {
            alert('Redirigiendo a formulario de corrección...');
        } else if (this.textContent.includes('Cancelar')) {
            if (confirm('¿Estás seguro de que deseas cancelar esta solicitud?')) {
                alert('Solicitud cancelada');
            }
        } else if (this.textContent.includes('Volver')) {
            alert('Regresando al historial...');
        }
    });
});

document.querySelector('.btn-ver').addEventListener('click', function (e) {
    alert('Abriendo documento observado...');
    e.preventDefault();
});

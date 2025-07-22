
// Funcionalidad básica para los botones
document.querySelector('.btn-salir').addEventListener('click', function () {
    alert('Cerrando sesión...');
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.textContent.includes('Editar')) {
            alert('Redirigiendo a editar solicitud...');
        } else if (this.textContent.includes('Cancelar')) {
            if (confirm('¿Estás seguro de que deseas cancelar esta solicitud?')) {
                alert('Solicitud cancelada');
            }
        } else if (this.textContent.includes('Volver')) {
            alert('Regresando al historial...');
        }
        e.preventDefault();
    });
});

document.querySelector('.btn-ver').addEventListener('click', function (e) {
    alert('Abriendo documento...');
    e.preventDefault();
});

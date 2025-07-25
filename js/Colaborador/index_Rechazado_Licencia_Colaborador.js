
// Funcionalidad básica para los botones
document.querySelector('.btn-salir').addEventListener('click', function () {
    alert('Cerrando sesión...');
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.textContent.includes('Apelación')) {
            alert('Abriendo formulario de apelación...\n\nRecuerde que tiene 5 días hábiles para presentar su apelación.');
        } else if (this.textContent.includes('Nueva Solicitud')) {
            alert('Redirigiendo a crear nueva solicitud...\n\nSe aplicarán las recomendaciones para evitar conflictos.');
        } else if (this.textContent.includes('Consultar Disponibilidad')) {
            alert('Mostrando calendario de disponibilidad...\n\n• Días acumulados: 2\n• Próximo período disponible: Agosto 2025');
        } else if (this.textContent.includes('Volver')) {
            alert('Regresando al historial...');
        }
    });
});

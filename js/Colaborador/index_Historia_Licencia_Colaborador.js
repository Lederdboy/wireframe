
// Funcionalidad básica para el wireframe
document.addEventListener('DOMContentLoaded', function () {
    // Botón nueva licencia
    document.querySelector('.nueva-licencia-btn').addEventListener('click', function () {
        alert('Redirigiendo a formulario de nueva solicitud...');
    });

    // Botones de búsqueda y limpiar
    document.querySelector('.btn-search').addEventListener('click', function () {
        alert('Aplicando filtros de búsqueda...');
    });

    document.querySelector('.btn-clear').addEventListener('click', function () {
        // Limpiar todos los campos de filtro
        document.querySelectorAll('input, select').forEach(input => {
            if (input.type === 'text' || input.type === 'date') {
                input.value = '';
            } else if (input.type === 'select-one') {
                input.selectedIndex = 0;
            }
        });
    });

    // Botones de ver
    document.querySelectorAll('.btn-view').forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');
            const ticket = row.cells[0].textContent;
            alert(`Viendo detalles de ${ticket}...`);
        });
    });

    // Enlaces de documentos
    document.querySelectorAll('.document-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Descargando documento...');
        });
    });

    // Cerrar sesión
    document.querySelector('.logout-btn').addEventListener('click', function () {
        if (confirm('¿Está seguro que desea cerrar sesión?')) {
            alert('Cerrando sesión...');
        }
    });
});
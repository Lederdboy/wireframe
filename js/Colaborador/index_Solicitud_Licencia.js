document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM listo ✅");

  let currentStep = 1;
  const totalSteps = 4;
  let uploadedFiles = [];
  let tipoLicenciaSeleccionada = 'con-goce';


  const today = new Date().toISOString().split('T')[0];
  document.getElementById('start_date').min = today;
  document.getElementById('end_date').min = today;

  window.selectOption = function (element, value) {
    console.log('Seleccionado:', value);

    // Quitar clases
    document.querySelectorAll('.radio-option').forEach(option => {
      option.classList.remove('selected');
    });
    element.classList.add('selected');
    element.querySelector('input[type="radio"]').checked = true;

    // Obtener y validar el SELECT
    const select = document.getElementById('reason');
    if (!select) {
      console.warn('❌ No se encontró el elemento <select id="reason">');
      return;
    }

    console.log('✅ Select encontrado, actualizando opciones...');

    select.innerHTML = '';

    let opciones = [];

    if (value === 'con-goce') {
      opciones = [
        { value: 'medica', text: 'Licencia Médica' },
        { value: 'maternidad', text: 'Licencia por Maternidad' },
        { value: 'vacaciones', text: 'Vacaciones Programadas' }
      ];
    } else {
      opciones = [
        { value: 'personal', text: 'Licencia Personal' },
        { value: 'familiar', text: 'Emergencia Familiar' },
        { value: 'otros', text: 'Otros (sin remuneración)' }
      ];
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccionar motivo';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    opciones.forEach(op => {
      const option = document.createElement('option');
      option.value = op.value;
      option.textContent = op.text;
      select.appendChild(option);
    });

    console.log('✅ Opciones insertadas:', opciones);
  };



  window.nextStep = function () {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        document.getElementById(`formStep${currentStep}`).classList.remove('active');
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.getElementById(`step${currentStep}`).classList.add('completed');

        if (currentStep < totalSteps) {
          document.getElementById(`connector${currentStep}`).classList.add('completed');
        }

        currentStep++;

        document.getElementById(`formStep${currentStep}`).classList.add('active');
        document.getElementById(`step${currentStep}`).classList.add('active');

        updateButtons();

        if (currentStep === totalSteps) {
          showSummary();
          showNotification('Solicitud procesada exitosamente', 'success');
        }
      }
    }
  };

  window.previousStep = function () {
    if (currentStep > 1) {
      document.getElementById(`formStep${currentStep}`).classList.remove('active');
      document.getElementById(`step${currentStep}`).classList.remove('active');

      if (currentStep > 1) {
        document.getElementById(`connector${currentStep - 1}`).classList.remove('completed');
      }

      currentStep--;

      document.getElementById(`formStep${currentStep}`).classList.add('active');
      document.getElementById(`step${currentStep}`).classList.remove('completed');
      document.getElementById(`step${currentStep}`).classList.add('active');

      updateButtons();
    }
  };

  function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volverDash = document.getElementById('volverDash');

    if (currentStep === totalSteps) {
      prevBtn.style.display = 'none';
      nextBtn.textContent = '🔄 NUEVA SOLICITUD';
      nextBtn.onclick = window.resetForm;
      if (volverDash) volverDash.style.display = 'block';
    } else {
      prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
      nextBtn.textContent = 'SIGUIENTE →';
      nextBtn.onclick = window.nextStep;
      if (volverDash) volverDash.style.display = currentStep === 1 ? 'block' : 'none';
    }
  }

  function validateStep() {
    switch (currentStep) {
      case 1:
        const branch = document.getElementById('branch').value;
        const employeeId = document.getElementById('employee_id').value;
        if (!branch || !employeeId) {
          showNotification('Por favor complete todos los campos obligatorios');
          return false;
        }
        return true;

      case 2:
        const startDate = document.getElementById('start_date').value;
        const endDate = document.getElementById('end_date').value;
        const reason = document.getElementById('reason').value;

        if (!startDate || !endDate || !reason) {
          showNotification('Por favor complete todos los campos obligatorios');
          return false;
        }

        if (new Date(startDate) >= new Date(endDate)) {
          showNotification('La fecha de fin debe ser posterior a la fecha de inicio');
          return false;
        }
        return true;

      case 3:
        return true;

      default:
        return true;
    }
  }



  function showNotification(message, type = 'error') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 4000);
  }

  function showSummary() {
    const licenseType = document.querySelector('input[name="license_type"]:checked').value;
    const branch = document.getElementById('branch').value;
    const employeeId = document.getElementById('employee_id').value;
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    const reason = document.getElementById('reason').value;
    const description = document.getElementById('description').value;
    const comments = document.getElementById('comments').value;

    const reasonText = document.getElementById('reason').selectedOptions[0].textContent;
    const branchText = document.getElementById('branch').selectedOptions[0].textContent;

    const summary = `
      <div class="summary-item"><div class="summary-label">Tipo de Licencia:</div><div class="summary-value">${licenseType === 'con-goce' ? 'Con Goce de Haber' : 'Sin Goce de Haber'}</div></div>
      <div class="summary-item"><div class="summary-label">Sucursal:</div><div class="summary-value">${branchText}</div></div>
      <div class="summary-item"><div class="summary-label">Matrícula:</div><div class="summary-value">${employeeId}</div></div>
      <div class="summary-item"><div class="summary-label">Período:</div><div class="summary-value">${startDate} al ${endDate}</div></div>
      <div class="summary-item"><div class="summary-label">Motivo:</div><div class="summary-value">${reasonText}</div></div>
      <div class="summary-item"><div class="summary-label">Descripción:</div><div class="summary-value">${description || 'No especificada'}</div></div>
      <div class="summary-item"><div class="summary-label">Documentos:</div><div class="summary-value">${uploadedFiles.length} archivo(s) adjunto(s)</div></div>
      <div class="summary-item"><div class="summary-label">Comentarios:</div><div class="summary-value">${comments}</div></div>
    `;

    document.getElementById('summaryContent').innerHTML = summary;
  }

  window.resetForm = function () {
    currentStep = 1;
    document.querySelectorAll('.step-indicator').forEach(step => step.classList.remove('active', 'completed'));
    document.querySelectorAll('.step-connector').forEach(connector => connector.classList.remove('completed'));
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));

    document.getElementById('step1').classList.add('active');
    document.getElementById('formStep1').classList.add('active');

    uploadedFiles = [];
    document.getElementById('uploadedFiles').innerHTML = '';
    document.getElementById('branch').value = '';
    document.getElementById('start_date').value = '';
    document.getElementById('end_date').value = '';
    document.getElementById('reason').value = '';
    document.getElementById('description').value = '';
    document.getElementById('charCount').textContent = '0';

    document.querySelectorAll('.radio-option').forEach(option => option.classList.remove('selected'));
    document.querySelector('.radio-option').classList.add('selected');
    document.querySelector('input[name="license_type"]').checked = true;

    updateButtons();
    showNotification('Formulario reiniciado correctamente', 'success');
  };

  document.getElementById('documents').addEventListener('change', function (e) {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        showNotification(`El archivo ${file.name} es demasiado grande (máximo 5MB)`);
        return false;
      }
      return true;
    });

    uploadedFiles = [...uploadedFiles, ...validFiles];
    displayFiles();

    if (validFiles.length > 0) {
      showNotification(`${validFiles.length} archivo(s) agregado(s) exitosamente`, 'success');
    }
  });

  function displayFiles() {
    const container = document.getElementById('uploadedFiles');
    container.innerHTML = '';
    uploadedFiles.forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      fileItem.innerHTML = `
        <div class="file-item-name">📄 ${file.name}</div>
        <button onclick="removeFile(${index})">ELIMINAR</button>
      `;
      container.appendChild(fileItem);
    });
  }


  window.removeFile = function (index) {
    uploadedFiles.splice(index, 1);
    displayFiles();
    showNotification('Archivo eliminado', 'success');
  };

  document.getElementById('description').addEventListener('input', function () {
    document.getElementById('charCount').textContent = this.value.length;
  });

  document.getElementById('comments').addEventListener('input', function () {
    document.getElementById('commentCount').textContent = this.value.length;
  });

  document.getElementById('start_date').addEventListener('change', function () {
    const startDate = this.value;
    const endDateInput = document.getElementById('end_date');
    endDateInput.min = startDate;

    if (endDateInput.value && new Date(endDateInput.value) <= new Date(startDate)) {
      endDateInput.value = '';
    }
  });

  // Inicializar el select de motivos al cargar la página
  selectOption(document.querySelector('.radio-option.selected'), tipoLicenciaSeleccionada);


  updateButtons();
});

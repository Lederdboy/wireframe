document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usuarioInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.getElementById('remember');

  // Mostrar usuario recordado
  const rememberedUser = localStorage.getItem('usuarioRecordado');
  if (rememberedUser) {
    usuarioInput.value = rememberedUser;
    rememberCheckbox.checked = true;
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = usuarioInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    const credenciales = {
      supervisor: '123',
      colaborador: '123',
      recursos: '123'
    };

    if (!usuario || !password) {
      showModal('⚠️ Por favor, completa ambos campos.');
      return;
    }

    if (credenciales[usuario] && credenciales[usuario] === password) {
      if (rememberCheckbox.checked) {
        localStorage.setItem('usuarioRecordado', usuario);
      } else {
        localStorage.removeItem('usuarioRecordado');
      }
      if (usuario === 'supervisor') {
        window.location.href = '/Componentes/Dashboard_Supervisor.html';
      } else if (usuario === 'colaborador') {
        window.location.href = '/Componentes/Dashboard_Colaborador.html';
      } else if (usuario === 'recursos') {
        window.location.href = '/Componentes/Dashboard_Recursos.html';
      }
    } else {
      passwordInput.value = '';
      showModal('⚠️ Usuario o contraseña incorrectos.');
    }
  });

  // Efecto al enfocar inputs
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.style.transform = 'scale(1.02)';
    });
    input.addEventListener('blur', function () {
      this.parentElement.style.transform = 'scale(1)';
    });
  });
});

// Mostrar modal
function showModal(message) {
  const overlay = document.getElementById("modal-overlay");
  const box = document.getElementById("modal-box");
  box.querySelector("p").textContent = message;
  overlay.style.display = "flex";
}

// Cerrar modal
function closeAlert() {
  document.getElementById("modal-overlay").style.display = "none";
  document.getElementById("loginForm").reset();
}

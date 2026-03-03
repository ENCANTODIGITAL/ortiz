document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // === BLOQUEO DE ESCRITURA ===
  function soloNumeros(campo) {
    campo.addEventListener("input", () => {
      campo.value = campo.value.replace(/[^0-9]/g, "");
    });
  }

  function soloLetras(campo) {
    campo.addEventListener("input", () => {
      campo.value = campo.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, "");
    });
  }

  soloNumeros(document.getElementById("dni"));
  soloLetras(document.getElementById("nombre"));
  soloLetras(document.getElementById("apellido-paterno"));
  soloLetras(document.getElementById("apellido-materno"));
  soloNumeros(document.getElementById("fijo"));
  soloNumeros(document.getElementById("celular"));
  soloNumeros(document.getElementById("monto"));

  // === VALIDACIONES AL ENVIAR ===
  form.addEventListener("submit", (e) => {
    let valido = true;

    function mostrarError(campo, mensaje) {
      const span = campo.nextElementSibling;
      if (span && span.classList.contains("error-msg")) span.textContent = mensaje;
    }

    function limpiarError(campo) {
      const span = campo.nextElementSibling;
      if (span && span.classList.contains("error-msg")) span.textContent = "";
    }

    const dni = document.getElementById("dni");
    limpiarError(dni);
    if (!/^\d{8}$/.test(dni.value)) {
      valido = false;
      mostrarError(dni, "El DNI debe tener exactamente 8 números.");
    }

    ["nombre", "apellido-paterno", "apellido-materno"].forEach(id => {
      const campo = document.getElementById(id);
      limpiarError(campo);
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,40}$/.test(campo.value)) {
        valido = false;
        mostrarError(campo, "Solo letras, máximo 40 caracteres.");
      }
    });

    const email = document.getElementById("email");
    limpiarError(email);
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.value)) {
      valido = false;
      mostrarError(email, "El correo debe terminar en @gmail.com.");
    }

    const fijo = document.getElementById("fijo");
    limpiarError(fijo);
    if (fijo.value && !/^\d{6,7}$/.test(fijo.value)) {
      valido = false;
      mostrarError(fijo, "El teléfono fijo debe tener 6 o 7 números.");
    }

    const celular = document.getElementById("celular");
    limpiarError(celular);
    if (!/^\d{9}$/.test(celular.value)) {
      valido = false;
      mostrarError(celular, "El celular debe tener exactamente 9 números.");
    }

    const direccion = document.getElementById("direccion");
    limpiarError(direccion);
    if (direccion.value.length > 80) {
      valido = false;
      mostrarError(direccion, "La dirección no puede superar los 80 caracteres.");
    }

    const monto = document.getElementById("monto");
    limpiarError(monto);
    if (monto.value && !/^\d{1,8}$/.test(monto.value)) {
      valido = false;
      mostrarError(monto, "El monto debe tener máximo 8 dígitos.");
    }

    const tema = document.getElementById("tema");
    limpiarError(tema);
    if (tema.value.length > 100) {
      valido = false;
      mostrarError(tema, "El tema no puede superar los 100 caracteres.");
    }

    const descripcion = document.getElementById("descripcion");
    limpiarError(descripcion);
    if (descripcion.value.length > 600) {
      valido = false;
      mostrarError(descripcion, "La descripción no puede superar los 600 caracteres.");
    }

    const detalle = document.getElementById("detalle");
    limpiarError(detalle);
    if (detalle.value.length > 5000) {
      valido = false;
      mostrarError(detalle, "El detalle no puede superar los 5000 caracteres.");
    }

    const pedido = document.getElementById("pedido");
    limpiarError(pedido);
    if (pedido.value.length > 5000) {
      valido = false;
      mostrarError(pedido, "El pedido no puede superar los 5000 caracteres.");
    }

    if (!valido) e.preventDefault();
  });

  // === MODAL DE POLÍTICA DE PRIVACIDAD ===
  const abrir = document.getElementById("abrir-modal");
  const cerrar = document.getElementById("cerrar-modal");
  const modal = document.getElementById("modal-privacidad");

  abrir.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
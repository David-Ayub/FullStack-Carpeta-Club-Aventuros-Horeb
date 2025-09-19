addEventListener("DOMContentLoaded", () => {
  const btnVolver = document.getElementById("btn-volver");
  const btnBloqueo = document.getElementById("btn-bloqueo"); // 🔒 nuevo
  const acceso = document.getElementById("acceso");
  const content = document.getElementById("content");
  const inputClave = document.getElementById("clave"); // 👀 clave input
  const inputBusqueda = document.getElementById("busqueda");
  const contador = document.getElementById("contadorBtn");

  // Inicialmente, botones ocultos
  if (btnVolver) btnVolver.style.display = "none";
  if (btnBloqueo) btnBloqueo.style.display = "none";

  // 🔒 Función volver al bloqueo
  function volverAlBloqueo() {
    content.style.display = "none";
    acceso.style.display = "flex";
    if (btnBloqueo) btnBloqueo.style.display = "none";
    if (inputClave) inputClave.value = ""; // 👈 limpiar clave
    const error = document.getElementById("mensaje-error");
    if (error) error.style.display = "none"; // ocultar error
    inputClave.focus(); // 👈 poner el cursor otra vez
  }

  // Evento al botón bloqueo
  if (btnBloqueo) {
    btnBloqueo.addEventListener("click", volverAlBloqueo);
  }

  // 🔢 Contador de los Integrantes del club
  const totalIntegrantes = document.querySelectorAll(
    ".tarjeta.directiva, .tarjeta.miembro, .tarjeta.acompanante"
  ).length;
  if (contador) contador.textContent = "Integrantes del Club: " + totalIntegrantes;

  // 🔎 Búsqueda por nombre de las hojas de vida
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", () => {
      const filtro = inputBusqueda.value.toLowerCase();
      document.querySelectorAll(".tarjeta.directiva, .tarjeta.miembro, .tarjeta.acompanante")
        .forEach(tarjeta => {
          const nombre = tarjeta.querySelector("h4").textContent.toLowerCase();
          tarjeta.style.display = nombre.includes(filtro) ? "block" : "none";
        });
    });
  }

  // Botón volver a la pantalla de inicio
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      mostrarSeccion("inicio");
    });
  }

  // Función para mostrar secciones dentro de #content
  window.mostrarSeccion = function(id) {
    document.querySelectorAll("#content section").forEach(sec => sec.classList.add("oculto"));
    const seccion = document.getElementById(id);
    if (seccion) seccion.classList.remove("oculto");

    // 👀 Botones según la sección
    if (btnVolver) btnVolver.style.display = (id === "inicio") ? "none" : "block";
    if (btnBloqueo) btnBloqueo.style.display = (id === "inicio") ? "block" : "none";
  };

  // Función para verificar clave de acceso
  window.verificarClave = function() {
    const clave = inputClave.value;
    const error = document.getElementById("mensaje-error");

    if (clave === "1995") {
      acceso.style.display = "none";
      content.style.display = "block";
      mostrarSeccion("inicio"); // asegurarse de que se muestre inicio
    } else {
      if (error) error.style.display = "block";
    }
  };

  // 🚀 Permitir Enter en el campo clave
  if (inputClave) {
    inputClave.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        window.verificarClave();
      }
    });
  }
});

// Función para mostrar PDF en modal
function verPDFModal(rutaPDF) {
  const modal = document.getElementById('modal-pdf');
  const iframe = document.getElementById('iframe-pdf');
  iframe.src = rutaPDF;
  modal.style.display = 'flex';
}

// Función para cerrar modal
document.addEventListener("DOMContentLoaded", () => {
  const cerrarBtn = document.getElementById('cerrar-modal');
  const modal = document.getElementById('modal-pdf');
  const iframe = document.getElementById('iframe-pdf');
  cerrarBtn.addEventListener('click', () => {
    iframe.src = '';
    modal.style.display = 'none';
  });
});
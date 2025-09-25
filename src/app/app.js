document.addEventListener("DOMContentLoaded", () => {
  const btnVolver = document.getElementById("btn-volver");
  const acceso = document.getElementById("acceso");
  const content = document.getElementById("content");
  const inputBusqueda = document.getElementById("busqueda");
  const contador = document.getElementById("contadorBtn");

  // Inicialmente, botón oculto
  if (btnVolver) btnVolver.style.display = "none";

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
    if (btnVolver) btnVolver.style.display = (id === "inicio") ? "none" : "block";
  };

  // Función para verificar clave de acceso
  window.verificarClave = function() {
    const clave = document.getElementById("clave").value;
    const error = document.getElementById("mensaje-error");

    if (clave === "1995") {
      acceso.style.display = "none";
      content.style.display = "block";
      mostrarSeccion("inicio"); // asegurarse de que se muestre inicio
    } else {
      if (error) error.style.display = "block";
    }
  };

});

// Función para mostrar PDF en modal
function verPDFModal(rutaPDF) {
  const modal = document.getElementById('modal-pdf');
  const iframe = document.getElementById('iframe-pdf');
  // Carga el PDF en el iframe con toolbar visible (zoom, descargar, etc.)
  iframe.src = rutaPDF + '#toolbar=1';
  // Muestra el modal
  modal.style.display = 'flex';
}
// Función para cerrar modal
document.addEventListener("DOMContentLoaded", () => {
  const cerrarBtn = document.getElementById('cerrar-modal');
  const modal = document.getElementById('modal-pdf');
  const iframe = document.getElementById('iframe-pdf');
  cerrarBtn.addEventListener('click', () => {
    iframe.src = '';        // vacía el PDF
    modal.style.display = 'none'; // oculta el modal
  });
});
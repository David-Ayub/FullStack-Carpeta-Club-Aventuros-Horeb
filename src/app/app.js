// =============================
// BLOQUEO Y SECCIONES
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const btnVolver = document.getElementById("btn-volver");
  const btnBloqueo = document.getElementById("btn-bloqueo");
  const acceso = document.getElementById("acceso");
  const content = document.getElementById("content");
  const inputClave = document.getElementById("clave");
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
    if (inputClave) inputClave.value = "";
    const error = document.getElementById("mensaje-error");
    if (error) error.style.display = "none";
    inputClave.focus();
  }

  // Evento al botón bloqueo
  if (btnBloqueo) btnBloqueo.addEventListener("click", volverAlBloqueo);

  // 🔢 Contador de los Integrantes del club
  const totalIntegrantes = document.querySelectorAll(
    ".tarjeta.directiva, .tarjeta.miembro, .tarjeta.acompanante"
  ).length;
  if (contador) contador.textContent = "Integrantes del Club: " + totalIntegrantes;

  // 🔎 Búsqueda por nombre de las hojas de vida
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", () => {
      const filtro = inputBusqueda.value.toLowerCase();
      document
        .querySelectorAll(".tarjeta.directiva, .tarjeta.miembro, .tarjeta.acompanante")
        .forEach((tarjeta) => {
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
  window.mostrarSeccion = function (id) {
    document.querySelectorAll("#content section").forEach((sec) =>
      sec.classList.add("oculto")
    );
    const seccion = document.getElementById(id);
    if (seccion) seccion.classList.remove("oculto");

    // Botones según la sección
    if (btnVolver) btnVolver.style.display = id === "inicio" ? "none" : "block";
    if (btnBloqueo) btnBloqueo.style.display = id === "inicio" ? "block" : "none";
  };
  // Función para verificar clave de acceso
  window.verificarClave = function () {
    const clave = inputClave.value;
    const error = document.getElementById("mensaje-error");

    if (clave === "1995") {
      acceso.style.display = "none";
      content.style.display = "block";
      mostrarSeccion("inicio");
    } else {
      if (error) error.style.display = "block";
    }
  };

  // Enter en el campo clave
  if (inputClave) {
    inputClave.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        window.verificarClave();
      }
    });
  }

    // =============================
  // HOJAS DE VIDA
  // =============================
  // 📄 Función para abrir el PDF en el modal
  window.verPDFModal = function (rutaPDF, ancho = '10%', alto = '10%') {
   const modal = document.getElementById("modal-pdf");
   const iframe = document.getElementById("iframe-pdf");
   const modalContenido = document.querySelector(".modal-contenido-pdf");

   // Asigna la ruta al iframe
   iframe.src = rutaPDF;

   // Alias para compatibilidad

   // Ajusta tamaño
   modalContenido.style.width = ancho;
   modalContenido.style.height = alto;

   // Muestra el modal
   modal.style.display = "flex";
  }

 // 📌 Botón para cerrar el modal
  document.getElementById("cerrar-modal-pdf").addEventListener("click", () => {
   document.getElementById("modal-pdf").style.display = "none";
   document.getElementById("iframe-pdf").src = ""; // Limpia el PDF al cerrar// 
  });

  // =============================
  // HISTORIA - CARRUSEL, GRID Y BOTÓN VOLVER
  // =============================
  const carrusel = document.querySelector(".carrusel");
  const gridFotos = document.querySelector(".grid-fotos");
  const botones = document.querySelectorAll(".btn-anio");
  const pdfHistoria = document.querySelector(".pdf-historia");
  const btnVolverInicioPagina = document.getElementById("btn-volver");

  // Botón "Volver a Historia"
  const btnVolverHistoria = document.createElement("button");
  btnVolverHistoria.textContent = "⏪ Historia";
  btnVolverHistoria.classList.add("btn-volver-historia");
  btnVolverHistoria.style.display = "none";

  if (btnVolverInicioPagina) btnVolverInicioPagina.insertAdjacentElement("afterend", btnVolverHistoria);

  // Al inicio: PDF visible
  if (pdfHistoria) pdfHistoria.style.display = "block";
  if (carrusel) carrusel.style.display = "none";
  if (gridFotos) gridFotos.style.display = "none";

  let fotos = [];
  let indice = 0;

  // Botones de año
  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const anio = btn.dataset.anio;
      if (pdfHistoria) pdfHistoria.style.display = "none";
      btnVolverHistoria.style.display = "block";
      cargarFotos(anio);
    });
  });

  // Botón volver a PDF
  btnVolverHistoria.addEventListener("click", () => {
    if (carrusel) carrusel.style.display = "none";
    if (gridFotos) gridFotos.style.display = "none";
    if (pdfHistoria) pdfHistoria.style.display = "block";
    btnVolverHistoria.style.display = "none";
  });

  // Cargar fotos de JSON
  function cargarFotos(anio) {
    const ruta = `src/img/historia/recuerdos-${anio}/fotos.json`;
    fetch(ruta)
      .then(res => res.json())
      .then(data => {
        fotos = data;
        indice = 0;
        if (fotos.length > 0) {
          mostrarFotoCarrusel(0, anio);
          llenarGrid(anio);
          iniciarCarrusel(anio);
          if (carrusel) carrusel.style.display = "flex";
          if (gridFotos) gridFotos.style.display = "grid";
        } else {
          if (carrusel) carrusel.style.display = "none";
          if (gridFotos) gridFotos.style.display = "none";
        }
      })
      .catch(err => console.error("Error al cargar las fotos:", err));
  }

  // Mostrar foto en carrusel
  function mostrarFotoCarrusel(i, anio) {
    if (!carrusel) return;
    const nuevaImg = document.createElement("img");
    nuevaImg.src = `src/img/historia/recuerdos-${anio}/${fotos[i]}`;
    nuevaImg.alt = `Foto ${i + 1}`;
    nuevaImg.style.position = "absolute";
    nuevaImg.style.top = "0";
    nuevaImg.style.left = "100%";
    nuevaImg.style.width = "100%";
    nuevaImg.style.height = "100%";
    nuevaImg.style.objectFit = "contain";
    nuevaImg.style.transition = "left 1s ease-in-out, opacity 0.8s ease-in-out";
    carrusel.appendChild(nuevaImg);

    void nuevaImg.offsetWidth;
    nuevaImg.style.left = "0";

    const imgsAntiguas = carrusel.querySelectorAll("img:not(:last-child)");
    imgsAntiguas.forEach(img => {
      img.style.left = "-100%";
      img.style.opacity = "0";
      setTimeout(() => {
        if (img.parentNode) carrusel.removeChild(img);
      }, 1000);
    });
  }

  // Llenar grid
  function llenarGrid(anio) {
    if (!gridFotos) return;
    gridFotos.innerHTML = "";
    fotos.forEach((foto, i) => {
      const mini = document.createElement("img");
      mini.src = `src/img/historia/recuerdos-${anio}/${foto}`;
      mini.alt = `Foto ${i + 1}`;
      mini.style.objectFit = "contain";
      mini.style.background = "black";

      mini.addEventListener("click", () => {
        indice = i;
        mostrarFotoCarrusel(indice, anio);
        abrirModalFoto(mini.src); // abrir modal al click en grid
      });
      gridFotos.appendChild(mini);
    });
  }

  // Carrusel automático
  function iniciarCarrusel(anio) {
    clearInterval(window.intervaloCarrusel);
    window.intervaloCarrusel = setInterval(() => {
      indice = (indice + 1) % fotos.length;
      mostrarFotoCarrusel(indice, anio);
    }, 5000);
  }

  // =============================
  // MODAL PARA VER FOTOS EN GRANDE
  // =============================
  const modal = document.getElementById('modal-foto');
  const imgModal = document.getElementById('img-modal');
  const cerrar = document.getElementById('cerrar-foto');

  function abrirModalFoto(src) {
    imgModal.src = src;
    modal.style.display = 'flex';
  }

  // Delegación: cualquier imagen en grid o carrusel
  document.addEventListener('click', (e) => {
    if (e.target.matches('.grid-fotos img, .carrusel img')) {
      abrirModalFoto(e.target.src);
    }
  });

  // Cerrar modal al click en la X
  cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal al click fuera de la imagen
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});
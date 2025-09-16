    // Cambiar secciones
    function mostrarSeccion(id) {
      document.querySelectorAll("section").forEach(sec => sec.classList.add("oculto"));
      document.getElementById(id).classList.remove("oculto");
    }

    // Verificar clave
    function verificarClave() {
      const clave = document.getElementById("clave").value;
      const error = document.getElementById("mensaje-error");

      if (clave === "1995") {
        document.getElementById("acceso").style.display = "none";
        document.getElementById("content").style.display = "block";
      } else {
        error.style.display = "block";
      }
    }
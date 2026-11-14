"use strict";
var cantidadFilas = 8;
var cantidadMinas = 10;
var cantidadColumnas = 8;
var nombreJugador = "";
var celdas = [];
var estadoCeldas = [];
var modalNombre = document.getElementById("modal-nombre");
var formularioNombre = document.getElementById("formulario-nombre");
var campoNombre = document.getElementById("campo-nombre");
var errorNombre = document.getElementById("error-nombre");
var textoJugador = document.getElementById("texto-jugador");
var contenedorTablero = document.getElementById("tablero");
var vaciarTablero = function () {
  while (contenedorTablero.firstChild) {
    contenedorTablero.removeChild(contenedorTablero.firstChild);
  }
  celdas = [];
  estadoCeldas = [];
};
var crearCelda = function (fila, columna) {
  var celda = document.createElement("div");
  celda.className = "celda";
  celda.setAttribute("data-fila", fila);
  celda.setAttribute("data-columna", columna);
  return celda;
};
var crearEstadoCelda = function () {
  return {
    tieneMina: false,
    minasVecinas: 0,
    revelada: false,
    conBandera: false
  };
};
var crearTablero = function () {
  var fila;
  var columna;
  var elementoFila;
  var celda;
  vaciarTablero();
  for (fila = 0; fila < cantidadFilas; fila++) {
    elementoFila = document.createElement("div");
    elementoFila.className = "fila";
    celdas[fila] = [];
    estadoCeldas[fila] = [];
    for (columna = 0; columna < cantidadColumnas; columna++) {
      celda = crearCelda(fila, columna);
      celdas[fila][columna] = celda;
      estadoCeldas[fila][columna] = crearEstadoCelda();
      elementoFila.appendChild(celda);
    }
    contenedorTablero.appendChild(elementoFila);
  }
};
var obtenerNumeroAleatorio = function (maximo) {
  return Math.floor(Math.random() * maximo);
};
var ubicarMinas = function () {
  var minasUbicadas = 0;
  var fila;
  var columna;
  while (minasUbicadas < cantidadMinas) {
    fila = obtenerNumeroAleatorio(cantidadFilas);
    columna = obtenerNumeroAleatorio(cantidadColumnas);
    if (!estadoCeldas[fila][columna].tieneMina) {
      estadoCeldas[fila][columna].tieneMina = true;
      minasUbicadas++;
    }
  }
};
var esPosicionValida = function (fila, columna) {
  return fila >= 0 && fila < cantidadFilas && columna >= 0 && columna < cantidadColumnas;
};
var contarMinasVecinas = function (fila, columna) {
  var cantidad = 0;
  var filaVecina;
  var columnaVecina;
  for (filaVecina = fila - 1; filaVecina <= fila + 1; filaVecina++) {
    for (columnaVecina = columna - 1; columnaVecina <= columna + 1; columnaVecina++) {
      if (esPosicionValida(filaVecina, columnaVecina) && estadoCeldas[filaVecina][columnaVecina].tieneMina) {
        cantidad++;
      }
    }
  }
  return cantidad;
};
var calcularMinasVecinas = function () {
  var fila;
  var columna;
  for (fila = 0; fila < cantidadFilas; fila++) {
    for (columna = 0; columna < cantidadColumnas; columna++) {
      if (!estadoCeldas[fila][columna].tieneMina) {
        estadoCeldas[fila][columna].minasVecinas = contarMinasVecinas(fila, columna);
      }
    }
  }
};
var iniciarPartida = function () {
  crearTablero();
  ubicarMinas();
  calcularMinasVecinas();
};
var validarNombre = function (nombre) {
  var soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
  var cantidadLetras = nombre.replace(/ /g, "").length;
  return soloLetras.test(nombre) && cantidadLetras >= 3;
};
var mostrarErrorNombre = function (mensaje) {
  errorNombre.textContent = mensaje;
  errorNombre.classList.remove("oculto");
};
var ocultarModalNombre = function () {
  errorNombre.classList.add("oculto");
  modalNombre.classList.add("oculto");
};
var manejarEnvioNombre = function (evento) {
  var nombreIngresado;
  evento.preventDefault();
  nombreIngresado = campoNombre.value.trim();
  if (!validarNombre(nombreIngresado)) {
    mostrarErrorNombre("El nombre debe tener al menos 3 letras y no puede tener números ni símbolos.");
    return;
  }
  nombreJugador = nombreIngresado;
  textoJugador.textContent = "Jugador: " + nombreJugador;
  ocultarModalNombre();
  iniciarPartida();
};
formularioNombre.addEventListener("submit", manejarEnvioNombre);
campoNombre.focus();
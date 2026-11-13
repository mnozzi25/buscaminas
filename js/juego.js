"use strict";
var nombreJugador = "";
var modalNombre = document.getElementById("modal-nombre");
var formularioNombre = document.getElementById("formulario-nombre");
var campoNombre = document.getElementById("campo-nombre");
var errorNombre = document.getElementById("error-nombre");
var textoJugador = document.getElementById("texto-jugador");
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
};
formularioNombre.addEventListener("submit", manejarEnvioNombre);
campoNombre.focus();
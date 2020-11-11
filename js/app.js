const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');
const enviarBtn = document.querySelector('#enviar');
let alertMensaje;
let tipoMensaje;
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

cargarEventListeners();

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', validarFormulario);
    resetBtn.addEventListener('click', resetFormulario);

    email.addEventListener('blur', validarCorreo);
    asunto.addEventListener('blur', validarAsunto);
    mensaje.addEventListener('blur', validarMensaje);
}

function validarFormulario() {
    const inputClase = formulario.querySelectorAll('input');

    let contar = 0;
    inputClase.forEach(input => {
        if (input.classList.contains('valid')) {
            contar++;
            if (inputClase.length == contar && mensaje.classList.contains('valid')) {
                enviarBtn.classList.remove('cursor-not-allowed', 'opacity-50');
                enviarBtn.disabled = false;
            } else {
                enviarBtn.classList.add('cursor-not-allowed', 'opacity-50');
                enviarBtn.disabled = true;
            }
        }
    })
}

function resetFormulario(e) {
    e.preventDefault();
    formulario.reset();

    const limpiarRed = document.querySelectorAll('.border-red-500');
    limpiarRed.forEach(color => color.classList.remove('border-red-500'));

    const limpiarGreen = document.querySelectorAll('.border-green-500');
    limpiarGreen.forEach(color => color.classList.remove('border-green-500'));
}

function validarCorreo(e) {
    if (email.value == '') {
        alertMensaje = 'Correo no puede ser vacio';
        tipoMensaje = 'error';
        mostrarMensajeAlerta(alertMensaje, tipoMensaje, e);
    } else {
        if (expresionRegular.test(email.value)) {
            email.classList.remove('invalid');
            email.classList.add('valid');
            tipoMensaje = 'success';
        } else {
            email.classList.remove('valid');
            email.classList.add('invalid');
            alertMensaje = 'Correo invalido';
            tipoMensaje = 'error';
        }
    }
    mostrarMensajeAlerta(alertMensaje, tipoMensaje, e);
    validarFormulario();
}

function validarAsunto(e) {
    if (asunto.value == '') {
        asunto.classList.remove('valid');
        asunto.classList.add('invalid');
        alertMensaje = 'Asunto no puede ser vacio';
        tipoMensaje = 'error';
    } else {
        asunto.classList.remove('invalid');
        asunto.classList.add('valid');
        tipoMensaje = 'success';
    }
    mostrarMensajeAlerta(alertMensaje, tipoMensaje, e);
    validarFormulario();
}

function validarMensaje(e) {
    if (mensaje.value == '') {
        mensaje.classList.remove('valid');
        mensaje.classList.add('invalid');
        alertMensaje = 'Mensaje no puede ser vacio';
        tipoMensaje = 'error';
    } else {
        mensaje.classList.remove('invalid');
        mensaje.classList.add('valid');
        tipoMensaje = 'success';
    }
    mostrarMensajeAlerta(alertMensaje, tipoMensaje, e);
    validarFormulario();
}

function mostrarMensajeAlerta(mensaje, tipo, e) {

    const errores = document.querySelectorAll('.error');

    if (tipo == 'error') {
        e.target.classList.remove('border-green-500');
        e.target.classList.add('border-red-500');
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje;
        mensajeError.className = 'border border-red-500 background-red-100 text-red-500 p-3 mt-5 error';

        if (errores.length == 0) {
            formulario.appendChild(mensajeError);
        } else {
            formulario.removeChild(formulario.lastChild);
            formulario.appendChild(mensajeError);
        }
    }

    if (tipo == 'success') {
        e.target.classList.remove('border-red-500');
        e.target.classList.add('border-green-500');
        if (errores.length > 0) {
            formulario.removeChild(formulario.lastChild);
        }
    }
}
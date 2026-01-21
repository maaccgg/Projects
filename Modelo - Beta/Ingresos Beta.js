const botonComprobante = document.getElementById("formulario-ingresos")
const activarFormulario = document.getElementById("nuevo-registro")
const cerrarFormulario = document.getElementById("cerrando-formulario")

function apagarFormulario(){
botonComprobante.style.display = 'none'
}

function desplegarFormulario(){
botonComprobante.style.display = 'flex'
}

apagarFormulario()

activarFormulario.addEventListener ('click',desplegarFormulario)
cerrarFormulario.addEventListener ('click', apagarFormulario)

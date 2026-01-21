const botonAgregar = document.getElementById('formulario-operadores')
const agregarOperador = document.getElementById('agregar-operador')
const cerrarFormulario = document.getElementById('cerrando-formulario')


function desplegarFormularioOperadores(){
botonAgregar.style.display = 'flex'
}

function apagarFormulario(){
botonAgregar.style.display = 'none'
}


apagarFormulario()
agregarOperador.addEventListener('click', desplegarFormularioOperadores)
cerrarFormulario.addEventListener('click', apagarFormulario)
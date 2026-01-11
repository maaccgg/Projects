const botonEnviar = document.getElementById("boton-enviar-formulario")
const muro = document.getElementById("muro")
const validar = document.getElementById("validacion-formulario")
const botonComprobante = document.getElementById ("boton-validar-info")
const botonReiniciar = document.getElementById ("boton-reiniciar")
const gracias = document.getElementById ("agradecimiento")
const pregunta = document.getElementById ("pregunta")
const cajasContenedor = document.getElementById ('Cajas-Contenedor')

function apagarValidaciones (){
    botonComprobante.style.display = 'none'
    botonReiniciar.style.display = 'none'
    pregunta.style.display = "none"
    gracias.style.display = 'none'
}

function encenderAgradecimiento (){
    botonComprobante.style.display = 'none'
    botonReiniciar.style.display = 'none'
    pregunta.style.display = "none"
    gracias.style.display = 'flex'
}

function encenderBotonComprobante(){
    botonComprobante.style.display = 'flex'
    botonReiniciar.style.display = 'flex'
    pregunta.style.display = 'flex'
    gracias.style.display = 'none'
}

function apagarPantalla(){
    cajasContenedor.style.display = "none"
    muro.style.display = "none"
    gracias.style.display = "flex"
    botonComprobante.style.display = "none"
    botonReiniciar.style.display = 'none'
    pregunta.style.display = "none"
}

function reiniciarPagina(){
    location.reload(true)
}

function validacionDeFormulario (){

    const razonSocial = document.getElementById('razon-social').value
    const nombre = document.getElementById("nombre-cliente").value
    const numero = document.getElementById("numero-telefonico").value
    const correo = document.getElementById("correo-electronico").value 

    if (razonSocial === '' || nombre ===''||numero ==='' || correo ===''){
        alert('Por favor llena todo los campos');
        return
    }

const nuevaPublicacion = `
    <div class="post">
        <strong> Razon Social: ${razonSocial}:</strong>
        <p>Nombre: ${nombre}</p>
        <p>Telefono: ${numero}</p>
        <p>Correo: ${correo}</p>
        <hr>
        </div>`
        ;

muro.innerHTML += nuevaPublicacion;

document.getElementById('razon-social').value = ''
document.getElementById("nombre-cliente").value = ''
document.getElementById("numero-telefonico").value = ''
document.getElementById("correo-electronico").value = ''

encenderBotonComprobante()
}

apagarValidaciones()

botonEnviar.addEventListener("click", validacionDeFormulario)
botonComprobante.addEventListener('click', apagarPantalla)
botonReiniciar.addEventListener('click', reiniciarPagina)


const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador=document.getElementById('mascota-jugador')

const spanMascotaEnemigo=document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById ('resultados')
const ataquesDelJugador = document.getElementById ('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById ('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaque = document.getElementById ('contenedor-ataque')
const sectionVerMapa = document.getElementById ('ver-mapa')
const sectionMapa = document.getElementById ('mapa')


let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let infoDragoberto
let infoDuolingo
let infoLlamarada
let mascotaJugador
let mascotaJugadorObjeto
let ataqueDragon
let botonAgua
let botonFuego
let botonTierra
let botones = []
let botonMovimientos
let ataquesDragonEnemigo
let indexAtaqueEnemigo
let indexAtaqueJugador
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext ("2d")
let intervalo
let mapaBackground = new Image ()
mapaBackground.src = "Imagenes/Mapa Dragon Smash.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 600
const anchoMaximoDelMapa = 100

alturaQueBuscamos = anchoDelMapa * 500/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}



class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.nombre = nombre
        this.id = id
        this.foto=foto
        this.vida=vida
        this.ataques = []
        this.ancho=40
        this.alto=40
        this.x= aleatorio(0, mapa.width - this.ancho)
        this.y= aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0

    }

    pintarMokepon(){
        lienzo.drawImage(
    this.mapaFoto,
    this.x,
    this.y,
    this.ancho,
    this.alto,
    )
    }
}

let dragoberto = new Mokepon ('Dragoberto','Imagenes/Dragoberto.jpg', 5, 'Imagenes/Dragoberto.jpg', )
let duolingo = new Mokepon('Duolingo','Imagenes/Duolingo.png', 5, 'Imagenes/Duolingo.png')
let llamarada = new Mokepon('Llamarada','Imagenes/Llamarada.jpg', 5, 'Imagenes/Llamarada.jpg' )


const dragoberto_ataques = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌿', id: 'boton-tierra'},
    {nombre: '💦', id: 'boton-agua'},
]

dragoberto.ataques.push(...dragoberto_ataques)


const duolingo_ataques = [
    {nombre: '🌿', id: 'boton-tierra'},
    {nombre: '🌿', id: 'boton-tierra'},
    {nombre: '🌿', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💦', id: 'boton-agua'},
]

duolingo.ataques.push(...duolingo_ataques)


const llamarada_ataques = [
    {nombre: '💦', id: 'boton-agua'},
    {nombre: '💦', id: 'boton-agua'},
    {nombre: '💦', id: 'boton-agua'},
    {nombre: '🌿', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
]

llamarada.ataques.push(...llamarada_ataques)

mokepones.push(dragoberto,duolingo,llamarada)


function iniciarJuego () { 

seccionSeleccionarAtaque.style.display = 'none'
sectionVerMapa.style.display = 'none'


mokepones.forEach((Mokepon) => {
opcionDeMokepones= `
 <input type="radio" name="mascota" id=${Mokepon.nombre} /> 
    <label class="tarjeta-de-mokepon" for=${Mokepon.nombre}> 
        <p>${Mokepon.nombre}</p>
        <img src=${Mokepon.foto}></label> 
`
contenedorTarjetas.innerHTML += opcionDeMokepones

infoDragoberto = document.getElementById ('Dragoberto')
infoDuolingo = document.getElementById ('Duolingo')
infoLlamarada = document.getElementById ('Llamarada')

})

seccionReiniciar.style.display = 'none'
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

botonReiniciar.addEventListener('click', reIniciarJuego)

unirseAlJuego()

}

function unirseAlJuego(){
    fetch ("http://localhost:8080/unirse")
    .then(function(res){
        console.log(res)
        if (res.ok){
            res.text ()
                .then (function(respuesta){
                            console.log(respuesta)
                            jugadorId = respuesta
                })

        }
    })
}

function seleccionarMascotaJugador() {

sectionVerMapa.style.display = 'flex'

if (infoDragoberto.checked){spanMascotaJugador.innerHTML= infoDragoberto.id     
    mascotaJugador =infoDragoberto.id
}
else if (infoDuolingo.checked){spanMascotaJugador.innerHTML=infoDuolingo.id
    mascotaJugador =infoDuolingo.id
}
else if (infoLlamarada.checked){spanMascotaJugador.innerHTML=infoLlamarada.id
    mascotaJugador =infoLlamarada.id
}
else {alert("Selecciona una mascota valida")
    return
}


seccionSeleccionarMascota.style.display = 'none'

seleccionarMokepon (mascotaJugador)

extraerAtaques (mascotaJugador)

iniciarMapa()


}


function seleccionarMokepon (mascotaJugador){
    fetch (`http://localhost:8080/mokepon/${jugadorId}`, 
        {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador})
    })
}

function extraerAtaques (){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones [i].nombre){
            ataques=mokepones [i].ataques
        }
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques (ataques){
 ataques.forEach ((ataque) => {
    ataqueDragon = `
     <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
    ` 
    contenedorAtaque.innerHTML += ataqueDragon
 })

    botonAgua = document.getElementById('boton-agua')
    botonFuego = document.getElementById('boton-fuego')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')

}
function secuenciaAtaque(){
    botones.forEach((boton) =>
        boton.addEventListener('click', (e) => {
        if(e.target.textContent === '🔥'){ 
             ataqueJugador.push ('FUEGO')
             console.log(ataqueJugador)
             boton.style.background = '#112f58'
             boton.disabled = true} 
        else if (e.target.textContent === '💦'){
             ataqueJugador.push ('AGUA')
             console.log(ataqueJugador)
             boton.style.background = '#112f58'
             boton.disabled = true
        }
        else {
             ataqueJugador.push ('TIERRA')
             console.log(ataqueJugador)
             boton.style.background = '#112f58'
             boton.disabled = true
        }
        if (ataqueJugador.length === 5){    
        enviarAtaques ()}
    }))

}
function seleccionarMascotaEnemigo(enemigo){

spanMascotaEnemigo.innerHTML = enemigo.nombre
ataquesDragonEnemigo =  enemigo.ataques

secuenciaAtaque()
 
} 

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
        intervalo = setInterval (obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function ataqueAleatorioEnemigo (){
let ataqueAleatorio = aleatorio (0, mokepones.length-1)

if (ataqueAleatorio == 0 || ataqueAleatorio== 1 )
    {ataqueEnemigo.push ('FUEGO')}
else if (ataqueAleatorio == 3 || ataqueAleatorio == 4)
    {ataqueEnemigo.push ('AGUA')}
else {ataqueEnemigo.push('TIERRA') }
    console.log(ataqueEnemigo)

    iniciarPelea()

}

function iniciarPelea() {
    if(ataqueJugador.length === 5 ){
        combate()    
    }
}

function indexAmbosOponente (jugador, enemigo){
    indexAtaqueJugador = ataqueJugador [jugador]
    indexAtaqueEnemigo = ataqueEnemigo [enemigo]
}

function combate (){
        clearInterval (intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador [index] === ataqueEnemigo [index]){
            indexAmbosOponente (index,index)
            crearMensaje("Empate")
        }
        else if (ataqueJugador[index]=== 'FUEGO' && ataqueEnemigo[index] ==='TIERRA') {
            indexAmbosOponente (index,index)
            crearMensaje ("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }

        else if (ataqueJugador[index]=== 'AGUA' && ataqueEnemigo[index] ==='FUEGO') {
            indexAmbosOponente (index,index)
            crearMensaje ("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index]==='AGUA' && ataqueEnemigo [index] ==='TIERRA') {
            indexAmbosOponente (index,index)
            crearMensaje ("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else {
            indexAmbosOponente(index,index)
            crearMensaje ("Perdiste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }


validarVidas ()

}

function crearMensaje(resultado){


sectionMensajes.innerHTML= resultado
ataquesDelJugador.innerHTML= indexAtaqueJugador
ataquesDelEnemigo.innerHTML= indexAtaqueEnemigo




}
function validarVidas(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal ("Que Reñido! Empate")}
    else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Ganaste :D ")}
    else {
        crearMensajeFinal("Perdiste")}

}
function crearMensajeFinal(resultadoFinal){




sectionMensajes.innerHTML= resultadoFinal
seccionReiniciar.style.display = 'block'

}
function reIniciarJuego(){
 location.reload(true)
}
function aleatorio (min,max){
    return Math.floor(Math.random() * (max-min+1)+min)
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX 
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
        mascotaJugadorObjeto.pintarMokepon()

        enviarPosicion (mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)
        mokeponesEnemigos.forEach(function(mokepon){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        })

        dragobertoEnemigo.pintarMokepon()
        duolingoEnemigo.pintarMokepon()
        llamaradaEnemigo.pintarMokepon()
        

}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })

    .then (function (res){
        if (res.ok){
            res.json()
                .then(function({ enemigos }){
                        console.log(enemigos)
                        mokeponesEnemigos = enemigos.map (function (enemigo){
                                let mokeponEnemigo = null
                                const mokeponNombre = enemigo.mokepon.nombre || ""
                                if (mokeponNombre === "Dragoberto"){
                                    mokeponEnemigo = new Mokepon ('Dragoberto','Imagenes/Dragoberto.jpg', 5, 'Imagenes/Dragoberto.jpg',enemigo.id)
                                } else if (mokeponNombre === "Duolingo"){
                                    mokeponEnemigo = new Mokepon('Duolingo','Imagenes/Duolingo.png', 5, 'Imagenes/Duolingo.png',enemigo.id)
                                } else if (mokeponNombre === "Llamarada"){
                                    mokeponEnemigo = new Mokepon('Llamarada','Imagenes/Llamarada.jpg', 5, 'Imagenes/Llamarada.jpg',enemigo.id)
                                }

                                    mokeponEnemigo.x = enemigo.x
                                    mokeponEnemigo.y = enemigo.y
                                    return mokeponEnemigo
                        })
                })
        }
    })
}

function moverDerecha(){
     mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
     mascotaJugadorObjeto.velocidadX = - 5
}
function moverAbajo(){
     mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba(){
     mascotaJugadorObjeto.velocidadY = - 5
}

function detenerMovimiento (){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
             moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;            
    
        default:
            break;
    }
}

function iniciarMapa(){

    mascotaJugadorObjeto = obtenerObjetoMascota (mascotaJugador)
    console.log( mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval (pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)

}

function obtenerObjetoMascota(){
        for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones [i].nombre){
            return mokepones [i]
        }
    }
}

function revisarColision (enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo= enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota =  mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota =mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x


    
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    )
    { return 

    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('se detecto una colision')
    enemigoId = enemigo.id
    seccionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo (enemigo)
                         

}
 


window.addEventListener('load', iniciarJuego)
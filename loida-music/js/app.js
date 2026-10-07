/* ==========================================
LOIDA MUSIC
JAVASCRIPT PRINCIPAL
========================================== */

/* ==========================================
CANCIONES
========================================== */

const canciones = [


{
    id: 1,
    titulo: "Mi Primera Canción",
    artista: "Loida Music",
    archivo: "music/cancion1.mp3",
    portada: "img/portadas/default.jpg",
    favorita: false
},

{
    id: 2,
    titulo: "Una Noche Especial",
    artista: "Loida Music",
    archivo: "music/cancion2.mp3",
    portada: "img/portadas/default.jpg",
    favorita: false
},

{
    id: 3,
    titulo: "Recuerdos",
    artista: "Loida Music",
    archivo: "music/cancion3.mp3",
    portada: "img/portadas/default.jpg",
    favorita: false
},

{
    id: 4,
    titulo: "Mi Playlist",
    artista: "Loida Music",
    archivo: "music/cancion4.mp3",
    portada: "img/portadas/default.jpg",
    favorita: false
}


];

/* ==========================================
ELEMENTOS HTML
========================================== */

const audio = document.getElementById("audio");

const listaCanciones =
document.getElementById("listaCanciones");

const cantidadCanciones =
document.getElementById("cantidadCanciones");

const portadaActual =
document.getElementById("portadaActual");

const tituloActual =
document.getElementById("tituloActual");

const artistaActual =
document.getElementById("artistaActual");

const btnPlay =
document.getElementById("btnPlay");

const btnAnterior =
document.getElementById("btnAnterior");

const btnSiguiente =
document.getElementById("btnSiguiente");

const btnAleatorio =
document.getElementById("btnAleatorio");

const btnRepetir =
document.getElementById("btnRepetir");

const btnFavorito =
document.getElementById("btnFavorito");

const barraProgreso =
document.getElementById("barraProgreso");

const barraVolumen =
document.getElementById("barraVolumen");

const tiempoActual =
document.getElementById("tiempoActual");

const duracion =
document.getElementById("duracion");

const buscador =
document.getElementById("buscadorCanciones");

const reproductor =
document.getElementById("reproductor");

/* ==========================================
VARIABLES
========================================== */

let indiceActual = -1;

let reproduciendo = false;

let aleatorio = false;

let repetir = false;

let cancionesMostradas = [...canciones];

/* ==========================================
MOSTRAR CANCIONES
========================================== */

function mostrarCanciones(lista = canciones) {


listaCanciones.innerHTML = "";

cancionesMostradas = lista;

cantidadCanciones.textContent =
    `${lista.length} ${lista.length === 1 ? "canción" : "canciones"}`;


if (lista.length === 0) {

    listaCanciones.innerHTML = `
        <div class="sin-canciones">
            No encontramos canciones.
        </div>
    `;

    return;
}


lista.forEach((cancion) => {

    const indiceOriginal =
        canciones.findIndex(
            item => item.id === cancion.id
        );


    const elemento =
        document.createElement("div");

    elemento.className = "cancion";


    if (indiceOriginal === indiceActual) {
        elemento.classList.add("activa");
    }


    elemento.innerHTML = `

        <img
            src="${cancion.portada}"
            alt="${cancion.titulo}"
            class="cancion-portada"
        >

        <div class="cancion-info">

            <h3>
                ${cancion.titulo}
            </h3>

            <p>
                ${cancion.artista}
            </p>

        </div>

        <span class="cancion-duracion">
            ♫
        </span>

    `;


    elemento.addEventListener(
        "click",
        () => {

            cargarCancion(indiceOriginal);

            reproducir();

        }
    );


    listaCanciones.appendChild(elemento);

});


}

/* ==========================================
CARGAR CANCIÓN
========================================== */

function cargarCancion(indice) {


if (indice < 0 || indice >= canciones.length) {
    return;
}


indiceActual = indice;


const cancion =
    canciones[indice];


audio.src =
    cancion.archivo;


portadaActual.src =
    cancion.portada;


tituloActual.textContent =
    cancion.titulo;


artistaActual.textContent =
    cancion.artista;


btnFavorito.classList.toggle(
    "activo",
    cancion.favorita
);


btnFavorito.textContent =
    cancion.favorita
        ? "♥"
        : "♡";


barraProgreso.value = 0;

tiempoActual.textContent = "0:00";

duracion.textContent = "0:00";


mostrarCanciones(cancionesMostradas);


}

/* ==========================================
REPRODUCIR
========================================== */

function reproducir() {


if (indiceActual === -1) {

    cargarCancion(0);

}


audio.play()
    .then(() => {

        reproduciendo = true;

        actualizarBotonPlay();

        reproductor.classList.add(
            "reproduciendo"
        );

    })
    .catch((error) => {

        console.log(
            "No se pudo reproducir:",
            error
        );

        alert(
            "No se pudo reproducir la canción. Revisa que el archivo exista dentro de la carpeta music."
        );

    });


}

/* ==========================================
PAUSAR
========================================== */

function pausar() {


audio.pause();

reproduciendo = false;

actualizarBotonPlay();

reproductor.classList.remove(
    "reproduciendo"
);


}

/* ==========================================
PLAY / PAUSA
========================================== */

btnPlay.addEventListener(
"click",
() => {


    if (reproduciendo) {

        pausar();

    } else {

        reproducir();

    }

}


);

/* ==========================================
ACTUALIZAR BOTÓN PLAY
========================================== */

function actualizarBotonPlay() {


btnPlay.textContent =
    reproduciendo
        ? "❚❚"
        : "▶";


}

/* ==========================================
SIGUIENTE
========================================== */

function siguienteCancion() {


if (canciones.length === 0) {
    return;
}


let nuevoIndice;


if (aleatorio) {

    nuevoIndice =
        Math.floor(
            Math.random() * canciones.length
        );


    if (
        canciones.length > 1 &&
        nuevoIndice === indiceActual
    ) {

        nuevoIndice =
            (nuevoIndice + 1)
            % canciones.length;

    }

} else {

    nuevoIndice =
        indiceActual + 1;


    if (
        nuevoIndice >= canciones.length
    ) {

        nuevoIndice = 0;

    }

}


cargarCancion(nuevoIndice);

reproducir();


}

/* ==========================================
CANCIÓN ANTERIOR
========================================== */

function anteriorCancion() {


if (canciones.length === 0) {
    return;
}


let nuevoIndice =
    indiceActual - 1;


if (nuevoIndice < 0) {

    nuevoIndice =
        canciones.length - 1;

}


cargarCancion(nuevoIndice);

reproducir();


}

/* ==========================================
BOTONES SIGUIENTE / ANTERIOR
========================================== */

btnSiguiente.addEventListener(
"click",
siguienteCancion
);

btnAnterior.addEventListener(
"click",
anteriorCancion
);

/* ==========================================
PROGRESO DE LA CANCIÓN
========================================== */

audio.addEventListener(
"timeupdate",
() => {


    if (!audio.duration) {
        return;
    }


    const porcentaje =
        (audio.currentTime /
            audio.duration) * 100;


    barraProgreso.value =
        porcentaje;


    tiempoActual.textContent =
        convertirTiempo(
            audio.currentTime
        );

}


);

/* ==========================================
DURACIÓN
========================================== */

audio.addEventListener(
"loadedmetadata",
() => {


    duracion.textContent =
        convertirTiempo(
            audio.duration
        );

}


);

/* ==========================================
CAMBIAR POSICIÓN
========================================== */

barraProgreso.addEventListener(
"input",
() => {


    if (!audio.duration) {
        return;
    }


    const nuevaPosicion =
        (barraProgreso.value / 100)
        * audio.duration;


    audio.currentTime =
        nuevaPosicion;

}


);

/* ==========================================
CONVERTIR SEGUNDOS A MINUTOS
========================================== */

function convertirTiempo(segundos) {


if (!Number.isFinite(segundos)) {
    return "0:00";
}


const minutos =
    Math.floor(segundos / 60);


const segundosRestantes =
    Math.floor(segundos % 60);


return `${minutos}:${String(
    segundosRestantes
).padStart(2, "0")}`;


}

/* ==========================================
VOLUMEN
========================================== */

barraVolumen.addEventListener(
"input",
() => {


    audio.volume =
        barraVolumen.value;

}


);

/* ==========================================
ALEATORIO
========================================== */

btnAleatorio.addEventListener(
"click",
() => {


    aleatorio =
        !aleatorio;


    btnAleatorio.style.color =
        aleatorio
            ? "#d6b36a"
            : "";


    btnAleatorio.title =
        aleatorio
            ? "Aleatorio activado"
            : "Aleatorio desactivado";

}


);

/* ==========================================
REPETIR
========================================== */

btnRepetir.addEventListener(
"click",
() => {


    repetir =
        !repetir;


    btnRepetir.style.color =
        repetir
            ? "#d6b36a"
            : "";


    btnRepetir.title =
        repetir
            ? "Repetición activada"
            : "Repetición desactivada";

}


);

/* ==========================================
CUANDO TERMINA UNA CANCIÓN
========================================== */

audio.addEventListener(
"ended",
() => {


    if (repetir) {

        audio.currentTime = 0;

        reproducir();

        return;

    }


    siguienteCancion();

}


);

/* ==========================================
FAVORITOS
========================================== */

btnFavorito.addEventListener(
"click",
() => {


    if (indiceActual === -1) {
        return;
    }


    canciones[indiceActual].favorita =
        !canciones[indiceActual].favorita;


    const favorita =
        canciones[indiceActual].favorita;


    btnFavorito.textContent =
        favorita
            ? "♥"
            : "♡";


    btnFavorito.classList.toggle(
        "activo",
        favorita
    );


    guardarFavoritos();

}


);

/* ==========================================
GUARDAR FAVORITOS
========================================== */

function guardarFavoritos() {


const favoritos =
    canciones
        .filter(cancion => cancion.favorita)
        .map(cancion => cancion.id);


localStorage.setItem(
    "loidaMusicFavoritos",
    JSON.stringify(favoritos)
);


}

/* ==========================================
CARGAR FAVORITOS
========================================== */

function cargarFavoritos() {


const favoritosGuardados =
    JSON.parse(
        localStorage.getItem(
            "loidaMusicFavoritos"
        )
    );


if (!favoritosGuardados) {
    return;
}


canciones.forEach(
    cancion => {

        cancion.favorita =
            favoritosGuardados.includes(
                cancion.id
            );

    }
);


}

/* ==========================================
BUSCADOR
========================================== */

buscador.addEventListener(
"input",
() => {


    const texto =
        buscador.value
            .toLowerCase()
            .trim();


    const resultados =
        canciones.filter(
            cancion =>

                cancion.titulo
                    .toLowerCase()
                    .includes(texto)

                ||

                cancion.artista
                    .toLowerCase()
                    .includes(texto)
        );


    mostrarCanciones(resultados);

}


);

/* ==========================================
FILTROS
========================================== */

const botonesFiltro =
document.querySelectorAll(
".acceso"
);

botonesFiltro.forEach(
boton => {


    boton.addEventListener(
        "click",
        () => {

            botonesFiltro.forEach(
                item =>
                    item.classList.remove(
                        "activo"
                    )
            );


            boton.classList.add(
                "activo"
            );


            const filtro =
                boton.dataset.filtro;


            if (filtro === "todas") {

                mostrarCanciones(
                    canciones
                );

            }


            if (filtro === "favoritas") {

                mostrarCanciones(
                    canciones.filter(
                        cancion =>
                            cancion.favorita
                    )
                );

            }


            if (filtro === "recientes") {

                mostrarCanciones(
                    canciones
                );

            }

        }
    );

}


);

/* ==========================================
BOTÓN DE OPCIONES
========================================== */

const btnOpciones =
document.getElementById(
"btnOpciones"
);

btnOpciones.addEventListener(
"click",
() => {


    alert(
        "Loida Music\n\nPróximamente:\n• Playlists\n• Importar música\n• Ecualizador\n• Ajustes"
    );

}


);

/* ==========================================
INICIO
========================================== */

cargarFavoritos();

mostrarCanciones();

audio.volume = 1;

actualizarBotonPlay();

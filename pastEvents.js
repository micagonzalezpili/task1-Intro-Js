/* let contenedorCardsDos = document.getElementById("contenedorcardsDos")
console.log(document.getElementById("contenedorcardsDos"))

function crearCard(events) {
    return `<div class="card d-flex flex-column justify-content-evenly" style="width: 18rem;">
    <img src=${events.image}" class="card-img-top" style="width: 18rem;" alt="${events.name}">
    <div class="card-body ">
      <h5 class="card-title">${events.name}</h5>
      <p class="card-text">${events.description}</p>
      <a href="./details.html?_id${events._id}" class="btn btn-primary">Details</a>
      </div>
  </div> `
}

function filtroEventos(arrayData, currentDate) {
    const pastEvents = [];
    for (let events of arrayData){
        if (events.date <= currentDate){
            pastEvents.push(events);
        }
    }
    return pastEvents;
}

let dateFilter = filtroEventos(data.events, data.currentDate);

function imprimirCard(events, contenedorCardsDos) {
    let template = ""
    for (let elemento of events) {
        template += crearCard(elemento)
    }
    contenedorCardsDos.innerHTML = template    
}

imprimirCard(dateFilter, contenedorCardsDos)

// checkbox: extraer dinamicamente las categorias de los eventos desde data, eliminar las repetidas y guardarlo en un nuevo array que se imprimira x pantalla
let contenedorCheckboxs = document.getElementById("contenedor-cbox")
const categories = data.events.map(events => events.category)
const setCategories = new Set(categories)
const arrayCategories = Array.from(setCategories)
console.log(arrayCategories);
const inputSearch = document.getElementById("searchInput")


const crearCheckbox = (acc, arrayCategories) => {
    return acc += `<div class="d-flex align-items-center justify-content-center flex-s-column mx-2 ">
    <input type="checkbox" id="category" value="${arrayCategories}">
    <label class="p-2" for="category">${arrayCategories}</label>
  </div>`

}
const templateCheckbox = arrayCategories.reduce(crearCheckbox, ``)

contenedorCheckboxs.innerHTML = templateCheckbox
console.log(contenedorCheckboxs);

// hacer q los filtros funcionen independientes o combinados x ej estableciendo condiciones (si el input tiene un valor o si el check esta checkeado), si no coinciden la busqueda
// avisarlo al usuario

function filtrarPorCheck(events, category) {
    if (category.length == 0) {
        return events;
    } else {
        return events.filter((e) => category.includes(e.category))
    }
}

contenedorCheckboxs.addEventListener(`change`, () => {
    let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
    const eventosFiltrados = filtrarPorCheck(data.events, checkboxChecked)
    let aux = filtrarPorTexto(eventosFiltrados, inputSearch.value)
    filtrosCombinados(aux, contenedorCards)
})

// hacer input de search capturar las palabras claves, pasarlo a lower case y filtrarlo con el nombre del evento tmb en lower case, guardar el resultado en una nueva var,
function filtrarPorTexto(arrayData, busquedaUsuario) {
    if (arrayData) {
        return arrayData.filter((e) => e.name.toLowerCase().includes(busquedaUsuario.toLowerCase()))
    }
}

inputSearch.addEventListener(`input`, () => {
    let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
    const eventosFiltrados = filtrarPorCheck(data.events, checkboxChecked)
    let filtroPorBusqueda = filtrarPorTexto(eventosFiltrados, inputSearch.value)
    let aux = filtrarPorTexto(filtroPorBusqueda, inputSearch.value)
    filtrosCombinados(aux, contenedorCards)

})

function filtrosCombinados(arrayCategories, donde) {
    if (arrayCategories.length === 0) {
        donde.innerHTML = `<h3 class="text-center">Please try again.</h3>`
    } else {
        const imprimirMsj = arrayCategories.map((e) => crearCard(e)).join("")
        donde.innerHTML = imprimirMsj
    }
}
 */
let contenedorCardsDos = document.getElementById("contenedorcardsDos")
console.log(document.getElementById("contenedorcardsDos"))
const pastEvents = data.events.filter(filterPastEvents)

function filterPastEvents(evento) {
    return evento.date < data.currentDate
}
function crearCard(events) {
    return `<div class="card d-flex flex-column justify-content-evenly" style="width: 18rem;">
    <img src=${events.image}" class="card-img-top" style="width: 18rem;" alt="${events.name}">
    <div class="card-body ">
      <h5 class="card-title">${events.name}</h5>
      <p class="card-text">${events.description}</p>
      <a href="./details.html?_id=${events._id}" class="btn btn-primary">Details</a>
      </div>
  </div> `
}

function imprimirCard(events, contenedorCards) {
    let template = ""
    for (let elemento of events) {
        template += crearCard(elemento)
    }
    contenedorCards.innerHTML = template
}

imprimirCard(pastEvents, contenedorCardsDos)

// checkbox: extraer dinamicamente las categorias de los eventos desde data, eliminar las repetidas y guardarlo en un nuevo array que se imprimira x pantalla
let contenedorCheckboxs = document.getElementById("contenedor-cbox")
const categories = pastEvents.map(events => events.category)
const setCategories = new Set(categories)
const arrayCategories = Array.from(setCategories)
console.log(arrayCategories);
const inputSearchDos = document.getElementById("searchInput")


const crearCheckbox = (acc, arrayCategories) => {
    return acc += `<div class="d-flex align-items-center justify-content-center flex-s-column mx-2 ">
    <input type="checkbox" id="category" value="${arrayCategories}">
    <label class="p-2" for="category">${arrayCategories}</label>
  </div>`

}
const templateCheckbox = arrayCategories.reduce(crearCheckbox, ``)

contenedorCheckboxs.innerHTML = templateCheckbox

// hacer q los filtros funcionen independientes o combinados x ej estableciendo condiciones (si el input tiene un valor o si el check esta checkeado), si no coinciden la busqueda
// avisarlo al usuario

function filtrarPorCheck(events, category) {
    if (category.length == 0) {
        return events;
    } else {
        return events.filter((e) => category.includes(e.category))
    }
}

contenedorCheckboxs.addEventListener(`change`, () => {
    let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
    const eventosFiltrados = filtrarPorCheck(pastEvents, checkboxChecked)
    let aux = filtrarPorTexto(eventosFiltrados, inputSearchDos.value)
    filtrosCombinados(aux, contenedorCardsDos)
})

// hacer input de search capturar las palabras claves, pasarlo a lower case y filtrarlo con el nombre del evento tmb en lower case, guardar el resultado en una nueva var,
function filtrarPorTexto(arrayData, busquedaUsuario) {
    if (arrayData) {
        return arrayData.filter((e) => e.name.toLowerCase().includes(busquedaUsuario.toLowerCase()))
    }
}

inputSearchDos.addEventListener(`input`, () => {
    let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
    const eventosFiltrados = filtrarPorCheck(pastEvents, checkboxChecked)
    let filtroPorBusqueda = filtrarPorTexto(eventosFiltrados, inputSearchDos.value)
    let aux = filtrarPorTexto(filtroPorBusqueda, inputSearchDos.value)
    filtrosCombinados(aux, contenedorCardsDos)

})

function filtrosCombinados(arrayCategories, donde) {
    if (arrayCategories.length === 0) {
        donde.innerHTML = `<h3 class="text-center">Please try again.</h3>`
    } else {
        const imprimirMsj = arrayCategories.map((e) => crearCard(e)).join("")
        donde.innerHTML = imprimirMsj
    }
}



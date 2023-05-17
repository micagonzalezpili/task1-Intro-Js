
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        let events = data.events;
        console.log(events);
        let contenedorCardsDos = document.getElementById("contenedorcardsDos")
        const pastEvents = data.events.filter(filterPastEvents)
        let contenedorCheckboxs = document.getElementById("contenedor-cbox") // traigo el contenedor de los checkbox con su ID
        const inputSearch = document.getElementById("searchInput")  // me traje el input de la barra de buscar con su ID 
        const categories = events.map(events => events.category) // recorro el array y me traigo las categorias de cada evento
        const setCategories = new Set(categories) // convierto el array anterior en set
        const arrayCategories = Array.from(setCategories)
        const templateCheckbox = arrayCategories.reduce(crearCheckbox, ``)
        contenedorCheckboxs.innerHTML = templateCheckbox // agrego el paso anterior en su contenedor
        contenedorCheckboxs.addEventListener(`change`, () => { // le pongo un listener a los checkbox para q cada vez q algo cambie se ejecute la fn y los combino por checked y por texto 
            let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
            const eventosFiltrados = filtrarPorCheck(events, checkboxChecked)
            let aux = filtrarPorTexto(eventosFiltrados, inputSearch.value) // ejecuto la fn de filtrar por texto y la cruzo con la de los checkboxs
            avisoUsuario(aux, contenedorCardsDos)
        })
        inputSearch.addEventListener(`input`, () => { // le pongo un listener a lo que escribe el us para q cada vez q escriba en input se ejecute la fn y los combino tmb con los checked 
            let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
            const eventosFiltrados = filtrarPorCheck(data.events, checkboxChecked)
            let filtroPorBusqueda = filtrarPorTexto(eventosFiltrados, inputSearch.value)
            let aux = filtrarPorTexto(filtroPorBusqueda, inputSearch.value)
            avisoUsuario(aux, contenedorCardsDos)

        })
        imprimirCard(pastEvents, contenedorCardsDos)

    })
    .catch(err => console.log(err))

function filterPastEvents(evento) {
    return evento.date < data.currentDate
}
function crearCard(events) {
    return `<div class="card d-flex flex-column justify-content-evenly" style="width: 18rem;">
    <img src="${events.image}" class="card-img-top" style="width: 18rem;" alt="${events.name}">
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
const crearCheckbox = (acc, arrayCategories) => {
    return acc += `<div class="d-flex align-items-center justify-content-center flex-s-column mx-2 ">
    <input type="checkbox" id="category" value="${arrayCategories}">
    <label class="p-2" for="category">${arrayCategories}</label>
  </div>`

}

function filtrarPorCheck(events, category) {
    if (category.length == 0) {
        return events;
    } else {
        return events.filter((e) => category.includes(e.category))
    }
}

// hacer input de search capturar las palabras claves, pasarlo a lower case y filtrarlo con el nombre del evento tmb en lower case, guardar el resultado en una nueva var,
function filtrarPorTexto(arrayData, busquedaUsuario) {
    if (arrayData) {
        return arrayData.filter((e) => e.name.toLowerCase().includes(busquedaUsuario.toLowerCase()))
    }
}

function avisoUsuario(arrayCategories, donde) {
    if (arrayCategories.length === 0) {
        donde.innerHTML = `<h3 class="text-center">Please try again.</h3>`
    } else {
        const imprimirMsj = arrayCategories.map((e) => crearCard(e)).join("")
        donde.innerHTML = imprimirMsj
    }
}





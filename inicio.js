let contenedorCards = document.getElementById("contenedorcards") // me traigo el contenedor de las cards con su ID
console.log(document.getElementById("contenedorcards"))

function crearCard(events) { // funcion que crea cards
    return `<div class="card d-flex flex-column justify-content-evenly" style="width: 18rem;">
    <img src=${events.image}" class="card-img-top" style="width: 18rem;" alt="${events.name}">
    <div class="card-body ">
      <h5 class="card-title">${events.name}</h5>
      <p class="card-text">${events.description}</p>
      <a href="./details.html?_id=${events._id}" class="btn btn-primary">Details</a>
      </div>
  </div> `
}

function imprimirCard(events, contenedorCards) { // funcion que imprime las cards
    let template = ""
    for (let elemento of events) {
        template += crearCard(elemento)
    }
    contenedorCards.innerHTML = template
}

imprimirCard(data.events, contenedorCards) // funcion ejecutada

// checkbox: extraer dinamicamente las categorias de los eventos desde data, eliminar las repetidas y guardarlo en un nuevo array que se imprimira x pantalla
let contenedorCheckboxs = document.getElementById("contenedor-cbox") // traigo el contenedor de los checkbox con su ID
const categories = data.events.map(events => events.category) // recorro el array y me traigo las categorias de cada evento
const setCategories = new Set(categories) // convierto el array en set
const arrayCategories = Array.from(setCategories) // convierto el set en array aca
console.log(arrayCategories);
const inputSearch = document.getElementById("searchInput")  // me traje el input de la barra de buscar con su ID 

const crearCheckbox = (acc, arrayCategories) => {
    return acc += `<div class="d-flex align-items-center justify-content-center flex-s-column mx-2 ">
    <input type="checkbox" id="category" value="${arrayCategories}">
    <label class="p-2" for="category">${arrayCategories}</label>
  </div>`

}
const templateCheckbox = arrayCategories.reduce(crearCheckbox, ``)  // en una nueva var le hago reduce a los checkbox para que se me impriman todos en la pag

contenedorCheckboxs.innerHTML = templateCheckbox // agrego el paso anterior en su contenedor

// hacer q los filtros funcionen independientes o combinados x ej estableciendo condiciones (si el input tiene un valor o si el check esta checkeado), si no coinciden la busqueda
// avisarlo al usuario

function filtrarPorCheck(events, category) { // funcion para filtrar cada card por checkboxs
    if (category.length == 0) { // si no hay ninguno que este checked salen todos
        return events;
    } else { //sino, me retorna el que coincida 
        return events.filter((e) => category.includes(e.category))
    }
}

contenedorCheckboxs.addEventListener(`change`, () => { // le pongo un listener a los checkbox para q cada vez q algo cambie se ejecute la fn y los combino por checked y por texto 
    let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
    const eventosFiltrados = filtrarPorCheck(data.events, checkboxChecked)
    let aux = filtrarPorTexto(eventosFiltrados, inputSearch.value)
    filtrosCombinados(aux, contenedorCards)
})

// hacer input de search capturar las palabras claves, pasarlo a lower case y filtrarlo con el nombre del evento tmb en lower case, guardar el resultado en una nueva var,
function filtrarPorTexto(arrayData, busquedaUsuario) { // hago una fn que me filtre lo que el us busca en la barra y lo paso a minuscula al igual que los nombres de los evetnos
    if (arrayData) {
        return arrayData.filter((e) => e.name.toLowerCase().includes(busquedaUsuario.toLowerCase()))
    }
}

inputSearch.addEventListener(`input`, () => { // le pongo un listener a lo que escribe el us para q cada vez q escriba en input se ejecute la fn y los combino tmb con los checked 
    let checkboxChecked = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`)).map(check => check.value)
    const eventosFiltrados = filtrarPorCheck(data.events, checkboxChecked)
    let filtroPorBusqueda = filtrarPorTexto(eventosFiltrados, inputSearch.value)
    let aux = filtrarPorTexto(filtroPorBusqueda, inputSearch.value)
    filtrosCombinados(aux, contenedorCards)

})

function filtrosCombinados(arrayCategories, donde) { // hago que si la busqueda del us no coincide con ningun evento le aparezca un mensaje avisandole
    if (arrayCategories.length === 0) {
        donde.innerHTML = `<h3 class="text-center">Please try again.</h3>`
    } else {
        const imprimirMsj = arrayCategories.map((e) => crearCard(e)).join("")
        donde.innerHTML = imprimirMsj
    }
}



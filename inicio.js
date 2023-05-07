let contenedorCards = document.getElementById("contenedorcards")
console.log(document.getElementById("contenedorcards"))

function crearCard(events) {
    return `<div class="card d-flex flex-column justify-content-evenly" style="width: 18rem;">
    <img src=${events.image}" class="card-img-top" style="width: 18rem;" alt="${events.name}">
    <div class="card-body ">
      <h5 class="card-title">${events.name}</h5>
      <p class="card-text">${events.description}</p>
      <a href="./details.html" class="btn btn-primary">Details</a>
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

imprimirCard(data.events, contenedorCards)
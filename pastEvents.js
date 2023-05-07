let contenedorCardsDos = document.getElementById("contenedorcardsDos")
console.log(document.getElementById("contenedorcardsDos"))

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
imprimirCard (data.events, data.currentDate);

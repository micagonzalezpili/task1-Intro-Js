let contenedorCardsTres = document.getElementById("contenedorcardsTres")
console.log(document.getElementById("contenedorcardsTres"))

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
    const upComingEvents = [];
    for (let events of arrayData){
        if (events.date >= currentDate){
            upComingEvents.push(events);
        }
    }
    return upComingEvents;
}

let dateFilter = filtroEventos(data.events, data.currentDate);

function imprimirCard(events, contenedorCardsTres) {
    let template = ""
    for (let elemento of events) {
        template += crearCard(elemento)
    }
    contenedorCardsTres.innerHTML = template    
}


imprimirCard(dateFilter, contenedorCardsTres)
imprimirCard (data.events, data.currentDate);




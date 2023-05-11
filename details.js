// al hacer click en details que me redirija a la pag correspondiente del evento 
const allEvents = data.events
const contenedorDetails = document.getElementById("contedorDetails")
let params = new URLSearchParams(location.search)
const datosParams = params.get("_id")
const evento = allEvents.find(events => events._id == datosParams)
console.log(allEvents);
console.log(params);
console.log(evento);



// imprimirlo en html

function crearDetail(events) {
    return `  <div class="card mb-3 ms-4 d-flex col-12 justify-content-center align-items-center" style="max-width: 800px; height: 500px; background-color:  #d3c3f1;">
    <div class="row g-0">
    <div class="col-md-4 align-self-center">
      <img src="${events.image}" class="img-fluid rounded-start ms-3" alt="festival">
    </div>
    <div class="col-md-8 d-flex justify-content-evenly" style=" height: 500px">
      <div class="card-body align-self-center ms-3">
        <h5 class="card-title text-center mb-3">${events.name}</h5>
        <p class="card-text">Date: "${events.date}"<br>
          Description: "${events.description}"<br>
          Category:"${events.category}"<br>
          Place: "${events.place}"<br>
          Capacity: ${events.capacity} <br>
          Price: $${events.price}</p>
          <p class="card-text ms-5"> ${events.assistance ? `<p>Assistance: ${events.assistance}</p>` : `<p>Estimate: ${events.estimate} </p>` }</p> 
      </div>
    </div>  
  </div>
  </div>`
  
}
contenedorDetails.innerHTML = crearDetail(evento)

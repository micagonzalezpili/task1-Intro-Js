fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(res => res.json())
    .then(data => {
        let dataEvents = data
        let eventos = data.events
        console.log(data);
        console.log(eventos);

        let pastEvents = eventos.filter(filterPastEvents)
        console.log(pastEvents);

        let upComingE = eventos.filter(filterUpComingEvents)
        console.log(upComingE);

        function filterPastEvents(evento) { // FUNCION PARA FILTRAR EVENTOS PASADOS
            return evento.date < dataEvents.currentDate
        }
        function filterUpComingEvents(evento) { // FUNCION PARA FILTRAR EVENTOS FUTUROS
            return evento.date > dataEvents.currentDate
        }

        let catPastEvents = Array.from( // CATEGORIAS PAST EVENTS
            new Set(pastEvents.map((e) => e.category))
        );
        console.log(catPastEvents);

        let catUpcomingE = Array.from( // CATEGORIAS UPCOMING EVENTS
            new Set(upComingE.map((e) => e.category))
        );
        console.log(catUpcomingE);

        const infoPastEventsByCats = pastEventsByCat(catPastEvents, pastEvents)
        console.log(infoPastEventsByCats);

        const infoUpComingByCats = upComingByCat(catUpcomingE, upComingE)
        console.log(infoUpComingByCats);

        let tablaUno = document.getElementById("tbodyUno") // ME TRAJE EL BODY DE LA TABLA UNO Y LE IMPRIMI LA INFO
        tablaUno.innerHTML = `<tr class=" border border-black">                
        <td class=" border border-black" id="tdMayor%">${calcularMayor(pastEvents)}</td>
        <td class=" border border-black" id="tdMenor%">${calcularMenor(pastEvents)} </td>
        <td class=" border border-black" id="mayorCapacidad"v> ${mayorCapacidad(pastEvents)}</td>
      </tr>`

        let tablaDos = document.getElementById("tablaDos")
        let tBodyDos = document.createElement("tbody");
        for (const event of infoUpComingByCats) { // POR CADA EVENT DE LOS FUTUROS , SE IMPRIME UNA FILA CON LA INFO CORRESPONDIENTE
            let tr = document.createElement("tr");
            tr.innerHTML = `<td class=" border border-black">${event.category}</td>
                <td class=" border border-black">$${event.revenues}</td>
                <td class=" border border-black">${event.attendance.toFixed(2)} %</td>`;
            tBodyDos.appendChild(tr);
        }
        tablaDos.appendChild(tBodyDos);

        let tablaTres = document.getElementById("tablaTres")
        let tBodyTres = document.getElementById("tBodyTres")
        for (const event of infoPastEventsByCats) { // POR CADA EVENT DE LOS PASADOSS , SE IMPRIME UNA FILA CON LA INFO CORRESPONDIENTE
            let tr = document.createElement("tr");
            tr.innerHTML = `<td class=" border border-black">${event.category}</td>
                <td class=" border border-black">$${event.revenues}</td>
                <td class=" border border-black">${event.attendance.toFixed(2)} %</td>`;
            tBodyTres.appendChild(tr);
        }
        tablaTres.appendChild(tBodyTres);

    })
    .catch((error) => console.log(error))


function calcularMayor(eventos) { // FUNCION Q CALCULA MAYOR % DE ASIST.
    let contador = 0;
    let title = "";
    eventos.forEach((evento) => {
        let numero = (evento.assistance / evento.capacity) * 100;

        if (numero > contador) {
            contador = numero;
            title = evento.name;
        }
    });

    return ` ${title} with ${contador.toFixed(2)}% of assistance`;
}

function calcularMenor(eventos) { // FUNCION Q CALCULA MENOR % DE ASIST.
    let contador = 100;
    let title = "";
    eventos.forEach((evento) => {
        let numero = (evento.assistance / evento.capacity) * 100;

        if (numero < contador) {
            contador = numero;
            title = evento.name;
        }
    });

    return `${title} with ${contador}% of assistance`;
}

function mayorCapacidad(eventos) { // FUNCION Q CALCULA LA > CAPACIDAD 
    let contador = 0;
    let title = "";
    eventos.forEach((evento) => {
        if (evento.capacity > contador) {
            contador = evento.capacity;
            title = evento.name;
        }
    });

    return ` ${title} with ${contador}% of capacity`;
}

function pastEventsByCat(categories, eventos) { // funcion que compara la category CON LA CATEGORIA DE CADA event, CALCULA REVENUES DE C CAT Y % DE ASIST 
    let result = [];
    categories.forEach((category) => {
        let catEvents = eventos.filter((event) => category == event.category); // FILTRO A EVENTOS PARA QUE COINCIDA LA CATEGORIA C LA DE C EVENTO
        console.log(catEvents);
        let revenues = catEvents.reduce((acum, event) => acum + event.price * event.assistance, 0);// REDUCE A LAS CATEGORIAS Y USO EL ACC PARA QUE POR C CATEGORIA ME HAGA EL CALCULO DE LOS REVENUES DE CADA EVENTO
        let attendance = catEvents.reduce((acum, event) => acum + (event.assistance / event.capacity) * 100, 0);
        result.push({
            category,
            revenues,
            attendance: attendance / catEvents.length
        });
    });
    return result;
}

function upComingByCat(categories, eventos) { 
    let result = [];
    categories.forEach((category) => {
        let catEvents = eventos.filter((event) => category == event.category); // FILTRO A EVENTOS PARA QUE COINCIDA LA CATEGORIA C LA DE C EVENTO
        let revenues = catEvents.reduce((acum, event) => acum + event.price * event.estimate, 0); // REDUCE A LAS CATEGORIAS Y USO EL ACC PARA QUE POR C CATEGORIA ME HAGA EL CALCULO DE LOS REVENUES DE CADA EVENTO           
        console.log(revenues);
        let attendance = catEvents.reduce((acum, event) => acum + (event.estimate / event.capacity) * 100, 0);
        result.push({
            category,
            revenues,
            attendance: attendance / catEvents.length
        }); // creo un objeto y le mando las propiedades que quiero que guarde. Tmb dividi la suma de los porcentajes de asistencia de todos los eventos por la cantidad total de eventos en esa categoría.
    });
    return result;
}



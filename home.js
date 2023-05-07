let mainCards = document.getElementById("main-card");

function createCard(object) {
	return `<div class="card" style="width: 15rem; margin: 1rem">
			<img src=${object.image}" class="card-img-top" alt="..." />
			<div class="card-body">
				<h5 class="card-title">${object.name}</h5>
				<p class="card-text">${object.description}</p>
				<div class="text-home d-sm-flex justify-content-between">
					<a
						href="./pages/details.html"
						class="btn btn-outline-dark d-flex align-items-end"
						style="width: 6rem"
					>
						See more
					</a>
					<p class="price">$${object.price}</p>
				</div>
			</div>
		</div>`;
}

function cardBucle(events, cardMain) {
	let template = "";
	for (let infoCard of events) {
		template += createCard(infoCard);
	}
	cardMain.innerHTML += template;
}
cardBucle(data.events, mainCards);

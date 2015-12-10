$(document).ready(function () {

	var deck = [],
		used = [],
		color = ["pique","coeur","trèfle","carreau"],
		colorIndex,
		r, //random number
		card,
		cardValue,
		color,
		rerun = 0;

	for (i = 0; i < 4; i += 1) {
		deck.push("as" + i, "deux" + i, "trois" + i, "quatre" + i, "cinq" + i, "six" + i, "sept" + i, "huit" + i, "neuf" + i, "dix" + i, "valet" + i, "dame" + i, "roi" + i);
	}

	function checkCard() {
		rerun = 0;
		r = Math.floor(Math.random() * (deck.length - 1)) + 1;
		card = deck[r];
		if (used.length + 1 < deck.length) {
			if (used.indexOf(card) > -1) {
				rerun = 1;
				return;
			} else {
				cardValue = card.slice(0, -1);
				colorIndex = card.slice(-1);
				console.log("Tu reçois : " + cardValue + " de " + color[colorIndex]);
				used.push(card);
			}
		} else {
			console.log("Plus de cartes, on remélange")
			used = [];
			rerun = 1;
		};
	};

	function getCard() {
		checkCard();
		while (rerun == 1) {
			checkCard();
		};
	}

	$("#get1").on("click", function () {
		getCard();
	});
	$("#get2").on("click", function () {
		getCard();
		getCard(); //dirty method to call it twice but let's face it I didn't succeed with other methods
	});

});
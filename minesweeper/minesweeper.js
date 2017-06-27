var model = {
	boardSize: 10,
	numMines: 10,
	mineLength: 1,
	hitMines: 0,

	mines: [
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] },
		{ locations: [0], hits: [""] }
		],


	fire: function(guess) {


		for (var i = 0; i < this.numMines; i++) {
			var mine = this.mines[i];
			var index = mine.locations.indexOf(guess);

////////////////////////////////////////////////////
			var gameOver = function() {
				alert("Game over!");
			};
////////////////////////////////////////////////////

			// here's an improvement! Check to see if the mine
			// has already been hit, message the user, and return true.
			if (mine.hits[index] === "hit") {
				view.displayMessage("You've already tried that location!");
				/// To do : This doen't work
				return true;
			} else if (index >= 0) {
				mine.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isHit(mine)) {
					view.displayMessage("You hit a mine!");
////////////////////////////////////////////////////
					gameOver();
					location.reload()
////////////////////////////////////////////////////
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("Safe territory");
		return false;
	},

	isHit: function(mine) {
		for (var i = 0; i < this.mineLength; i++)  {
			if (mine.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

	generatemineLocations: function() {
		var locations;
		for (var i = 0; i < this.numMines; i++) {
			do {
				locations = this.generatemine();
			} while (this.collision(locations));
			this.mines[i].locations = locations;
		}
		console.log("mines array: ");
		console.log(this.mines);
	},

	generatemine: function() {
		var row, col;
		row = Math.floor(Math.random() * this.boardSize);
		col = Math.floor(Math.random() * this.boardSize);

		var newmineLocations = [];
		for (var i = 0; i < this.mineLength; i++) {
				newmineLocations.push(row + "" + (col + i));
		}
		return newmineLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numMines; i++) {
			var mine = this.mines[i];
			for (var j = 0; j < locations.length; j++) {
				if (mine.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}

};


var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}

};

var controller = {
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			var hit = model.fire(location);
		}
	}
}


// helper function to parse a guess from the user

function parseGuess(guess) {

	if (guess === null || guess.length !== 2) {
		alert("Please enter a number coordinate numbers.");
	}
	else {
		var row = guess.charAt(0);
		var column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		}
		else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		}
		else {
			return row + column;
		}
	}
	return null;
}


// event handlers
/// i.e. what happens when : - a button is clicked  - the enter key is pressed etc.

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
/// This is really useful because it empties the form once the user has inputed coordinates.
	guessInput.value = "";
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

// init - called when the page has completed loading

window.onload = init;

function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the mines on the game board
	model.generatemineLocations();
}

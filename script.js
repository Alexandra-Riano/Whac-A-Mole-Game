const squares = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const resetButton = document.querySelector("#reset-button");

let result = 0;
let hitPosition;
let currentTime = 20;
let timerId = null;

// Selects a random square to show the mole
function randomSquare() {
	// Removes the 'mole' class from all squares
	squares.forEach((square) => {
		square.classList.remove("mole");
	});

	// Selects a random square to show the mole
	let randomSquare = squares[Math.floor(Math.random() * 9)];
	randomSquare.classList.add("mole");

	// Saves the position of the mole to check later if the user hits it
	hitPosition = randomSquare.id;
}

// Adds a listener to all squares to detect if the user hits the mole
squares.forEach((square) => {
	square.addEventListener("mousedown", () => {
		if (square.id == hitPosition) {
			result++;
			score.textContent = result;
			hitPosition = null;
		}
	});
});

// Moves the mole on a timer
function moveMole() {
	timerId = setInterval(randomSquare, 500);
}

// Starts moving the mole
moveMole();

// Counts down the time and ends the game when it reaches zero
function countDown() {
	currentTime--;
	timeLeft.textContent = currentTime;

	if (currentTime == 0) {
		clearInterval(countDownTimerId);
		clearInterval(timerId);
		alert("Try again! Your final score is " + result);
	}
}

// Starts the countdown timer
let countDownTimerId = setInterval(countDown, 1000);

// Reloads the page to reset the game
function resetGame() {
	location.reload();
}

resetButton.addEventListener("click", resetGame);

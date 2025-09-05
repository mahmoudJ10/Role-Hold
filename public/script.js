"use strict";

/* varibales*/

let isGamePlaying = true;
// current score ' big score '
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
// current score ' small score '
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
// players
let winner = -1; // default value
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// dice
const diceEl = document.querySelector(".dice");

// buttons
const buttnNew = document.querySelector(".btn--new");
const buttnRoll = document.querySelector(".btn--roll");
const buttnHold = document.querySelector(".btn--hold");

const image = document.querySelector("img");
const scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;

const hideDice = function () {
  diceEl.classList.add("hidden");
};
const starting = function () {
  // at the beggining of the game  ---> default values .

  diceEl.classList.add("hidden");
  scores[0] =
    scores[1] =
    score1El.textContent =
    score0El.textContent =
    current1El.textContent =
    current0El.textContent =
    currentScore =
      0;
  activePlayer = 0;
  player0El.classList.add("player--active");
  if (!isGamePlaying) {
    document
      .querySelector(`.player--${winner}`)
      .classList.remove("player--winner");
  }
  isGamePlaying = true;
};
const switchPlayer = function () {
  /* toggle themes using toggle methode of classList class */
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
const generateRandom = (max, min) =>
  Math.trunc(Math.random() * (max - min + 1)) + min;

const playerWin = function (active) {
  document.querySelector(`.player--${active}`).classList.add("player--winner");
  document
    .querySelector(`.player--${active}`)
    .classList.remove("player--active");
};

function rollFun() {
  // roll button functionality .
  if (isGamePlaying) {
    let randomNumber = generateRandom(6, 1);
    image.src = `./public/imgs/dice-${randomNumber}.png`;
    diceEl.classList.remove("hidden");

    if (randomNumber !== 1) {
      // increase currentScore
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore += randomNumber;
    } else {
      // swithc player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore = 0;
      switchPlayer();
      activePlayer = activePlayer === 0 ? 1 : 0;
    }
  }
}

function holdFun() {
  // hold buttton functionality
  if (isGamePlaying) {
    scores[activePlayer] = currentScore += activePlayer
      ? Number(score1El.textContent)
      : Number(score0El.textContent);

    // if player_1 turn then activePlayer will be true , if player_0 then it will be false .
    activePlayer
      ? (score1El.textContent = scores[activePlayer])
      : (score0El.textContent = scores[activePlayer]);

    if (scores[activePlayer] >= 30) {
      playerWin(activePlayer);
      hideDice();
      isGamePlaying = false;
      winner = activePlayer;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      switchPlayer();
    }
  }
}

// game start
starting();

// Roll button
buttnRoll.addEventListener("click", rollFun);

// hold button
buttnHold.addEventListener("click", holdFun);

// new game btn .
buttnNew.addEventListener("click", starting);

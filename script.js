"use strict";

// selectin elements
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceElement = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const diceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const rulesBtn = document.querySelector(".btn--rules");

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

diceBtn.addEventListener("click", function () {
    // generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // display dice
    diceElement.classList.remove("hidden");
    // изначально я бы сделал через switch, но это куда проще и короче
    diceElement.src = `dice-${dice}.png`;

    // if 1 switch to next player
    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
    } else {
        // switch the next player
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        // toggle - если есть класс - то удаляет его,если нет - добавляет
        player0El.classList.toggle("player--active");
        player1El.classList.toggle("player--active");
    }
});

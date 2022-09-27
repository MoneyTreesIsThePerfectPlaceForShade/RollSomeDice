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

const switchPlayer = () => {
    // switch the next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // toggle - если есть класс - то удаляет его,если нет - добавляет
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

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
        switchPlayer();
    }
});

holdBtn.addEventListener("click", function () {
    // add current score to score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

    // >100
    if (scores[activePlayer] >= 100) {
        // finish the game
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");

        document.getElementById(
            `name--${activePlayer}`
        ).textContent = `Player ${activePlayer + 1} WINS!`;
        holdBtn.disabled = true;
        diceBtn.disabled = true;
        diceElement.classList.add("hidden");
    } else {
        switchPlayer();
    }
});

newGameBtn.addEventListener("click", function () {
    scores[0] = 0;
    scores[1] = 0;
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    activePlayer = 0;
    currentScore = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;

    player0El.classList.remove("player--active");
    player1El.classList.remove("player--active");

    player0El.classList.add("player--active");

    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");

    diceElement.classList.add("hidden");
});

// функционал кнопки RULES как модального окна
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--rules");

const closeModalWindow = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const openModalWindow = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener("click", openModalWindow);
}

btnCloseModal.addEventListener("click", closeModalWindow);

overlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModalWindow();
    }
});

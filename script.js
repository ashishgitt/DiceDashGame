'use strict';
const btnDiceRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.getElementById('name--0');
const player1 = document.getElementById('name--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentscore0 = document.getElementById('current--0');
const currentscore1 = document.getElementById('current--1');
const diceImage = document.querySelector('.dice');

const scores = [0, 0];
let activePlayer = 0;
let isPlaying = true;
let currentVal = 0;
score0.textContent = 0;
score1.textContent = 0;

const activePlayerf = () => {
  if (activePlayer) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    activePlayer = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  } else {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    activePlayer = 1;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
};

diceImage.classList.add('hidden');

btnDiceRoll.addEventListener('click', function () {
  if (isPlaying) {
    const randomdice = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `./diceImg/dice-${randomdice}.png`;
    diceImage.classList.remove('hidden');

    if (randomdice !== 1) {
      currentVal += randomdice;
      console.log(randomdice);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentVal;
    } else {
      // Switch to next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentVal = 0;
      activePlayerf();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentVal;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] <= 100) {
      currentVal = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      // Switch to next player
      activePlayerf();
    } else {
      isPlaying = false;
      diceImage.classList.add('hidden');
      currentscore0.textContent = 0;
      currentscore1.textContent = 0;
      currentVal = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
  }
});

btnNew.addEventListener('click', function () {
  diceImage.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  scores = [0, 0];
  currentVal = 0;
});

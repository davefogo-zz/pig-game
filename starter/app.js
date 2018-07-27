/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 1;

//hide the dice
document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
  //get random number
  var dice = Math.floor(Math.random() * 6) + 1;
  // display the random number
  var diceDOM = document.querySelector('.dice');
  document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#score-' + activePlayer).textContent = roundScore;

  diceDOM.src = 'dice-' + dice + '.png';
  diceDOM.style.display = 'block';
  //update the round score if it's not 1
  if (dice > 0) {
    roundScore += dice;
  }

  if (dice === 1) {
    roundScore = 0;
  }
})
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice;
var init = function() {
  gamePlaying = true;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}
var nextPlayer = function() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  roundScore = 0;
}

//start game
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. get random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    //2. display the random number
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice2');
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    //3. update the round score if it's not 1
    if (dice === 1  || dice2 === 1 || dice === 6 && prevDice === 6) {
      nextPlayer();
    } else {
      //Add score to 0
      roundScore += dice;
      roundScore += dice2;
      prevDice = dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //Add the current score to players GLOBAL score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    //Check if player won the game
    var winningScore = document.getElementById('set-score').value || 100;
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //Update the UI
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      //Next player
      nextPlayer();
    }
  }
})

document.querySelector('.btn-new').addEventListener('click', init);

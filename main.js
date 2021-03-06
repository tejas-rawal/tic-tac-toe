
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var winner_confirmed = false;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};


var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.
  if (( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    // TODO: Check for rest of game winning cases
  ) || 
    
    ( spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
 
  ) || 
   
    (spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
  
  ))
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer)
    winner_confirmed = true;
  }
};

$(document).on('click', '#board .space', function (e) {
  if (winner_confirmed === false) {
    var spaceNum = $(e.currentTarget).index();
    console.log('You clicked on space #' + spaceNum);

    // Marks the space with the current player's name
    // TODO: Don't mark it unless the space is blank
  
    if (spaces[spaceNum].toString() === 'NaN') 
    {

      spaces[spaceNum] = currentPlayer;

      // Adds a class to elem so css can take care of the visuals  
      $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

      checkForWinner();
      setNextTurn();
    }
    else {
      alert("Space # " + spaceNum + " is already taken!");
    }
  }
  else {
    alert("The game is over")
  }
});

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert("Congratulations " + winner + ", you win!");
});

$(document).on('click', '#reset', function() {
  for(var i = 0; i < spaces.length; i++) {
    spaces[i] = NaN;
    winner_confirmed = false;
    $('#board .space:eq(' + i + ')').removeClass(player1);
    $('#board .space:eq(' + i + ')').removeClass(player2);
  }
});

// Start the game
setNextTurn();

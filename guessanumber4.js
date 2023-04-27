// declare a variable to store the maximum number of guesses
const maxGuesses = 5;

// declare an object to store the game state
const gameState = {};

// app.post() handler for starting a new game
app.post('/startGame', function(req,res){
  const gameId = req.body.gameId;
  const randomNumberGenerated = Math.floor(Math.random() * 100) + 1; 
  console.log('Creating game number. ' + gameId + ' The number to guess is ' + randomNumberGenerated);

  // initialize the game state for this game ID
  gameState[gameId] = {
    numberToGuess: randomNumberGenerated,
    guessesRemaining: maxGuesses,
    gameOver: false
  };

  const responseMessage = { APIMessage: new String('Game number ' + gameId + ' has started') };
  res.json(responseMessage);                                                                                                                     
});

// app.get() handler for processing a guess
app.get('/guessMade', function(req,res){
  const gameId = req.query.gameId;
  const numberToGuess = gameState[gameId].numberToGuess;
  const numberGuessed = req.query.guessMade;
  let responseMessage = '';

  // check if the game is already over
  if (gameState[gameId].gameOver) {
    responseMessage = { APIMessage: new String('The game is already over. Start a new game.') };
  } else {
    // check if the guess is correct
    if (numberGuessed == numberToGuess) {
      responseMessage = { APIMessage: new String('Your guess is correct!') };
      gameState[gameId].gameOver = true;
    } else {
      // check if the guess is too high or too low
      gameState[gameId].guessesRemaining--;
      if (numberGuessed < numberToGuess) {
        responseMessage = { APIMessage: new String('Your guess is too low - try again. ' + gameState[gameId].guessesRemaining + ' guesses remaining.') };
      } else if (numberGuessed > numberToGuess) {
        responseMessage = { APIMessage: new String('Your guess is too high - try again. ' + gameState[gameId].guessesRemaining + ' guesses remaining.') };
      }
      // check if the player has run out of guesses
      if (gameState[gameId].guessesRemaining == 0) {
        responseMessage = { APIMessage: new String('You ran out of guesses. The number was ' + numberToGuess + '. Game over.') };
        gameState[gameId].gameOver = true;
      }
    }
  }

  console.log("Game number " + gameId + " guessed " + numberGuessed + ' The number to guess is ' + numberToGuess + '.');
  res.json(responseMessage);                                                                                                                     
});

// app.post() handler for resetting the game
app.post('/resetGame', function(req,res){
  const gameId = req.body.gameId;
  console.log('Resetting game number ' + gameId);

  // reset the game state for this game ID
  gameState[gameId] = undefined;

  const responseMessage = { APIMessage: new String('Game number ' + gameId + ' has been reset') };
  res.json(responseMessage);                                                                                                                     
});

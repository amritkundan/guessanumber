var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var randomNumber = [];

app.use(function(req, res, next) {
  express.urlencoded({ extended: false });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.post('/startGame', function(req, res) {
  var randomNumberGenerated = Math.floor(Math.random() * 100) + 1;
  var gameNum = req.body.gameId;
  console.log(`Creating game number ${gameNum}. The number to guess is ${randomNumberGenerated}.`);
  randomNumber[gameNum] = randomNumberGenerated;
  var responseMessage = { APIMessage: `Game number ${req.body.gameId} has started.` };
  res.json(responseMessage);
});

app.get('/guessMade', function(req, res) {
  var numberToGuess = randomNumber[req.query.gameId];
  var numberGuessed = req.query.guessMade;
  var responseMessage = "";
  var remainingGuesses = 5 - req.query.numGuesses;

  if (numberGuessed < numberToGuess) {
    responseMessage = `Your guess is too low - try again. ${remainingGuesses} guesses left.`;
  } else if (numberGuessed > numberToGuess) {
    responseMessage = `Your guess is too high - try again. ${remainingGuesses} guesses left.`;
  } else {
    responseMessage = "Congratulations! You guessed the correct number.";
  }

  console.log(`Game number ${req.query.gameId} guessed ${numberGuessed}. The number to guess is ${numberToGuess}.`);
  res.json({ APIMessage: responseMessage });
});

console.log("Listening on port 8080");
app.listen(8080);

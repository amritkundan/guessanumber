var express = require('express');
var app = express();
var games = {};
var maxGuesses = 5;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
next();
});

app.post('/startGame', function (req, res) {
var gameId = req.body.gameId;
var randomNumber = Math.floor(Math.random() * 100) + 1;
games[gameId] = {
numberToGuess: randomNumber,
guessesRemaining: maxGuesses,
};
console.log(Game ${gameId} started with number ${randomNumber});
var responseMessage = { APIMessage: Game ${gameId} has started };
res.json(responseMessage);
});

app.get('/guessMade', function (req, res) {
var gameId = req.query.gameId;
var guess = parseInt(req.query.guess);
var game = games[gameId];
if (!game) {
res.status(400).send('Game not found');
return;
}
game.guessesRemaining--;
var responseMessage;
if (guess === game.numberToGuess) {
responseMessage = {
APIMessage: 'Congratulations! You guessed the number!',
disable: true,
};
} else if (game.guessesRemaining > 0) {
var message =
guess < game.numberToGuess
? 'Your guess is too low - try again'
: 'Your guess is too high - try again';
responseMessage = { APIMessage: message };

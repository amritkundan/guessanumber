// HelloWorld1.js - a simple API running on Node.js and using Express
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

let randomNumber = [];

app.use(function(req, res, next) {
  express.urlencoded({extended: false});
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.post('/startGame', function(req,res){
  const gameId = req.body.gameId;
  const randomNumberGenerated = Math.floor(Math.random() * 100) + 1; 
  randomNumber[gameId] = randomNumberGenerated;
  console.log(`Creating game number ${gameId}. The number to guess is ${randomNumberGenerated}`);
  responseMessage = { APIMessage: new String(`Game number ${gameId} has started`) };
  res.json(responseMessage);
});

app.get('/guessMade', function(req,res){
  const gameId = req.query.gameId;
  const numberToGuess = randomNumber[gameId];
  const numberGuessed = req.query.guessMade;
  let responseMessage = "";
    
  if (numberGuessed < numberToGuess) {
    responseMessage = { APIMessage: new String('Your guess is too low - try again') };
  } else if (numberGuessed > numberToGuess) {
    responseMessage = { APIMessage: new String('Your guess is too high - try again') };
  } else {
    responseMessage = { APIMessage: new String('Your guess is correct!') };
  }

  console.log(`Game number ${gameId} guessed ${numberGuessed}. The number to guess is ${numberToGuess}.`);
  res.json(responseMessage);
});

console.log('Listening on port 8080');
app.listen(8080);

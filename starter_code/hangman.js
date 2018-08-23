var hangman = new Hangman();

function Hangman() {
  this.words = [
    "Perro",
    "Gato",
    "Animal",
    "Cuadrupedo",
    "Ornitorrinco",
    "Pez",
    "Libro",
    "Sarigueya"
  ];
  this.secretWord = "";
  this.letters = [];
  this.errorsLeft = 10;
  this.guessedLetter = "";
}

Hangman.prototype.getWord = function() {
  this.secretWord = this.words[Math.floor(Math.random()*this.words.length)].toLowerCase();
  return this.secretWord;
};

Hangman.prototype.checkIfLetter = function(keyCode) {
  return keyCode >= 65 && keyCode <= 90;
};

Hangman.prototype.checkClickedLetters = function(key) {
  return !this.letters.includes(key);
};

Hangman.prototype.addCorrectLetter = function(i) {
  this.guessedLetter += this.secretWord[i];
  this.checkWinner();
  hangmanCanvas.writeCorrectLetter(i);
};

Hangman.prototype.verify = function(letter) {
  return this.secretWord.includes(letter);
};

Hangman.prototype.addWrongLetter = function(letter) {
  if (this.secretWord.indexOf(letter)<0){
    this.errorsLeft--;
    console.log("Errors left: " + this.errorsLeft);
  }
  hangmanCanvas.drawHangman();
};

Hangman.prototype.checkGameOver = function() {
  return (this.errorsLeft == 0);
};

Hangman.prototype.checkWinner = function() {
  return (this.secretWord.length == this.guessedLetter.length);
};

document.getElementById("start-game-button").onclick = function() {
  newGame();
};

var hangmanCanvas;

function newGame() {
  hangman = new Hangman();
  hangman.getWord();
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
  hangmanCanvas.drawLines();

  document.onkeydown = function(e) {
    var letter  = e.key;
    var keycode = e.keyCode;
    if (hangman.checkIfLetter(keycode)) {
      if (hangman.checkClickedLetters(letter)) {
        hangman.letters.push(letter);
        if (hangman.verify(letter)) {
          for (var i = 0; i < hangman.secretWord.length; i++) {
            if (hangman.secretWord[i] === letter) {
              hangman.addCorrectLetter(i);
            }
          }
        } else {
          hangman.addWrongLetter(letter);
        }
      }
    }
    if (hangman.checkWinner()) {
      winGame();
    }
    if (hangman.checkGameOver()) {
      loseGame();
    }
  };
}

function loseGame() {
  var backgroundGameOver = new Image();
  backgroundGameOver.src = "images/gameover.png";
  hangmanCanvas.ctx.fillStyle = "white";
  backgroundGameOver.onload = function() {
    hangmanCanvas.ctx.fillRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    hangmanCanvas.ctx.drawImage(backgroundGameOver,400,0,400,400);
    hangmanCanvas.ctx.fillStyle = "black";
    hangmanCanvas.ctx.fillText("secret word: ", 30, 50);
    hangmanCanvas.ctx.fillText(hangman.secretWord, 30, 100);
  }
}

function winGame() {
  var backgroundGameOver = new Image();
  backgroundGameOver.src = "images/awesome.png";
  hangmanCanvas.ctx.fillStyle = "white";
  backgroundGameOver.onload = function() {
    hangmanCanvas.ctx.fillRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    hangmanCanvas.ctx.drawImage(backgroundGameOver,400,0,400,400);
    hangmanCanvas.ctx.fillStyle = "black";
    hangmanCanvas.ctx.fillText("secret word: ", 30, 50);
    hangmanCanvas.ctx.fillText(hangman.secretWord, 30, 100);
  }
}

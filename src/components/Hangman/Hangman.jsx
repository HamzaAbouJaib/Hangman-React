import React from "react";
import "./hangman.css";
import randomWords from "random-words";
import images from "../../util/hangmanImages";

//global constants
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Hangman = () => {
  function generateWord() {
    let randomWord = randomWords({ exactly: 1, maxLength: 7 })
      .toString()
      .toUpperCase();

    //ensure the selected word is 4 letters or greater
    if (randomWord.length <= 3) {
      randomWord = randomWords({ exactly: 1, maxLength: 7 })
        .toString()
        .toUpperCase();
    }

    return randomWord;
    //Generate a random word using random-words module
  }

  const [gameValues, setGameValues] = React.useState({
    maxLives: 6,
    mistakes: 0,
    guessed: new Set([]),
    randomWord: generateWord(),
  });

  //generates '_' for unguessed letters and fills in correctly guessed letters
  function getCurrentWordState() {
    return gameValues.randomWord
      .split("")
      .map((letter) => (gameValues.guessed.has(letter) ? letter : " _ "));
  }

  //adds letter to guessed letters set and increments mistake by one if guess is false
  //hides clicked buttons
  function handleClick(e) {
    const letter = e.target.name;

    setGameValues((prevValue) => {
      return {
        ...prevValue,
        guessed: prevValue.guessed.add(letter),
        mistakes:
          prevValue.mistakes + (prevValue.randomWord.includes(letter) ? 0 : 1),
      };
    });
    document.querySelector(`[name="${letter}"]`).style.visibility = "hidden";
  }

  function generateButtons() {
    return (
      <div className="letters-container">
        {alphabet.map((letter, index) => {
          return (
            <button
              key={index}
              onClick={handleClick}
              className={`letter-btn ${letter}`}
              name={letter}
            >
              {letter}
            </button>
          );
        })}
      </div>
    );
  }

  function resetGame() {
    setGameValues({
      maxLives: 6,
      mistakes: 0,
      guessed: new Set([]),
      randomWord: generateWord(),
    });
  }

  //stores if the game is over
  const gameOver = gameValues.mistakes >= gameValues.maxLives;
  //stores if the player won
  const isWinner = getCurrentWordState().join("") === gameValues.randomWord;

  return (
    <div>
      {isWinner ? (
        <div>
          <h1 className="title">You Won</h1>
          <h1 className="title">{gameValues.randomWord} is The Correct Word</h1>
        </div>
      ) : (
        <div>
          {gameOver ? (
            <div className="loss-screen">
              <h1 className="title">You Lost</h1>
              <h1 className="title">The Word Was {gameValues.randomWord}</h1>
              <button onClick={resetGame}>Reset Game</button>
            </div>
          ) : (
            <div>
              <h1 className="title">Hangman Game</h1>
              <div className="game-info">
                <div>
                  <img
                    src={images[gameValues.mistakes]}
                    alt={`hangman after ${gameValues.mistakes} mistakes`}
                  ></img>
                </div>
                <div className="guess-tiles">
                  {getCurrentWordState().map((char, index) => {
                    return (
                      <div key={index} className="guess-tile">
                        {char}
                      </div>
                    );
                  })}
                </div>
              </div>
              {generateButtons()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Hangman;

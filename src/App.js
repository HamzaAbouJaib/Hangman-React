import React from "react";
import randomWords from "random-words";
import Hangman from "./components/Hangman/Hangman";

//Generate a random word using random-words module
let randomWord = randomWords({ exactly: 1, maxLength: 7 })
  .toString()
  .toUpperCase();

//ensure the selected word is 4 letters or greater
if (randomWord.length <= 3) {
  randomWord = randomWords({ exactly: 1, maxLength: 7 })
    .toString()
    .toUpperCase();
}

const App = () => {
  //player lives / max number of guesses
  const [lives, setLives] = React.useState(6);
  return (
    <div className="container">
      <Hangman word={randomWord} maxLives={lives} setMaxLives={setLives} />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import { getKeyboardStates } from "./utils";
import { getRandomWord } from "./wordService";

function App() {
   const [guesses, setGuesses] = useState([]);
   const [currentGuess, setCurrentGuess] = useState('');
   const [solution, setSolution] = useState('');

   const [isGameOver, setIsGameOver] = useState(false);

   useEffect(() => {
    const getSolution = async () => {
      const newSolution = await getRandomWord();
      setSolution(newSolution);
    };

    getSolution();
   }, []);

   const handleKeyPress = (key) => {
    if (guesses.length === 6){
      return;
    }

    if (key === 'ENTER') {
      if (currentGuess.length ===5){
        setGuesses([...guesses, currentGuess]);

        if (currentGuess === solution) {
          setTimeout(() => {
            alert('Congralations, you have wun!');
          }, 1000);
          setIsGameOver(true);
        } else if (guesses.length === 5) {
         setTimeout(() => {
          alert(`Better luck next time! the solution is ${solution}`);
         }, 1000);
         setIsGameOver(true); 
        }


        setCurrentGuess('')
      }
    }
      else if (key === 'BACKSPACE'){
        setCurrentGuess((prev) => prev.slice(0, -1));
      }
      else if (currentGuess.length < 5){
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
   };

   const keyboardStates = getKeyboardStates(guesses,solution);

   return (
    <div className="app">
      <h1 className="title">Wordyle</h1>
      <h2 className="hTP">How to play</h2>
      <p className="gameRules">In Wordyle, you have six attempts to guess a secret five-letter word. After each guess, the letters are colored to give you clues: green means the letter is correct and in the right spot, yellow means the letter is in the word but in the wrong place, and gray means the letter is not in the word at all. After entering your five letter word press ENTER to confirm it.</p>
      <Grid guesses={guesses} currentGuess={currentGuess} solution = {solution}/>
      <Keyboard isGameOver={isGameOver} onKeyPress={handleKeyPress} keyboardStates={keyboardStates}/>
    </div>
   )
}

export default App;
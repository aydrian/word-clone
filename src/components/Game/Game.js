import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

import Banner from "../Banner/Banner";
import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [status, setStatus] = React.useState("running");
  function handleSubmitGuesses(newGuess) {
    const nextGuesses = [...guesses, newGuess];
    setGuesses(nextGuesses);

    if (newGuess.toUpperCase() === answer) {
      setStatus("won");
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setStatus("lost");
    }
  }
  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput handleSubmitGuesses={handleSubmitGuesses} status={status} />
      {status === "won" && (
        <Banner status="happy">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>
              {guesses.length} {guesses.length === 1 ? "guess" : "guesses"}
            </strong>
            .
          </p>
        </Banner>
      )}
      {status === "lost" && (
        <Banner status="sad">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </Banner>
      )}
    </>
  );
}

export default Game;

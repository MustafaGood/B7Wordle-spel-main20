import React, { useState, useEffect } from 'react';
import useWordle from '../../../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import keys from '../../../constants/keys';
import Modal from './Modal';

interface WordleProps {
  solution: string;
  setting: any;
}

const Wordle: React.FC<WordleProps> = ({ solution, setting }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { setLetterCount, currentGuess, guesses, score, turn, isCorrect, usedKeys, handleKeyup } = useWordle(solution);

  useEffect(() => {
    setLetterCount(parseInt(setting.letterCount, 10));
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeyup, isCorrect, turn, setLetterCount, setting.letterCount]);

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} letterCount={parseInt(setting.letterCount, 10)} />
      <Keypad keys={keys} usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} guesses={guesses} setting={setting} score={score} turn={turn} solution={solution} />}
    </div>
  );
};

export default Wordle;

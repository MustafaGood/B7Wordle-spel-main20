import { useState } from 'react';

interface LetterObject {
  key: string;
  color: string;
}

interface UsedKeys {
  [key: string]: string;
}

const useWordle = (solution: any) => {
  const [letterCount, setLetterCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<any>('');
  const [guesses, setGuesses] = useState<any>([...Array(6)]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState<UsedKeys>({});

  const formatGuess = (): LetterObject[] => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: 'red' };
    });

    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null!;
        setScore((prev) => prev + 2);
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null!;
        setScore((prev) => prev + 1);
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess: LetterObject[]) => {
    if (currentGuess === solution) {
      setScore((prev) => prev * (6 - turn));
      setIsCorrect(true);
    }
    setGuesses((prevGuesses: any) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === 'green') {
          prevUsedKeys[l.key] = 'green';
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[l.key] = 'yellow';
          return;
        }
        if (l.color === 'red' && currentColor !== 'green' && currentColor !== 'yellow') {
          prevUsedKeys[l.key] = 'red';
          return;
        }
      });

      return { ...prevUsedKeys };
    });
    setCurrentGuess('');
  };

  const handleKeyup = (e: KeyboardEvent) => {
    const { key } = e;

    if (key === 'Enter') {
      if (turn > 5) {
        console.log('you used all your guesses!');
        return;
      }
      if (history.includes(currentGuess)) {
        console.log('you already tried that word.');
        return;
      }
      if (currentGuess.length !== letterCount) {
        console.log(`word must be ${letterCount} chars.`);
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess((prev: any) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < letterCount) {
        setCurrentGuess((prev: any) => prev + key);
      }
    }
  };

  return { setLetterCount, turn, score, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;

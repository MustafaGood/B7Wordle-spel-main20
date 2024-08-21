import React from 'react';

interface Letter {
  key: string;
  color: string;
}

interface RowProps {
  guess?: Letter[];
  currentGuess?: string;
  letterCount: number;
}

const Row: React.FC<RowProps> = ({ guess, currentGuess, letterCount }) => {
  if (currentGuess) {
    let letters = currentGuess.split('');

    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <div key={i} className="filled">{letter}</div>
        ))}
        {[...Array(letterCount - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }

  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => (
          <div key={i} className={l.color}>{l.key}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {[...Array(letterCount)].map((_, index) => {
        return <div key={index}></div>;
      })}
    </div>
  );
};

export default Row;

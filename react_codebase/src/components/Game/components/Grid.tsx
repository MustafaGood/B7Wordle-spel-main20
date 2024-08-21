import React from 'react';
import Row from './Row';

interface GridProps {
  guesses: any;
  currentGuess: string;
  turn: number;
  letterCount: number;
}

const Grid: React.FC<GridProps> = ({ guesses, currentGuess, turn, letterCount }) => {
  return (
    <div>
      {guesses.map((g: any, i: any) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} letterCount={letterCount} />;
        }
        return <Row key={i} guess={g} letterCount={letterCount} />;
      })}
    </div>
  );
};

export default Grid;

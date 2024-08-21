"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Row_1 = __importDefault(require("./Row"));
const Grid = ({ guesses, currentGuess, turn, letterCount }) => {
    return (<div>
      {guesses.map((g, i) => {
            if (turn === i) {
                return <Row_1.default key={i} currentGuess={currentGuess} letterCount={letterCount}/>;
            }
            return <Row_1.default key={i} guess={g} letterCount={letterCount}/>;
        })}
    </div>);
};
exports.default = Grid;

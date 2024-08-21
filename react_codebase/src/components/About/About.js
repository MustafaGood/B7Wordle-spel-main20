"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const About = () => {
    return (<div className='about'>
      <h1>How To Play</h1>
      <div className='aboutinfo'>
        <p>Guess the Wordle in 6 tries.</p>
        <p>- Each guess must be a valid n-letter word.</p>
        <p>- The color of the tiles will change to show how close your guess was to the word.</p>
        <p>- green (correct), yellow (misplaced) or red (incorrect)</p>
        <p>- User can decide how many letters the word should have and whether it can contain repeated letters</p>
      </div>
    </div>);
};
exports.default = About;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useWordle = (solution) => {
    const [letterCount, setLetterCount] = (0, react_1.useState)(0);
    const [score, setScore] = (0, react_1.useState)(0);
    const [turn, setTurn] = (0, react_1.useState)(0);
    const [currentGuess, setCurrentGuess] = (0, react_1.useState)('');
    const [guesses, setGuesses] = (0, react_1.useState)([...Array(6)]);
    const [history, setHistory] = (0, react_1.useState)([]);
    const [isCorrect, setIsCorrect] = (0, react_1.useState)(false);
    const [usedKeys, setUsedKeys] = (0, react_1.useState)({});
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'red' };
        });
        formattedGuess.forEach((l, i) => {
            if (solution[i] === l.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
                setScore((prev) => prev + 2);
            }
        });
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
                setScore((prev) => prev + 1);
            }
        });
        return formattedGuess;
    };
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setScore((prev) => prev * (6 - turn));
            setIsCorrect(true);
        }
        setGuesses((prevGuesses) => {
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
            return Object.assign({}, prevUsedKeys);
        });
        setCurrentGuess('');
    };
    const handleKeyup = (e) => {
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
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < letterCount) {
                setCurrentGuess((prev) => prev + key);
            }
        }
    };
    return { setLetterCount, turn, score, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};
exports.default = useWordle;

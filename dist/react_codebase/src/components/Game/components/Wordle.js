"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const useWordle_1 = __importDefault(require("../../../hooks/useWordle"));
const Grid_1 = __importDefault(require("./Grid"));
const Keypad_1 = __importDefault(require("./Keypad"));
const keys_1 = __importDefault(require("../../../constants/keys"));
const Modal_1 = __importDefault(require("./Modal"));
const Wordle = ({ solution, setting }) => {
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const { setLetterCount, currentGuess, guesses, score, turn, isCorrect, usedKeys, handleKeyup } = (0, useWordle_1.default)(solution);
    (0, react_1.useEffect)(() => {
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
    return (<div>
      <Grid_1.default guesses={guesses} currentGuess={currentGuess} turn={turn} letterCount={parseInt(setting.letterCount, 10)}/>
      <Keypad_1.default keys={keys_1.default} usedKeys={usedKeys}/>
      {showModal && <Modal_1.default isCorrect={isCorrect} guesses={guesses} setting={setting} score={score} turn={turn} solution={solution}/>}
    </div>);
};
exports.default = Wordle;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBool = stringToBool;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
/**
 * Converts a string representation of boolean to actual boolean value.
 *
 * @param str - The string representation of boolean ("true" or "false").
 * @returns Returns true or false based on the string input.
 */
function stringToBool(str) {
    // Convert to lower case to handle case insensitivity
    const lowerCaseStr = str.toLowerCase();
    // Use a conditional check or ternary operator
    if (lowerCaseStr === 'true') {
        return true;
    }
    else if (lowerCaseStr === 'false') {
        return false;
    }
    else {
        // Optionally handle invalid input (e.g., throw an error or return a default value)
        throw new Error('Invalid boolean string input');
    }
}
/**
 * Checks if a word has any repeated letters.
 *
 * @param word - The word to check.
 * @param bool - repeated allowed.
 * @returns Returns true if the word has repeated letters, false otherwise.
 */
function hasRepeatedLetters(word, bool) {
    const letterCounts = {};
    word.toLowerCase();
    for (let letter of word) {
        if (letterCounts[letter]) {
            return Boolean(bool);
        }
        letterCounts[letter] = 1; // Mark letter as seen
    }
    return !bool;
}
/**
 * Checks if a word contains any number or special characters except letters.
 *
 * @param word - The word to check.
 * @returns Returns true if the word contains numbers or special characters, false otherwise.
 */
function hasNumberOrSpecialChar(word) {
    const pattern = /[^a-zA-Z]/; // Regular expression to match any character that is not a letter
    return pattern.test(word);
}
/**
 * Selects a random word based on specified criteria.
 *
 * @param letterCount - The length of the word.
 * @param repeated - If the word should have repeated letters.
 * @returns Returns a promise that resolves to a random word.
 */
const getRandomWord = (letterCount, repeated) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentFileName = __filename;
        const currentDirName = path_1.default.dirname(currentFileName);
        const filePath = path_1.default.resolve(currentDirName, '..', 'data', 'words.txt');
        const data = yield (0, promises_1.readFile)(filePath, 'utf8');
        const lines = data.split('\n');
        const res = lines.filter(element => {
            return !hasNumberOrSpecialChar(element) &&
                element.length === letterCount &&
                hasRepeatedLetters(element, repeated);
        });
        if (res.length === 0) {
            throw new Error(`No words found with length ${letterCount} and repeated=${repeated}`);
        }
        const randomIndex = Math.floor(Math.random() * res.length);
        return res[randomIndex];
    }
    catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
});
exports.default = getRandomWord;

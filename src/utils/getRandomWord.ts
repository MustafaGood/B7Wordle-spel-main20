import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

/**
 * Converts a string representation of boolean to actual boolean value.
 * 
 * @param str - The string representation of boolean ("true" or "false").
 * @returns Returns true or false based on the string input.
 */
export function stringToBool(str: string): boolean {
  // Convert to lower case to handle case insensitivity
  const lowerCaseStr = str.toLowerCase();

  // Use a conditional check or ternary operator
  if (lowerCaseStr === 'true') {
    return true;
  } else if (lowerCaseStr === 'false') {
    return false;
  } else {
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
function hasRepeatedLetters(word: string, bool: boolean): boolean {
  const letterCounts: { [key: string]: number } = {};
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
function hasNumberOrSpecialChar(word: string): boolean {
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
const getRandomWord = async (letterCount: number, repeated: boolean): Promise<string> => {
  try {
    const currentFileName = __filename;
    const currentDirName = path.dirname(currentFileName);

    const filePath = path.resolve(currentDirName, '..', 'data', 'words.txt');
    const data = await readFile(filePath, 'utf8');
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
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

export default getRandomWord;

import { regexPattern } from '../utils/regexPattern.js';

/**
 * Represents a Tokenization class.
 * Provides methods to tokenize a string into an array with all separeted elements (tokens) from the initial string.
 */
class Tokenization {
	/**
	 * Initializes a new Tokenization instance with a specified jsonString.
	 * @param {string} jsonString - The initial JSON format string.
	 */
	constructor(jsonString) {
		this.jsonString = jsonString.trim(); // Trim whitespace from both ends of the string
		this.tokens = [];
		this.position = 0;
	}

	/**
	 * Tokenizes the jsonString and stores the tokens in the tokens array.
	 * @returns {Array} An array of tokens extracted from the jsonString.
	 */
	tokenize() {
		// Loop through the entire string
		while (this.position < this.jsonString.length) {
			// Set the starting index for the next match, using regex pattern for tokenization
			regexPattern.lastIndex = this.position;

			// Execute the regex match on the string
			const match = regexPattern.exec(this.jsonString);

			// If the match fails (null)
			if (!match) {
				throw new Error(`Unexpected token`);
			}

			// Add the matched token to the tokens array
			this.tokens.push(match[0]);

			// Update the position to the end of the current match
			this.position = regexPattern.lastIndex;
		}
		return this.tokens;
	}
}
export default Tokenization;

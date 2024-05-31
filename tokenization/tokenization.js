const ErrorHandling = require('../error-handling/errorHandling.js');
const regexPattern = require('../utils/regexPattern.js');
const unquotedKeyPattern = require('../utils/unquotedKeyPattern.js');
const invalidUnquotedStringPattern = require('../utils/invalidUnquotedStringPattern.js');

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
		// Check if jsonString is a string
		if (typeof jsonString !== 'string') {
			ErrorHandling.throwError('JSON string must be a valid string')
		}
		
		this.jsonString = jsonString.trim(); // Trim whitespace from both ends of the string
		this.tokens = [];
		this.position = 0;
	}

	/**
	 * Tokenizes the entire JSON string and stores the tokens in the tokens array.
	 * @returns {Array} - An array of tokens extracted from the JSON string.
	 */
	tokenize() {
		this.checkUnquotedKeys(); // Check for unquoted keys
		this.checkUnquotedStringMatch(); // Check for invalid unquoted string values


		// Check if curly braces are balanced
        if (!this.areCurlyBracesBalanced()) {
            ErrorHandling.throwError("Unbalanced curly braces");
		}
		
		// Tokenize the entire JSON string
		while (this.position < this.jsonString.length) {
			this.tokenizeNext();
		}
		return this.tokens;
	}

	/**
	 * Checks for unquoted keys in the JSON string.
	 * @throws {Error} - Throws an error if any unquoted keys are found.
	 * @returns {undefined} - This method does not return any value.
	 */
	checkUnquotedKeys() {
		let unquotedMatch;
		while ((unquotedMatch = unquotedKeyPattern.exec(this.jsonString)) !== null) {
			const unquotedKey = unquotedMatch[1];
			const index = unquotedMatch.index;
			ErrorHandling.throwError(`Missing quotes around key "${unquotedKey}"`, index);
		}
	}

	/**
	 * Checks for invalid unquoted string values in the JSON string.
	 * @throws {Error} - Throws an error if any invalid unquoted string values are found.
	 * @returns {undefined} - This method does not return any value.
	 */
	checkUnquotedStringMatch() {
		let unquotedStringMatch;
		while ((unquotedStringMatch = invalidUnquotedStringPattern.exec(this.jsonString)) !== null) {
			const invalidUnquotedString = unquotedStringMatch[1];
            const index = unquotedStringMatch.index + unquotedStringMatch[0].indexOf(invalidUnquotedString);
            ErrorHandling.throwError(`Invalid unquoted string value`, index);
        }
	}

	/**
	 * Checks if the number of opening and closing curly braces in the JSON string are balanced.
     * @returns {boolean} - True if the number of opening and closing curly braces are balanced, false otherwise.
	 */
	areCurlyBracesBalanced() {
        let openBraces = 0;
        let closedBraces = 0;

        for (let char of this.jsonString) {
            if (char === '{') {
                openBraces++;
            } else if (char === '}') {
                closedBraces++;
            }
        }

        return openBraces === closedBraces;
    }

	/**
	 * Tokenizes the next part of the JSON string.
	 * @throws {Error} Throws an error if an unexpected token is encountered.
	 * @returns {undefined} - This method does not return any value.
	 */
	tokenizeNext() {
		// Set the starting index for the next match, using regex pattern for tokenization
			regexPattern.lastIndex = this.position;

			// Execute the regex match on the string
			const match = regexPattern.exec(this.jsonString);

			// If the match fails (null)
			if (!match) {
				ErrorHandling.throwError("Unexpected token", this.position);
			}

			// Add the matched token to the tokens array
			this.tokens.push(match[0]);

			// Update the position to the end of the current match
			this.position = regexPattern.lastIndex;
	}
}

module.exports = Tokenization;

import ErrorHandling from '../error-handling/errorHandling.js';
import unescapeString from '../utils/unescapeString.js';


/**
 * Represents a JSONParser class.
 * Provides methods to parse a token into corresponding JavaScript element.
 */
class JSONParser {
	/**
	 * Initializes a new JSONParser instance with a specified tokens.
	 * @param {Array} tokens - The array of tokens extracted from the JSON format string.
	 */
	constructor(tokens) {
		this.tokens = tokens;
		this.position = 0;
	}

	/**
	 * Get the token on the current position from the array of tokens.
	 * @returns {string} - The token element.
	 */
	getToken() {
		return this.tokens[this.position];
	}

	/**
	 * Parse the tokens and construct the  corresponding JavaScript object.
	 * @returns {Object} - The JavaScript object.
	 */
	parse() {
		if (this.tokens.length === 0) {
			ErrorHandling.throwError('Empty JSON string')
		}
		return this.parseValue();
	}

	/**
	 * Parse the current value based on the token type.
	 * @returns {*} - The parsed value.
	 */
	parseValue() {
		const token = this.getToken();

		if (token === undefined) {
			ErrorHandling.throwError(
				`Unexpected token - encounter the end of the input unexpectedly`
			);
		}

		if (this.isBoolean(token)) {
			return this.parseBoolean(token);
		}

		if (this.isNull(token)) {
			return this.parseNull();
		}

		if (this.isObjectStart(token)) {
			return this.parseObject();
		}

		if (this.isArrayStart(token)) {
			return this.parseArray();
		}

		if (this.isNumber(token)) {
			return this.parseNumber();
		}

		if (this.isString(token)) {
			return this.parseString();
		}

		ErrorHandling.throwError(`Unexpected token`);
	}

	/**
	 * Check value is a boolean.
	 * @returns {boolean} - Returns true if value is boolean, otherwise false.
	 */
	isBoolean(token) {
		return token === 'true' || token === 'false';
	}

	/**
	 * Check value is a null.
	 * @returns {boolean} - Returns true if value is null, otherwise false.
	 */
	isNull(token) {
		return token === 'null';
	}

	/**
	 * Check value is a number.
	 * @returns {boolean} - Returns true if value is number, otherwise false.
	 */
	isNumber(token) {
		return /^-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?$/.test(token);
	}

	/**
	 * Check string is a number.
	 * @returns {boolean} - Returns true if value is string, otherwise false.
	 */
	isString(token) {
		return token.startsWith("") && token.endsWith("");
	}

	/**
	 * Check if the token is a '{'.
	 * @param {string} token - The token to check.
	 * @returns {boolean} - Returns true if the token is '{', otherwise false.
	 */
	isObjectStart(token) {
		return token === '{';
	}

	/**
	 * Check if the token is a '['.
	 * @param {string} token - The token to check.
	 * @returns {boolean} - Returns true if the token is '[', otherwise false.
	 */
	isArrayStart(token) {
		return token === '[';
	}

	/**
	 * Parse a boolean from the token.
	 * @returns {boolean} - The parsed boolean.
	 */
	parseBoolean(token) {
		this.position++;
		return token === 'true';
	}

	/**
	 * Parse a null from the token.
	 * @returns {null} - The parsed null.
	 */
	parseNull() {
		this.position++;
		return null;
	}

	/**
	 * Parse a number from the token.
	 * @returns {number} - The parsed number.
	 */
	parseNumber() {
		const token = this.getToken();
		const numberElement = Number(token);
		if (isNaN(numberElement)) {
			ErrorHandling.throwError(`Invalid number`);
		}
		this.position++;
		return numberElement;
	}

	/**
	 * Parses a a string from the token.
	 * @returns {string} - The parsed string.
	 */
	parseString() {
		const token = this.getToken();
		if (!this.isString(token)) {
			ErrorHandling.throwError(`Invalid string`);
		} else {
			this.position++;
			return unescapeString(token);
		}
	}

	/**
	 * Parse an object from the token.
	 * @returns {Object} - The parsed string.
	 */
	parseObject() {
		const objectElement = {};
		this.position++;

		while (this.getToken() !== '}') {
			
			const key = this.parseString();

			if (this.getToken() !== ':') {
				ErrorHandling.throwError('Invalid string - expected ":"');
			}
			this.position++;
			const value = this.parseValue();
			objectElement[key] = value;

			// Check the next token in an object
			if (this.getToken() === ',') {
				this.position++;
			} 
		}

		this.position++;
		return objectElement;
	}

	/**
	 * Parse an array from the token.
	 * @returns {Array} - The parsed array.
	 */
	parseArray() {
		const arrayElement = [];
		this.position++;

		while (this.getToken() !== ']') {
			const value = this.parseValue();
			arrayElement.push(value);

			// Check the next token in an array
			if (this.getToken() === ',') {
				this.position++;
			} else if (this.getToken() !== ']') {
				ErrorHandling.throwError('Unexpected token in array - expected "]"');
			}
		}

		this.position++;
		return arrayElement;
	}
}

export default JSONParser;

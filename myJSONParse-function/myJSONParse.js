const JSONParser = require('../parsing-algorithm/jsonParser.js');
const Tokenization = require('../tokenization/tokenization.js');
const Reviver = require('../reviver/reviver.js');

/**
 * Parses a JSON-formatted string into a JavaScript object using regular expressions.
 * @param {string} jsonString - The JSON-formatted string.
 * @param {function} reviver - The function provided by the user to transform the values.
 * @returns {object} - The corresponding JavaScript object.
 */
function myJSONParse(jsonString, reviver = null) {
	const tokenization = new Tokenization(jsonString);
	const tokens = tokenization.tokenize(); // Tokenize the JSON-formatted string
	const objParser = new JSONParser(tokens);
	const obj = objParser.parse(); // Parse a token into corresponding JavaScript object

	// Check if a reviver function was provided
	if (typeof reviver === 'function') {
		/**
		 * Calls the applyReviver method of the Reviver class with:
		 * { '': obj } - the initial entry point for traversal;
		 * '' - the initial key for traversal;
		 * reviver - the user's reviver function.
		 */
		return Reviver.applyReviver({ '': obj }, '', reviver);
	}

	return obj;
}

module.exports = myJSONParse;

const JSONParser = require('../parsing-algorithm/jsonParser.js');
const Tokenization = require('../tokenization/tokenization.js');

/**
 * Parses a JSON-formatted string into a JavaScript object using regular expressions.
 * @param {string} jsonString - The JSON-formatted string.
 * @returns {object} - The corresponding JavaScript object.
 */
function myJSONParse(jsonString) {
	const tokenization = new Tokenization(jsonString);  
	const tokens = tokenization.tokenize(); // Tokenize the JSON-formatted string
	const objParser = new JSONParser(tokens);
	const obj = objParser.parse(); // Parse a token into corresponding JavaScript object

	return obj;
}

module.exports = myJSONParse;
const JSONParser = require('./parsing-algorithm/jsonParser.js');
const Tokenization = require('./tokenization/tokenization.js');
const myJSONParse = require('./myJSONParse-function/myJSONParse.js');

// Define a JSON string representing an object with properties for name, age, and city
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

// Initialize a new Tokenization instance with the specified JSON string
const someTokens = new Tokenization(jsonString);

// Tokenize the JSON string to extract individual tokens
const tokensArray = someTokens.tokenize();

// Demonstrate the resulting array of tokens for specified JSON string
console.log(tokensArray); // (13) ['{', '"name"', ':', '"John"', ',', '"age"', ':', '30', ',', '"city"', ':', '"New York"', '}']

// Define a JSON string representing an object with properties for grades(with array value), phone (with null value), and info, unicode, url (with escape sequences)
const newString =
	'{"grades": [5, 9.5, 8], "phone": null, "info": "Hello\\nWorld!", "unicode":"\\u0042\\n\\u0043", "url": "https:\\/\\/example.com\\/path"}';

// Initialize a new Tokenization instance with the specified JSON string
const someTokens2 = new Tokenization(newString);

// Tokenize the JSON string to extract individual tokens
const newTokensArray = someTokens2.tokenize();

// Parse the tokens
const parser = new JSONParser(newTokensArray);
const obj = parser.parse();

console.log(obj.unicode); // B\nC
console.log(obj.info); // Hello\nWorld!
console.log(obj.url); // https://example.com/path

// Parse JSON-formatted strings into JavaScript objects
const myJSObject = myJSONParse(newString);
console.log(myJSObject);

// Define a JSON string representing an object with a property named "entered" containing a date formatted value
const objDateJSON = '{ "entered": "2014-01-01T23:28:56.782Z" }';

// Defines a custom reviver function
// Parse date strings in JSON data (format ( "2022-01-01T12:00:00Z")) into JavaScript Date objects
function dateReviver(_, value) {
	const datePattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)$/;
	if (typeof value === 'string' && datePattern.test(value)) {
		return new Date(value);
	}
	return value;
}

// Parse JSON-formatted strings into JavaScript objects
const objDateJSObject = myJSONParse(objDateJSON, dateReviver);
console.log(typeof objDateJSObject.entered); // object
console.log(objDateJSObject.entered instanceof Date); // true

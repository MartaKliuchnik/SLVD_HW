import JSONParser from './parsing-algorithm/jsonParser.js';
import Tokenization from './tokenization/tokenization.js';
import myJSONParse from './myJSONParse-function/myJSONParse.js'

// // Define a JSON string representing an object with properties for name, age, and city
// // const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// const jsonString = '{"key": [1, 2, 3]}';

// // Initialize a new Tokenization instance with the specified JSON string
// const someTokens = new Tokenization(jsonString);

// // Tokenize the JSON string to extract individual tokens
// const tokensArray = someTokens.tokenize();

// // Demonstrate the resulting array of tokens for specified JSON string
// console.log(tokensArray); // (13) ['{', '"name"', ':', '"John"', ',', '"age"', ':', '30', ',', '"city"', ':', '"New York"', '}']

// // Define a JSON string representing an object with properties for grades(with array value), phone (with null value), and info, unicode, url (with escape sequences)
// const newString =
// 	'{"grades": [5, 9.5, 8], "phone": null, "info": "Hello\\nWorld!", "unicode":"\\u0042\\n\\u0043", "url": "https:\\/\\/example.com\\/path"}';

// // Initialize a new Tokenization instance with the specified JSON string
// const someTokens2 = new Tokenization(newString);

// // Tokenize the JSON string to extract individual tokens
// const newTokensArray = someTokens2.tokenize();

// // Parse the tokens
// const parser = new JSONParser(newTokensArray);
// const obj = parser.parse(); 

// console.log(obj.unicode) // B\nC 
// console.log(obj.info) // Hello\nWorld!
// console.log(obj.url) // https://example.com/path

// // Parse JSON-formatted strings into JavaScript objects using 
// const myJSObject = myJSONParse(newString);
// console.log(myJSObject) 

const testCases = [
	// '{"key": "value"',        // Missing closing brace
	// '{"key": value@}',        // Invalid character '@'
	// '{key: "value"}',         // Missing quotes around key
	// '{"key": "value"',      // Missing closing bracket
	// '{"key": {"nested": 123}', // Unclosed nested object
	// '{"key": [1, 2, 3]}'      // Correct JSON
]
	
const jsonString = '{"key": "value"}';
const someTokens = new Tokenization(jsonString);
const tokensArray = someTokens.tokenize();
console.log(tokensArray);
const parser = new JSONParser(tokensArray)
console.log(parser.parse())
import Tokenization from './tokenization/tokenization.js';

// Define a JSON string representing an object with properties for name, age, and city
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

// Initialize a new Tokenization instance with the specified JSON string
const someTokens = new Tokenization(jsonString);

// Tokenize the JSON string to extract individual tokens
const tokensArray = someTokens.tokenize();

// Demonstrate the resulting array of tokens for specified JSON string
console.log(tokensArray); // (13) ['{', '"name"', ':', '"John"', ',', '"age"', ':', '30', ',', '"city"', ':', '"New York"', '}']

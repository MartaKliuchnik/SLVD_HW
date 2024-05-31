const Tokenization = require("./tokenization.js");

/**
 * Represents a test suite for the Tokenization implementation.
 * Includes the methods for checking an unquoted keys, invalid unquoted string values, opening/closing curly braces, and tokenizing the part of the JSON string
 */
describe('Tokenization: ', () => {
    // Test case for initializing a new Tokenization instance with a valid JSON string
    test('initializes a new Tokenization instance with a valid JSON string', () => {
        // Create a new Tokenization instance with a valid JSON string
        const tokensArray = new Tokenization('{"key": "value"}');

        // Verify that the retrieved string is similar to the input string
        expect(tokensArray.jsonString).toBe('{"key": "value"}');
        // Verify that the retrieved length is expected to be '0' for the initial Tokenization instance
        expect(tokensArray.tokens.length).toBe(0);
    })

    // Test case for initializing a new Tokenization instance with an invalid JSON string
    test('should throw an error if initialize with an invalid JSON string', () => {
        // Verify that it throws an error for initializing with an invalid JSON string
        expect(() => {
            new Tokenization(null)
        }).toThrow('JSON string must be a valid string');
    })

    // Test case for checking unquoted keys in the JSON string
    test('should throw an error if unquoted keys are found', () => {
        const jsonString = '{ unquotedKey: "value" }'; // JSON with unquoted key
        const tokenizer = new Tokenization(jsonString);

        // Verify that it throws an error during the call to checkUnquotedKeys() with unquoted keys in the JSON string
        expect(() => {
            tokenizer.checkUnquotedKeys()
        }).toThrow('Missing quotes around key "unquotedKey" at position 2');
    })

    // Test case for checking invalid unquoted string values in the JSON string.
    test('should throw an error if unquoted string values are found', () => {
        const jsonString = '{ "key": unquotedValue }'; // JSON with unquoted values
        const tokenizer = new Tokenization(jsonString);

        // Verify that it throws an error during the call to checkUnquotedStringMatch() with unquoted values in the JSON string
        expect(() => {
            tokenizer.checkUnquotedStringMatch()
        }).toThrow('Invalid unquoted string value at position 9')
    })
    
    // Test case for checking opening curly braces in the JSON string
    test('should throw an error if opening curly braces missied', () => {
        const jsonString = '"key": "value" }'; // JSON without opening curly braces
        const tokenizer = new Tokenization(jsonString);

        // Verify that the retrieved result matches the expected "false" for JSON string with missed opening curly braces 
        expect(tokenizer.areCurlyBracesBalanced()).toBe(false)
    })

    // Test case for checking closing curly braces in the JSON string
    test('should throw an error if closing curly braces missied', () => {
        const jsonString = '{"key": {"nestedKey": "nestedValue" }'; // JSON without closing curly braces
        const tokenizer = new Tokenization(jsonString);

        // Verify that the retrieved result matches the expected "false" for JSON string with missed closing curly braces 
        expect(tokenizer.areCurlyBracesBalanced()).toBe(false)
    })

    // Test for tokenizing the JSON string successfully
    test('tokenize the JSON string successfully', () => {
        // Create a new Tokenization instance with a valid JSON string
        const tokenizer = new Tokenization('{"key": "value"}');

        // Tokenize the JSON string
        const tokensArray = tokenizer.tokenize(); 
        // Verify that the retrieved string is similar to the input string
        expect(tokensArray).toEqual(["{", '"key"', ":", '"value"', "}"]);
    })

    // Test for tokenizing the JSON string with a null value
    test('tokenize the JSON string successfully with a null value', () => {
        // Create a new Tokenization instance with a value null in JSON string
        const tokenizer = new Tokenization('{"key": null }');

        // Tokenize the JSON string
        const tokensArray = tokenizer.tokenize(); 
        
        // Verify that the retrieved tokens match the expected tokens
        expect(tokensArray).toEqual(["{", '"key"', ":", 'null', "}"]);
    })

    // Test for tokenizing the JSON string with a true value
    test('tokenize the JSON string successfully with a true value', () => {
        // Create a new Tokenization instance with a value true in JSON string
        const tokenizer = new Tokenization('{"key": true }');

        // Tokenize the JSON string
        const tokensArray = tokenizer.tokenize(); 
        
        // Verify that the retrieved tokens match the expected tokens
        expect(tokensArray).toEqual(["{", '"key"', ":", 'true', "}"]);
    })
})
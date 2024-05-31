const JSONParser = require("./jsonParser.js");

/**
 * Represents a test suite for the JSONParser implementation.
 * Includes the methods for parsing a token into corresponding JavaScript element.
 */
describe('JSON Parser: ', () => {
    // Test case for initializing a new Tokenization instance with a valid JSON string
    test('getToken() should return the token at the current position', () => {
        // Create an instance of JSONParser with sample tokens
        const parser = new JSONParser('{"name": "John", "age": 30}');

        // Verify that the initial position is expected to be '0'
        expect(parser.position).toBe(0);
        // Verify that the retrieved value is expected to be '{' for first token 
        expect(parser.getToken()).toBe('{');
    });

    // Test case for initializing a new Tokenization instance with an empty array of tokens
    test('parse() should throw an error for empty JSON string', () => {
        // Create an instance of JSONParser with an empty array of tokens
        const parser = new JSONParser([]);

        // Verify that it throws an error for empty JSON string
        expect(() => parser.parse()).toThrow('Empty JSON string');
    });

    // Test case for initializing a new Tokenization instance with a valid array of tokens
    test('parse tokens and construct the corresponding JavaScript object', () => {
        // Create an instance of JSONParser with sample tokens
        const parser = new JSONParser(['{', '"name"', ':', '"John"', ',', '"age"', ':', '30', '}']);
        const result = parser.parse();

        // Verify that the retrieved result is expected to be 'object'
        expect(typeof result).toBe('object');
        // Verify that the parsed object matches the expected object
        expect(result).toEqual({ name: 'John', age: 30 });
    });

    // Test case for parsing boolean values
    test('parse boolean value correctly', () => {
        // Create an instance of JSONParser with boolean value
        const parser = new JSONParser(['true']);

        // Verify that the retrieved result is expected to be 'true'
        expect(parser.parseValue()).toBe(true);
    });

    // Test case for parsing null values
    test('parse null value correctly', () => {
        // Create an instance of JSONParser with null value
        const parser = new JSONParser(['null']);

        // Verify that the retrieved result is expected to be 'null'
        expect(parser.parseValue()).toBeNull();
    })

    // Test case for parsing an object correctly
    test('parse objects correctly', () => {
        // Create an instance of JSONParser with an object value
        const parser = new JSONParser(['{', '"name"', ':', '"John"', ',', '"age"', ':', '30', '}']);

        // Verify that the retrieved result is expected to be '{"age": 30, "name": "John"}'
        expect(parser.parseValue()).toEqual({"age": 30, "name": "John"});
    })

    // Test case for parsing an invalid string
    test('should throw an error if pasre an invalid string', () => {
        // Create an instance of JSONParser with an invalid string (without ':')
        const parser = new JSONParser(['{', '"name"', ':', '"John"', ',', '"age"', '30', '}']);

        // Verify that it throws an error for parsing with an invalid string
        expect(() => {
            parser.parseValue()
        }).toThrow('Invalid string - expected ":"');
    })

    // Test case for parsing an array correctly
    test('parse array correctly', () => {
        // Create an instance of JSONParser with an array value
        const parser = new JSONParser(['[', '1', ',', '2', ']']);

        // Verify that the retrieved result is expected to be '[1, 2]'
        expect(parser.parseValue()).toEqual([1,2]);
    })

    // Test case for parsing an invalid array     
    test('should throw an error if parse an invalid array', () => {
        // Create an instance of JSONParser with an invalid string (without ']')
        const parser = new JSONParser(['[', '1', ',', '2']);

        // Verify that it throws an error for parsing with an invalid array
        expect(() => {
            parser.parseValue()
        }).toThrow('Unexpected token in array - expected "]"');
    })

    // Test case for parsing number correctly
    test('parse number correctly', () => {
        // Create an instance of JSONParser with number value
        const parser = new JSONParser(['1.234e-5']);

        // Verify that the retrieved result is expected to be '0.00001234'
        expect(parser.parseValue()).toBe(0.00001234);
    })

    // Test case for parsing an invalid number     
    test('should throw an error if pasre an invalid number', () => {
        // Create an instance of JSONParser with an invalid number
        const parser = new JSONParser([' invalid ']);

        // Verify that it throws an error for parsing with an invalid number
        expect(() => {
            parser.parseNumber()
        }).toThrow('Invalid number');
    })

    // Test case for parsing a valid string
    test('parse string correctly', () => {
        // Create an instance of JSONParser with a valid string
        const parser = new JSONParser([' John ']);

        // Verify that the retrieved result is expected to be 'John'
        expect(parser.parseValue()).toBe('John');
    })

    // Test case for parsing invalid token when encountering end of input unexpectedly
    test('should throw error when encountering end of input unexpectedly', () => {
        // Create an instance of JSONParser token when encountering end of input unexpectedly
    const parser = new JSONParser([]);
        
        // Verify that it throws an error for parsing token when encountering end of input unexpectedly
        expect(() => parser.parseValue()).toThrow('Unexpected token - encounter the end of the input unexpectedly')
    });

})
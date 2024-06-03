// const myJSONParse = require('./myJSONParse.js');

/**
 * Represents a test suite for the myJSONParse.
 * Includes test with various JSON strings.
 */
describe('Parsing JSON strings with myJSONParse: ', () => { 
    // Test for parsing a simple correct object
    test('parse a simple object correctly', () => {
        // Initialize a correct JSON string
        const jsonString = '{"name": "John", "age": 30, "phone": false}';
        const expectedObject = { name: 'John', age: 30, phone: false };

        // Verify that the parsed object matches the expected object
        expect(myJSONParse(jsonString)).toEqual(expectedObject);
    });

    // Test for parsing a nested object
    test('parse a nested object correctly', () => {
        // Initialize a correct nested JSON string
        const jsonString = '{"name": "John", "age": 30, "phone": false, "adress": {"town": "New Yourk"}}';
        const expectedObject = { name: 'John', age: 30, phone: false, adress: {town: "New Yourk"} };

        // Verify that the parsed object matches the expected object
        expect(myJSONParse(jsonString)).toEqual(expectedObject);
    });

    // Test for parsing an object with array value
    test('parse an object with array value correctly', () => {
        // Initialize a JSON string with array value
        const jsonString = '{"name": "John", "age": 30, "grades": [5, 9.5, 8]}';
        const expectedObject = { name: 'John', age: 30, grades: [5, 9.5, 8] };

        // Verify that the parsed object matches the expected object
        expect(myJSONParse(jsonString)).toEqual(expectedObject);
    });

    // Test for parsing an array of objects
    test('should parse an array of objects', () => {
        // Initialize a JSON string with an array of objects
        const jsonString = '[{"name": "John"}, {"name": "Alex"}]';
        const expectedArray = [{ name: 'John' }, { name: 'Alex' }];

        // Verify that the parsed object matches the expected object
        expect(myJSONParse(jsonString)).toEqual(expectedArray);
    });

    // Test for parsing a string with special characters
    test('should parse a string with special characters', () => {
        // Initialize a JSON string with special characters
        const jsonString = '{"info": "Hello\\nWorld!"}';
        const expectedArray = { info: "Hello\nWorld!" };

        // Verify that the parsed object matches the expected object
        expect(myJSONParse(jsonString)).toEqual(expectedArray);
    });

    // Test case for parsing a string without closing curly braces 
    test('should throw an error if closing curly braces are missing', () => {
        const jsonString = '{"name": "John", "age": 30 '; // JSON without closing curly braces

        // Verify that the it throws an error due to missing closing curly braces 
        expect(() => myJSONParse(jsonString)).toThrow("Unbalanced curly braces")
    });

    // Test case for parsing a string without closing curly braces 
    test('should throw an error if unquoted keys are found', () => {
        const jsonString = '{ name: "John", "age": 30 }';

        // Verify that it throws an error due to missing unquoted keys 
        expect(() => myJSONParse(jsonString)).toThrow('Missing quotes around key "name" at position 2')
    });

    // Test case for parsing an invalid array     
    test('should throw an error if parse an invalid array', () => {
        // Create an instance of JSONParser with an invalid string (without ']')
        const jsonString = '{"name": "John", "grades": [5, 9.5, 8 }'; // JSON without "]"

        // Verify that it throws an error for parsing with an invalid array
        expect(() => myJSONParse(jsonString)).toThrow('Unexpected token in array - expected "]"');
    });
})
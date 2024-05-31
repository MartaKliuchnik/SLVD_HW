const unescapedString = require('./unescapeString.js')

/**
 * Represents a test suite for checking unescapes escape sequences in a string.
 */
describe('Unescaped sequences: ', () => {
    // Test case for escape newline
    test('escape newline correctly', () => {
        // Verify that the retrieved value is expected to be '\n' 
        expect(unescapedString('"\\n"')).toBe('\n');
    });

    // Test case for escape backspace
    test('escape backspace correctly', () => {
        // Verify that the retrieved value is expected to be '\b' 
        expect(unescapedString('"\\b"')).toBe('\b');
    });

    // Test case for escape form feed
    test('escape form feed correctly', () => {
        // Verify that the retrieved value is expected to be '\f' 
        expect(unescapedString('"\\f"')).toBe('\f');
    });

    // Test case for escape carriage return
    test('escape carriage return correctly', () => {
        // Verify that the retrieved value is expected to be '\r' 
        expect(unescapedString('"\\r"')).toBe('\r');
    });

    // Test case for escape horizontal tab
    test('escape horizontal tab correctly', () => {
        // Verify that the retrieved value is expected to be '\t' 
        expect(unescapedString('"\\t"')).toBe('\t');
    });

    // Test case for escape double backslash
    test('escape double backslash correctly', () => {
        // Verify that the retrieved value is expected to be '\\' 
        expect(unescapedString('"\\\\"')).toBe('\\');
    });

    // Test case for escape forward slash
    test('escape forward slash correctly', () => {
        // Verify that the retrieved value is expected to be '/' 
        expect(unescapedString('"/"')).toBe('/');
    });

    // Test case for escape empty sequence
    test('escape empty sequence correctly', () => {
        // Verify that the retrieved value is expected to be "" 
        expect(unescapedString('""')).toBe("");
    });
});

describe('Unicode escape sequences: ', () => {
    // Test case for Unicode escape sequences
    test('unescape Unicode escape sequences correctly', () => {
        // Verify that the retrieved value is expected to be 'B'
        expect(unescapedString('"\\u0042"')).toBe('B');
    });
});

describe('unescapeString: ', () => {
    // Test case for handling mixed escape sequences correctly
    test('handle mixed escape sequences correctly', () => {
        // Verify that the retrieved value is expected to be '\n\tB'
        expect(unescapedString('"\\n\\t\\u0042"')).toBe('\n\tB');
    });

    // Test case for handling invalid escape sequences
    test('handle invalid escape sequences by leaving them unchanged', () => {
        expect(unescapedString('"\\x"')).toBe('\\x');
    });
});


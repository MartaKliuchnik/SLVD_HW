const { polynomialRollingHash } = require('./polynomialRollingHash');

// Represents a test suite for the polynomial rolling hash function implementation.
describe('Hash Function(polynomialRollingHash): ', () => {
	// Test case for hashing an empty string to ensure it returns 0
	test('hashes an empty string to 0', () => {
		// Verify that the hash function returns 0 for empty string
		expect(polynomialRollingHash('')).toBe(0);
	});

	// Test case for hashing a single character string "a" to ensure it returns the correct hash value
	test('hashes a string "a" correctly', () => {
		// Verify that the hash function returns 1 for string "a"
		expect(polynomialRollingHash('a')).toBe(1);
	});

	// Test case for hashing the string "alex" to ensure it returns the correct hash value
	test('hashes a string "alex" correctly', () => {
		const p = 31; // Prime number for the base
		const m = 1e9 + 7; // Prime number for the modulus

		// Manually calculate the expected hash for the string "alex"
		const hashForL = (1 + (108 - 97 + 1) * p) % m;
		const hashForE = (hashForL + (101 - 97 + 1) * p * p) % m;
		const hashForX = (hashForE + (120 - 97 + 1) * p * p * p) % m;

		// Verify that the hash function returns the expected hash value for "alex"
		const expectedHash = hashForX;
		expect(polynomialRollingHash('alex')).toBe(expectedHash);
	});
});

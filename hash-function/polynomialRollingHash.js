/**
 * Calculates the hash value of a string using a polynomial rolling hash function.
 * @param {string} str - The input string.
 * @returns {number} - The hashing value, which can be used as an index for 'str' in a hash table.
 */
function polynomialRollingHash(str) {
	/**
	 * The prime number for base (p) ensures:
	 * - the function generates a uniform distribution of hash values, which minimizes collisions.
	 * Commonly used p:
	 * - 31, 37, 41, 53 for smaller bases.
	 * - 257, 263, 269 for slightly larger bases.
	 */
	const p = 31;

	/**
	 * The prime number for modulus (m) ensures:
	 * - the hash values fit within a manageable range and reduce collisions.
	 * Commonly used m:
	 * 2^31 − 1 (2147483647)
	 * 10^9 + 7 (1000000007) represented as 1e9 + 7
	 * 10^9 + 9 (1000000009) represented as 1e9 + 9
	 */
	const m = 1e9 + 7;

	let hash = 0;
	let pPow = 1;

	// Iterates over each character in the string
	for (let i = 0; i < str.length; i++) {
		// Calculating the hash value based on its position and ASCII value
		hash = hash + (str.charCodeAt(i) - 'a'.charCodeAt(0) + 1) * pPow;
		pPow = (pPow * p) % m; // current power of the base used for optimizing the calculation
	}

	return hash;
}
module.exports = { polynomialRollingHash };

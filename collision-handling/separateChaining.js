const LinkedList = require('../linked-list/linkedList.js');
const {
	polynomialRollingHash,
} = require('../hash-function/polynomialRollingHash.js');

/**
 * Represents a way dealing with collisions (where two keys hash to the same index in the table).
 * Involves calculating the hash index, inserting an element into the hash table, and handling collisions by maintaining linked lists at each index.
 */
class SeparateChaining {
	/**
	 * Initializes a new table with a specified size, which each element represents instance of LinkedList.
	 * @param {number} size - The length of the table.
	 */
	constructor(size) {
		this.table = new Array(size).fill(null).map(() => new LinkedList());
	}

	/**
	 * Calculates the hash index for a given key using a polynomial rolling hash function..
	 * @param {string} key - The key for which to calculate the hash index.
	 * @return {number} - The hash index associated with the key.
	 */
	hash(key) {
		return polynomialRollingHash(key) % this.table.length;
	}

	/**
	 * Adds an element to the hash table using separate chaining.
	 * Time Complexity:
	 * O(1) - the insertion operation takes constant time;
	 * worst case: O(n) - all keys hash to the same index (collisions) ,where n is the number of elements in the hash table.
	 * @param {string} key - The key of the element.
	 * @param {any} value - The value associated with the key.
	 */
	insert(key, value) {
		const index = this.hash(key);
		this.table[index].insert(key, value);
	}

	/**
	 * Searches for the value associated with the given key in the hash table.
	 * Time Complexity:
	 * O(1) - the search operation takes constant time;
	 * worst case: O(n) - all keys hash to the same index (collisions) ,where n is the number of elements in the hash table.
	 * @param {string} key - The key of the element.
	 * @return {any | undefined} - This function returns the node's value associated with the key, or undefined if not found.
	 */
	find(key) {
		const index = this.hash(key);
		const node = this.table[index].search(key);
		return node ? node.value : undefined;
	}
}

module.exports = SeparateChaining;

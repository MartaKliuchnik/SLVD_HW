import { polynomialRollingHash } from '../hash-function/polynomialRollingHash.js';
import LinkedList from '../linked-list/linkedList.js';

/**
 * Represents a hash table.
 * Provides methods for calculating hash, inserting inserting key-value pairs, retrieving values by key, and deleting key-value pairs.
 */
class HashTable {
	/**
	 * Initializes a new table with a specified size, which each element represents instance of LinkedList.
	 * @param {number} size - The length of the table.
	 */
	constructor(size) {
		this.table = new Array(size).fill(null).map(() => new LinkedList());
		this.size = size;
	}

	/**
	 * Calculates the hash index for a given key using a polynomial rolling hash function.
	 * @param {string} key - The key for which to calculate the hash index.
	 * @return {number} - The hash index associated with the key.
	 */
	calculateHash(key) {
		return polynomialRollingHash(key) % this.size;
	}

	/**
	 * Adds an element to the hash table using separate chaining.
	 * @param {string} key - The key of the element.
	 * @param {any} value - The value associated with the key.
	 *
	 */
	insert(key, value) {
		const index = this.calculateHash(key);
		this.table[index].insert(key, value);
	}

	/**
	 * Searches for the value associated with the given key in the hash table.
	 * @param {string} key - The key of the element.
	 * @return {any | undefined} - This function returns the node's value associated with the key, or undefined if not found.
	 */
	retrieve(key) {
		const index = this.calculateHash(key);
		const node = this.table[index].search(key);
		return node ? node.value : undefined;
	}

	/**
	 * Removes the node containing the specified value from the hash table.
	 * @param {string} key - The key of the element.
	 * @returns {HashTable|null} - This method returns the updated HashTable instance if the node exists, otherwise returns null.
	 */
	delete(key) {
		const index = this.calculateHash(key);
		return this.table[index].delete(key);
	}
}

export default HashTable;

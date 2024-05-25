const {
	polynomialRollingHash,
} = require('../hash-function/polynomialRollingHash.js');
const LinkedList = require('../linked-list/linkedList.js');
// import { polynomialRollingHash } from '../hash-function/polynomialRollingHash.js';
// import LinkedList from '../linked-list/linkedList.js';
/**
 * Represents a hash table.
 * Provides methods for calculating hash, inserting key-value pairs, retrieving values by key, and deleting key-value pairs.
 */
class HashTable {
	/**
	 * Initializes a new table with a specified size, which each element represents instance of LinkedList.
	 * @param {number} size - The length of the table.
	 */
	constructor(size) {
		this.table = new Array(size).fill(null).map(() => new LinkedList());
		this.size = size;
		this.count = 0; // The number of key-value pairs in the hash table
		this.loadFactorThreshold = 0.6; // Load factor threshold for resizing
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
	 * Time Complexity:
	 * O(1) - the insertion operation takes constant time;
	 * worst case: O(n) - all keys hash to the same index (collisions) ,where n is the number of elements in the hash table.
	 * @param {string} key - The key of the element.
	 * @param {any} value - The value associated with the key.
	 *
	 */
	insert(key, value) {
		const index = this.calculateHash(key);
		this.table[index].insert(key, value);
		this.count++;

		// Resize the table if the load factor exceeds the threshold
		if (this.count / this.size > this.loadFactorThreshold) {
			this.resize(this.size * 2);
		}
	}

	/**
	 * Searches for the value associated with the given key in the hash table.
	 * Time Complexity:
	 * O(1) - the search operation takes constant time;
	 * worst case: O(n) - all keys hash to the same index (collisions) ,where n is the number of elements in the hash table.
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
	 * Time Complexity:
	 * O(1) - the deletion operation takes constant time;
	 * worst case: O(n) - all keys hash to the same index (collisions), where n is the number of elements in the hash table.
	 * @param {string} key - The key of the element.
	 * @returns {LinkedList|null} - This method returns the updated LinkedList instance if the node exists, otherwise returns null.
	 */
	delete(key) {
		const index = this.calculateHash(key);
		const deletedElement = this.table[index].delete(key);
		// If a node was successfully deleted
		if (deletedElement) {
			this.count--; // Decrement the count
		}
		return deletedElement;
	}

	/**
	 * Resizes the hash table to a new size and rehashes all existing elements.
	 * Time complexity: O(n) - rehash all elements.
	 * @param {number} newSize - The new size of the hash table.
	 */
	resize(newSize) {
		const currentHashTable = this.table;
		this.table = new Array(newSize).fill(null).map(() => new LinkedList());
		this.size = newSize;
		this.count = 0; // Reset the count and re-insert elements

		// Rehash all elements from the old table to the new table
		for (let list of currentHashTable) {
			let current = list.head;
			while (current) {
				this.insert(current.key, current.value);
				current = current.next;
			}
		}
	}
}
// export default HashTable;
module.exports = HashTable;

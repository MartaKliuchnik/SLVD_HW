const separateChaining = require('./separateChaining.js');
const LinkedList = require('../linked-list/linkedList.js');

/**
 * Represents a test suite for the handling collisions, like separate chaining implementation.
 * Includes the methods for calculating hash, inserting an element into the hash table, and handling collisions by maintaining linked lists at each index.
 */
describe('Collision Handling - separate chaining: ', () => {
	let hashSeparateChainingTable; // Declaring hashTable variable

	beforeEach(() => {
		const tableSize = 5; // Specify the table size

		hashSeparateChainingTable = new separateChaining(tableSize); // Create a new hash table with the specified size
	});

	// Test case for creating a new table with length 5
	test('initializes a new table with a specified size', () => {
		// Verify that the hash table is initialized with the correct length 5
		expect(hashSeparateChainingTable.table.length).toBe(5);
	});

	// Test case for checking that an element in the hash table is an instance of a LinkedList class
	test('element in the hash table is an instance of LinkedList class', () => {
		// Verify that the element at index 0 in the hash table is an instance of LinkedList class
		expect(hashSeparateChainingTable.table[0]).toBeInstanceOf(LinkedList);
	});

	// Test case for calculating the correct hash index for a given key
	test('calculates a non-negative hash index for a given key', () => {
		// Calculate the hash index for the key 'alex'
		const index = hashSeparateChainingTable.hash('alex');

		// Verify that the calculated index is non-negative
		expect(index).toBeGreaterThanOrEqual(0);
	});

	// Test case for calculating the hash index for a given key
	test('calculates the hash index within the table size range for a given key', () => {
		// Calculate the hash index for the key 'alex'
		const index = hashSeparateChainingTable.hash('alex');

		// Verify that the calculated index is less than the table size (5)
		expect(index).toBeLessThan(5);
	});

	// Test case for inserting the element into the hash table
	test('inserts an element into the hash table', () => {
		// Insert an element into the hash table
		hashSeparateChainingTable.insert('alex', 'Alex Smith');

		// Attempt to retrieve the value associated with key 'alex'
		const value = hashSeparateChainingTable.find('alex');

		// Verify that the retrieved value matches the expected value 'Alex Smith',
		// indicating that the element was successfully inserted into the hash table
		expect(value).toBe('Alex Smith');
	});

	//  Test case for searching for the correct value from the hash table
	test('searches for the correct value from the hash table', () => {
		// Insert an element into the hash table
		hashSeparateChainingTable.insert('alex', 'Alex Smith');

		// Attempt to retrieve the value associated with key 'alex'
		const value = hashSeparateChainingTable.find('alex');

		// Verify that the retrieved value matches the expected value 'Alex Smith'
		expect(value).toBe('Alex Smith');
	});

	//  Test case for searching for the wrong value from the hash table
	test('searches for the wrong value from the hash table', () => {
		// Insert an element into the hash table
		hashSeparateChainingTable.insert('alex', 'Alex Smith');

		// Attempt to retrieve the value using a key that does not exist
		const value = hashSeparateChainingTable.find('alexa');

		// Verify that the value is undefined, indicating that no value was found for the specified key
		expect(value).toBeUndefined();
	});
});

const HashTable = require('./hashTable');
const LinkedList = require('../linked-list/linkedList');

/**
 * Represents a test suite for the HashTable implementation.
 * Includes the methods for calculating hash, inserting key-value pairs, retrieving values by key, and deleting key-value pairs.
 */
describe('Hash Table: ', () => {
	let hashTable; // Declaring hashTable variable

	beforeEach(() => {
		const tableSize = 5; // Specify the table size

		hashTable = new HashTable(tableSize); // Create a new hash table with the specified size
	});

	// Test case for creating a new table with length 5
	test('initializes a new table with a specified size', () => {
		// Verify that the length of the hash table's array representation is 5
		expect(hashTable.table.length).toBe(5);
	});

	// Test case for checking that an element in the hash table is an instance of a LinkedList class
	test('element in the hash table is an instance of LinkedList class', () => {
		// Verify that the element at index 0 in the hash table is an instance of LinkedList
		expect(hashTable.table[0]).toBeInstanceOf(LinkedList);
	});

	// Test case for calculating the correct hash index for a given key
	test('calculates a non-negative hash index for a given key', () => {
		// Calculate the hash index for the key 'alex'
		const index = hashTable.calculateHash('alex');

		// Verify that the calculated index is non-negative
		expect(index).toBeGreaterThanOrEqual(0);
	});

	// Test case for calculating the correct hash index for a given key
	test('calculates the hash index within the table size range for a given key', () => {
		// Calculate the hash index for the key 'alex'
		const index = hashTable.calculateHash('alex');

		// Verify that the calculated index is less than the table size (5)
		expect(index).toBeLessThan(5);
	});

	// Test case for inserting the element into the hash table
	test('inserts an element into the hash table', () => {
		// Insert an element into the hash table
		hashTable.insert('alex', 'Alex Smith');

		// Attempt to retrieve the value associated with key 'alex'
		const value = hashTable.retrieve('alex');

		// Verify that the retrieved value matches the expected value 'Alex Smith', indicating that the element was successfully inserted into the hash table
		expect(value).toBe('Alex Smith');
	});

	//  Test case for retrieving the correct value from the hash table
	test('retrieves the correct value from the hash table', () => {
		// Insert an element into the hash table
		hashTable.insert('alex', 'Alex Smith');

		// Attempt to retrieve the value associated with key 'alex'
		const value = hashTable.retrieve('alex');

		// Verify that the retrieved value matches the expected value 'Alex Smith'
		expect(value).toBe('Alex Smith');
	});

	// Test case for retrieving the wrong value from the hash table
	test('retrieves the wrong value from the hash table', () => {
		// Insert an element into the hash table
		hashTable.insert('alex', 'Alex Smith');

		// Attempt to retrieve the value using a key that does not exist
		const value = hashTable.retrieve('alexa');

		// Verify that the value is undefined, indicating that no value was found for the specified key
		expect(value).toBeUndefined();
	});

	// Test case for deleting the element containing the specified value from the hash table
	test('removes the specified value from the hash table', () => {
		// Insert an element into the hash table
		hashTable.insert('alex', 'Alex Smith');

		// Delete the element with key 'alex'
		hashTable.delete('alex');

		// Attempt to retrieve the value associated with key 'alex'
		const deletedValue = hashTable.retrieve('alex');

		// Verify that the value is undefined, indicating that the element was successfully removed
		expect(deletedValue).toBeUndefined();
	});

	// Test case for deleting the non-existent element from the hash table
	test('removes the non-existent value from the hash table', () => {
		// Insert an element into the hash table
		hashTable.insert('alex', 'Alex Smith');

		// Attempt to delete a non-existent element
		const result = hashTable.delete('alexa');

		// Verify that the result is null, indicating that the element was not found
		expect(result).toBeNull();
	});
});

const LinkedList = require('./linkedList.js');
const ListNode = require('./listNode.js');

/**
 * Represents a test suite for the LinkedList implementation.
 * Includes the methods for inserting nodes, deleting nodes, and searching for a node.
 */
describe('LinkedList: ', () => {
	let linkedList; // Declaring linkedList variable

	beforeEach(() => {
		linkedList = new LinkedList(); // Create a new LinkedList instance
	});

	// Test case for initializing a new LinkedList instance
	test('initializes a new LinkedList instance', () => {
		// Verify that the retrieved head matches the expected 'null' for empty LinkedList instance
		expect(linkedList.head).toBeNull();

		// Verify that the retrieved size matches the expected '0' for empty LinkedList instance
		expect(linkedList.size).toBe(0);
	});

	// Test case for inserting the element into the linked list
	test('inserts an element into the linked list', () => {
		// Insert an element into the linked list
		linkedList.insert('lemon', 'yellow');

		// Verify that the retrieved head doesn't matches the 'null'
		expect(linkedList.head).not.toBeNull();

		// Verify that the retrieved size matches the expected '1'
		expect(linkedList.size).toBe(1);

		// Verify that the retrieved key matches the expected 'lemon'
		expect(linkedList.head.key).toBe('lemon');

		// Verify that the retrieved value matches the expected 'yellow'
		expect(linkedList.head.value).toBe('yellow');
	});

	// Test case for inserting multiple nodes into the linked list
	test('inserts multiple nodes into the linked list', () => {
		// Insert multiple nodes into the linked list
		linkedList.insert('lemon', 'yellow');
		linkedList.insert('potato', 'brown');

		// Verify that the retrieved first key matches the expected 'lemon'
		expect(linkedList.head.key).toBe('lemon');

		// Verify that the retrieved second key matches the expected 'potato'
		expect(linkedList.head.next.key).toBe('potato');

		// Verify that the retrieved size matches the expected '2'
		expect(linkedList.size).toBe(2);
	});

	//  Test case for searching for the value from the empty linked list
	test('retrieves the value from the empty linked list', () => {
		// Verify that the retrieved result matches the expected 'null'
		expect(linkedList.search('apple')).toBeNull();
	});

	//  Test case for searching for the correct value from the linked list
	test('retrieves the correct value from the linked list', () => {
		// Insert an element into the linked list
		linkedList.insert('apple', 'green');

		// Attempt to retrieve the node associated with key 'apple'
		const node = linkedList.search('apple');

		// Verify that the retrieved node matches the expected ListNode instance
		expect(node).toBeInstanceOf(ListNode);

		// Verify that the retrieved node's value matches the expected 'green'
		expect(node.value).toBe('green');
	});

	// Test case for retrieving the wrong value from the linked list
	test('retrieves the wrong value from the linked list', () => {
		// Insert an element into the linked list
		linkedList.insert('apple', 'green');

		// Attempt to retrieve the value using a key that does not exist
		const value = linkedList.search('banana');

		// Verify that the value is 'null', indicating that no value was found for the specified key
		expect(value).toBeNull();
	});

	//  Test case for deleting the node from the empty linked list
	test('removes the node from the empty linked list', () => {
		// Verify that the retrieved result matches the expected 'null'
		expect(linkedList.delete('apple')).toBeNull();
	});

	// Test case for deleting the node containing the specified value from the linked list
	test('removes the specified value from the linked list', () => {
		// Insert an element into the linked list
		linkedList.insert('apple', 'green');

		// Delete the element with key 'apple'
		linkedList.delete('apple');

		// Verify that the retrieved size matches the expected '0'
		expect(linkedList.size).toBe(0);

		// Attempt to retrieve the node associated with key 'apple'
		const node = linkedList.search('apple');

		// Verify that the node is 'null', indicating that the node was successfully removed
		expect(node).toBeNull();
	});

	// Test case for deleting the non-existent element from the linked list
	test('removes the non-existent element from the linked list', () => {
		// Insert an element into the linked list
		linkedList.insert('apple', 'green');

		// Attempt to delete a non-existent element
		const deletedElement = linkedList.delete('apples');

		// Verify that the retrieved size matches the expected '1'
		expect(linkedList.size).toBe(1);

		// Verify that the result is null, indicating that the element was not found
		expect(deletedElement).toBeNull();
	});

	// Test case for deleting the head node
	test('deletes the head node', () => {
		// Insert new elements into the linked list
		linkedList.insert('apple', 'green');
		linkedList.insert('potato', 'brown');

		// Delete the head node
		linkedList.delete('apple');

		// Verify that the retrieved head value matches the expected 'potato'
		expect(linkedList.head.key).toBe('potato');

		// Verify that the retrieved size matches the expected '1'
		expect(linkedList.size).toBe(1);
	});
});

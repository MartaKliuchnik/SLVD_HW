const ListNode = require('./listNode.js');

// Represents a test suite for the ListNode implementation.
describe('ListNode: ', () => {
	// Test case for initializing a new node with some key and value
	test('initializes a new node with a key "apple" and value "green"', () => {
		// Create a new ListNode instance
		const node = new ListNode('apple', 'green');

		// Verify that the retrieved key matches the expected 'apple'
		expect(node.key).toBe('apple');

		// Verify that the retrieved value matches the expected 'green'
		expect(node.value).toBe('green');
	});

	// Test case for checking if the next pointer is initially null
	test('next pointer is initially null', () => {
		// Create a new ListNode instance
		const node = new ListNode('apple', 'green');

		// Verify that the next pointer is null
		expect(node.next).toBeNull();
	});
});

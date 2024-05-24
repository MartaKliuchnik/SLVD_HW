import ListNode from './listNode.js';

/**
 * Represents a singly linked list.
 * Provides methods for inserting nodes, deleting nodes, and searching for a node.
 */
class LinkedList {
	// Initializes a new node
	constructor() {
		this.head = null;
		this.size = 0; // The size of the entire linked list.
	}

	/**
	 * Inserts a new node with the given key and value at the end of the linked list.
	 * @param {number} key - The key of the element.
	 * @param {any} value - The value to insert into the linked list.
	 * @returns {LinkedList} - This method returns the updated LinkedList instance.
	 */
	insert(key, value) {
		const node = new ListNode(key, value);

		let current;

		// If the linked list is empty, set the new node as the head
		if (!this.head) {
			this.head = node;
		} else {
			current = this.head;

			// Traverse to the end of the linked list to find the last node
			while (current.next) {
				current = current.next;
			}

			// Append the new node to the end of the linked list.
			current.next = node;
		}
		// Increment the size of the linked list
		this.size++;

		return this.head;
	}

	/**
	 * Searches for the node with the specified key in the linked list.
	 * @param {any} element - The value to search for in the linked list.
	 * @returns {ListNode|null} - This method returns the node containing the specified key, or null if not found.
	 */
	search(key) {
		// If the linked list is empty, return null
		if (!this.head) {
			return null;
		}

		// Traverse the linked list to find the node containing the specified key
		let current = this.head;
		while (current) {
			if (current.key === key) {
				return current;
			}
			current = current.next; // Move to the next node
		}

		return null;
	}
}

export default LinkedList;

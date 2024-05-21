import ListNode from '../utils/listNode.js';

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
	 * Inserts a new node with the given `newElement` value at the end of the linked list.
	 * @param {any} newElement - The element to insert into the linked list.
	 * @returns {LinkedList} - This method returns the updated LinkedList instance.
	 */
	insert(newElement) {
		const node = new ListNode(newElement);

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
	 * Removes the node containing the specified value from the linked list.
	 * @param {any} element - The value of the element to be removed from the linked list.
	 * @returns {LinkedList|null} - This method returns the updated LinkedList instance if the node exists, otherwise returns null.
	 */
	delete(element) {
		// If the linked list is empty, return null
		if (!this.head) {
			return null;
		}

		// If the element to be deleted is at the head of the list, remove the head node by updating the head pointer
		if (this.head.value === element) {
			this.head = this.head.nest;
			size--;
			return this;
		}

		// Traverse the linked list to find the node containing the specified element
		let current = this.head;
		while (current.next) {
			if (current.next.value === element) {
				current.next = current.next.next;
				this.size--;
				return this;
			}
			current = current.next; // Move to the next node
		}
		return null;
	}

	/**
	 * Searches for the node with the specified value in the linked list.
	 * @param {any} element - The value to search for in the linked list.
	 * @returns {ListNode|null} - This method returns the node containing the specified value, or null if not found.
	 */
	search(element) {
		// If the linked list is empty, return null
		if (!this.head) {
			return null;
		}

		// Traverse the linked list to find the node containing the specified element
		let current = this.head;
		while (current) {
			if (current.value === element) {
				return current;
			}
			current = current.next; // Move to the next node
		}

		return null;
	}
}

export default LinkedList;

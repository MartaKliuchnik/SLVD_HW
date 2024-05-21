import Node from './node.js';

/**
 * Represents a node in the linked list.
 * Extends the base Node class.
 * Contains a value and a pointer to the next node.
 */
class ListNode extends Node {
	/**
	 * Initializes a new node with a value.
	 * @param {any} value - The value of the node.
	 */
	constructor(value) {
		super(value);
		this.next = null;
	}
}

export default ListNode;

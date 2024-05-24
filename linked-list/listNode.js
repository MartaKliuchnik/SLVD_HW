/**
 * Represents a node in the linked list.
 * Contains a value and a pointer to the next node.
 */
class ListNode {
	/**
	 * Initializes a new node with a value.
	 * @param {number} key - The key of the node.
	 * @param {any} value - The value of the node.
	 */
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.next = null;
	}
}

export default ListNode;

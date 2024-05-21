import Node from './node.js';

/**
 * Represents a node in the node tree.
 * Extends the base Node class.
 * Contains a value and two child: left and right.
 */
class TreeNode extends Node {
	/**
	 * Initializes a new node with a value.
	 * @param {any} value - The value of the node.
	 */
	constructor(value) {
		super(value);
		this.leftChild = null;
		this.rightChild = null;
	}
}

export default TreeNode;

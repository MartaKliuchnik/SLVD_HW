/**
 * Represents a Stack.
 * Provides methods for adding, retrieving, and removing elements from the stack.
 */
class Stack {
	// Creates an instance of Stack.
	constructor() {
		this.stack = [];
	}

	/**
	 * Adds a new element at the top of the stack.
	 * @param {any} newElement - The new element to be added at the top of the stack.
	 * @returns {Stack} - This method returns the updated Stack instance.
	 */
	push(newElement) {
		this.stack.push(newElement);
		return this;
	}

	/**
	 * Removes and returns the top element of the stack.
	 * @returns {any} - This method returns the top element of the stack.
	 * @returns {undefined} - This method does not return any value in case when stack is empty or @throws {Error} - Throws an error if the stack is empty.
	 */
	pop() {
		if (this.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			return this.stack.pop();
		}
	}

	/**
	 * Returns the top element of the stack without removing it.
	 * @returns {any} - This method returns the top element of the stack.
	 * @returns {undefined} - This method does not return any value in case when stack is empty or @throws {Error} - Throws an error if the stack is empty.
	 */
	peek() {
		if (this.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			return this.stack[this.stack.length - 1];
		}
	}

	/**
	 * Check if the stack is empty.
	 * @returns {boolean} - This method returns true if the stack is empty, otherwise false.
	 */
	isEmpty() {
		return this.stack.length === 0;
	}
}

export default Stack;

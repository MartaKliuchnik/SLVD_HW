import Stack from '../data-structures/stack.js';

/**
 * Represents a subclass of Stack.
 * Inherits methods for adding, retrieving, and removing elements from the Stack class.
 * Provides methods for getting max and min elements of the stack.
 */
class MinMaxStack extends Stack {
	// Creates an instance of MinMaxStack.
	constructor() {
		// Call the constructor of the parent Stack class
		super();
		// Using Stack instances for minStack and maxStack to get access to parent's methods
		this.minStack = new Stack();
		this.maxStack = new Stack();
	}

	/**
	 * Display the top element of the minStack (constant time O(1)).
	 * Reuse the parent's (Stack class) peek and isEmpty methods.
	 * @returns {any} - This method returns the top element of the minStack.
	 * @returns {undefined} - This method does not return any value in case when minStack is empty or @throws {Error} - Throws an error if the minStack is empty.
	 */
	getMin() {
		if (this.minStack.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - minStack is empty');
		} else {
			return this.minStack.peek();
		}
	}

	/**
	 * Display the top element of the maxStack (constant time O(1)).
	 * Reuse the parent's (Stack class) peek and isEmpty methods.
	 * @returns {any} - This method returns the top element of the maxStack.
	 * @returns {undefined} - This method does not return any value in case when maxStack is empty or @throws {Error} - Throws an error if the maxStack is empty.
	 */

	getMax() {
		if (this.maxStack.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - maxStack is empty');
		} else {
			return this.maxStack.peek();
		}
	}

	/**
	 * Adds a new element at the top of the stack.
	 * Reuse the parent's (Stack class) push, peek and isEmpty methods.
	 * Extend the push method duty to update minStack and maxStack.
	 * @param {any} newElement - The new element to be added at the top of the stack.
	 * @returns {MinMaxStack} - This method returns the updated MinMaxStack instance.
	 */
	push(newElement) {
		super.push(newElement); // Call the push method of the parent Stack class

		// Adds a new element at the top of the minStack
		if (this.minStack.isEmpty() || newElement < this.minStack.peek()) {
			this.minStack.push(newElement);
		}

		// Adds a new element at the top of the maxStack
		if (this.maxStack.isEmpty() || newElement > this.maxStack.peek()) {
			this.maxStack.push(newElement);
		}

		return this;
	}

	/**
	 * Removes and returns the top element of the stack.
	 * Reuse the parent's (Stack class) pop, peek and isEmpty methods.
	 * Extend the pop method duty to update minStack and maxStack.
	 * @returns {any} - This method returns the top element of the stack.
	 * @returns {undefined} - This method does not return any value in case when stack is empty or @throws {Error} - Throws an error if the stack is empty.
	 */
	pop() {
		if (super.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			const poppedElement = super.pop();

			if (poppedElement === this.minStack.peek()) {
				this.minStack.pop();
			}

			if (poppedElement === this.maxStack.peek()) {
				this.maxStack.pop();
			}

			return poppedElement;
		}
	}
}

export default MinMaxStack;

// Part 1: Data Structure Implementations (stack, queue, tree, graph, linked list)

/**
 * Represents a stack.
 * Provides methods to add, retrieve, and remove elements from the stack.
 */
class Stack {
	// Creates an instance of Stack.
	constructor() {
		this.stack = [];
	}

	/**
	 * Adds a new element at the top of the stack.
	 * @param {any} newElement - The new element to be added at the top of the stack.
	 * @returns {Stack} - This method returns the updated stack instance.
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
		if (this.stack.length === 0) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			return this.stack.pop();
		}
	}

	/**
	 * Returns the top element of the stack without removing it.
	 * @returns {any} - This method returns the top element of the stack.
	 */
	peek() {
		return this.stack[this.stack.length - 1];
	}
}

// Demonstration:
// Create an instance of the Stack class
const someStack = new Stack();

// Add elements onto the stack, following a specific order known as Last in, First out (LIFO)
someStack.push(2);
someStack.push(4);
someStack.push(6);

// Display current stack
console.log(someStack); // stack: (3) [2, 4, 6]

// See the top element of the stack without removing it
console.log(someStack.peek()); // 6

// Retrieve and remove the top element of the stack
console.log(someStack.pop()); // 6
console.log(someStack.pop()); // 4
console.log(someStack.pop()); // 2

console.log(someStack.pop()); // Underflow - stack is empty or Throws an Error: Underflow - stack is empty

// Display current stack
console.log(someStack); // stack: (0) []

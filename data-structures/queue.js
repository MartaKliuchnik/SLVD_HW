/**
 * Represents a Queue.
 * Provides methods for adding, removing and returning elements from the queue.
 */
class Queue {
	// Creates an instance of Queue.
	constructor() {
		this.queue = [];
	}

	/**
	 * Adds a new element to the rear of the queue.
	 * @param {any} newElement - The new element to be added to the queue.
	 * @returns {Queue} - This method returns the updated Queue instance.
	 */
	enqueue(newElement) {
		this.queue.push(newElement);
		return this;
	}

	/**
	 * Removes and returns the element from the front of the queue.
	 * @returns {any} - This method returns the front element of the queue.
	 * @returns {undefined} - This method does not return any value in case when queue is empty or @throws {Error} - Throws an error if the queue is empty.
	 */
	dequeue() {
		if (this.isEmpty()) {
			return console.error('Underflow - queue is empty');
		} else {
			return this.queue.shift();
		}
	}

	/**
	 * Returns the front element of the queue without removing it.
	 * @returns {any} - This method returns the front element of the queue.
	 * @returns {undefined} - This method does not return any value in case when queue is empty or @throws {Error} - Throws an error if the queue is empty.
	 */
	peek() {
		if (this.isEmpty()) {
			return console.error('Underflow - queue is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			return this.queue[0];
		}
	}

	/**
	 * Check if the queue is empty.
	 * @returns {boolean} - This method returns true if the queue is empty, otherwise false.
	 */
	isEmpty() {
		return this.queue.length === 0;
	}
}

export default Queue;

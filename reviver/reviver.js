/**
 * Represents a Reviver class.
 * Provides the static method for recursively applying a reviver function to an object.
 * The main idea behind this class:
 * A JSON string is initially just a plain dead string. When parsed (in real live) and utilized with a Reviver instance (in our case),
 * the string comes back as an "living" JavaScript object. It comes back to life; we revived it.
 */
class Reviver {
	/**
	 * Traverses an object, applying a user-provided reviver function to each key-value pair.
	 * @param {Object} holder - The object that holds the current value being processed.
	 * @param {string} key - The currecnt key within the holder object that points to the value being processed.
	 * @param {function} reviver - The function provided by the user to transform the values.
	 * @returns {Object} - The JavaScript object.
	 */
	static applyReviver(holder, key, reviver) {
		// Retrieve the value from the holder object at the specified key
		const value = holder[key];

		// Continue iterating over objects
		if (value !== null && typeof value === 'object') {
			// Iterate over all enumerable properties of the value object
			for (const k in value) {
				// Condition for avoid inherited properties from the prototype chain
				if (Object.hasOwnProperty.call(value, k)) {
					// Recursively call method on each property of the value object
					value[k] = this.applyReviver(value, k, reviver);
				}
			}
		}
		return reviver(key, value);
	}
}

module.exports = Reviver;

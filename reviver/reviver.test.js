const Reviver = require('../reviver/reviver.js');

/**
 * Represents a test suite for the Reviver implementation.
 * Includes the method for recursively applying a reviver function to an object.
 */
describe('Revivers: ', () => {
	test('apply reviver function to each key-value pair (date strings in JSON data)', () => {
		// Define a sample object
		const obj = { entered: '2014-01-01T23:28:56.782Z' };

		// Defines a custom reviver function that converts all string values to uppercase
		const reviver = (_, value) => {
			const datePattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)$/;
			if (typeof value === 'string' && datePattern.test(value)) {
				return new Date(value);
			}
			return value;
		};

		// Apply the reviver function to the object
		const updatedObj = Reviver.applyReviver({ '': obj }, '', reviver);

		// Define a Date JavaScript object
		const expectedDate = new Date(obj.entered);

		// Verify that the retrieved string values is expected to be JavaScript object
		expect(updatedObj.entered).toBeInstanceOf(Date);
		expect(updatedObj.entered).toEqual(expectedDate);
	});

	test('apply reviver function to each key-value pair (uppercase string value)', () => {
		// Define a sample object
		const obj = { name: 'John', age: 30, city: 'New York' };

		// Defines a custom reviver function that converts all string values to uppercase
		const reviver = (_, value) => {
			if (typeof value === 'string') {
				return value.toUpperCase();
			}
			return value;
		};

		// Apply the reviver function to the object
		const updatedObj = Reviver.applyReviver({ '': obj }, '', reviver);

		// Verify that the retrieved string values is expected to be uppercase
		expect(updatedObj.name).toBe('JOHN');
		expect(updatedObj.city).toBe('NEW YORK');
	});
});

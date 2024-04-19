// Task 1: Object Property Manipulation
const person = {
	firstName: 'John',
	lastName: 'Doe',
	age: 30,
	email: 'john.doe@example.com',
};

// 1.1 Use property descriptors to make all properties of the person object read-only and non-writable
Object.defineProperties(person, {
	firstName: { writable: false },
	lastName: { writable: false },
	age: { writable: false },
	email: { writable: false },
});

const descriptor = Object.getOwnPropertyDescriptors(person);
console.log(JSON.stringify(descriptor, null, 2));

// 1.2 Implement a method called updateInfo
person.updateInfo = function (newInfoObject) {
	for (let property in newInfoObject) {
		const propertyDescriptor = Object.getOwnPropertyDescriptor(this, property);
		if (propertyDescriptor && propertyDescriptor.writable !== false) {
			Object.defineProperty(this, property, {
				value: newInfoObject[property],
			});
		} else {
			console.error(`<${property}> is non-writable, you can’t be reassigned!`);
		}
	}
	return newInfoObject;
};

// The 'updateInfo' method adheres to the read-only property descriptor:
Object.defineProperty(person, 'updateInfo', { writable: false });
const descriptorUpdateInfo = Object.getOwnPropertyDescriptor(
	person,
	'updateInfo'
);
person.updateInfo({ firstName: 'Jane', age: 32 });
console.log(JSON.stringify(descriptorUpdateInfo, null, 2));

// 1.3 Create a new property called address
person.address = {};
Object.defineProperty(person, 'address', {
	writable: true,
	configurable: false,
	enumerable: false,
});

const descriptorAddress = Object.getOwnPropertyDescriptor(person, 'address');
console.log(JSON.stringify(descriptorAddress, null, 2));

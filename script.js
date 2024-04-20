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
// console.log(JSON.stringify(descriptor, null, 2));

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
// person.updateInfo({ firstName: 'Jane', age: 32 });
// console.log(JSON.stringify(descriptorUpdateInfo, null, 2));

// 1.3 Create a new property called address
person.address = {};
Object.defineProperty(person, 'address', {
	writable: true,
	configurable: false,
	enumerable: false,
});

const descriptorAddress = Object.getOwnPropertyDescriptor(person, 'address');
// console.log(JSON.stringify(descriptorAddress, null, 2));

// Task 2: Object Property Enumeration and Deletion
const product = {
	name: 'Laptop',
	price: 1000,
	quantity: 5,
};

// 2.1 Use property descriptors to make the price and quantity properties non-enumerable and non-writable
Object.defineProperties(product, {
	price: { enumerable: false, writable: false },
	quantity: { enumerable: false, writable: false },
});

const descriptorProductProperties = Object.getOwnPropertyDescriptors(product);
console.log(JSON.stringify(descriptorProductProperties, null, 2));

// 2.2 Implement a function called getTotalPrice
function getTotalPrise(productObject) {
	const priseValue = Object.getOwnPropertyDescriptor(
		productObject,
		'price'
	).value;
	const quantityValue = Object.getOwnPropertyDescriptor(
		productObject,
		'quantity'
	).value;

	return priseValue * quantityValue;
}
console.log(getTotalPrise(product));

// 2.3 Implement a function called deleteNonConfigurable
function deleteNonConfigurable(objectValue, propertyName) {
	const propertyDescriptor = Object.getOwnPropertyDescriptor(
		objectValue,
		propertyName
	);

	if (!propertyDescriptor) {
		throw new Error(`The property <${propertyName}> doesn't exist`);
	}

	if (propertyDescriptor.configurable) {
		delete objectValue[propertyName];
		return objectValue;
	} else {
		throw new Error(`The property <${propertyName}> is non-configurable`);
	}
}
console.log(deleteNonConfigurable(product, 'name'));

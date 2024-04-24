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
// console.log(JSON.stringify(descriptorProductProperties, null, 2));

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
// console.log(getTotalPrise(product));

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
// console.log(deleteNonConfigurable(product, 'name'));

// Task 3: Object Property Getters and Setters
const bankAccount = {
	_balance: 1000,

	get formattedBalance() {
		return `$${this._balance}`;
	},

	get balance() {
		return this._balance;
	},
	set balance(newBalance) {
		this._balance = newBalance;
	},

	transfer: function (targetAccount, amount) {
		if (typeof amount !== 'number') {
			throw new Error('Invalid operation');
		}

		if (this._balance < amount) {
			throw new Error('Insufficient funds for transfer');
		} else {
			this._balance -= amount;
			console.log(
				`The money has been transferred from current account. Your balance is ${this.formattedBalance}`
			);

			targetAccount.balance += amount;
			console.log(
				`The money has been transferred to the target account. The new balance is ${targetAccount.formattedBalance}`
			);
		}
	},
};

// bankAccount.balance = 4000;
// console.log(bankAccount.formattedBalance);

const bankAccount1 = Object.defineProperties(
	{},
	Object.getOwnPropertyDescriptors(bankAccount)
);
const bankAccount2 = Object.defineProperties(
	{},
	Object.getOwnPropertyDescriptors(bankAccount)
);
// console.log(bankAccount1.transfer(bankAccount2, 10000));

// Task 4: Advanced Property Descriptors
const person1 = {
	firstName: 'John',
	lastName: 'Doe',
	age: 30,
	email: 'john.doe@example.com',
	address: {
		city: 'Dresden',
		street: 'Pushkin Str',
	},
};

function createImmutableObject(someObject) {
	let immutableVersion = {};

	function getImmutateVersion(result, baseObject) {
		for (let key in baseObject) {
			if (typeof baseObject[key] === 'object') {
				result[key] = {};
				return getImmutateVersion(result[key], baseObject[key]);
			} else {
				Object.defineProperty(result, key, {
					...Object.getOwnPropertyDescriptor(baseObject, key),
					writable: false,
				});
			}
		}
	}
	getImmutateVersion(immutableVersion, someObject);
	return immutableVersion;
}
// console.log(createImmutableObject(person));
// console.log(createImmutableObject(person1));

// Task 5: Object Observation
function logPropertyName(property, action) {
	console.log(
		`The property name is <${property}>. The action <${action}> was performed on the object`
	);
}

function observeObject(someObject, callback) {
	return new Proxy(someObject, {
		set: function (target, key, value) {
			callback(key, 'set');
			if (Object.getOwnPropertyDescriptor(target, key).writable === false) {
				console.error(`The property <${key}> is non-writable`);
			} else if (
				(key === 'firstName' || key === 'lastName') &&
				value.length < 4
			) {
				console.error("Person's name must have more than 4 letter");
			} else if (key === 'age' && value < 18) {
				console.error("Person's age should be 18 or older");
			} else {
				return Reflect.set(...arguments);
			}
		},
	});
}
const proxy1 = observeObject(person, logPropertyName);

// Task 6: Object Deep Cloning
const complexDataStructures = {
	customer: {
		name: 'John Doe',
		email: 'john.doe@example.com',
	},
	items: [
		{ id: 1, name: 'Product 1', price: 10 },
		{ id: 2, name: 'Product 2', price: 15 },
	],
	totalPrice: 25.0,
};

function deepCloneObject(someObject) {
	if (someObject === null || typeof someObject !== 'object') {
		return someObject;
	}
	const initialValue = Array.isArray(someObject) ? [] : {};
	return Object.keys(someObject).reduce((copy, key) => {
		copy[key] = deepCloneObject(someObject[key]);
		return copy;
	}, initialValue);
}
const deepCopy = deepCloneObject(complexDataStructures);
deepCopy.items.push({ id: 3, name: 'Product 3', price: 33 });
console.log(complexDataStructures);
console.log('initial value above');
console.log(deepCopy);

// Task 7: Object Property Validation
const personForValidation = {
	firstName: 'John',
	lastName: 'Donna',
	age: 56,
	email: 'john.doe@example.com',
	address: {
		street: 'Pushkin Str',
	},
};

const schemaForPerson = {
	firstName: {
		type: 'string',
		required: true,
		validate: (firstName) => firstName.length >= 4,
	},
	lastName: {
		type: 'string',
		required: true,
		validate: (firstName) => firstName.length >= 4,
	},
	age: { type: 'number', required: true, validate: (age) => age >= 18 },
	email: {
		type: 'string',
		required: true,
		validate: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi.test(email),
	},
	address: {
		type: 'object',
		required: false,
		nestedSchema: {
			street: { type: 'string', required: false },
			city: { type: 'string', required: false },
		},
	},
};

function validateObject(someObject, validationSchema) {
	if (typeof validationSchema !== 'object') {
		throw new Error('Schema must be an object');
	}

	function validateNestedObject(object, validationSchema) {
		for (let schemaKey in validationSchema) {
			const { type, required, validate, nestedSchema } =
				validationSchema[schemaKey];

			if (required && !object[schemaKey]) {
				return false;
			}

			if (schemaKey in object) {
				if (typeof object[schemaKey] !== type) {
					return false;
				}
			}

			if (object[schemaKey] && validate && !validate(object[schemaKey])) {
				return false;
			}

			if (object[schemaKey] && nestedSchema) {
				if (!validateNestedObject(object[schemaKey], nestedSchema)) {
					return false;
				}
			}
		}
		return true;
	}
	return validateNestedObject(someObject, validationSchema);
}
// console.log(validateObject(personForValidation, schemaForPerson));

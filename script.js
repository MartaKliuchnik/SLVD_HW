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
		if (typeof amount !== 'number' || this._balance < amount) {
			throw new Error('Invalid operation');
		}

		this._balance -= amount;
		console.log(
			`The money has been transferred from current account. Your balance is ${this.formattedBalance}`
		);

		targetAccount.balance += amount;
		console.log(
			`The money has been transferred to the target account. The new balance is ${targetAccount.formattedBalance}`
		);
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
// console.log(bankAccount1.transfer(bankAccount2, 1000));

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

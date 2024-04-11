const getTypeValue = (value) => typeof value;

const isType = (value, type) => getTypeValue(value) === type;

const convertToString = (value, currentType) => {
	return value && (currentType === 'object' || currentType === 'function')
		? createConversionError(value, 'string')
		: value + '';
};

const convertToNumber = (value, currentType) => {
	return currentType === 'bigint' || currentType === 'symbol' || isNaN(value)
		? createConversionError(value, 'number')
		: +value;
};

const convertToBoolean = (value) => !!value;

const convertStringToNumber = (value) => {
	return isNaN(parseFloat(value)) ? createConversionError() : parseFloat(value);
};

const handleFalsyNumber = (value) => {
	return Number(value) === 0 ? +value : createConversionError(value, 'number');
};

const isValidDate = (dateString) => {
	const convertDate = new Date(dateString);
	return !isNaN(convertDate.getTime());
};

const isValidNumber = (value) => {
	return !isNaN(value) && getTypeValue(value) === 'number';
};

const createConversionError = (value, type) => {
	const typeOfValue = getTypeValue(value);

	const valueToString =
		typeOfValue === 'symbol' || typeOfValue === 'bigint'
			? value.toString()
			: typeOfValue === 'object' && value
			? JSON.stringify(value)
			: value;

	throw new Error(
		`Conversion <${valueToString}> to type "${type}" is not possible`
	);
};

const throwError = (message) => {
	throw new Error(message);
};

const MyCustomLibrary = {
	/* Adds two values together, either numerically or as strings.
	If both values are numbers or bigNumbers, they are added together numerically.
	If both values are strings, they are concatenated. */

	addValues: function (value1, value2) {
		const isBigInt1 = isType(value1, 'bigint');
		const isBigInt2 = isType(value2, 'bigint');
		const isString1 = isType(value1, 'string');
		const isString2 = isType(value2, 'string');
		const isNumber1 = isType(value1, 'number');
		const isNumber2 = isType(value2, 'number');

		console.log(isNumber1);
		console.log(isNumber2);

		if ((isBigInt1 && isBigInt2) || (isString1 && isString2)) {
			return value1 + value2;
		} else if (isBigInt1 === !isBigInt2) {
			throwError('The addition is not possible');
		} else if (!isNaN(value1) && !isNaN(value2) && isNumber1 && isNumber2) {
			return value1 + value2;
		} else {
			throwError('The addition is not possible');
		}
	},

	/* Converts a value to a string representation.
	If the value is an object, it is converted to a JSON string.
	Otherwise, it is converted using the String constructor. */

	stringifyValue: function (value) {
		const currentType = getTypeValue(value);

		if (value && currentType === 'object') {
			return JSON.stringify(value);
		}

		return String(value);
	},

	/* 
	Inverts a boolean value.
	If the value is a boolean, its inverted value is returned.
	If the value is not a boolean, an error is thrown.
	*/

	invertBoolean: function (value) {
		return getTypeValue(value) === 'boolean'
			? !value
			: throwError('The argument is not a boolean');
	},

	/* 
	Converts a value to a number if possible.
	Possible values that can be converted to a number include: 
	- numbers
	- strings (parsed as numbers if possible)
	- null
	- booleans (true is converted to 1, false is converted to 0)
	*/
	convertToNumber: function (value) {
		if (!value) {
			return handleFalsyNumber(value);
		}

		const currentType = getTypeValue(value);

		if (currentType === 'string') {
			return convertStringToNumber(value);
		}

		return convertToNumber(value, currentType);
	},

	/* 
	Coerces a value to a specified type.
	Coercion is the process of forcing one type of primitive value to another type of primitive value.
	In JavaScript, objects are never coerced.
	*/
	coerceToType: function (value, type) {
		const currentType = getTypeValue(value);

		switch (type) {
			case 'string':
				return convertToString(value, currentType);
			case 'number':
				return convertToNumber(value, currentType);
			case 'boolean':
				return convertToBoolean(value);
			default:
				return createConversionError(value, type);
		}
	},

	/*
	Calculates the resulting date by adding a given date (initial date as a string) to a specified number of days (parameter must be a number).
	The function internally converts the string to a Date object using the new Date(); 
	The method GetTime() tranform Date object object transforms into a number, making it suitable for numerical calculations.
	*/
	addingToDate: function (dateString, days) {
		if (!isValidDate(dateString)) {
			return throwError(`The date <${dateString}> is invalid`);
		}

		if (!isValidNumber(days)) {
			return throwError('The addition is not possible');
		}

		const convertDate = new Date(dateString).getTime();
		console.log(typeof convertDate);
		const millisecondsPerDay = days * 24 * 60 * 60 * 1000;
		return new Date(convertDate + millisecondsPerDay);
	},
};

const bigv = BigInt('0x1ffffffeeeeeeeeef');
const mockData = [
	// 0,
	// false,
	// null,
	// undefined,
	// '',
	// NaN,
	// [],
	// [1, 2],
	// {},
	// { id: 4 },
	// '12',
	// '2w',
	// true,
	// 12,
	// bigv,
	// function () {
	// 	console.log('check');
	// },
	// Symbol('foo'),
];

// mockData.forEach((value) => console.log(MyCustomLibrary.addValues(value, 10)));

// mockData.forEach((value) => console.log(MyCustomLibrary.stringifyValue(value)));

// mockData.forEach((value) => console.log(MyCustomLibrary.invertBoolean(value)));

// mockData.forEach((value) =>
// 	console.log(MyCustomLibrary.convertToNumber(value))
// );

// mockData.forEach((value) =>
// 	console.log(MyCustomLibrary.coerceToType(value, 'string'))
// );

const dateString = '2024-04-11';
console.log(MyCustomLibrary.addingToDate(dateString, 10));

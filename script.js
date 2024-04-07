const getTypeValue = (value) => typeof value;

const getErrorType = (value, type) => {
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

const getError = (message) => {
	throw new Error(message);
};

const MyCustomLibrary = {
	// possible two distinct operations: numeric addition and string concatenation
	addValues: function (value1, value2) {
		const currentTypeForValue1 = getTypeValue(value1);
		const currentTypeForValue2 = getTypeValue(value2);

		const isBigInt1 = currentTypeForValue1 === 'bigint';
		const isBigInt2 = currentTypeForValue2 === 'bigint';
		const isString1 = currentTypeForValue1 === 'string';
		const isString2 = currentTypeForValue2 === 'string';
		const isNumber1 = currentTypeForValue1 === 'number';
		const isNumber2 = currentTypeForValue2 === 'number';
		const isSymbol1 = currentTypeForValue1 === 'symbol';
		const isSymbol2 = currentTypeForValue2 === 'symbol';
		const isObj1 = currentTypeForValue1 === 'object';
		const isObj2 = currentTypeForValue2 === 'object';

		if (isBigInt1 && isBigInt2) {
			return value1 + value2;
		} else if (isBigInt1 === !isBigInt2 || isSymbol1 || isSymbol2) {
			getError('The addition is not possible');
		} else if (isString1 || isString2) {
			return value1 && value2 && (isObj1 || isObj2)
				? getError('The addition is not possible')
				: value1 + value2;
		} else if (isNumber1 || isNumber2) {
			return isNaN(value1) || isNaN(value2)
				? getError('The addition is not possible')
				: value1 + value2;
		} else {
			getError('The addition is not possible');
		}
	},

	stringifyValue: function (value) {
		const currentType = getTypeValue(value);
		if (value && currentType === 'object') {
			console.log(`[ ] || { } == ${JSON.stringify(value)}`);
			return JSON.stringify(value);
		} else {
			return String(value);
		}
	},

	// In JavaScript 6 falsy values: false, undefined, null, NaN, 0, "" - return Error
	// FROM BOOLEAN TO INVERTED VALUE
	invertBoolean: function (value) {
		return getTypeValue(value) === 'boolean'
			? !value
			: getError('The argument is not a boolean');
	},

	// convert to a number possibly: number; string (depend on value); null; boolean
	// convert to a number impossibly: undefined; {}; []; Symbol
	convertToNumber: function (value) {
		if (!value) {
			// console.log(`null || undefined || 0 == ${value}`);
			return Number(value) === 0 ? +value : getErrorType(value, 'number');
		} else {
			const currentType = getTypeValue(value);
			if (currentType === 'string') {
				return isNaN(parseFloat(value)) ? getErrorType() : parseFloat(value);
			} else {
				currentType === 'bigint' || currentType === 'symbol' || isNaN(value)
					? getErrorType(value, 'number')
					: +value;
			}
		}
	},

	// Coercion is the process of forcing one type of primitive value to another type of primitive value.
	// In Javascript, objects NEVER get coerced.
	coerceToType: function (value, type) {
		const currentType = getTypeValue(value);

		if (type === 'string') {
			return value && (currentType === 'object' || currentType === 'function')
				? getErrorType(value, 'string')
				: value + '';
		} else if (type === 'number') {
			return currentType === 'bigint' ||
				currentType === 'symbol' ||
				isNaN(value)
				? getErrorType(value, 'number')
				: +value;
		} else if (type === 'boolean') {
			return !!value;
		} else {
			return getErrorType(value, type);
		}
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

// mockData.forEach((value) =>
// 	console.log(MyCustomLibrary.addValues(value, true))
// );

// mockData.forEach((value) => console.log(MyCustomLibrary.stringifyValue(value)));

// mockData.forEach((value) => console.log(MyCustomLibrary.invertBoolean(value)));

// mockData.forEach((value) =>
// 	console.log(MyCustomLibrary.convertToNumber(value))
// );

// mockData.forEach((value) =>
// 	console.log(MyCustomLibrary.coerceToType(value, 'string'))
// );

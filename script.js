const getTypeValue = (value) => typeof value;

const getError = (value, type) => {
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

const MyCustomLibrary = {
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
			return Number(value) === 0 ? +value : getError(value, 'number');
		} else {
			const currentType = getTypeValue(value);
			if (currentType === 'string') {
				return isNaN(parseFloat(value)) ? getError() : parseFloat(value);
			} else {
				currentType === 'bigint' || currentType === 'symbol' || isNaN(value)
					? getError(value, 'number')
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
				? getError(value, 'string')
				: value + '';
		} else if (type === 'number') {
			return currentType === 'bigint' ||
				currentType === 'symbol' ||
				isNaN(value)
				? getError(value, 'number')
				: +value;
		} else if (type === 'boolean') {
			return !!value;
		} else {
			return getError(value, type);
		}
	},
};

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
	// BigInt('0x1ffffffeeeeeeeeef'),
	// function () {
	// 	console.log('check');
	// },
	// Symbol('foo'),
];

// mockData.forEach((value) => console.log(MyCustomLibrary.stringifyValue(value)));

// mockData.forEach((value) => console.log(MyCustomLibrary.invertBoolean(value)));

// mockData.forEach((value) =>
// 	console.log(MyCustomLibrary.convertToNumber(value))
// );

// mockData.forEach((value) =>
// 	console.log(MyCustomLibrary.coerceToType(value, 'string'))
// );

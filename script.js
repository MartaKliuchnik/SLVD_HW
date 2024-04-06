const getTypeValue = (value) => typeof value;

const getError = (message = 'Conversion is not possible') => {
	throw new Error(message);
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
			console.log(`null || undefined == ${value}`);
			return Number(undefined) === 0 ? +value : getError();
		} else {
			const currentType = getTypeValue(value);
			if (
				currentType === 'number' ||
				currentType === 'string' ||
				currentType === 'boolean'
			) {
				if (currentType === 'number' || currentType === 'boolean') {
					console.log(`number || boolean == ${value}`);
					return +value;
				} else {
					console.log(`string == ${value}`);
					return isNaN(parseFloat(value)) ? getError() : parseFloat(value);
				}
			} else {
				return getError();
			}
		}
	},
};

console.log(MyCustomLibrary.stringifyValue({ id: 4 }));
console.log(MyCustomLibrary.invertBoolean(NaN));
console.log(MyCustomLibrary.convertToNumber(Symbol('foo')));

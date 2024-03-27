const num1 = '90099999999999999999999999099999999999999999999999';
const num2 = '99999999999999999999999999999999999999999999999999';
// num1 = '9231';
// num2 = '1239';

// "plus" function implementation
function plus(str1, str2) {
	let maxLength = Math.max(str1.length, str2.length);
	let overageValue = 0;

	let result = Array.from({ length: maxLength }, (_, i) => {
		const digit1 = parseInt(str1[str1.length - i - 1] || '0');
		const digit2 = parseInt(str2[str2.length - i - 1] || '0');
		const sum = digit1 + digit2 + overageValue;
		overageValue = Math.floor(sum / 10);
		return (sum % 10).toString();
	})
		.reverse()
		.join('');

	if (overageValue > 0) {
		result = overageValue.toString() + result;
	}

	return result;
}

const sumOfNumbers = plus(num1, num2);
console.log(sumOfNumbers);

// "minus" function implementation
function minus(str1, str2) {
	const maxLength = Math.max(str1.length, str2.length);
	let overageValue = 0;

	if (
		str1.length < str2.length ||
		(str1.length === str2.length && str1 < str2)
	) {
		[str1, str2] = [str2, str1];
	}

	const result = Array.from({ length: maxLength }, (_, i) => {
		const digit1 = parseInt(str1[str1.length - 1 - i]);
		const digit2 = parseInt(str2[str2.length - 1 - i] || '0');
		let subtr = digit1 - digit2 - overageValue;

		overageValue = subtr < 0 ? 1 : 0;
		subtr = subtr < 0 ? subtr + 10 : subtr;

		return subtr.toString();
	})
		.reverse()
		.join('');

	return result.replace(/^0+/, '') || '0';
}

const subtractionOfNumbers = minus(num1, num2);
console.log(subtractionOfNumbers);

// "multiply" function implementation
function multiply(str1, str2) {
	const result = Array(str1.length + str2.length).fill(0);

	for (let i = str1.length - 1; i >= 0; i--) {
		for (let j = str2.length - 1; j >= 0; j--) {
			const productNumber =
				parseInt(str1[i]) * parseInt(str2[j]) + result[i + j + 1];
			result[i + j] += Math.floor(productNumber / 10);
			result[i + j + 1] = productNumber % 10;
		}
	}
	return result.join('').replace(/^0+/, '') || '0';
}

const productOfNumbers = multiply(num1, num2);
console.log(productOfNumbers);

// "divide" function implementation
function divide(str1, str2) {
	if (parseInt(str2) === 0) {
		console.error("You can't divite by zero!");
		return;
	}

	let overageValue = 0;

	const result = Array.from({ length: str1.length }, (_, i) => {
		const digit = parseInt(str1[i]);
		const currentNumber = overageValue * 10 + digit;
		const currentQuotient = Math.floor(currentNumber / parseInt(str2));
		overageValue = currentNumber % parseInt(str2);
		return currentQuotient;
	}).join('');

	return result.replace(/^0+/, '') || '0';
}

const quotientOfNumbers = divide(num1, num2);
console.log(quotientOfNumbers);

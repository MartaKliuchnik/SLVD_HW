const num1 = '20';
const num2 = '100';

// "plus" function implementation
String.prototype.plus = function plus(stringValue) {
	return +this + +stringValue;
};
console.log(num1.plus(num2));

// "minus" function implementation
String.prototype.minus = function minus(stringValue) {
	return +this > +stringValue ? +this - +stringValue : +stringValue - +this;
};
console.log(num1.minus(num2));

// "divide" function implementation
String.prototype.divide = function divide(stringValue) {
	return Math.floor(+this / +stringValue);
};
console.log(num1.divide(num2));

// "multiply" function implementation
String.prototype.multiply = function multiply(stringValue) {
	return +this * +stringValue;
};
console.log(num1.multiply(num2));

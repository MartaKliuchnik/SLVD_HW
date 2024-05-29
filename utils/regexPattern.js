// Define the specified regex pattern suitable for identifying JSON elements
export const regexPattern =
	/\{|\}|\[|\]|,|:|"(?:\\["\\/bfnrt]|\\u[0-9a-fA-F]{4}|[^"\\])*"|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?/g;

/**
 * The regular expressions to identify JSON elements (objects, arrays, strings, numbers, booleans, null) in the input string
 * \{|\} - checks the opening or closing curly brackets for objects
 * \[|\] - checks the opening or closing square brackets for arrays
 * , - matches a comma, each member of an object or array value must be followed by a comma, except for the last one
 * : - matches a colon :, a member is represented by a key-value pair, which must be separate by colon
 * true|false|null - checks the true, false or null respectively
 *
 * Certain characters must be escaped when working with JSON to ensure that the JSON is valid.
 * Here are: "(double quote), \(backslash), /(forward slash), \b(backspace), \f(form feed), \n(newline) \r(carriage return), \t (tab)
 * "(?:\\["\\/bfnrt]|\\u[0-9a-fA-F]{4}|[^"\\])*" - matches a double-quoted string
 * (?: ... ) - creates a non-capturing group
 * \\["\\/bfnrt] - matches escape sequences that consist of a backslash followed by one of the characters in the set
 * u[a-fA-F0-9]]{4}) - matches "u" followed by 4 hex digits (json escaped unicode character)
 * [^\\"]) - any character except \, " (the characters valid inside a quoted string without escaping as per json.org spec)
 * '*' - matches zero or more of the previous patterns
 *
 * Matches numbers: -?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?
 * -? - checks optional minus sign for negative numbers
 * \d+ - matches an one or more digits
 * (?:\.\d+)? - creates an optional non-capturing group for fractional part
 * (?:[eE][+\-]?\d+)? - creates an optional non-capturing group for matching the exponent part, plus or minus sign for one or more digits
 */

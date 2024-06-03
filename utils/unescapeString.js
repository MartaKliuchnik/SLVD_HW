/**
 * Unescapes escape sequences in a string.
 * @param {string} token - The string containing escape sequences.
 * @returns {string} - The string with escape sequences replaced by their corresponding characters.
 */
function unescapeString(token) {
	// Create a map for escape sequences
	const escapeSequences = {
		'': '', // Empty escape sequence
		'\\': '\\', // Escape double backslash
		'/': '/', // Escape forward slash
		b: '\b', // Escape backspace
		f: '\f', // Escape form feed
		n: '\n', // Escape newline
		r: '\r', // Escape carriage return
		t: '\t', // Escape horizontal tab
	};

	/**
	 * Handle Unicode escape sequences, convert a Unicode escape sequence into its corresponding character
	 * @param {string} hex - The hexadecimal string (Unicode escape sequence).
	 * @returns {*} - The corresponding character.
	 * */
	const unescapeUnicode = (hex) => {
		const dec = parseInt(hex, 16); // Converts the hexadecimal string to its decimal Unicode value
		return String.fromCharCode(dec);
	};

	// Remove the surrounding quotes and replace escape sequences
	const unescapedString = token
		.slice(1, -1)
		.replace(/\\(["\\/bfnrt]|u[0-9a-fA-F]{4})/g, (match, val) => {
			if (val.charAt(0) === 'u') {
				// Handle Unicode escape sequence
				return unescapeUnicode(val.slice(1));
			} else {
				// Handle simple escape sequences
				return escapeSequences[val] || match;
			}
		});
	return unescapedString;
}

module.exports = unescapeString;

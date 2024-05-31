const unquotedKeyPattern = /(?<!["\w])(\w+)(?=\s*:)/g;
module.exports = unquotedKeyPattern;

/** 
 * (?<!["\w])- negative lookbehind to ensure the key is not preceded by a double quote or another word character (to avoid false positives in string values or numbers);
 * (\w+) - capture one or more word characters as the key;
 * (?=\s*:) - positive lookahead to ensure the captured key is followed by zero or more whitespace characters and a colon.
 */
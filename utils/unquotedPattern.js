export const unquotedKeyPattern = /(?<!["\w])(\w+)(?=\s*:)/g;

/** 
 * (?<!["\w])- negative lookbehind to ensure the key is not preceded by a double quote or another word character (to avoid false positives in string values or numbers);
 * (\w+) - capture one or more word characters as the key;
 * (?=\s*:) - positive lookahead to ensure the captured key is followed by zero or more whitespace characters and a colon.
 */


export const invalidUnquotedStringPattern = /:\s*(?!true\b|false\b|null\b)([a-zA-Z_]\w*)([^\s,:\{\}\[\]])/g;

/**
 * :\s* - ensures the match starts after a colon followed by optional whitespace;
 * (?!true\b|false\b|null\b) - is a negative lookahead assertion that ensures the value is not one of the valid JSON literals (true, false, null);
 * ([a-zA-Z_]\w*) - captures any sequence of characters starting with an alphabetic character or underscore, followed by zero or more word characters;
 * ([^\s,:\{\}\[\]]+) - matches one or more consecutive characters that are not whitespace or any of the specified special characters.
 */
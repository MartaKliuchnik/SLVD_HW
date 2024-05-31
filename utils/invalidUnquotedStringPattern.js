const invalidUnquotedStringPattern = /:\s*(?!true\b|false\b|null\b)([a-zA-Z_]\w*)([^\s,:\{\}\[\]])/g;
module.exports = invalidUnquotedStringPattern;
/**
 * :\s* - ensures the match starts after a colon followed by optional whitespace;
 * (?!true\b|false\b|null\b) - is a negative lookahead assertion that ensures the value is not one of the valid JSON literals (true, false, null);
 * ([a-zA-Z_]\w*) - captures any sequence of characters starting with an alphabetic character or underscore, followed by zero or more word characters;
 * ([^\s,:\{\}\[\]]+) - matches one or more consecutive characters that are not whitespace or any of the specified special characters.
 */

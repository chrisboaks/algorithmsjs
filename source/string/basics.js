import { mod } from '../math/utils';

function createCharMapper(zeroIndex, offset) {
  return function(char) {
    const code = char.charCodeAt(0);
    const letterIndex = code - zeroIndex;
    const newIndex = mod(letterIndex + offset, 26);
    return String.fromCharCode(newIndex + zeroIndex);
  };
}

function caesar(str, offset = 13) {
  const lowerMapper = createCharMapper('a'.charCodeAt(0), offset);
  const upperMapper = createCharMapper('A'.charCodeAt(0), offset);
  return str.replace(/[a-z]/g, lowerMapper).replace(/[A-Z]/g, upperMapper);
}

function isPalindrome(baseStr) {
  const str = baseStr.toLowerCase();
  const checks = Math.floor(str.length / 2);
  for (let i = 0; i < checks; i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}

function reverse(str) {
  return str
    .split('')
    .reverse()
    .join('');
}

function charCount(str) {
  return str.split('').reduce((counts, char) => {
    counts[char] = (counts[char] || 0) + 1;
    return counts;
  }, {});
}

function reverseEach(str) {
  return str
    .split(' ')
    .map(reverse)
    .join(' ');
}

export { caesar, isPalindrome, reverse, charCount, reverseEach };

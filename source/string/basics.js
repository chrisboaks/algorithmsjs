function isPalindrome(baseStr) {
  const str = baseStr.toLowerCase();
  const checks = Math.floor(str.length);
  for (let i = 0; i < checks; i++) {
    if (str[i] !== str[checks - i - 1]) {
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

export { isPalindrome, reverse, charCount, reverseEach };

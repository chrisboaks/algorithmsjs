/* global __dirname:false */

function sortChars(str) {
  return str
    .toLowerCase()
    .split('')
    .sort()
    .join('');
}

function isAnagram(str1, str2) {
  return sortChars(str1) === sortChars(str2);
}

const anagramsOf = (function anagramsOf() {
  const fs = require('fs');
  const path = require('path');

  const words = fs
    .readFileSync(path.resolve(__dirname, '../../assets/sowpods.txt'), 'utf8')
    .split('\n');

  const cache = {};
  words.forEach(word => {
    const sorted = sortChars(word);
    if (cache[sorted]) {
      cache[sorted].push(word);
    } else {
      cache[sorted] = [word];
    }
  });

  function fn(word) {
    return cache[sortChars(word)].filter(w => w !== word) || [];
  }

  return fn;
})();

export {sortChars, isAnagram, anagramsOf};

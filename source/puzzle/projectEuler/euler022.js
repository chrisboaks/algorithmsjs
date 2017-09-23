/* global __dirname:false */

// Using names.txt (right click and 'Save Link/Target As...'), a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.

// For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.

// What is the total of all the name scores in the file?

const fs = require('fs');
const path = require('path');

const charValueBase = 'A'.charCodeAt(0) - 1;

function getCharValue(char) {
  return char.charCodeAt(0) - charValueBase;
}

function getAlphabeticalValue(word) {
  return word
    .split('')
    .map(getCharValue)
    .reduce((a, b) => a + b);
}

export default function euler022() {
  const names = fs
    .readFileSync(path.resolve(__dirname, '../../../assets/names.txt'), 'utf8')
    .split(',')
    .map(word => word.replace(/"/g, ''))
    .sort();

  return names
    .map((name, i) => getAlphabeticalValue(name) * (i + 1))
    .reduce((a, b) => a + b);
}

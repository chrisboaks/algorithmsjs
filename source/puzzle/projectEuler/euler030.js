// Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

// 1634 = 1^4 + 6^4 + 3^4 + 4^4
// 8208 = 8^4 + 2^4 + 0^4 + 8^4
// 9474 = 9^4 + 4^4 + 7^4 + 4^4
// As 1 = 14 is not a sum it is not included.

// The sum of these numbers is 1634 + 8208 + 9474 = 19316.

// Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.


import {digits} from '../../math/utils';

function getUpperBound() {
  const maxDigitValue = Math.pow(9, 5);
  let order = 0;
  let maxSum = 0;
  let maxVal = 0;
  while (maxSum >= maxVal) {
    order++;
    maxSum = order * maxDigitValue;
    maxVal = Math.pow(10, order + 1) - 1;
  }
  return maxVal;
}

function isFifthPowerSum(n) {
  const sum = digits(n)
    .map(x => Math.pow(x, 5))
    .reduce((a, b) => a + b);
  return n === sum;
}

export default function euler030() {
  const upperBound = getUpperBound();
  let rv = 0;
  for (let i = 10; i <= upperBound; i++) {
    if (isFifthPowerSum(i)) {
      rv += i;
    }
  }
  return rv;
}

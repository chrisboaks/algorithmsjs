// We shall say that an n-digit number is pandigital if it makes use of all
// the digits 1 to n exactly once; for example, the 5-digit number, 15234, is
// 1 through 5 pandigital.

// The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing
// multiplicand, multiplier, and product is 1 through 9 pandigital.

// Find the sum of all products whose multiplicand/multiplier/product identity
// can be written as a 1 through 9 pandigital.

// HINT: Some products can be obtained in more than one way so be sure to only
// include it once in your sum.

import { Factor } from '../../math/factor';

const digits = '123456789'.split('');

function pandigitalArgs(...args) {
  // assumes args are all integers
  const argDigits = args.join('').split('');
  return argDigits.length === 9 && digits.every(d => argDigits.includes(d));
}

function isPandigitalProduct(n) {
  const factors = Factor.properFactors(n);
  const sqrt = Math.sqrt(n);
  for (let i = 0; factors[i] <= sqrt; i++) {
    if (pandigitalArgs(n, factors[i], n / factors[i])) {
      return true;
    }
  }
  return false;
}

export default function euler032() {
  let sum = 0;
  for (let n = 1234; n <= 9876; n++) {
    if (isPandigitalProduct(n)) {
      sum += n;
    }
  }
  return sum;
}

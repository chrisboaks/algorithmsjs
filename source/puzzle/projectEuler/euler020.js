// n! means n × (n − 1) × ... × 3 × 2 × 1

// For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
// and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

// Find the sum of the digits in the number 100!

import { BigInt } from '../../math/bigInt';

export default function euler020() {
  let n = new BigInt(1);
  for (let i = 1; i <= 100; i++) {
    n = n.mult(i);
  }
  return n.digits.reduce((a, b) => a + b);
}

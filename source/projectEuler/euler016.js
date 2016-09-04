// 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
// What is the sum of the digits of the number 2^1000?

import {BigInt} from '../math/bigInt';

export default function euler016() {
  return new BigInt(2).exp(1000).val
    .split('')
    .map(x => parseInt(x, 10))
    .reduce((prev, curr) => prev + curr);
}

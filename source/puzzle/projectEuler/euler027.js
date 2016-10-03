// Euler discovered the remarkable quadratic formula:

// n^2 + n + 41
// It turns out that the formula will produce 40 primes for the consecutive integer values 0 ≤ n ≤ 39. However, when n = 40, 40^2 + 40 + 41 = 40(40+1) + 41 is divisible by 41, and certainly when n = 41, 41^2 + 41 + 41 is clearly divisible by 41.

// The incredible formula n^2 − 79n + 1601 was discovered, which produces 80 primes for the consecutive values 0 ≤ n ≤ 79. The product of the coefficients, −79 and 1601, is −126479.

// Considering quadratics of the form:

// n^2 + an + b, where |a| < 1000 and |b| ≤ 1000

// where |n| is the modulus/absolute value of n
// e.g. |11| = 11 and |−4| = 4
// Find the product of the coefficients, a and b, for the quadratic expression that produces the maximum number of primes for consecutive values of n, starting with n = 0.


import {Seq} from '../../math/seq';

function getPrimesObj() {
  const PRIME_OUTER_BOUND = (79 * 79) + (1000 * 79) + 1000;
  const primesAry = Seq.primes(PRIME_OUTER_BOUND);
  const rv = {};
  primesAry.forEach(p => rv[p] = true);
  return rv;
}

const primes = getPrimesObj(); // create an obj for faster lookup

function getSeqLength(a, b) {
  let length = 0;
  for (let n = 0; n <= 79; n++) {
    const next = (n * n) + (a * n) + b;
    if (primes[next]) {
      length++;
    } else {
      break;
    }
  }
  return length;
}

export default function euler027() {
  let bestLen = 0;
  let bestProd;
  for (let a = -999; a < 1000; a++) {
    for (let b = -1000; b <= 1000; b ++) {
      const thisLen = getSeqLength(a, b);
      if (thisLen > bestLen) {
        bestLen = thisLen;
        bestProd = a * b;
      }
    }
  }
  return bestProd;
}

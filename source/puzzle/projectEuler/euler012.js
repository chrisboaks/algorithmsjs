// The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

// Let us list the factors of the first seven triangle numbers:

//  1: 1
//  3: 1,3
//  6: 1,2,3,6
// 10: 1,2,5,10
// 15: 1,3,5,15
// 21: 1,3,7,21
// 28: 1,2,4,7,14,28
// We can see that 28 is the first triangle number to have over five divisors.

// What is the value of the first triangle number to have over five hundred divisors?


// SOLUTION NOTES:
// calculating triangle numbers via the code in seq.js is extremely slow for this problem.
// thus, we use the simpler n(n + 1)/2 formula, and, because n and n + 1 are necessarily coprime,
// simply multiply primes(n / 2) * primes(n + 1) if n is even, primes(n) * primes((n + 1) / 2) otherwise
// to get the total number of factors.

import {Factor} from '../../math/factor';
const factors = Factor.totalFactorCount;

const isEven = (x) => x % 2 === 0;

export default function euler012() {
  let triangleFactors;
  let f = 10000;

  do {
    f++;
    if (isEven(f)) {
      triangleFactors = factors(f / 2) * factors(f + 1);
    } else {
      triangleFactors = factors(f) * factors((f + 1) / 2);
    }
  } while (triangleFactors <= 500);

  return f * (f + 1) / 2;
}
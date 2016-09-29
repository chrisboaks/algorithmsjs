// A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

// A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

// As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

// Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.


import {Factor} from '../../math/factor';

const properFactors = Factor.properFactors;

const sum = (a, b) => a + b;

function isAbundant(n) {
  const factors = properFactors(n);
  return factors.reduce(sum) > n;
}

function getAbundants() {
  return new Array(28123)
    .fill(0)
    .map((_, i) => i + 1)
    .filter(isAbundant);
}

export default function euler023() {
  const abundants = getAbundants();
  const isSummable = new Array(28124).fill(false);
  for (let i in abundants) {
    const n = abundants[i];

    let j = i;
    let sum;
    do {
      sum = n + abundants[j];
      isSummable[sum] = true;
      j++;
    } while (sum <= 28123);
  }

  return isSummable
    .map((summable, i) => summable ? 0 : i)
    .reduce(sum);
}

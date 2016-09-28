// Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

// Evaluate the sum of all the amicable numbers under 10000.

import {Factor} from '../../math/factor';

const properFactors = Factor.properFactors;

const sum = (a, b) => a + b;

const isAmicable = new Array(10000).fill(undefined);
isAmicable[0] = false;

function factorSum(n) {
  return properFactors(n)
    .reduce(sum);
}

function handleVal(val) {
  const mate = factorSum(val);
  if (isAmicable[mate] === undefined && mate < 10000) {
    const mateFactorSum = factorSum(mate);
    if (mateFactorSum === val && val !== mate) {
      isAmicable[mate] = true;
      isAmicable[val] = true;
    } else {
      isAmicable[mate] = false;
      isAmicable[val] = false;
    }
  } else {
    isAmicable[val] = false;
  }
}

export default function euler021() {
  for (let n in isAmicable) {
    const int = parseInt(n);
    if (isAmicable[int] === undefined) {
      handleVal(int);
    }
  }

  return isAmicable
    .map((amicable, i) => amicable ? i : 0)
    .reduce(sum);

}

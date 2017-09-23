// The following iterative sequence is defined for the set of positive integers:

// n → n/2 (n is even)
// n → 3n + 1 (n is odd)

// Using the rule above and starting with 13, we generate the following sequence:

// 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
// It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

// Which starting number, under one million, produces the longest chain?

// NOTE: Once the chain starts the terms are allowed to go above one million.

// SOLUTION NOTES
// because storing the exact collatz sequence is unnecessary and expensive,
// we use a modified version of Seq.collatz to memoize the sequence lengths only.

const collatzLength = (function collatzLength() {
  const isEven = n => n % 2 === 0;
  const handleEven = n => n / 2;
  const handleOdd = n => 3 * n + 1;
  const cache = { 1: 1 };
  function fn(n) {
    if (n < 1) {
      throw new Error('invalid index number');
    } else if (cache[n]) {
      return cache[n];
    } else {
      const nextVal = isEven(n) ? handleEven(n) : handleOdd(n);
      const res = 1 + fn(nextVal);
      cache[n] = res;
      return res;
    }
  }
  return fn;
})();

export default function euler014() {
  let bestN;
  let bestLength = 0;
  for (let n = 1; n < 1000000; n++) {
    const thisLength = collatzLength(n);
    if (thisLength > bestLength) {
      bestLength = thisLength;
      bestN = n;
    }
  }
  return bestN;
}

// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
// What is the 10 001st prime number?

import {Seq} from '../../math/seq';
const getPrimes = Seq.primes;

export default function euler007() {
  let max = 100000;
  let primes = getPrimes(max);
  do {
    max += 1000;
    primes = getPrimes(max);
  } while (primes.length < 10001);

  return primes[10000];
}

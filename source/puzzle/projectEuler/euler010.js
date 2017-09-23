// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// Find the sum of all the primes below two million.

import { Seq } from '../../math/seq';

export default function euler010() {
  const primes = Seq.primes(2000000);
  return primes.reduce((prev, curr) => prev + curr);
}

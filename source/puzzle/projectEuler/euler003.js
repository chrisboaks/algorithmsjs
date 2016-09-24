// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?

import {Seq} from '../../math/seq';
const getPrimes = Seq.primes;
const BASE = 600851475143;

export default function euler003() {
  const max = Math.floor(Math.sqrt(BASE));
  const primes = getPrimes(max).reverse();
  return primes.find(p => BASE % p === 0);
}

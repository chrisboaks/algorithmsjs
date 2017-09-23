import { Seq } from './seq';
import arrayFns from '../fn/arrayFns';

const nonTrivialSubgroups = arrayFns.nonTrivialSubgroups;
const unique = arrayFns.unique;
const cache = {};

export class Factor {
  static primeFactorCount(n) {
    const input = n;
    if (n <= 0 || !Number.isInteger(n)) {
      throw new Error('invalid input');
    }
    if (cache[n]) return cache[n];

    const factors = {};
    const possFactors = Seq.primes(n);
    for (const p of possFactors) {
      while (n % p === 0) {
        factors[p] = (factors[p] || 0) + 1;
        n /= p;
      }
    }
    cache[input] = factors;
    return factors;
  }

  static totalFactorCount(n) {
    const primeFactors = Factor.primeFactorCount(n);
    return Object.values(primeFactors)
      .map(n => n + 1)
      .reduce((prev, curr) => prev * curr);
  }

  static primeFactorList(n) {
    const factorCounts = Factor.primeFactorCount(n);
    let list = [];
    for (const val in factorCounts) {
      const count = factorCounts[val];
      const asList = Array(count).fill(parseInt(val));
      list = list.concat(asList);
    }
    return list;
  }

  static properFactors(n) {
    const irreducibleFactors = Factor.primeFactorList(n);
    const factorSubgroups = nonTrivialSubgroups(irreducibleFactors);
    const mult = (a, b) => a * b;
    const factors = factorSubgroups
      .map(factors => factors.reduce(mult))
      .sort((a, b) => a - b)
      .filter(x => x !== n);
    return [1].concat(unique(factors));
  }

  static gcd(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      throw new Error('invalid inputs');
    }
    a = Math.abs(a);
    b = Math.abs(b);

    function euclid(x, y) {
      return y === 0 ? x : euclid(y, x % y);
    }

    return euclid(a, b);
  }

  static lcm(a, b) {
    return Math.abs(a * b) / Factor.gcd(a, b);
  }

  static isCoprime(a, b) {
    return Factor.gcd(a, b) === 1;
  }
}

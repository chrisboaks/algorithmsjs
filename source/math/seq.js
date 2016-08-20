const collatz = (function collatz() {
  const isEven = n => n % 2 === 0;
  const handleEven = n => n / 2;
  const handleOdd = n => 3 * n + 1;
  const cache = {1: [1]};
  function fn(n) {
    if (n < 1) {
      throw new Error('invalid index number');
    } else if (cache[n]) {
      return cache[n];
    } else {
      const nextVal = isEven(n) ? handleEven(n) : handleOdd(n);
      const res = [n].concat(fn(nextVal));
      cache[n] = res;
      return res;
    }
  }
  return fn;
})();

const factorial = (function factorial() {
  const cache = [1];

  function fn(n) {
    if (n < 0) {
      throw new Error('invalid argument');
    } else if (cache[n]) {
      return cache[n];
    } else {
      const prev = fn(n - 1);
      const curr = prev * n;
      cache.push(curr);
      return curr;
    }
  }
  return fn;
})();

const fibonacci = (function fibonacci() {
  const cache = [1, 1];
  function fn(n) {
    if (n < 1) {
      throw new Error('invalid index number');
    } else if (cache[n]) {
      return cache.slice(0, n);
    } else {
      for (let i = cache.length; i < n; i++) {
        cache.push(cache[i - 1] + cache[i - 2]);
      }
      return cache.slice();
    }
  }
  return fn;
})();

const pascal = (function pascal() {
  const cache = [[1]];

  function fn(naturalIndex) {
    const i = naturalIndex - 1;
    if (i < 0) {
      throw new Error('invalid row number');
    } else if (cache[i]) {
      return cache[i];
    } else {
      const prevRow = fn(naturalIndex - 1);
      const thisRow = prevRow
        .map((val, j) => {
          const left = prevRow[j - 1] || 0;
          return left + prevRow[j];
        })
        .concat([1]);
      cache.push(thisRow);
      return thisRow;
    }
  }
  return fn;
})();

const primes = (function primes() {
  let primeCache = [2];

  function getSeq(min, max) {
    const res = [];
    for (let i = min; i <= max; i++) res.push(i);
    return res;
  }

  function fn(limit) {
    const maxPrime = primeCache[primeCache.length - 1];
    if (limit < 0) {
      throw new Error('invalid max number');
    } else if (maxPrime >= limit) {
      return primeCache.filter(p => p <= limit);
    } else {
      let valsToCheck = getSeq(maxPrime + 1, limit);
      const maxDivisor = Math.floor(Math.sqrt(limit));
      const primesToFilterBy = fn(maxDivisor);
      for (const p of primesToFilterBy) {
        valsToCheck = valsToCheck.filter(val => val % p !== 0);
      }
      primeCache = primeCache.concat(valsToCheck);
      return primeCache.slice();
    }
  }
  return fn;
})();

const triangle = (function triangle() {
  const triangleCache = [0];

  function fn(n) {
    if (n < 0) {
      throw new Error('invalid triangular number index');
    } else if (triangleCache[n] !== undefined) {
      return triangleCache[n];
    } else {
      const res = fn(n - 1) + n;
      triangleCache[n] = res;
      return res;
    }
  }
  return fn;
})();

export const Seq = {collatz, factorial, fibonacci, pascal, primes, triangle};

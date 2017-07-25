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

const hilbert = (function hilbert() {
  // standard descriptions of the hibert curve place it in a 1x1 square.
  // this implementation expands outward to preserve precision.
  const cache = { 1: [
    [0, 0], [0, 1], [1, 1], [1, 0]
  ]};

  function next(n, prev) {
    const size = Math.pow(2, n - 1);
    const flip = p => [p[1], p[0]];
    const rotate = p => [-p[0] + size - 1, -p[1] + size - 1];
    const translate = (dx, dy) => p => [p[0] + dx, p[1] + dy];
    const lowerLeft = flip;
    const upperLeft = translate(0, size);
    const upperRight = translate(size, size);
    const lowerRight = p => translate(size, 0)(flip(rotate(p)));

    return [
      prev.map(lowerLeft),
      prev.map(upperLeft),
      prev.map(upperRight),
      prev.map(lowerRight)
    ].reduce((acc, x) => acc.concat(x));
  }

  function fn(n) {
    if (n < 1 || !Number.isInteger(n)) {
      throw new Error('invalid hilbert curve order');
    } else if (cache[n] !== undefined) {
      return cache[n];
    } else {
      const res = next(n, fn(n - 1));
      cache[n] = res;
      return res;
    }
  }

  return fn;
})();

const grayCode = (function grayCode() {
  const cache = { 1: ['0', '1'] };

  function fn(n) {
    if (n < 1 || !Number.isInteger(n)) {
      throw new Error('invalid Gray code bit count');
    } else if (cache[n] !== undefined) {
      return cache[n];
    } else {
      const prev = fn(n - 1);
      const left = prev.map(x => `0${x}`);
      const right = prev.reverse().map(x => `1${x}`);
      const res = left.concat(right);
      cache[n] = res;
      return res;
    }
  }

  return fn;
})();

const partitions = (function partitions() {
  const cache = {0: [[]]};

  function fn(n) {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error('invalid partition count');
    } else if (cache[n] !== undefined) {
      return cache[n];
    } else {
      const rv = [];
      const prev = fn(n - 1).slice();
      prev.forEach(p => {
        const partition = p.slice();
        rv.push([1].concat(partition));
        if (partition.length === 1 || partition[1] > partition[0]) {
          partition[0]++;
          rv.push(partition);
        }
      });
      cache[n] = rv;
      return rv;
    }
  }

  return fn;
})();

function kolakoski(len, digits = [1, 2]) {
  const diffFromNext = (d, i) => d !== looped[i + 1];
  const positiveInt = (d) => Number.isInteger(d) && d > 0;
  const looped = digits.slice().concat([digits[0]]);

  if (!(looped.every(diffFromNext) && digits.every(positiveInt))) {
    throw new Error('invalid kolakoski sequence digits');
  } else if (!positiveInt(len)) {
    throw new Error('invalid kolakoski length');
  }

  const res = [];
  let i = 0;
  const digit = () => digits[i % digits.length];
  while (res.length < len) {
    let next;
    if (res[i] === undefined) {
      next = new Array(digit()).fill(digit());
    } else {
      next = new Array(res[i]).fill(digit());
    }
    res.push(...next);
    i++;
  }
  return res.slice(0, len);
}

function catalan(n) {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('invalid Catalan number index');
  }
  return factorial(2 * n) / (factorial(n + 1) * factorial(n));
}

export const Seq = {
  collatz,
  factorial,
  fibonacci,
  pascal,
  primes,
  triangle,
  hilbert,
  grayCode,
  partitions,
  kolakoski,
  catalan
};

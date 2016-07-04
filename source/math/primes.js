function getSeq(min, max) {
  const res = [];
  for (let i = min; i <= max; i++) {
    res.push(i);
  }
  return res;
}

export const primes = (function primes() {
  let primeCache = [2];
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
      return primeCache;
    }
  }
  return fn;
})();

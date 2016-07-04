export const fibonacci = (function fibonacci() {
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
      return cache;
    }
  }
  return fn;
})();

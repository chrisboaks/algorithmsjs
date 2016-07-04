const isEven = n => n % 2 === 0;
const handleEven = n => n / 2;
const handleOdd = n => 3 * n + 1;

export const collatz = (function collatz() {
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

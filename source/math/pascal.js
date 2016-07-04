export const pascal = (function pascal() {
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

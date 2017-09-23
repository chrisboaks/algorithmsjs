function luhn(ccNum) {
  const digits = String(ccNum)
    .split('')
    .map(x => parseInt(x, 10));

  if (!digits.length || digits.filter(d => Number.isNaN(d)).length) {
    throw new Error('invalid input');
  }

  const luhnSum = digits
    .reverse()
    .map((d, i) => {
      const baseVal = i % 2 ? d * 2 : d;
      return baseVal > 9 ? baseVal - 9 : baseVal;
    })
    .reduce((prev, curr) => prev + curr);

  return luhnSum % 10 === 0;
}

export { luhn };

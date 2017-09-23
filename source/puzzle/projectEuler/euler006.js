// The sum of the squares of the first ten natural numbers is,
// 12 + 22 + ... + 102 = 385
// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)2 = 552 = 3025
// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

function getNaturals(max) {
  let res = [];
  for (let i = 1; i <= max; i++) {
    res.push(i);
  }
  return res;
}

const sumCb = (prev, curr) => prev + curr;

export default function euler006() {
  const naturals = getNaturals(100);

  const sumSquares = naturals.map(x => x * x).reduce(sumCb);

  const sum = naturals.reduce(sumCb);

  return sum * sum - sumSquares;
}

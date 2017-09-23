// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

export default function euler001() {
  return new Array(999)
    .fill(0) // can't map over undefined :(
    .map((_, i) => i + 1)
    .filter(n => n % 3 === 0 || n % 5 === 0)
    .reduce((prev, curr) => prev + curr);
}

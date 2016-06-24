export function getPrimes(max) {
  const maxDivisor = Math.floor(Math.sqrt(max));
  let numbers = [];
  for (let i = 2; i <= max; i++) {
    numbers.push(i);
  }
  let testPrimeIndex = 0;
  let testPrime = numbers[testPrimeIndex];
  while (testPrime <= maxDivisor) {
    numbers = numbers.filter((n, i) => i <= testPrimeIndex || n % testPrime !== 0);
    testPrimeIndex++;
    testPrime = numbers[testPrimeIndex];
  }
  return numbers;
}

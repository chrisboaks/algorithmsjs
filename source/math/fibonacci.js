export function fibonacci(length) {
  const fibs = [1, 1];
  for (let i = 2; i < length; i++) {
    fibs.push(fibs[i - 1] + fibs[i - 2]);
  }
  return fibs;
}

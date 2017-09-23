// A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

// 012   021   102   120   201   210

// What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

import { Seq } from '../../math/seq';

const factorial = Seq.factorial;

// manually finding all permutations and sorting is very slow.
// instead, deduce the digits in order by excluding impossible digits and taking the first possible one.
// e.g., the first digit of the third permutation of (0, 1, 2) could not be 0 because there are 6
// total permutations and those that start with 0, by deduction, take the first 2 spots. therefore,
// 1 is the first digit.
export default function euler024() {
  let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let result = '';
  let remainder = 1000000;

  function getNextDigit() {
    const incrementSize = factorial(digits.length - 1);
    let i = 0;
    while (remainder - incrementSize > 0) {
      remainder -= incrementSize;
      i++;
    }
    return digits[i];
  }

  while (digits.length > 0) {
    const next = getNextDigit();
    result += next;
    digits = digits.filter(d => d !== next);
  }

  return result;
}

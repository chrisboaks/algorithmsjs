// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

import {isPalindrome} from '../string/basics';

// this function tests pairs of numbers as follows:
// beginning at the max allowable square value,
// traverse the multiplication table in lines that
// extend up and to the right. this ensures that the
// first palindromic value found will be the maximum
// possible such value.
// i.e., 10x10, 9x10,
// 9x9, 8x10, 8x9, 7x10
// 8x8, 7x9, 6x10, 7x8, 6x9, 5x10

export default function euler004() {
  let j, k;

  function executeCoreLoop(a, b) {
    while (a >= 100 && b <= 999) {
      if (isPalindrome(`${a * b}`)) {
        return a * b;
      } else {
        a--;
        b++;
      }
    }
  }

  for (let i = 999; i >= 100; i--) {
    let res;

    j = i;
    k = i + 1;

    // note: this will not execute for k = 1000
    res = executeCoreLoop(j, k);
    if (res) return res;

    k = i;
    res = executeCoreLoop(j, k);
    if (res) return res;
  }
}

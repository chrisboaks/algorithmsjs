const assert = require('chai').assert;

import {insertionSort} from '../source/sort/insertionSort';
import {shellSort} from '../source/sort/shellSort';
import {bubbleSort} from '../source/sort/bubbleSort';
import {mergeSort} from '../source/sort/mergeSort';
import {combSort} from '../source/sort/combSort';
import {quickSort} from '../source/sort/quickSort';
import {treeSort} from '../source/sort/treeSort';

import {cocktailShakerSort} from '../source/sort/cocktailShakerSort';

function testSortFunctions(sortFn) {
  // a generic way to test a sorting function

  const BASIC = [7, 1, 4, 5, 9, 3, 2, 8, 10, 6];
  const NEGATIVES = [-3, -4, 0, 4, -1, 5, 2, -2, 1, 3];
  const DUPLICATES = [2, 3, 4, 4, 1, 1, 2, 3, 1, 3];
  const GAPS = [6, 10, 3, 1, 4, 9, 11, 18, 7, 15];
  const LARGE = [  // -49 to 50 inclusive
    -7, 14, -20, 23, -45, -37, -35, -44, -23, 15, 12, 17, 35, -5, 46, 29, 16, -16, 1, 13, 5, -28,
    -11, 41, -19, -15, -49, 9, -32, -34, 10, 30, 36, 6, 42, 39, 34, 25, -13, 50, 2, 4, 37, -9, -22,
    32, 27, -27, 31, -38, 45, -17, -31, 33, 24, -18, 26, -42, -8, 7, 18, -25, -46, -12, 20, -47,
    49, 40, 21, -4, 48, 8, -3, -29, 43, -14, -30, 28, 3, -6, -48, -24, -41, -1, -33, 19, 38, 11, 0,
    -36, 22, -10, -26, -43, 47, -39, 44, -21, -40, -2
  ];

  const sortNumbersCorrectly = (a, b) => a - b;

  function assertSortedInPlace(sortFn, ary) {
    // a sort function should both sort the array in place
    // and return the sorted array
    let unsorted = ary.slice();
    let sorted = ary.slice().sort(sortNumbersCorrectly);
    const rv = sortFn(unsorted);
    assert.deepEqual(rv, sorted);
    assert.deepEqual(unsorted, sorted);
  }

  it('sorts a simple array', function() {
    assertSortedInPlace(sortFn, BASIC);
  });

  it('sorts an array with negatives', function() {
    assertSortedInPlace(sortFn, NEGATIVES);
  });

  it('sorts an array with duplicates', function() {
    assertSortedInPlace(sortFn, DUPLICATES);
  });

  it('sorts an array with gaps', function() {
    assertSortedInPlace(sortFn, GAPS);
  });

  it('sorts a large array', function() {
    assertSortedInPlace(sortFn, LARGE);
  });

  it('handles empty arrays', function() {
    assertSortedInPlace(sortFn, []);
  });

  it('handles single-element arrays', function() {
    assertSortedInPlace(sortFn, [1]);
  });

  it('handles presorted arrays', function() {
    const sorted = BASIC.slice().sort(sortNumbersCorrectly);
    assertSortedInPlace(sortFn, sorted);
  });
}

describe('Sorting Functions', function() {
  describe('Insertion Sort', function() {
    testSortFunctions(insertionSort);
  });
  describe('Shell Sort', function() {
    testSortFunctions(shellSort);
  });
  describe('Bubble Sort', function() {
    testSortFunctions(bubbleSort);
  });
  describe('Merge Sort', function() {
    testSortFunctions(mergeSort);
  });
  describe('Comb Sort', function() {
    testSortFunctions(combSort);
  });
  describe('Quick Sort', function() {
    testSortFunctions(quickSort);
  });
  describe('Tree Sort', function() {
    testSortFunctions(treeSort);
  });
  describe('Cocktail Shaker Sort', function() {
    testSortFunctions(cocktailShakerSort);
  });
});


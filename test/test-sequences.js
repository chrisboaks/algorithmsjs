const assert = require('chai').assert;

import {collatz, fibonacci, pascal, primes} from '../source/math/sequences';

describe('sequences', function() {
  describe ('collatz', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        collatz(0);
      }, 'invalid index number');
      assert.doesNotThrow(function() {
        collatz(1);
      });
    });
    it("calculates rows of pascal's triangle", function() {
      const expectedSeven = [ 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1 ];
      const expectedSeventeen = [ 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1 ];
      assert.deepEqual(collatz(7), expectedSeven);
      assert.deepEqual(collatz(17), expectedSeventeen);
    });
  });

  describe ('fibonacci', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        fibonacci(0);
      }, 'invalid index number');
      assert.doesNotThrow(function() {
        fibonacci(1);
      });
    });
    it('calculates values of the fibonacci sequence', function() {
      const expectedSeven = [ 1, 1, 2, 3, 5, 8, 13 ];
      const expectedTen = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ];
      assert.deepEqual(fibonacci(7), expectedSeven);
      assert.deepEqual(fibonacci(10), expectedTen);
    });
  });

  describe ('pascal', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        pascal(0);
      }, 'invalid row number');
      assert.doesNotThrow(function() {
        pascal(1);
      });
    });
    it("calculates rows of pascal's triangle", function() {
      const expectedRowFive = [1, 4, 6, 4, 1];
      const expectedRowTen = [1, 9, 36, 84, 126, 126, 84, 36, 9, 1];
      assert.deepEqual(pascal(5), expectedRowFive);
      assert.deepEqual(pascal(10), expectedRowTen);
    });
  });

  describe ('primes', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        primes(-1);
      }, 'invalid max number');
      assert.doesNotThrow(function() {
        primes(0);
        primes(16);
      });
    });
    it('finds primes less than the given limit', function() {
      const expectedTen = [ 2, 3, 5, 7 ];
      const expectedHundred = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ];
      const expectedTwenty = [ 2, 3, 5, 7, 11, 13, 17, 19 ];
      assert.deepEqual(primes(10), expectedTen);
      assert.deepEqual(primes(100), expectedHundred);
      assert.deepEqual(primes(20), expectedTwenty);
    });
  });
});

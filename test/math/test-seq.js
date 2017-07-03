const assert = require('chai').assert;

import {Seq} from '../../source/math/seq';

describe('sequences', function() {
  describe('collatz', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        Seq.collatz(0);
      }, 'invalid index number');
      assert.doesNotThrow(function() {
        Seq.collatz(1);
      });
    });
    it('calculates collatz sequences', function() {
      const expectedSeven = [ 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1 ];
      const expectedSeventeen = [ 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1 ];
      assert.deepEqual(Seq.collatz(7), expectedSeven);
      assert.deepEqual(Seq.collatz(17), expectedSeventeen);
    });
  });

  describe('factorial', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        Seq.factorial(-1);
      }, 'invalid argument');
      assert.doesNotThrow(function() {
        Seq.factorial(0);
      });
    });
    it('calculates factorials', function() {
      assert.deepEqual(Seq.factorial(5), 5 * 4 * 3 * 2 * 1);
      assert.deepEqual(Seq.factorial(7), 7 * 6 * 5 * 4 * 3 * 2 * 1);
    });
  });

  describe('fibonacci', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        Seq.fibonacci(0);
      }, 'invalid index number');
      assert.doesNotThrow(function() {
        Seq.fibonacci(1);
      });
    });
    it('calculates values of the fibonacci sequence', function() {
      const expectedSeven = [ 1, 1, 2, 3, 5, 8, 13 ];
      const expectedTen = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ];
      assert.deepEqual(Seq.fibonacci(7), expectedSeven);
      assert.deepEqual(Seq.fibonacci(10), expectedTen);
    });
  });

  describe('pascal', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        Seq.pascal(0);
      }, 'invalid row number');
      assert.doesNotThrow(function() {
        Seq.pascal(1);
      });
    });
    it("calculates rows of pascal's triangle", function() {
      const expectedRowFive = [1, 4, 6, 4, 1];
      const expectedRowTen = [1, 9, 36, 84, 126, 126, 84, 36, 9, 1];
      assert.deepEqual(Seq.pascal(5), expectedRowFive);
      assert.deepEqual(Seq.pascal(10), expectedRowTen);
    });
  });

  describe('primes', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        Seq.primes(-1);
      }, 'invalid max number');
      assert.doesNotThrow(function() {
        Seq.primes(0);
        Seq.primes(16);
      });
    });
    it('finds primes less than the given limit', function() {
      const expectedTen = [ 2, 3, 5, 7 ];
      const expectedHundred = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ];
      const expectedTwenty = [ 2, 3, 5, 7, 11, 13, 17, 19 ];
      assert.deepEqual(Seq.primes(10), expectedTen);
      assert.deepEqual(Seq.primes(100), expectedHundred);
      assert.deepEqual(Seq.primes(20), expectedTwenty);
    });
  });

  describe('triangle', function() {
    it('throws an error for invalid indices', function() {
      assert.throws(function() {
        Seq.triangle(-1);
      }, 'invalid triangular number index');
      assert.doesNotThrow(function() {
        Seq.triangle(0);
        Seq.triangle(16);
      });
    });
    it('finds triangle numbers less than the given limit', function() {
      const expectedSix = 21;
      const expectedTen = 55;
      const expectedFourteen = 105;
      assert.deepEqual(Seq.triangle(6), expectedSix);
      assert.deepEqual(Seq.triangle(10), expectedTen);
      assert.deepEqual(Seq.triangle(14), expectedFourteen);
    });
  });

  describe('hilbert', function() {
    const hilbert = Seq.hilbert;

    function oneAway(p1, i, ary) {
      if (i === ary.length - 1) {
        return true;
      } else {
        const p2 = ary[i + 1];
        const d = Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
        return d === 1;
      }
    }

    it('throws an error for invalid indices', function() {
      const msg = 'invalid hilbert curve order';
      assert.throws(() => hilbert(0), msg);
      assert.throws(() => hilbert(-1), msg);
      assert.throws(() => hilbert(1.5), msg);
    });

    it('produces valid hilbert curve sequences for n = 1', function() {
      const h1 = hilbert(1);
      assert.equal(h1.length, 4);
      assert.deepEqual(h1[0], [0, 0]);
      assert.deepEqual(h1[3], [1, 0]);
      assert.isTrue(h1.every(oneAway));
    });

    it('produces valid hilbert curve sequences for n = 3', function() {
      const h3 = hilbert(3);
      assert.equal(h3.length, 64);
      assert.deepEqual(h3[0], [0, 0]);
      assert.deepEqual(h3[63], [7, 0]);
      assert.isTrue(h3.every(oneAway));
    });

    it('produces valid hilbert curve sequences for n = 4', function() {
      const h4 = hilbert(4);
      assert.equal(h4.length, 256);
      assert.deepEqual(h4[0], [0, 0]);
      assert.deepEqual(h4[255], [15, 0]);
      assert.isTrue(h4.every(oneAway));
    });

  });

});

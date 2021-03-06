const assert = require('chai').assert;

import { Seq } from '../seq';

describe('sequences', () => {
  const ackermann = Seq.ackermann;

  describe('ackermann', () => {
    it('throws an error for invalid args', () => {
      const msg = 'invalid argument(s)';
      assert.throws(() => {
        ackermann(0);
      }, msg);
      assert.throws(() => {
        ackermann(5, 'string');
      }, msg);
      assert.throws(() => {
        ackermann('string', 5);
      }, msg);
      assert.throws(() => {
        ackermann(5, undefined);
      }, msg);
    });

    it('returns correct values when m = 0', () => {
      assert.equal(ackermann(0, 3), 4);
      assert.equal(ackermann(0, 6), 7);
      assert.equal(ackermann(0, 10), 11);
    });

    it('returns correct values when m > 0, n = 0', () => {
      assert.equal(ackermann(2, 0), 3);
      assert.equal(ackermann(3, 0), 5);
      assert.equal(ackermann(4, 0), 13);
    });

    it('returns correct values when m > 0, n > 0', () => {
      assert.equal(ackermann(3, 2), 29);
      assert.equal(ackermann(3, 3), 61);
      assert.equal(ackermann(3, 4), 125);
    });
  });

  describe('collatz', () => {
    it('throws an error for invalid indices', () => {
      assert.throws(() => {
        Seq.collatz(0);
      }, 'invalid index number');
      assert.doesNotThrow(() => {
        Seq.collatz(1);
      });
    });

    it('calculates collatz sequences', () => {
      // prettier-ignore
      const expectedSeven = [ 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1 ];
      // prettier-ignore
      const expectedSeventeen = [ 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1 ];
      assert.deepEqual(Seq.collatz(7), expectedSeven);
      assert.deepEqual(Seq.collatz(17), expectedSeventeen);
    });
  });

  describe('factorial', () => {
    it('throws an error for invalid indices', () => {
      assert.throws(() => {
        Seq.factorial(-1);
      }, 'invalid argument');
      assert.doesNotThrow(() => {
        Seq.factorial(0);
      });
    });

    it('calculates factorials', () => {
      assert.deepEqual(Seq.factorial(5), 5 * 4 * 3 * 2 * 1);
      assert.deepEqual(Seq.factorial(7), 7 * 6 * 5 * 4 * 3 * 2 * 1);
    });
  });

  describe('fibonacci', () => {
    it('throws an error for invalid indices', () => {
      assert.throws(() => {
        Seq.fibonacci(0);
      }, 'invalid index number');
      assert.doesNotThrow(() => {
        Seq.fibonacci(1);
      });
    });

    it('calculates values of the fibonacci sequence', () => {
      const expectedSeven = [1, 1, 2, 3, 5, 8, 13];
      const expectedTen = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
      assert.deepEqual(Seq.fibonacci(7), expectedSeven);
      assert.deepEqual(Seq.fibonacci(10), expectedTen);
    });
  });

  describe('pascal', () => {
    it('throws an error for invalid indices', () => {
      assert.throws(() => {
        Seq.pascal(0);
      }, 'invalid row number');
      assert.doesNotThrow(() => {
        Seq.pascal(1);
      });
    });

    it("calculates rows of pascal's triangle", () => {
      const expectedRowFive = [1, 4, 6, 4, 1];
      const expectedRowTen = [1, 9, 36, 84, 126, 126, 84, 36, 9, 1];
      assert.deepEqual(Seq.pascal(5), expectedRowFive);
      assert.deepEqual(Seq.pascal(10), expectedRowTen);
    });
  });

  describe('primes', () => {
    it('throws an error for invalid indices', () => {
      assert.throws(() => {
        Seq.primes(-1);
      }, 'invalid max number');
      assert.doesNotThrow(() => {
        Seq.primes(0);
        Seq.primes(16);
      });
    });

    it('finds primes less than the given limit', () => {
      const expectedTen = [2, 3, 5, 7];
      // prettier-ignore
      const expectedHundred = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ];
      const expectedTwenty = [2, 3, 5, 7, 11, 13, 17, 19];
      assert.deepEqual(Seq.primes(10), expectedTen);
      assert.deepEqual(Seq.primes(100), expectedHundred);
      assert.deepEqual(Seq.primes(20), expectedTwenty);
    });
  });

  describe('triangle', () => {
    it('throws an error for invalid indices', () => {
      assert.throws(() => {
        Seq.triangle(-1);
      }, 'invalid triangular number index');
      assert.doesNotThrow(() => {
        Seq.triangle(0);
        Seq.triangle(16);
      });
    });

    it('finds triangle numbers less than the given limit', () => {
      const expectedSix = 21;
      const expectedTen = 55;
      const expectedFourteen = 105;
      assert.deepEqual(Seq.triangle(6), expectedSix);
      assert.deepEqual(Seq.triangle(10), expectedTen);
      assert.deepEqual(Seq.triangle(14), expectedFourteen);
    });
  });

  describe('hilbert', () => {
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

    it('throws an error for invalid indices', () => {
      const msg = 'invalid hilbert curve order';
      assert.throws(() => hilbert(0), msg);
      assert.throws(() => hilbert(-1), msg);
      assert.throws(() => hilbert(1.5), msg);
    });

    it('produces valid hilbert curve sequences for n = 1', () => {
      const h1 = hilbert(1);
      assert.equal(h1.length, 4);
      assert.deepEqual(h1[0], [0, 0]);
      assert.deepEqual(h1[3], [1, 0]);
      assert.isTrue(h1.every(oneAway));
    });

    it('produces valid hilbert curve sequences for n = 3', () => {
      const h3 = hilbert(3);
      assert.equal(h3.length, 64);
      assert.deepEqual(h3[0], [0, 0]);
      assert.deepEqual(h3[63], [7, 0]);
      assert.isTrue(h3.every(oneAway));
    });

    it('produces valid hilbert curve sequences for n = 4', () => {
      const h4 = hilbert(4);
      assert.equal(h4.length, 256);
      assert.deepEqual(h4[0], [0, 0]);
      assert.deepEqual(h4[255], [15, 0]);
      assert.isTrue(h4.every(oneAway));
    });
  });

  describe('grayCode', () => {
    const grayCode = Seq.grayCode;

    function singleBitDifference(x, i, ary) {
      if (i === ary.length - 1) {
        return true;
      } else {
        const y = ary[i + 1];
        const diff = parseInt(x, 2) ^ parseInt(y, 2);
        return Number.isInteger(Math.log2(diff));
      }
    }

    it('throws an error for invalid bit count', () => {
      const msg = 'invalid Gray code bit count';
      assert.throws(() => grayCode(0), msg);
      assert.throws(() => grayCode(-1), msg);
      assert.throws(() => grayCode(1.5), msg);
    });

    it('produces valid gray codes for n = 1', () => {
      const gray = grayCode(1);
      assert.equal(gray.length, 2);
      assert.equal(parseInt(gray[0], 2), 0);
      assert.equal(parseInt(gray[1], 2), 1);
      assert.isTrue(gray.every(singleBitDifference));
    });

    it('produces valid gray codes for n = 5', () => {
      const gray = grayCode(5);
      assert.equal(gray.length, 32);
      assert.equal(parseInt(gray[0], 2), 0);
      assert.equal(parseInt(gray[31], 2), 16);
      assert.isTrue(gray.every(singleBitDifference));
    });

    it('produces valid gray codes for n = 8', () => {
      const gray = grayCode(8);
      assert.equal(gray.length, 256);
      assert.equal(parseInt(gray[0], 2), 0);
      assert.equal(parseInt(gray[255], 2), 128);
      assert.isTrue(gray.every(singleBitDifference));
    });
  });

  describe('partitions', () => {
    const partitions = Seq.partitions;

    it('throws an error for non-natural numbers', () => {
      const msg = 'invalid partition count';
      assert.throws(() => partitions(-1), msg);
      assert.throws(() => partitions(1.5), msg);
    });

    it('finds partitions when n = 0', () => {
      assert.sameDeepMembers(partitions(0), [[]]);
    });

    it('finds partitions when n = 1', () => {
      assert.sameDeepMembers(partitions(1), [[1]]);
    });

    it('finds partitions when n = 2', () => {
      assert.sameDeepMembers(partitions(2), [[1, 1], [2]]);
    });

    it('finds partitions when n = 3', () => {
      assert.sameDeepMembers(partitions(3), [[1, 1, 1], [1, 2], [3]]);
    });

    it('finds partitions when n = 7', () => {
      assert.sameDeepMembers(partitions(7), [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 2],
        [1, 1, 1, 2, 2],
        [1, 2, 2, 2],
        [1, 1, 1, 1, 3],
        [1, 1, 2, 3],
        [2, 2, 3],
        [1, 3, 3],
        [1, 1, 1, 4],
        [1, 2, 4],
        [3, 4],
        [1, 1, 5],
        [2, 5],
        [1, 6],
        [7]
      ]);
    });
  });

  describe('kolakoski', () => {
    const kolakoski = Seq.kolakoski;
    // prettier-ignore
    const expected = {
      '1,2': [1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2],
      '1,3': [1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 1, 3, 3, 3, 1, 1, 1, 3, 3],
      '2,3': [2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 2, 2, 3, 3, 2],
      '1,2,3': [1, 2, 2, 3, 3, 1, 1, 1, 2, 2, 2, 3, 1, 2, 3, 3, 1, 1, 2, 2, 3, 3, 3, 1, 2, 2, 3, 3, 3, 1, 1, 1, 2, 3, 1, 1, 2, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3, 1, 1, 2, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3, 1, 2, 3, 3, 1, 1, 1, 2, 3, 1, 1, 2, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3, 1, 2, 3, 3, 1, 1, 2, 2, 3, 3, 3, 1, 2, 3, 3, 1, 1, 2, 2, 2]
    };

    it('throws for bad digits', () => {
      const msg = 'invalid kolakoski sequence digits';
      assert.throws(() => kolakoski(1, [1, 2, 3, 4.5]), msg);
      assert.throws(() => kolakoski(1, [1, 2, 3, -2]), msg);
      assert.throws(() => kolakoski(1, [1, 2, 2, 3]), msg);
      assert.throws(() => kolakoski(1, [1, 2, 3, 1]), msg);
    });

    it('throws for bad len values', () => {
      const msg = 'invalid kolakoski length';
      assert.throws(() => kolakoski(0), msg);
      assert.throws(() => kolakoski(0.1), msg);
      assert.throws(() => kolakoski(-3), msg);
    });

    it('generates the standard sequence by default', () => {
      assert.deepEqual(kolakoski(100), expected['1,2'].slice(0, 100));
    });

    it('generates a valid sequence for [1, 3]', () => {
      const res = kolakoski(100, [1, 3]);
      assert.deepEqual(res, expected['1,3'].slice(0, 100));
    });

    it('generates a valid sequence for [2, 3]', () => {
      const res = kolakoski(100, [2, 3]);
      assert.deepEqual(res, expected['2,3'].slice(0, 100));
    });

    it('generates a valid sequence for [1, 2, 3]', () => {
      const res = kolakoski(100, [1, 2, 3]);
      assert.deepEqual(res, expected['1,2,3'].slice(0, 100));
    });
  });

  describe('catalan', () => {
    const catalan = Seq.catalan;
    // prettier-ignore
    const expected = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786, 208012, 742900, 2674440, 9694845, 35357670, 129644790, 477638700, 1767263190, 6564120420, 24466267020, 91482563640, 343059613650, 1289904147324, 4861946401452];

    it('throws an error for an invalid index', () => {
      const msg = 'invalid Catalan number index';
      assert.throws(() => catalan('three'), msg);
      assert.throws(() => catalan(-1), msg);
      assert.throws(() => catalan(1.5), msg);
    });

    it('produces catalan numbers', () => {
      assert.equal(catalan(0), expected[0]);
      assert.equal(catalan(3), expected[3]);
      assert.equal(catalan(6), expected[6]);
      assert.equal(catalan(11), expected[11]);
    });
  });
});

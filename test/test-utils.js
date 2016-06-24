const assert = require('chai').assert;

import {maxOf, minOf, minMaxOf} from '../source/utils/extrema';

const BASIC = [7, 1, 4, 5, 9, 3, 2, 8, 10, 6];
const NEGATIVES = [-3, -4, 0, 4, -1, 5, 2, -2, 1, 3];
const DUPLICATES = [2, 3, 4, 4, 1, 1, 2, 3, 1, 3];
const GAPS = [6, 10, 3, 1, 4, 9, 11, 18, 7, 15];

describe('Utility Functions', function() {
  describe('#maxOf()', function() {
    it("doesn't mutate input arrays", function() {
      const basicCopy1 = BASIC.slice();
      const basicCopy2 = BASIC.slice();
      maxOf(basicCopy1);
      assert.deepEqual(basicCopy1, basicCopy2);
    });

    it('handles a simple array', function() {
      assert.equal(maxOf(BASIC), 10);
    });

    it('handles an array with negatives', function() {
      assert.equal(maxOf(NEGATIVES), 5);
    });

    it('handles an array with duplicates', function() {
      assert.equal(maxOf(DUPLICATES), 4);
    });

    it('handles an array with gaps', function() {
      assert.equal(maxOf(GAPS), 18);
    });

    it('handles empty arrays', function() {
      assert.isNull(maxOf([]));
    });

    it('handles single-element arrays', function() {
      assert.equal(maxOf([1]), 1);
    });
  });

  describe('#minOf()', function() {
    it("doesn't mutate input arrays", function() {
      const basicCopy1 = BASIC.slice();
      const basicCopy2 = BASIC.slice();
      minOf(basicCopy1);
      assert.deepEqual(basicCopy1, basicCopy2);
    });

    it('handles a simple array', function() {
      assert.equal(minOf(BASIC), 1);
    });

    it('handles an array with negatives', function() {
      assert.equal(minOf(NEGATIVES), -4);
    });

    it('handles an array with duplicates', function() {
      assert.equal(minOf(DUPLICATES), 1);
    });

    it('handles an array with gaps', function() {
      assert.equal(minOf(GAPS), 1);
    });

    it('handles empty arrays', function() {
      assert.isNull(minOf([]));
    });

    it('handles single-element arrays', function() {
      assert.equal(minOf([1]), 1);
    });
  });

  describe('minMaxOf()', function() {
    it("doesn't mutate input arrays", function() {
      const basicCopy1 = BASIC.slice();
      const basicCopy2 = BASIC.slice();
      minMaxOf(basicCopy1);
      assert.deepEqual(basicCopy1, basicCopy2);
    });

    it('handles a simple array', function() {
      assert.deepEqual(minMaxOf(BASIC), [1, 10]);
    });

    it('handles odd and even sized arrays', function() {
      const otherParity = BASIC.slice();
      otherParity.push(3);
      assert.deepEqual(minMaxOf(otherParity), [1, 10]);
    });

    it('handles an array with negatives', function() {
      assert.deepEqual(minMaxOf(NEGATIVES), [-4, 5]);
    });

    it('handles an array with duplicates', function() {
      assert.deepEqual(minMaxOf(DUPLICATES), [1, 4]);
    });

    it('handles an array with gaps', function() {
      assert.deepEqual(minMaxOf(GAPS), [1, 18]);
    });

    it('handles empty arrays', function() {
      assert.deepEqual(minMaxOf([]), [null, null]);
    });

    it('handles single-element arrays', function() {
      assert.deepEqual(minMaxOf([1]), [1, 1]);
    });

  });
});

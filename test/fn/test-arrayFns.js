const assert = require('chai').assert;

import arrayFns from '../../source/fn/arrayFns';

describe('arrayFns', function() {
  describe('flatten', function() {
    const flatten = arrayFns.flatten;
    describe('when called without passing `depth`', function() {
      it('does not modify a flat array', function() {
        assert.deepEqual(flatten([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
      });

      it('does not modify an empty array', function() {
        assert.deepEqual(flatten([]), []);
      });

      it('flattens a nested array', function() {
        assert.deepEqual(flatten([1, [2, 3], [4], [5]]), [1, 2, 3, 4, 5]);
      });

      it('flattens a recursively nested array', function() {
        assert.deepEqual(flatten([[1, [2, [3, [4, [5]]]]]]), [1, 2, 3, 4, 5]);
      });

      it('flattens a multiply nested array', function() {
        assert.deepEqual(flatten([[[[[1, 2, [3, 4], 5]]]]]), [1, 2, 3, 4, 5]);
      });
    });

    describe('when called passing `depth`', function() {
      it('does not modify the array if depth is <= 0', function() {
        assert.deepEqual(flatten([[[[[1, 2, [3, 4], 5]]]]], 0), [[[[[1, 2, [3, 4], 5]]]]]);
        assert.deepEqual(flatten([[[[[1, 2, [3, 4], 5]]]]], -1), [[[[[1, 2, [3, 4], 5]]]]]);
      });

      it('flattens to the requested depth', function() {
        assert.deepEqual(flatten([1, [2, 3], [[4, 5]]], 1), [1, 2, 3, [4, 5]]);
        assert.deepEqual(flatten([[1, 2, 3, 4, 5]], 1), [1, 2, 3, 4, 5]);
        assert.deepEqual(flatten([1, [2, [3, [4, [5]]]]], 2), [1, 2, 3, [4, [5]]]);
      });

      it('appropriately handles being called with a large depth', function() {
        assert.deepEqual(flatten([1, [2, 3], [[4, 5]]], 50), [1, 2, 3, 4, 5]);
      });
    });
  });

  describe('rotate', function() {
    const rotate = arrayFns.rotate;
    const ary = [1, 2, 3, 4, 5, 6, 7, 8];
    const errMsg = 'invalid input';
    it('throws if the first arg is not an array', function() {
      assert.throws(function() {
        rotate(3, 5);
      }, errMsg);
      assert.throws(function() {
        rotate('string', 5);
      }, errMsg);
      assert.throws(function() {
        rotate();
      }, errMsg);
    });

    it('throws if the second arg is not an integer', function() {
      assert.throws(function() {
        rotate([1, 2, 3], 'three');
      }, errMsg);
      assert.throws(function() {
        rotate([1, 2, 3], 3.14);
      }, errMsg);
      assert.throws(function() {
        rotate([1, 2, 3], null);
      }, errMsg);
    });

    it('returns a copy of the array if n = 0', function() {
      assert.deepEqual(rotate(ary, 0), ary);
    });

    it('defaults to a rotation of 1', function() {
      assert.deepEqual(rotate(ary), [2, 3, 4, 5, 6, 7, 8, 1]);
    });

    it('rotates properly for positive n', function() {
      assert.deepEqual(rotate(ary, 3), [4, 5, 6, 7, 8, 1, 2, 3]);
      assert.deepEqual(rotate(ary, 7), [8, 1, 2, 3, 4, 5, 6, 7]);
    });

    it('rotates properly for negative n', function() {
      assert.deepEqual(rotate(ary, -4), [5, 6, 7, 8, 1, 2, 3, 4]);
      assert.deepEqual(rotate(ary, -5), [4, 5, 6, 7, 8, 1, 2, 3]);
    });

    it('rotates properly for large n', function() {
      assert.deepEqual(rotate(ary, 10), [3, 4, 5, 6, 7, 8, 1, 2]);
      assert.deepEqual(rotate(ary, -11), [6, 7, 8, 1, 2, 3, 4, 5]);
      assert.deepEqual(rotate(ary, 16), ary);
    });
  });

  describe('unique', function() {
    const unique = arrayFns.unique;
    const errMsg = 'invalid input';

    it('throws if the arg is not an array', function() {
      assert.throws(function() {
        unique();
      }, errMsg);
      assert.throws(function() {
        unique(3, 4, 5);
      }, errMsg);
      assert.throws(function() {
        unique('string');
      }, errMsg);
    });

    it('returns the unique items from the array in original order', function() {
      const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8];
      const expected = [3, 1, 4, 5, 9, 2, 6, 8, 7];
      assert.deepEqual(unique(input), expected);
    });
  });

  describe('zip', function() {
    const zip = arrayFns.zip;

    const a = [1, 2, 3, 4];
    const b = [5, 6, 7, 8];
    const c = [9, 10, 11, 12];
    const d = [13, 14];

    it('throws if passed no args or any non-arrays', function() {
      const msg = 'invalid input';

      assert.throws(function() {
        zip();
      }, msg);

      assert.throws(function() {
        zip(a, b, c, 'string');
      }, msg);

      assert.throws(function() {
        zip(null, a, b, c);
      }, msg);

      assert.throws(function() {
        zip(a, b, 3, c, d);
      }, msg);
    });

    it('wraps each element in an array if only one array is passed', function() {
      assert.deepEqual(zip(a), [[1], [2], [3], [4]]);
    });

    it('zips arrays of equal length', function() {
      const expectedAB = [[1, 5], [2, 6], [3, 7], [4, 8]];
      const expectedABC = [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]];
      assert.deepEqual(zip(a, b), expectedAB);
      assert.deepEqual(zip(a, b, c), expectedABC);
    });

    it('inserts nulls if any inputs are shorter than the first array', function() {
      const expectedABD = [[1, 5, 13], [2, 6, 14], [3, 7, null], [4, 8, null]];
      assert.deepEqual(zip(a, b, d), expectedABD);
    });

    it('ignores extra elements if any inputs are longer than the first array', function() {
      const expectedDAB = [[13, 1, 5], [14, 2, 6]];
      assert.deepEqual(zip(d, a, b), expectedDAB);
    });
  });

});
















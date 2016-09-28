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

  describe('flatMap', function() {
    const flatMap = arrayFns.flatMap;
    const noop = () => {};

    it('throws if not passed an array and then a function', function() {
      const errMsg = 'invalid input';

      assert.throws(function() {
        flatMap();
      }, errMsg);
      assert.throws(function() {
        flatMap([], []);
      }, errMsg);
      assert.throws(function() {
        flatMap(noop, noop);
      }, errMsg);
      assert.throws(function() {
        flatMap(noop, []);
      }, errMsg);
      assert.throws(function() {
        flatMap(3, noop);
      }, errMsg);
      assert.throws(function() {
        flatMap([], 3);
      }, errMsg);
      assert.doesNotThrow(function() {
        flatMap([], noop);
      }, errMsg);
    });

    it('handles an empty array', function () {
      assert.deepEqual(flatMap([], noop), []);
    });

    it('flat maps an array using the function', function() {
      const ary = [1, 2, 3];
      const fn = x => [x, x];
      assert.deepEqual(flatMap(ary, fn), [1, 1, 2, 2, 3, 3]);
    });

    it('gracefully handles when the fn does not produce an array', function() {
      const ary = [1, 2, 3];
      const fn = x => x + 1;
      assert.deepEqual(flatMap(ary, fn), [2, 3, 4]);
    });

    it('only flattens one level', function() {
      const ary = [1, 2, 3];
      const fn = x => [[x, x + 1]];
      assert.deepEqual(flatMap(ary, fn) [[1, 2], [2, 3], [3, 4]]);
    });
  });

  describe('groupBy', function() {
    const groupBy = arrayFns.groupBy;
    const noop = () => {};

    it('throws if not passed an array and then a function', function() {
      const errMsg = 'invalid input';

      assert.throws(function() {
        groupBy();
      }, errMsg);
      assert.throws(function() {
        groupBy([], []);
      }, errMsg);
      assert.throws(function() {
        groupBy(noop, noop);
      }, errMsg);
      assert.throws(function() {
        groupBy(noop, []);
      }, errMsg);
      assert.throws(function() {
        groupBy(3, noop);
      }, errMsg);
      assert.throws(function() {
        groupBy([], 3);
      }, errMsg);
      assert.doesNotThrow(function() {
        groupBy([], noop);
      }, errMsg);
    });

    it('groups items by the return value of the fn', function() {
      const items = [0, 1, 2, 6, 7, 8, 9, 10, 11, 12];
      const fn = x => x % 3;

      const result = groupBy(items, fn);
      assert.deepEqual(result.get(0), [0, 6, 9, 12]);
      assert.deepEqual(result.get(1), [1, 7, 10]);
      assert.deepEqual(result.get(2), [2, 8, 11]);
    });

    it('appropriately handles the case where the fn maps to an Object.prototype prop', function() {
      const items = [0, 1, 2, 3];
      const fn = x => x % 2 === 0 ? 'toString' : 'valueOf';
      const result = groupBy(items, fn);
      assert.deepEqual(result.get('toString'), [0, 2]);
      assert.deepEqual(result.get('valueOf'), [1, 3]);
    });

    it('appropriately handles return vals that are == but not ===', function() {
      const items = [0, 1, 2, 3];
      const fn = x => x % 2 === 0 ? '3' : 3;
      const result = groupBy(items, fn);
      assert.deepEqual(result.get('3'), [0, 2]);
      assert.deepEqual(result.get(3), [1, 3]);
    });
  });

  describe('product', function() {
    const product = arrayFns.product;

    it('throws if passed any non-arrays or no args', function() {
      const errMsg = 'invalid input';
      assert.throws(function() {
        product(3);
      }, errMsg);
      assert.throws(function() {
        product([], 3);
      }, errMsg);
      assert.throws(function() {
        product([], 'cat');
      }, errMsg);
      assert.throws(function() {
        product([], [1, 2, 3], [4, 5, 6], 'm');
      }, errMsg);
      assert.throws(function() {
        product();
      }, errMsg);
      assert.doesNotThrow(function() {
        product([], [1, 2, 3], [4, 5, 6]);
      });
      assert.doesNotThrow(function() {
        product([]);
      });
      assert.doesNotThrow(function() {
        product([1, 2, 3]);
      });
    });

    it('returns the product of a single array of elements', function() {
      assert.deepEqual(product([2, 3, 4, 5]), [[2], [3], [4], [5]]);
    });

    it('returns the product of two arrays', function() {
      assert.deepEqual(
        product([2, 3, 4], [5, 6]),
        [[2, 5], [2, 6], [3, 5], [3, 6], [4, 5], [4, 6]]
      );
    });

    it('returns the product of three arrays', function() {
      assert.deepEqual(
        product([1, 2], [3, 4], [5, 6]),
        [[1, 3, 5], [1, 3, 6], [1, 4, 5], [1, 4, 6], [2, 3, 5], [2, 3, 6], [2, 4, 5], [2, 4, 6]]
      );
    });

    it('correctly handles when one array is empty', function() {
      assert.deepEqual(product([1, 2], [3, 4], []), []);
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

  describe('sample', function() {
    const sample = arrayFns.sample;
    const err = 'invalid input';
    it('throws if the arg is not an array', function() {
      assert.throws(function() {
        sample();
      }, err);
      assert.throws(function() {
        sample(3, 4, 5);
      }, err);
      assert.throws(function() {
        sample('string');
      }, err);
    });

    it('samples the items in the array', function() {
      const initial = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      assert.oneOf(sample(initial), initial);
    });
  });

  describe('shuffle', function() {
    const shuffle = arrayFns.shuffle;
    const err = 'invalid input';
    it('throws if the arg is not an array', function() {
      assert.throws(function() {
        shuffle();
      }, err);
      assert.throws(function() {
        shuffle(3, 4, 5);
      }, err);
      assert.throws(function() {
        shuffle('string');
      }, err);
    });

    it('shuffles the items in the array', function() {
      // NOTE: this test is technically non-deterministic
      const initial = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      const shuffleOne = shuffle(initial);
      const shuffleTwo = shuffle(initial);

      assert.sameMembers(shuffleOne, initial);
      assert.sameMembers(shuffleTwo, initial);

      assert.notDeepEqual(initial, shuffleOne);
      assert.notDeepEqual(initial, shuffleTwo);
      assert.notDeepEqual(shuffleOne, shuffleTwo);
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

const assert = require('chai').assert;

import {flatten} from '../../source/fn/flatten';

describe('flatten', function() {
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

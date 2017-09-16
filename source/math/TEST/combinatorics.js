const assert = require('chai').assert;

import {Combinatorics} from '../combinatorics';

describe('Combinatorics', function() {

  describe('Combinatorics.allCombinations', function() {
    it('returns all possible combinations of the given elements', function() {
      assert.sameDeepMembers(Combinatorics.allCombinations([1, 2, 3, 4]), [
        [],
        [1], [2], [3], [4],
        [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4],
        [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4],
        [1, 2, 3, 4]
      ]);
    });

    it('handles 0 elements', function() {
      assert.deepEqual(Combinatorics.allCombinations([]), [[]]);
    });

    it('handles 1 element', function() {
      assert.sameDeepMembers(Combinatorics.allCombinations([1]), [ [1], [] ]);
    });
  });

  describe('Combinatorics.allPermutations', function() {
    it('returns all possible permutations of the given elements', function() {
      assert.sameDeepMembers(Combinatorics.allPermutations([1, 2, 3, 4]), [
        [ 1, 2, 3, 4 ], [ 1, 2, 4, 3 ], [ 1, 3, 2, 4 ], [ 1, 3, 4, 2 ], [ 1, 4, 2, 3 ], [ 1, 4, 3, 2 ],
        [ 2, 1, 3, 4 ], [ 2, 1, 4, 3 ], [ 2, 3, 1, 4 ], [ 2, 3, 4, 1 ], [ 2, 4, 1, 3 ], [ 2, 4, 3, 1 ],
        [ 3, 1, 2, 4 ], [ 3, 1, 4, 2 ], [ 3, 2, 1, 4 ], [ 3, 2, 4, 1 ], [ 3, 4, 1, 2 ], [ 3, 4, 2, 1 ],
        [ 4, 1, 2, 3 ], [ 4, 1, 3, 2 ], [ 4, 2, 1, 3 ], [ 4, 2, 3, 1 ], [ 4, 3, 1, 2 ], [ 4, 3, 2, 1 ]
      ]);
    });

    it('handles 0 elements', function() {
      assert.deepEqual(Combinatorics.allPermutations([]), [[]]);
    });

    it('handles 1 element', function() {
      assert.deepEqual(Combinatorics.allPermutations([1]), [[1]]);
    });
  });

  describe('Combinatorics.numPermutations', function() {
    it('throws if passed invalid args', function() {
      assert.throws(function() {
        Combinatorics.numPermutations(5, 6);
      }, 'invalid arguments');
      assert.throws(function() {
        Combinatorics.numPermutations(5, 0);
      }, 'invalid arguments');
      assert.doesNotThrow(function() {
        Combinatorics.numPermutations(5, 4);
      });
    });

    it('counts permutations', function() {
      assert.equal(Combinatorics.numPermutations(10, 3), 720);
      assert.equal(Combinatorics.numPermutations(8, 3), 336);
    });
  });

  describe('Combinatorics.numCombinations', function() {
    it('throws if passed invalid args', function() {
      assert.throws(function() {
        Combinatorics.numCombinations(5, 6);
      });
      assert.throws(function() {
        Combinatorics.numCombinations(5, 0);
      });
      assert.doesNotThrow(function() {
        Combinatorics.numCombinations(5, 4);
      });
    });

    it('counts combinations', function() {
      assert.equal(Combinatorics.numCombinations(10, 3), 120);
      assert.equal(Combinatorics.numCombinations(8, 3), 56);
    });
  });

});

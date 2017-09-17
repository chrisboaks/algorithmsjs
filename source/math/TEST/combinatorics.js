const assert = require('chai').assert;

import {Combinatorics} from '../combinatorics';

describe('Combinatorics', () => {

  describe('Combinatorics.allCombinations', () => {
    it('returns all possible combinations of the given elements', () => {
      assert.sameDeepMembers(Combinatorics.allCombinations([1, 2, 3, 4]), [
        [],
        [1], [2], [3], [4],
        [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4],
        [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4],
        [1, 2, 3, 4]
      ]);
    });

    it('handles 0 elements', () => {
      assert.deepEqual(Combinatorics.allCombinations([]), [[]]);
    });

    it('handles 1 element', () => {
      assert.sameDeepMembers(Combinatorics.allCombinations([1]), [ [1], [] ]);
    });
  });

  describe('Combinatorics.allPermutations', () => {
    it('returns all possible permutations of the given elements', () => {
      assert.sameDeepMembers(Combinatorics.allPermutations([1, 2, 3, 4]), [
        [ 1, 2, 3, 4 ], [ 1, 2, 4, 3 ], [ 1, 3, 2, 4 ], [ 1, 3, 4, 2 ], [ 1, 4, 2, 3 ], [ 1, 4, 3, 2 ],
        [ 2, 1, 3, 4 ], [ 2, 1, 4, 3 ], [ 2, 3, 1, 4 ], [ 2, 3, 4, 1 ], [ 2, 4, 1, 3 ], [ 2, 4, 3, 1 ],
        [ 3, 1, 2, 4 ], [ 3, 1, 4, 2 ], [ 3, 2, 1, 4 ], [ 3, 2, 4, 1 ], [ 3, 4, 1, 2 ], [ 3, 4, 2, 1 ],
        [ 4, 1, 2, 3 ], [ 4, 1, 3, 2 ], [ 4, 2, 1, 3 ], [ 4, 2, 3, 1 ], [ 4, 3, 1, 2 ], [ 4, 3, 2, 1 ]
      ]);
    });

    it('handles 0 elements', () => {
      assert.deepEqual(Combinatorics.allPermutations([]), [[]]);
    });

    it('handles 1 element', () => {
      assert.deepEqual(Combinatorics.allPermutations([1]), [[1]]);
    });
  });

  describe('Combinatorics.numPermutations', () => {
    it('throws if passed invalid args', () => {
      assert.throws(() => {
        Combinatorics.numPermutations(5, 6);
      }, 'invalid arguments');
      assert.throws(() => {
        Combinatorics.numPermutations(5, 0);
      }, 'invalid arguments');
      assert.doesNotThrow(() => {
        Combinatorics.numPermutations(5, 4);
      });
    });

    it('counts permutations', () => {
      assert.equal(Combinatorics.numPermutations(10, 3), 720);
      assert.equal(Combinatorics.numPermutations(8, 3), 336);
    });
  });

  describe('Combinatorics.numCombinations', () => {
    it('throws if passed invalid args', () => {
      assert.throws(() => {
        Combinatorics.numCombinations(5, 6);
      });
      assert.throws(() => {
        Combinatorics.numCombinations(5, 0);
      });
      assert.doesNotThrow(() => {
        Combinatorics.numCombinations(5, 4);
      });
    });

    it('counts combinations', () => {
      assert.equal(Combinatorics.numCombinations(10, 3), 120);
      assert.equal(Combinatorics.numCombinations(8, 3), 56);
    });
  });

});

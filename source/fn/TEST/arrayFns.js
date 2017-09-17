const assert = require('chai').assert;

import arrayFns from '../arrayFns';

describe('arrayFns', function() {
  describe('chunk', function() {
    const chunk = arrayFns.chunk;
    describe('it throws unless passed an array and an optional positive integer', function() {
      const msg = 'invalid input';
      assert.throws(function() {
        chunk();
      }, msg);
      assert.throws(function() {
        chunk('cat');
      }, msg);
      assert.throws(function() {
        chunk(4);
      }, msg);
      assert.throws(function() {
        chunk([], 'cat');
      }, msg);
      assert.throws(function() {
        chunk([], 0);
      }, msg);
      assert.throws(function() {
        chunk([], -5);
      }, msg);
    });

    it('does not modify the original array', function() {
      const original = [1, 2, 3, 4, 5];
      chunk(original);
      assert.deepEqual(original, [1, 2, 3, 4, 5]);
    });

    it('defaults to size = 1', function() {
      assert.deepEqual(chunk([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]]);
    });

    it('chunks to the requested size', function() {
      assert.deepEqual(chunk([6, 5, 4, 3, 2, 1], 3), [[6, 5, 4], [3, 2, 1]]);
      assert.deepEqual(chunk([6, 5, 4, 3, 2, 1], 2), [[6, 5], [4, 3], [2, 1]]);
    });

    it('defaults to size = 1', function() {
      assert.deepEqual(chunk([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]]);
    });

    it('returns any remainder in the last array', function() {
      assert.deepEqual(chunk([1, 2, 3, 4, 5], 3), [[1, 2, 3], [4, 5]]);
    });
  });

  describe('difference', function() {
    const difference = arrayFns.difference;
    describe('it throws unless passed an array and an optional second array', function() {
      const msg = 'invalid input';
      assert.throws(function() {
        difference();
      }, msg);
      assert.throws(function() {
        difference('cat');
      }, msg);
      assert.throws(function() {
        difference(4);
      }, msg);
      assert.throws(function() {
        difference([], 'cat');
      }, msg);
      assert.throws(function() {
        difference([], 3);
      }, msg);
    });

    it('does not modify the original array', function() {
      const original = [1, 2, 3, 4, 5];
      difference(original, [3, 4]);
      assert.deepEqual(original, [1, 2, 3, 4, 5]);
    });

    it('defaults to exclusions = []', function() {
      assert.deepEqual(difference([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
    });

    it('removes from the first array any items in the second', function() {
      assert.deepEqual(difference([6, 5, 4, 3, 2, 1], [4]), [6, 5, 3, 2, 1]);
      assert.deepEqual(difference([6, 5, 4, 3, 2, 1], [4, 2]), [6, 5, 3, 1]);
    });

    it('removes all instances of excluded items', function() {
      assert.deepEqual(difference([1, 1, 2, 1, 2, 3], [1]), [2, 2, 3]);
    });

    it('gracefully handles exclusions that are not in the original', function() {
      assert.deepEqual(difference([1, 2, 3, 4, 5], [2, 6]), [1, 3, 4, 5]);
    });
  });

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

  describe('nonTrivialSubgroups', function() {
    const nonTrivialSubgroups = arrayFns.nonTrivialSubgroups;
    const err = 'invalid input';
    it('throws if the arg is not an array', function() {
      assert.throws(function() {
        nonTrivialSubgroups();
      }, err);
      assert.throws(function() {
        nonTrivialSubgroups(3, 4, 5);
      }, err);
      assert.throws(function() {
        nonTrivialSubgroups('string');
      }, err);
    });

    it('returns no nonTrivialSubgroups for an empty array', function() {
      assert.deepEqual(nonTrivialSubgroups([]), []);
    });

    it('returns all non-trivial nonTrivialSubgroups of a non-empty array', function() {
      const input = [1, 2, 3];
      const expected = [
        [1], [2], [3],
        [1, 2], [1, 3], [2, 3]
      ];
      assert.sameDeepMembers(nonTrivialSubgroups(input), expected);
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

  describe('sameMembers', function() {
    const sameMembers = arrayFns.sameMembers;
    const err = 'invalid input';
    it('throws if the args are not all arrays', function() {
      assert.throws(function() {
        sameMembers();
      }, err);
      assert.throws(function() {
        sameMembers(3);
      }, err);
      assert.throws(function() {
        sameMembers('string');
      }, err);
      assert.throws(function() {
        sameMembers([], {}, []);
      }, err);
      assert.throws(function() {
        sameMembers([], 3, [], [1, 2, 3]);
      }, err);
      assert.throws(function() {
        sameMembers([], 'string', []);
      }, err);
      assert.doesNotThrow(function() {
        sameMembers([], [], []);
      });
    });

    it('does not modify the inputs', function() {
      const a = [3, 1, 4, 1, 5, 9, 2, 6];
      const copy = a.slice();

      sameMembers(a);
      assert.sameDeepMembers(a, copy);
    });

    it('returns true if one array is passed', function() {
      assert.isTrue(sameMembers([1, 2]));
    });

    it('returns true if arrays with the same members are passed', function() {
      assert.isTrue(sameMembers([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]));
      assert.isTrue(sameMembers(
        ['apple', 'bat', 'cat', 'dog', 'egg'],
        ['dog', 'bat', 'cat', 'egg', 'apple'],
        ['bat', 'dog', 'cat', 'apple', 'egg'])
      );
      const obj = {};
      assert.isTrue(sameMembers([1, 'a', obj], [obj, 'a', 1], ['a', obj, 1]));
    });

    it('returns false if arrays with different members are passed', function() {
      assert.isFalse(sameMembers([1, 2, 3], [1, 2, 3, 4]));
      assert.isFalse(sameMembers([1, 2, 3], [1, 2, 3], [1, 2, 3, 4]));
      const obj1 = {};
      const obj2 = {};
      assert.isFalse(sameMembers([1, 2, obj1], [1, 2, obj2]));
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

  describe('subgroups', function() {
    const subgroups = arrayFns.subgroups;
    const err = 'invalid input';
    it('throws if the arg is not an array', function() {
      assert.throws(function() {
        subgroups();
      }, err);
      assert.throws(function() {
        subgroups(3, 4, 5);
      }, err);
      assert.throws(function() {
        subgroups('string');
      }, err);
    });

    it('returns subgroups of the empty array', function() {
      assert.deepEqual(subgroups([]), [[]]);
    });

    it('returns all subgroups of a non-empty array', function() {
      const input = [1, 2, 3];
      const expected = [
        [],
        [1], [2], [3],
        [1, 2], [1, 3], [2, 3],
        [1, 2, 3]
      ];
      assert.sameDeepMembers(subgroups(input), expected);
    });
  });

  describe('parity', function() {
    const parity = arrayFns.parity;

    describe('validation', function() {
      const errMsg = 'invalid input';
      it('throws if the first arg is not an array', function() {
        assert.throws(function() {
          parity(3);
        }, errMsg);
        assert.throws(function() {
          parity('string');
        }, errMsg);
        assert.throws(function() {
          parity();
        }, errMsg);
      });
    });

    describe('when returnSwaps is omitted', function() {
      it('defaults to even', function() {
        assert.equal(parity([]), 1);
      });

      it('returns 1 for sorted arrays', function() {
        assert.equal(parity([]), 1);
        assert.equal(parity([3]), 1);
        assert.equal(parity([1, 2, 3, 4, 5]), 1);
        assert.equal(parity([1, 2, 3, 4, 5, 6]), 1);
      });

      it('returns 1 for even arrays', function() {
        assert.equal(parity([1, 1, 0]), 1);
        assert.equal(parity([3, 1, 2]), 1);
        assert.equal(parity([2, 3, 1]), 1);
        assert.equal(parity([1, 2, 4, 3, 5, 7, 6, 8]), 1);
      });


      it('returns -1 for odd arrays', function() {
        assert.equal(parity([1, 0, 1]), -1);
        assert.equal(parity([3, 2, 1]), -1);
        assert.equal(parity([2, 1, 3]), -1);
        assert.equal(parity([1, 4, 2, 3, 5, 7, 6, 8]), -1);
      });
    });

    describe('when returnSwaps is true', function() {
      it('defaults to zero', function() {
        assert.equal(parity([], true), 0);
      });

      it('returns 0 for sorted arrays', function() {
        assert.equal(parity([1], true), 0);
        assert.equal(parity([1, 2, 3], true), 0);
        assert.equal(parity([1, 3, 7, 15], true), 0);
        assert.equal(parity([-2, -1, 0, 7, 18, 72], true), 0);
      });

      it('does not count swaps of duplicates', function() {
        assert.equal(parity([0, 1, 1], true), 0);
        assert.equal(parity([1, 1, 6], true), 0);
        assert.equal(parity([1, 0, 1], true), 1);
      });

      it('correctly counts swaps', function() {
        // test cases taken from https://www.hackerrank.com/challenges/ctci-merge-sort
        const ary1 = [869452, 611887, 695172, 836300, 632905, 845290, 853490, 486947, 295540, 172785, 787583, 742851, 781273, 442044, 507987, 703869, 747320, 279193, 303819, 446677, 295658, 608254, 915876, 215464, 28216, 496620, 163926, 79270, 953878, 942710, 256710, 339681, 554596, 468233, 692332, 187501, 313523, 545821, 674447, 125414, 234957, 462030, 868265, 16229, 420425, 376251, 236449, 167745, 171795, 56619, 130773, 983805, 664873, 46648, 199268, 209440, 59620, 363194, 288710, 529849, 822255, 61771, 869529, 376851, 46356, 561860, 564351, 876230, 624032, 755149, 1643, 858989, 217178, 869907, 391569, 153955, 762509, 144370, 321699, 934304, 200988, 452471, 918108, 382212, 15470, 633727, 108004, 591441, 513272, 913065, 121289, 335527, 491187, 990817, 712377, 537542, 69028, 793079, 930123, 693060, 548227, 931766, 68400, 765405, 318024, 459968, 919359, 80533, 120689, 757409, 531188, 321677, 726231, 449295, 220240, 258052, 599373, 328243, 849493, 112645, 241307, 970781, 964523, 732494, 477950, 676899, 786387, 63329, 469977, 716510, 756388, 18203, 164627, 341139, 299959, 482650, 317459, 735669, 563182, 438147, 9429, 610721, 276175, 735659, 60015, 496415, 510063, 175740, 824657, 359555, 804736, 582316, 330335, 769258, 831161, 324636, 962508, 617547, 387965, 432484, 334056, 660704, 967038, 15034, 1843, 783349, 497684, 319301, 35369, 577217, 757447, 561150, 187938, 33622, 813160, 764304, 46388, 323222, 940043, 871044, 682776, 744778, 969711, 529463, 30387, 800871, 854098, 992894, 418418, 242062, 941729, 268825, 419118, 908767, 283859, 420960, 208467, 297894, 740260, 760187, 875110, 14058, 321336, 63047, 564031, 134496, 343703, 610418, 457717, 800097, 997814, 140493, 544875, 967524, 186307, 575261, 768395, 40404, 84507, 703164, 798818, 26235, 488340, 217935, 451353, 288550, 638894, 659819, 586443, 895505, 420006, 977905, 425914, 257693, 557303, 989945, 392188, 901005, 600362, 366257, 701102, 114527, 506749, 762328, 82051, 693055, 853940, 366797, 249810, 938446, 586312, 48627, 964681, 591003, 782913, 416033, 879553, 938158, 592204, 982347, 833662, 528561, 960251, 775928, 786253, 517554, 765872, 178441, 418558, 882585, 61049, 636011, 997112, 84149, 398338, 595514, 293555, 252278, 478662, 543364, 707075, 581325, 108343, 671755, 172327, 891255, 604140, 51879, 345765, 196343, 34226, 695778, 724903, 510828, 471705, 511155, 28381, 237576, 205947, 963291, 120161, 266995, 599301, 633624, 351143, 513991, 745489, 644697, 282620, 224150, 704413, 989694, 321826, 812755, 661449, 494152, 220361, 265588, 62383, 566125, 461930, 612960, 261903, 703184, 123787, 733607, 214338, 152168, 487535, 936637, 631810, 124047, 203631, 231110, 757670, 71126, 261452, 503158, 232174, 544071, 243659, 936586, 533765, 565484, 749340, 711565, 575987, 486053, 493504, 638369, 52177, 955433, 251328, 830431, 174968, 891467, 564038, 389305, 43634, 51572, 842293, 191795, 175618, 562276, 939256, 449639, 633401, 200708, 469148, 865574, 744778, 229158, 802160, 794894, 310993, 67851, 506458, 886979, 553903, 999961, 525348, 122432, 471745, 293027, 952862, 646712, 184493, 516899, 552369, 744478, 84822, 394661, 936272, 776791, 473288, 391880, 742781, 106688, 592587, 728280, 488614, 337364, 957437, 807125, 648610, 268429, 874975, 155067, 671760, 945230, 155028, 713459, 67661, 626772, 6485, 536874, 789836, 707330, 570125, 342204, 968159, 654946, 253216, 420783, 948089, 726504, 812662, 690869, 349543, 405248, 935501, 838156, 258963, 892937, 161632, 907572, 677718, 552959, 62639, 349477, 498188];
        const ary2 = [62935, 82200, 877141, 585771, 619073, 183328, 809452, 189197, 41883, 777611, 360495, 295099, 198393, 308583, 537954, 11054, 515803, 403848];
        const ary3 = [967655, 758356, 191615, 860592, 919987, 615539, 54661, 472945, 194529, 920489, 487484, 928546, 983423, 86035, 322038, 85545, 705108, 505366, 894997, 410656, 547248, 672607, 771150, 358698, 387351, 596084, 413003, 398404, 628239, 816851, 331056, 595893, 575206, 39022, 972836, 495192, 170912, 27496, 484489, 365440, 947984, 488324, 810337, 447758, 574359, 648727, 533303, 279466, 154092, 944651, 690121, 217691, 133609, 977623, 576389, 520959, 90058, 989391, 919362, 718296, 806241, 766769, 830541, 897798, 322142, 803376, 909342, 493054, 347224, 393830, 374845, 811559, 882153, 701534, 259317, 456511, 350260, 308971, 252328, 504351, 769973, 458801, 722041, 903581, 952775, 814781, 424539, 42832, 804172, 343900, 277480, 126764, 627020, 108020, 24562, 465513, 427747, 450255, 474918, 774970, 844084, 849763, 586529, 242588, 551296, 362197, 215451, 901555, 671167, 984130, 922257, 441139, 442930, 644297, 344719, 912056, 975430, 285609, 954888, 779601, 629508, 748719, 422716, 772879, 856738, 963629, 238391, 800836, 413883, 713309, 575806, 774318, 79423, 678686, 533258, 147070, 40882, 748708, 48624, 228400, 732837, 970880, 185890, 692119, 131528, 530608, 604174, 106957, 816216, 75413, 402909, 962075, 824131, 341977, 251305, 197220, 821957, 6047, 998056, 235840, 235707, 90213, 526509, 315129, 768898, 59766, 462198, 326131, 808473, 27173, 554530, 57662, 514404, 740419, 266132, 162284, 787378, 386657, 785592, 119945, 462070, 704853, 598371, 802552, 46829, 366027, 516124, 868785, 372073, 30531, 620976, 607780, 637095, 147485, 439260, 405992, 207250, 417810, 248474, 532075, 444982, 803003, 589736, 475738, 59773, 855867, 638021, 363502, 758875, 423612, 483446, 220944, 644816, 598168, 539848, 691644, 964194, 572323, 76781, 852618, 119205, 214108, 460397, 756299, 361592, 416009, 162290, 85194, 833818, 410763, 617268, 795151, 730117, 723355, 270888, 306241, 95573, 425260, 669742, 854447, 365224, 669539, 591743, 10039, 267706, 131590, 701683, 748251, 220264, 294815, 600868, 339468, 508922, 577617, 95766, 386866, 993625, 774407, 472059, 827442, 701521, 89326, 622592, 947989, 812680, 409832, 254229, 908252, 835091, 923970, 762698, 200314, 109860, 870792, 210353, 893917, 518733, 428387, 642167, 738996, 723201, 759386, 594815, 748474, 337002, 690580, 135339, 846978, 981338, 607397, 674419, 682858, 213074, 813363, 630846, 542105, 223194, 401426, 966708, 574636, 841747, 729406, 774950, 951606, 116549, 501654, 361874, 635282, 930040, 4040, 374277, 169592, 279778, 969092, 918065, 133131, 176023, 569756, 980109, 157361, 177152, 654527, 356570, 906578, 984241, 987416, 448682, 207434, 905193, 415390, 782070, 746940, 661147, 73371, 214897, 777695, 575024, 576771, 412976, 21415, 97162, 303605, 191006, 376939, 272696, 625422, 510070, 965070, 195177, 490178, 122430, 888681, 661056, 479000, 795258, 645297, 982767, 243939, 369082, 887959, 175680, 667503, 151250, 836826, 257225, 366147, 130873, 832248, 942917, 543848, 853662, 40078, 847452, 561019, 417017, 636499, 186441, 443438, 601569, 381617, 449967, 240350, 270297, 111022, 719349, 581906, 272670, 218467, 342197, 641752, 622778, 517876, 825606, 774027, 871054, 82831, 140173, 1926, 431430, 83089, 545773, 801444, 639519, 909577, 362462, 572887, 62427, 548902, 16324, 663995, 446871, 466290, 420697, 233519, 93663, 656397, 815425, 366333, 874864, 157621, 524436, 497641, 191848, 866393, 788019, 62901, 949223, 444544, 64826, 897005, 43984, 126951, 698448, 683502, 552879, 60909, 256388, 615305, 126163, 789063, 795652, 573033, 255352, 216348, 322903, 865367, 872744, 138327, 748051, 263959, 812299, 788838, 277951, 520499, 655230, 65970, 583399, 120805, 510513, 164577, 17809, 70848, 807879, 716256, 754350, 877109, 777164, 10737, 8765, 419678, 316152, 804416, 992710, 87855, 537115, 315613, 953221, 926211, 970291, 701271, 190169, 298942, 490108, 984472, 819440, 661690, 50441, 919190, 782494, 77305, 600118, 316654, 148152, 924348, 32909, 418853, 801456, 326424, 945942, 326573, 746102, 262093, 647340, 255163, 349947, 184455, 87127, 819520, 627017, 573770, 520790, 817185, 872711, 527250, 801656, 208502, 705291, 368448, 644043, 487784, 962104, 760513, 320789, 626608, 201212, 353697, 561812, 519020, 196472, 507753, 845592, 458925, 286197, 492931, 714088, 636144, 193737, 317566, 455663, 820753, 891335, 492804, 154290, 280397, 536405, 472297, 488898, 241695, 357097, 649293, 245830, 319200, 926157, 566618, 462159, 127368, 436666, 540323, 646387, 633138, 48075, 491978, 92062, 334272, 984909, 322501, 486767, 694997, 640067, 458781, 515750, 531401, 467936, 670039, 811798, 4341, 142335, 817047, 762387, 499431, 982691, 8217, 334983, 908847, 91186, 313493, 36215, 527852, 853815, 198953, 677341, 418242, 690931, 285754, 268865, 192191, 608255, 755631, 887187, 764673, 730763, 919288, 296073, 198698, 589326, 624222, 719390, 731661, 957621, 481777, 747443, 940311, 489993, 82425, 365510, 97530, 912270, 918076, 625381, 766084, 117028, 302721, 184325, 324310, 588475, 453189, 516500, 713081, 725171, 920039, 477753, 455933, 839326, 290177, 170983, 428652, 914399, 890372, 676664, 388371, 372148, 940458, 845033, 378492, 539235, 210542, 476022, 451504, 128617, 617754, 733939, 761997, 436827];
        const ary4 = [86306, 541653, 887804, 119158, 254733, 129327, 39196, 248837, 585259, 878521, 539013, 272593, 823524, 969763, 162965, 16539, 358133, 51464, 473349, 203166, 946308, 12583, 930059, 422329, 980438, 575028, 556434, 714376, 337024, 993260, 148991, 423329, 534912, 553147, 542486, 305996, 682473, 98033, 554832, 784083, 492906, 610197, 56676, 316429, 579959, 219640, 849320, 454444, 787455, 322668, 173961, 733762, 851602, 620371, 672442, 832039, 195398, 228876, 546414, 532421, 738487, 211757, 472102, 273399, 764903, 530939, 95746, 447375, 145324, 166930, 231457, 638229, 777126, 288132, 471009, 873436, 24123, 836680, 844231, 811578, 159347, 18191, 61691, 10948, 154914, 734133, 359338, 350311, 963008, 905752, 399084, 701494, 117508, 387537, 491244, 882410, 434827, 586990, 846136, 580150, 753919, 77592, 218378, 47396, 365724, 205739, 920831, 906198, 42418, 281414, 717775, 718117, 815956, 779466, 245416, 970869, 29950, 604754, 321180, 992957, 26857, 236615, 210802, 660716, 624151, 218398, 59477, 58977, 321739, 905612, 639127, 592009, 983203, 373856, 639404, 865278, 579594, 76586, 771476, 622012, 357999, 5602, 340128, 690307, 301419, 585543, 661175, 331368, 706648, 982354, 324324, 733504, 218968, 51478, 394219, 359470, 786227, 453695, 418447, 107965, 359306, 573925, 699973, 858861, 947780, 855728, 724138, 43726, 448665, 11965, 665737, 323016, 17567, 522216, 13322, 318985, 624110, 674496, 650353, 330758, 173202, 491028, 64261, 908521, 58857, 974832, 267991, 845083, 428526, 202789, 953047, 304184, 776713, 169371, 163044, 724492, 541450, 403533, 768217, 506467, 415498, 950305, 829482, 433064, 988872, 359155, 268400, 612982, 550002, 918752, 460091, 723203, 926132, 40703, 148076, 984988, 15534, 416066, 830071, 960412, 135206, 299469, 780947, 911918, 985192, 943990, 152761, 42993, 863874, 437330, 549459, 279371, 387634, 895292, 228786, 892858, 770798, 13538, 22191, 320800, 932289, 482281, 560354, 374772, 39335, 708429, 359760, 571221, 640846, 706182, 47984, 776051, 522002, 828930, 204320, 507193, 289271, 357081, 66538, 153144, 794410, 132348, 948867, 698395];
        const ary5 = [694004, 107604, 314789, 707541, 129794, 635588, 156182, 128426, 195942, 530953, 684113, 420722, 407064, 255333, 61568, 113245, 303316, 353970, 635247, 132245, 558290, 658791, 421515, 431722, 725328, 91010, 226131, 857676, 39876, 440877, 401667, 250232, 548481, 716455, 957772, 194626, 352043, 630305, 839404, 64336, 161258, 523516, 485057, 84673, 778848, 62976, 197918, 598515, 416946, 833164, 730759, 491587, 491954, 668625, 923308, 217282, 759634, 665790, 591309, 315862, 623018, 992975, 566093, 687850, 709429, 40216, 882476, 577823, 186873, 238231, 642158, 864482, 761746, 643567, 949154, 540593, 706542, 147071, 655459, 639839, 496586, 386217, 131425, 988540, 571193, 571084, 722173, 847178, 236873, 829833, 163039, 376243, 822807, 245483, 64092, 48587, 802051, 462919, 626410, 988923, 701149, 784919, 369756, 979246, 428485, 318909, 36190, 651379, 465980, 691648, 291217, 962565, 594216, 938994, 467456, 165408, 510077, 705980, 12586, 263302, 535812, 691976, 155896, 874970, 453811, 219987, 923557, 772213, 199258, 66318, 277487, 416758, 851236, 647242, 396004, 796073, 966150, 432193, 447451, 948481, 123841, 255019, 427398, 718056, 194012, 411205, 399816, 220441, 117185, 412401, 94, 169348, 620728, 155989, 44318, 74538, 375975, 967874, 363102, 91584, 34191, 640588, 508342, 401778, 287829, 420697, 714202, 770331, 852889, 678004, 718811, 493081, 933023, 662560, 211137, 643386, 73765, 127304, 380178, 707301, 56056, 380271, 876648, 676783, 536259, 920965, 267673, 428586, 888838, 630774, 520169, 439380, 271362, 544862, 357510, 559190, 965558, 71711, 329520, 818447, 266067, 564683, 827879, 199089, 227242, 555367, 358826, 817358, 682670, 739004, 524658, 738725, 635626, 401306, 415508, 171885, 322270, 199532, 600470, 727460, 830305, 636990, 683191, 101666, 181852, 557052, 177208, 147409, 628763, 23079, 482207, 894829, 587761, 310086, 610269, 331355, 865452, 485446, 148712, 548122, 740801, 673370, 286846, 376427, 591027, 218705, 64663, 913296, 418236, 665132, 157107, 248541, 302121, 356650, 866558, 324, 913701, 560117, 147733, 58815, 583196, 146291, 953643, 687308, 456376, 80263, 535014, 838180, 82061, 200078, 386301, 822861, 873447, 189498, 715639, 980825, 924555, 780301, 410472, 342790, 445432, 567579, 107682, 263905, 440580, 490592, 264228, 354280, 50708, 928312, 413095, 150255, 74603, 883089, 353915, 47330, 479704, 405280, 885509, 561764, 605357, 788161, 900976, 995155, 494011, 616615, 975979, 418565, 396915, 386451, 761354, 358699, 470381, 385388, 138955, 910960, 875979, 919534, 265239, 443038, 847846, 194685, 109645, 438800, 77774, 463559, 486129, 73829, 868838, 887990, 635592, 990547, 676150, 52919, 985701, 170160, 669533, 961680, 588724, 582800, 348130, 866430, 941498, 818510, 251817, 596804, 245821, 644147, 516337, 511059, 87184, 880534, 222096, 196828, 319333, 816221, 176738, 321814, 890049, 561928, 209803, 41992, 552474, 402304, 94910, 54526, 572464, 764443, 16205, 677539, 863594, 880686, 60320, 321443, 215547, 828488, 918246, 461367, 472634, 434582, 488778, 76170, 315116, 710873, 789349, 150800, 527093, 482439, 472613, 417141, 44366, 682415, 459132, 113191, 601071, 70393, 167716, 173534, 351187, 700273, 367424, 214780, 580958, 944096, 536222, 796505, 772583, 970819, 774223, 761569, 921753, 263000, 354090, 753220, 973872, 659790, 904019, 17316, 142228, 892984, 434456, 702945, 91750, 409939, 816135, 692820, 996684, 500203, 382705, 347870, 200475, 750129, 562650, 297784, 694224, 615223, 610640, 983158, 102394, 384863, 744726, 24146, 164214, 615167, 777365, 654438, 274957, 197735, 671753, 417184, 90718, 622561, 636481, 182468, 548851, 968967, 875287, 545534, 469169, 257992, 893404, 185995, 524472, 972405, 483779, 735047, 103979, 94418, 234556, 206372, 479280, 495634, 746869, 643494, 110800, 40585, 814283, 385756, 238320, 486035, 319292, 845389, 108595, 955772, 544208, 173798, 441090, 419495, 719331, 910259, 193838, 129086, 612605, 234661, 101490, 96383, 486059, 721821, 190801, 720614, 928192, 186432, 216247, 191413, 346277, 327047, 231997, 160559, 229154, 986668, 162946, 548445, 832057, 787892, 20568, 376264, 961689, 978010, 312110, 681020, 404620, 22299, 326457, 17224, 256959, 944299, 113607, 743017, 666119, 820759, 979983, 110662, 523542, 196229, 302074, 869819, 39627, 534071, 546729, 268781, 520738, 709674, 333577, 869146, 497566, 870497, 245410, 459254, 848506, 73871, 656625, 253125, 96170, 499434, 270348, 353128, 443732, 900306, 612497, 109850, 721064, 592479, 220511, 760958, 305059, 38937, 630776, 344686, 89359, 177504, 613466, 126448, 403530, 947042, 995594, 901095, 817538, 757355, 876700, 182395, 831225, 49677, 435519, 443746, 549110, 222219, 313226, 509193, 122524, 925722, 619042, 359940, 34552, 355904, 120897, 339610, 911192, 268024, 684295, 550, 961879, 814112, 126998, 881760, 761154, 122591, 782854, 95043, 396297, 175906, 793790, 743873, 741934, 229308, 187619, 807395, 967878, 500844, 316587, 606754, 942917, 451980, 966693, 977468, 807883, 603941, 833429, 719075, 388316, 517724, 235976, 866546, 331835, 362973, 748306, 609340, 1915, 47511, 220735, 398211];

        assert.equal(parity(ary1, true), 46768);
        assert.equal(parity(ary2, true), 77);
        assert.equal(parity(ary3, true), 108411);
        assert.equal(parity(ary4, true), 16750);
        assert.equal(parity(ary5, true), 101598);
      });
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

  describe('zipToObj', function() {
    const zipToObj = arrayFns.zipToObj;

    const a = [1, 2, 3, 4];
    const b = [5, 6, 7, 8];
    const c = [9, 10, 11, 12];
    const d = [13, 14];

    it('throws unless passed two arrays', function() {
      const msg = 'invalid input';

      assert.throws(function() {
        zipToObj();
      }, msg);

      assert.throws(function() {
        zipToObj(3, []);
      }, msg);

      assert.throws(function() {
        zipToObj([], 'cat');
      }, msg);

      assert.throws(function() {
        zipToObj(3, 'cat');
      }, msg);
    });

    it('merges two arrays into an object', function() {
      assert.deepEqual(zipToObj(a, b), {1: 5, 2: 6, 3: 7, 4: 8});
      assert.deepEqual(zipToObj(c, b), {9: 5, 10: 6, 11: 7, 12: 8});
      assert.deepEqual(zipToObj(b, a), {5: 1, 6: 2, 7: 3, 8: 4});
    });

    it('zips according to the size of the smallest array', function() {
      assert.deepEqual(zipToObj(c, d), {9: 13, 10: 14});
      assert.deepEqual(zipToObj(d, c), {13: 9, 14: 10});
      assert.deepEqual(zipToObj(c, []), {});
    });
  });

});

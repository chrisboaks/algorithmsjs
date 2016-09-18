const assert = require('chai').assert;
const TOLERANCE = 0.0000000000001; // used to test mathematical conversions are 'close enough'

import {maxOf, minOf, minMaxOf, xor, degToRad, radToDeg, sineLaw, cosineLaw} from '../../source/math/utils';

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

  describe('xor', function() {
    it('produces the correct truth table', function() {
      assert.isTrue(xor(true, false));
      assert.isTrue(xor(false, true));
      assert.isFalse(xor(false, false));
      assert.isFalse(xor(true, true));
    });

    it('works with thruthy and falsey values', function() {
      assert.isTrue(xor(1, 0));
      assert.isTrue(xor('', 'cat'));
      assert.isFalse(xor(undefined, null));
      assert.isFalse(xor({}, []));
    });
  });

  describe('degToRad', function() {
    it('converts degrees to radians', function() {
      assert.closeTo(degToRad(30), Math.PI / 6, TOLERANCE);
      assert.closeTo(degToRad(45), Math.PI / 4, TOLERANCE);
      assert.closeTo(degToRad(60), Math.PI / 3, TOLERANCE);
      assert.closeTo(degToRad(90), Math.PI / 2, TOLERANCE);
      assert.closeTo(degToRad(180), Math.PI, TOLERANCE);
      assert.closeTo(degToRad(390), 2 * Math.PI + Math.PI / 6, TOLERANCE);
    });
  });

  describe('radToDeg', function() {
    it('converts radians to degrees', function() {
      assert.closeTo(radToDeg(Math.PI / 6), 30, TOLERANCE);
      assert.closeTo(radToDeg(Math.PI / 4), 45, TOLERANCE);
      assert.closeTo(radToDeg(Math.PI / 3), 60, TOLERANCE);
      assert.closeTo(radToDeg(Math.PI / 2), 90, TOLERANCE);
      assert.closeTo(radToDeg(Math.PI), 180, TOLERANCE);
      assert.closeTo(radToDeg(2 * Math.PI + Math.PI / 6), 390, TOLERANCE);
    });
  });

  describe('sineLaw', function() {
    const sideA = 1;
    const sideB = Math.sqrt(3);
    const sideC = 2;
    const angleA = Math.PI / 6;
    const angleB = Math.PI / 3;
    const angleC = Math.PI / 2;

    it('throws if not given proper arguments', function() {
      const msg = 'incorrect args passed to sineLaw';
      assert.throws(function() {
        sineLaw({a: sideA, A: angleA});
      }, msg);
      assert.throws(function() {
        sineLaw({a: sideA, A: angleA, b: sideB, B: angleB});
      }, msg);
      assert.throws(function() {
        sineLaw({A: angleA});
      }, msg);
      assert.throws(function() {
        sineLaw({a: sideA});
      }, msg);
    });

    it("doesn't throw with proper arguments", function() {
      assert.doesNotThrow(function() {
        sineLaw({a: sideA, A: angleA, b: sideB});
      });
      assert.doesNotThrow(function() {
        sineLaw({a: sideA, A: angleA, B: angleB});
      });
    });

    it('finds missing angles', function() {
      assert.closeTo(sineLaw({a: sideA, A: angleA, b: sideB}), angleB, TOLERANCE);
      assert.closeTo(sineLaw({a: sideB, A: angleB, b: sideC}), angleC, TOLERANCE);
      assert.closeTo(sineLaw({a: sideC, A: angleC, b: sideA}), angleA, TOLERANCE);
    });

    it('finds missing sides', function() {
      assert.closeTo(sineLaw({a: sideA, A: angleA, B: angleB}), sideB, TOLERANCE);
      assert.closeTo(sineLaw({a: sideB, A: angleB, B: angleC}), sideC, TOLERANCE);
      assert.closeTo(sineLaw({a: sideC, A: angleC, B: angleA}), sideA, TOLERANCE);
    });
  });

  describe('cosineLaw', function() {
    const sideA = 1;
    const sideB = Math.sqrt(3);
    const sideC = 2;
    const angleA = Math.PI / 6;
    const angleB = Math.PI / 3;
    const angleC = Math.PI / 2;

    it('throws if not given proper arguments', function() {
      const msg = 'incorrect args passed to cosineLaw';
      assert.throws(function() {
        cosineLaw({a: sideA, b: sideA});
      }, msg);
      assert.throws(function() {
        cosineLaw({a: sideA, b: sideA, c: sideC, C: angleC});
      }, msg);
      assert.throws(function() {
        cosineLaw({a: sideA});
      }, msg);
      assert.throws(function() {
        cosineLaw({b: sideA});
      }, msg);
    });

    it("doesn't throw with proper arguments", function() {
      assert.doesNotThrow(function() {
        cosineLaw({a: sideA, b: sideA, c: sideC});
      });
      assert.doesNotThrow(function() {
        cosineLaw({a: sideA, b: sideA, C: angleC});
      });
    });

    it('finds missing angles', function() {
      assert.closeTo(cosineLaw({a: sideA, b: sideB, c: sideC}), angleC, TOLERANCE);
      assert.closeTo(cosineLaw({a: sideB, b: sideC, c: sideA}), angleA, TOLERANCE);
      assert.closeTo(cosineLaw({a: sideC, b: sideA, c: sideB}), angleB, TOLERANCE);
    });

    it('finds missing sides', function() {
      assert.closeTo(cosineLaw({a: sideA, b: sideB, C: angleC}), sideC, TOLERANCE);
      assert.closeTo(cosineLaw({a: sideB, b: sideC, C: angleA}), sideA, TOLERANCE);
      assert.closeTo(cosineLaw({a: sideC, b: sideA, C: angleB}), sideB, TOLERANCE);
    });
  });
});

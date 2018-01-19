import { CCI } from '../exports';

const assert = require('chai').assert;

describe('Cracking the Coding Interview', () => {
  describe('chapter 01', () => {
    it('solves cci0101 (in two ways)', () => {
      function verifyCCI0101(fn) {
        assert.isTrue(fn('able'));
        assert.isTrue(fn('water'));
        assert.isFalse(fn('apple'));
        assert.isFalse(fn('countess'));
      }

      [CCI.cci0101a, CCI.cci0101b].forEach(verifyCCI0101);
    });

    it('solves cci0102', () => {
      const fn = CCI.cci0102;
      assert.isFalse(fn('cat', 'cab'));
      assert.isFalse(fn('cat', 'cabo'));
      assert.isFalse(fn('cat', 'catty'));
      assert.isTrue(fn('cat', 'tac'));
      assert.isTrue(fn('cat', 'atc'));
    });

    it('solves cci0105', () => {
      const fn = CCI.cci0105;
      assert.isTrue(fn('pale', 'ple'));
      assert.isTrue(fn('pales', 'pale'));
      assert.isTrue(fn('pale', 'bale'));
      assert.isFalse(fn('pale', 'bake'));
      assert.isFalse(fn('pale', 'palladium'));
      assert.isFalse(fn('pals', 'ppaa'));
    });
  });

  describe('chapter 16', () => {
    it('solves cci1601', () => {
      const fn = CCI.cci1601;
      assert.deepEqual(fn([3, 5]), [5, 3]);
      assert.deepEqual(fn([3, -5]), [-5, 3]);
      assert.deepEqual(fn([-3, 5]), [5, -3]);
      assert.deepEqual(fn([-3, -5]), [-5, -3]);
    });
  });
});

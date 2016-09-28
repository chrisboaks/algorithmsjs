import {CCI} from '../../source/puzzle/exports';

const assert = require('chai').assert;

describe('Cracking the Coding Interview', function() {

  describe('chapter 01', function() {
    it('solves cci0101 (in two ways)', function() {
      function verifyCCI0101(fn) {
        assert.isTrue(fn('able'));
        assert.isTrue(fn('water'));
        assert.isFalse(fn('apple'));
        assert.isFalse(fn('countess'));
      }

      [CCI.cci0101a, CCI.cci0101b].forEach(verifyCCI0101);
    });

    it('solves cci0102', function() {
      const fn = CCI.cci0102;
      assert.isFalse(fn('cat', 'cab'));
      assert.isFalse(fn('cat', 'cabo'));
      assert.isFalse(fn('cat', 'catty'));
      assert.isTrue(fn('cat', 'tac'));
      assert.isTrue(fn('cat', 'atc'));
    });
  });

  describe('chapter 16', function() {
    it('solves cci1601', function() {
      const fn = CCI.cci1601;
      assert.deepEqual(fn([3, 5]), [5, 3]);
      assert.deepEqual(fn([3, -5]), [-5, 3]);
      assert.deepEqual(fn([-3, 5]), [5, -3]);
      assert.deepEqual(fn([-3, -5]), [-5, -3]);
    });
  });

});

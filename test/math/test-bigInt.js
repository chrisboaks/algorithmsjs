const assert = require('chai').assert;

import {BigInt} from '../../source/math/bigInt';

describe('BigInt', function() {
  describe('#constructor', function() {
    it('throws if passed invalid arg', function() {
      assert.throws(function() {
        new BigInt('cat');
      }, 'invalid arg passed to BigInt constructor');
      assert.throws(function() {
        new BigInt('123f5');
      }, 'invalid arg passed to BigInt constructor');
      assert.throws(function() {
        new BigInt('123^5');
      }, 'invalid arg passed to BigInt constructor');
      assert.throws(function() {
        new BigInt('123.5');
      }, 'invalid arg passed to BigInt constructor');
    });

    it('does not throw if passed a valid arg', function() {
      assert.doesNotThrow(function() {
        new BigInt(12345);
      });
      assert.doesNotThrow(function() {
        new BigInt(-12345);
      });
      assert.doesNotThrow(function() {
        new BigInt('012345');
      });
      assert.doesNotThrow(function() {
        new BigInt('-012345');
      });
    });

    it('returns the arg if already a BigInt', function() {
      const arg = new BigInt(12345);
      const rv = new BigInt(arg);
      assert.deepEqual(rv, arg);
    });

    it('defaults to zero', function() {
      const n = new BigInt();
      assert.equal(n.val, '0');

      const m = new BigInt('');
      assert.equal(m.val, '0');
    });
  });

  describe('val', function() {
    it('returns the value of the BigInt as a string', function() {
      assert.equal(new BigInt(12345).val, '12345');
      assert.equal(new BigInt('12345').val, '12345');
    });

    it('handles negative numbers', function() {
      assert.equal(new BigInt(-12345).val, '-12345');
      assert.equal(new BigInt('-12345').val, '-12345');
    });

    it('removes any leading zeroes', function() {
      assert.equal(new BigInt('00012345').val, '12345');
      assert.equal(new BigInt('-00012345').val, '-12345');
      assert.equal(new BigInt('00010000').val, '10000');
      assert.equal(new BigInt('-00010000').val, '-10000');
    });

    it('handles zero', function() {
      assert.equal(new BigInt('000').val, '0');
      assert.equal(new BigInt('-000').val, '0');
    })
  });

  describe('#clone', function() {
    const a = new BigInt('12345');
    const b = a.clone();
    assert.notStrictEqual(a, b);
    assert.equal(a.val, b.val);
  });

  describe('#equals', function() {
    it('returns true if two numbers are equal', function() {
      assert.isTrue(new BigInt(12345).equals(new BigInt('12345')));
      assert.isTrue(new BigInt(12345).equals(new BigInt('012345')));
      assert.isTrue(new BigInt(-12345).equals(new BigInt('-12345')));
      assert.isTrue(new BigInt(-12345).equals(new BigInt('-0012345')));
      assert.isTrue(new BigInt(0).equals(new BigInt('-00')));
    });

    it('returns false if two numbers are not equal', function() {
      assert.isFalse(new BigInt(12345).equals(new BigInt('-12345')));
      assert.isFalse(new BigInt(12345).equals(new BigInt('123450')));
      assert.isFalse(new BigInt(-12345).equals(new BigInt('-12045')));
      assert.isFalse(new BigInt(-12345).equals(new BigInt('-0002345')));
      assert.isFalse(new BigInt(0).equals(new BigInt('-060')));
    });

    it('works if passed an ordinary number', function() {
      assert.isTrue(new BigInt(12345).equals(12345));
      assert.isTrue(new BigInt(-12345).equals(-12345));
      assert.isFalse(new BigInt(12345).equals(-12345));
    });
  });

  describe('#negate', function() {
    it('returns a negated copy of the number', function() {
      const pos = new BigInt(12345);
      const neg = new BigInt(-12345);

      const rvPos = pos.negate();
      const rvNeg = neg.negate();

      assert.equal(pos.val, '12345');
      assert.equal(neg.val, '-12345');
      assert.equal(rvPos.val, '-12345');
      assert.equal(rvNeg.val, '12345');
    });
  });

  describe('#gt', function() {
    it('returns true when greater than the passed arg', function() {
      assert.isTrue(new BigInt(12345).gt(new BigInt(12344)));
      assert.isTrue(new BigInt(12345).gt(new BigInt(1234)));
      assert.isTrue(new BigInt(-12345).gt(new BigInt(-12346)));
      assert.isTrue(new BigInt(12345).gt(new BigInt(-12345)));
      assert.isTrue(new BigInt(0).gt(new BigInt(-1)));
      assert.isTrue(new BigInt(1).gt(new BigInt(0)));
    });

    it('returns false when not greater than the passed arg', function() {
      assert.isFalse(new BigInt(12345).gt(new BigInt(12346)));
      assert.isFalse(new BigInt(12345).gt(new BigInt(12345)));
      assert.isFalse(new BigInt(12345).gt(new BigInt(123456)));
      assert.isFalse(new BigInt(-12345).gt(new BigInt(-12344)));
      assert.isFalse(new BigInt(-12345).gt(new BigInt(12345)));
      assert.isFalse(new BigInt(0).gt(new BigInt(1)));
      assert.isFalse(new BigInt(-1).gt(new BigInt(0)));
    });

    it('works if passed an ordinary number', function() {
      assert.isTrue(new BigInt(12345).gt(12344));
      assert.isFalse(new BigInt(12345).gt(12346));
      assert.isFalse(new BigInt(12345).gt(12345));
      assert.isFalse(new BigInt(-12345).gt(12344));
    });
  });

  describe('#gte', function() {
    it('returns true when greater or equal to the passed arg', function() {
      assert.isTrue(new BigInt(12345).gte(new BigInt(12344)));
      assert.isTrue(new BigInt(12345).gte(new BigInt(1234)));
      assert.isTrue(new BigInt(-12345).gte(new BigInt(-12346)));
      assert.isTrue(new BigInt(12345).gte(new BigInt(-12345)));
      assert.isTrue(new BigInt(12345).gte(new BigInt(12345)));
      assert.isTrue(new BigInt(-12345).gte(new BigInt(-12345)));
      assert.isTrue(new BigInt(0).gte(new BigInt(-1)));
      assert.isTrue(new BigInt(1).gte(new BigInt(0)));
    });

    it('returns false when not greater than the passed arg', function() {
      assert.isFalse(new BigInt(12345).gte(new BigInt(12346)));
      assert.isFalse(new BigInt(12345).gte(new BigInt(123456)));
      assert.isFalse(new BigInt(-12345).gte(new BigInt(-12344)));
      assert.isFalse(new BigInt(-12345).gte(new BigInt(12345)));
      assert.isFalse(new BigInt(0).gte(new BigInt(1)));
      assert.isFalse(new BigInt(-1).gte(new BigInt(0)));
    });

    it('works if passed an ordinary number', function() {
      assert.isTrue(new BigInt(12345).gte(12344));
      assert.isFalse(new BigInt(12345).gte(12346));
      assert.isTrue(new BigInt(12345).gte(12345));
      assert.isFalse(new BigInt(-12345).gte(12344));
    });
  });

  describe('#lt', function() {
    it('returns true when less than the passed arg', function() {
      assert.isTrue(new BigInt(12345).lt(new BigInt(12346)));
      assert.isTrue(new BigInt(12345).lt(new BigInt(123456)));
      assert.isTrue(new BigInt(-12345).lt(new BigInt(-12344)));
      assert.isTrue(new BigInt(-12345).lt(new BigInt(12345)));
      assert.isTrue(new BigInt(0).lt(new BigInt(1)));
      assert.isTrue(new BigInt(-1).lt(new BigInt(0)));
    });

    it('returns false when not less than the passed arg', function() {
      assert.isFalse(new BigInt(12345).lt(new BigInt(12345)));
      assert.isFalse(new BigInt(12345).lt(new BigInt(12344)));
      assert.isFalse(new BigInt(12345).lt(new BigInt(1234)));
      assert.isFalse(new BigInt(-12345).lt(new BigInt(-12346)));
      assert.isFalse(new BigInt(12345).lt(new BigInt(-12345)));
      assert.isFalse(new BigInt(0).lt(new BigInt(-1)));
      assert.isFalse(new BigInt(1).lt(new BigInt(0)));
    });

    it('works if passed an ordinary number', function() {
      assert.isFalse(new BigInt(12345).lt(12344));
      assert.isTrue(new BigInt(12345).lt(12346));
      assert.isFalse(new BigInt(12345).lt(12345));
      assert.isTrue(new BigInt(-12345).lt(12344));
    });
  });

  describe('#gt', function() {
    it('returns true when less than or equal to the passed arg', function() {
      assert.isTrue(new BigInt(12345).lte(new BigInt(12346)));
      assert.isTrue(new BigInt(12345).lte(new BigInt(12345)));
      assert.isTrue(new BigInt(12345).lte(new BigInt(123456)));
      assert.isTrue(new BigInt(-12345).lte(new BigInt(-12344)));
      assert.isTrue(new BigInt(-12345).lte(new BigInt(12345)));
      assert.isTrue(new BigInt(0).lte(new BigInt(1)));
      assert.isTrue(new BigInt(-1).lte(new BigInt(0)));
    });

    it('returns false when not less than or equal to the passed arg', function() {
      assert.isFalse(new BigInt(12345).lte(new BigInt(12344)));
      assert.isFalse(new BigInt(12345).lte(new BigInt(1234)));
      assert.isFalse(new BigInt(-12345).lte(new BigInt(-12346)));
      assert.isFalse(new BigInt(12345).lte(new BigInt(-12345)));
      assert.isFalse(new BigInt(0).lte(new BigInt(-1)));
      assert.isFalse(new BigInt(1).lte(new BigInt(0)));
    });

    it('works if passed an ordinary number', function() {
      assert.isFalse(new BigInt(12345).lte(12344));
      assert.isTrue(new BigInt(12345).lte(12346));
      assert.isTrue(new BigInt(12345).lte(12345));
      assert.isTrue(new BigInt(-12345).lte(12344));
    });
  });

  describe('#magnitude', function() {
    it('returns the magnitude of a number', function() {
      assert.equal(new BigInt(0).magnitude(), 0);
      assert.equal(new BigInt(1).magnitude(), 1);
      assert.equal(new BigInt(12345).magnitude(), 5);
      assert.equal(new BigInt(-12345).magnitude(), 5);
      assert.equal(new BigInt('1234512345').magnitude(), 10);
    });
  });

  describe('#abs', function() {
    it('returns the absolute value of a number', function() {
      assert.equal(new BigInt(12345).abs().val, '12345');
      assert.equal(new BigInt(-12345).abs().val, '12345');
    })
  });

  describe('#add', function() {
    it('returns the sum', function() {
      assert.equal(new BigInt(1234).add(2222).val, '3456');
      assert.equal(new BigInt(9999).add(8888).val, '18887');
      assert.equal(new BigInt('90071992547409919').add(new BigInt('90071992547409918')).val, '180143985094819837');
      assert.equal(new BigInt('-90071992547409919').add(new BigInt('-90071992547409918')).val, '-180143985094819837');
      assert.equal(new BigInt('90071992547409919').add(new BigInt('-90071992547409918')).val, '1');
      assert.equal(new BigInt('-90071992547409919').add(new BigInt('90071992547409918')).val, '-1');
      assert.equal(new BigInt('-90071992547409919').add(new BigInt('90071992547409919')).val, '0');
    });
  });

  describe('#sub', function() {
    it('returns the difference', function() {
      assert.equal(new BigInt(18887).sub(8888).val, '9999');
      assert.equal(new BigInt('180143985094819837').sub('90071992547409919').val, '90071992547409918');
      assert.equal(new BigInt(1234).sub(123456).val, '-122222');
      assert.equal(new BigInt(0).sub(123456).val, '-123456');
      assert.equal(new BigInt('90071992547409918').sub('90071992547409919').val, '-1');
      assert.equal(new BigInt('-90071992547409919').sub(new BigInt('90071992547409918')).val, '-180143985094819837');
    });
  });

});

const assert = require('chai').assert;

import { BigInt } from '../bigInt';

describe('BigInt', () => {
  describe('#constructor', () => {
    it('throws if passed an invalid arg', () => {
      assert.throws(() => {
        new BigInt('cat');
      }, 'invalid arg passed to BigInt constructor');
      assert.throws(() => {
        new BigInt('123f5');
      }, 'invalid arg passed to BigInt constructor');
      assert.throws(() => {
        new BigInt('123^5');
      }, 'invalid arg passed to BigInt constructor');
      assert.throws(() => {
        new BigInt('123.5');
      }, 'invalid arg passed to BigInt constructor');
    });

    it('does not throw if passed a valid arg', () => {
      assert.doesNotThrow(() => {
        new BigInt(12345);
      });
      assert.doesNotThrow(() => {
        new BigInt(-12345);
      });
      assert.doesNotThrow(() => {
        new BigInt('012345');
      });
      assert.doesNotThrow(() => {
        new BigInt('-012345');
      });
    });

    it('returns the arg if already a BigInt', () => {
      const arg = new BigInt(12345);
      const rv = new BigInt(arg);
      assert.deepEqual(rv, arg);
    });

    it('defaults to zero', () => {
      const n = new BigInt();
      assert.equal(n.val, '0');

      const m = new BigInt('');
      assert.equal(m.val, '0');
    });
  });

  describe('val', () => {
    it('returns the value of the BigInt as a string', () => {
      assert.equal(new BigInt(12345).val, '12345');
      assert.equal(new BigInt('12345').val, '12345');
    });

    it('handles negative numbers', () => {
      assert.equal(new BigInt(-12345).val, '-12345');
      assert.equal(new BigInt('-12345').val, '-12345');
    });

    it('removes any leading zeroes', () => {
      assert.equal(new BigInt('00012345').val, '12345');
      assert.equal(new BigInt('-00012345').val, '-12345');
      assert.equal(new BigInt('00010000').val, '10000');
      assert.equal(new BigInt('-00010000').val, '-10000');
    });

    it('handles zero', () => {
      assert.equal(new BigInt('000').val, '0');
      assert.equal(new BigInt('-000').val, '0');
    });
  });

  describe('#clone', () => {
    const a = new BigInt('12345');
    const b = a.clone();
    assert.notStrictEqual(a, b);
    assert.equal(a.val, b.val);
  });

  describe('#equals', () => {
    it('returns true if two numbers are equal', () => {
      assert.isTrue(new BigInt(12345).equals(new BigInt('12345')));
      assert.isTrue(new BigInt(12345).equals(new BigInt('012345')));
      assert.isTrue(new BigInt(-12345).equals(new BigInt('-12345')));
      assert.isTrue(new BigInt(-12345).equals(new BigInt('-0012345')));
      assert.isTrue(new BigInt(0).equals(new BigInt('-00')));
    });

    it('returns false if two numbers are not equal', () => {
      assert.isFalse(new BigInt(12345).equals(new BigInt('-12345')));
      assert.isFalse(new BigInt(12345).equals(new BigInt('123450')));
      assert.isFalse(new BigInt(-12345).equals(new BigInt('-12045')));
      assert.isFalse(new BigInt(-12345).equals(new BigInt('-0002345')));
      assert.isFalse(new BigInt(0).equals(new BigInt('-060')));
    });

    it('works if passed an ordinary number', () => {
      assert.isTrue(new BigInt(12345).equals(12345));
      assert.isTrue(new BigInt(-12345).equals(-12345));
      assert.isFalse(new BigInt(12345).equals(-12345));
    });
  });

  describe('#negate', () => {
    it('returns a negated copy of the number', () => {
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

  describe('#gt', () => {
    it('returns true when greater than the passed arg', () => {
      assert.isTrue(new BigInt(12345).gt(new BigInt(12344)));
      assert.isTrue(new BigInt(12345).gt(new BigInt(1234)));
      assert.isTrue(new BigInt(-12345).gt(new BigInt(-12346)));
      assert.isTrue(new BigInt(12345).gt(new BigInt(-12345)));
      assert.isTrue(new BigInt(0).gt(new BigInt(-1)));
      assert.isTrue(new BigInt(1).gt(new BigInt(0)));
    });

    it('returns false when not greater than the passed arg', () => {
      assert.isFalse(new BigInt(12345).gt(new BigInt(12346)));
      assert.isFalse(new BigInt(12345).gt(new BigInt(12345)));
      assert.isFalse(new BigInt(12345).gt(new BigInt(123456)));
      assert.isFalse(new BigInt(-12345).gt(new BigInt(-12344)));
      assert.isFalse(new BigInt(-12345).gt(new BigInt(12345)));
      assert.isFalse(new BigInt(0).gt(new BigInt(1)));
      assert.isFalse(new BigInt(-1).gt(new BigInt(0)));
    });

    it('works if passed an ordinary number', () => {
      assert.isTrue(new BigInt(12345).gt(12344));
      assert.isFalse(new BigInt(12345).gt(12346));
      assert.isFalse(new BigInt(12345).gt(12345));
      assert.isFalse(new BigInt(-12345).gt(12344));
    });
  });

  describe('#gte', () => {
    it('returns true when greater or equal to the passed arg', () => {
      assert.isTrue(new BigInt(12345).gte(new BigInt(12344)));
      assert.isTrue(new BigInt(12345).gte(new BigInt(1234)));
      assert.isTrue(new BigInt(-12345).gte(new BigInt(-12346)));
      assert.isTrue(new BigInt(12345).gte(new BigInt(-12345)));
      assert.isTrue(new BigInt(12345).gte(new BigInt(12345)));
      assert.isTrue(new BigInt(-12345).gte(new BigInt(-12345)));
      assert.isTrue(new BigInt(0).gte(new BigInt(-1)));
      assert.isTrue(new BigInt(1).gte(new BigInt(0)));
    });

    it('returns false when not greater than the passed arg', () => {
      assert.isFalse(new BigInt(12345).gte(new BigInt(12346)));
      assert.isFalse(new BigInt(12345).gte(new BigInt(123456)));
      assert.isFalse(new BigInt(-12345).gte(new BigInt(-12344)));
      assert.isFalse(new BigInt(-12345).gte(new BigInt(12345)));
      assert.isFalse(new BigInt(0).gte(new BigInt(1)));
      assert.isFalse(new BigInt(-1).gte(new BigInt(0)));
    });

    it('works if passed an ordinary number', () => {
      assert.isTrue(new BigInt(12345).gte(12344));
      assert.isFalse(new BigInt(12345).gte(12346));
      assert.isTrue(new BigInt(12345).gte(12345));
      assert.isFalse(new BigInt(-12345).gte(12344));
    });
  });

  describe('#lt', () => {
    it('returns true when less than the passed arg', () => {
      assert.isTrue(new BigInt(12345).lt(new BigInt(12346)));
      assert.isTrue(new BigInt(12345).lt(new BigInt(123456)));
      assert.isTrue(new BigInt(-12345).lt(new BigInt(-12344)));
      assert.isTrue(new BigInt(-12345).lt(new BigInt(12345)));
      assert.isTrue(new BigInt(0).lt(new BigInt(1)));
      assert.isTrue(new BigInt(-1).lt(new BigInt(0)));
    });

    it('returns false when not less than the passed arg', () => {
      assert.isFalse(new BigInt(12345).lt(new BigInt(12345)));
      assert.isFalse(new BigInt(12345).lt(new BigInt(12344)));
      assert.isFalse(new BigInt(12345).lt(new BigInt(1234)));
      assert.isFalse(new BigInt(-12345).lt(new BigInt(-12346)));
      assert.isFalse(new BigInt(12345).lt(new BigInt(-12345)));
      assert.isFalse(new BigInt(0).lt(new BigInt(-1)));
      assert.isFalse(new BigInt(1).lt(new BigInt(0)));
    });

    it('works if passed an ordinary number', () => {
      assert.isFalse(new BigInt(12345).lt(12344));
      assert.isTrue(new BigInt(12345).lt(12346));
      assert.isFalse(new BigInt(12345).lt(12345));
      assert.isTrue(new BigInt(-12345).lt(12344));
    });
  });

  describe('#gt', () => {
    it('returns true when less than or equal to the passed arg', () => {
      assert.isTrue(new BigInt(12345).lte(new BigInt(12346)));
      assert.isTrue(new BigInt(12345).lte(new BigInt(12345)));
      assert.isTrue(new BigInt(12345).lte(new BigInt(123456)));
      assert.isTrue(new BigInt(-12345).lte(new BigInt(-12344)));
      assert.isTrue(new BigInt(-12345).lte(new BigInt(12345)));
      assert.isTrue(new BigInt(0).lte(new BigInt(1)));
      assert.isTrue(new BigInt(-1).lte(new BigInt(0)));
    });

    it('returns false when not less than or equal to the passed arg', () => {
      assert.isFalse(new BigInt(12345).lte(new BigInt(12344)));
      assert.isFalse(new BigInt(12345).lte(new BigInt(1234)));
      assert.isFalse(new BigInt(-12345).lte(new BigInt(-12346)));
      assert.isFalse(new BigInt(12345).lte(new BigInt(-12345)));
      assert.isFalse(new BigInt(0).lte(new BigInt(-1)));
      assert.isFalse(new BigInt(1).lte(new BigInt(0)));
    });

    it('works if passed an ordinary number', () => {
      assert.isFalse(new BigInt(12345).lte(12344));
      assert.isTrue(new BigInt(12345).lte(12346));
      assert.isTrue(new BigInt(12345).lte(12345));
      assert.isTrue(new BigInt(-12345).lte(12344));
    });
  });

  describe('magnitude', () => {
    it('returns the magnitude of a number', () => {
      assert.equal(new BigInt(0).magnitude, 0);
      assert.equal(new BigInt(1).magnitude, 1);
      assert.equal(new BigInt(12345).magnitude, 5);
      assert.equal(new BigInt(-12345).magnitude, 5);
      assert.equal(new BigInt('1234512345').magnitude, 10);
    });
  });

  describe('#abs', () => {
    it('returns the absolute value of a number', () => {
      assert.equal(new BigInt(12345).abs().val, '12345');
      assert.equal(new BigInt(-12345).abs().val, '12345');
    });
  });

  describe('#add', () => {
    it('returns the sum', () => {
      assert.equal(new BigInt(1234).add(2222).val, '3456');
      assert.equal(new BigInt(9999).add(8888).val, '18887');
      assert.equal(
        new BigInt('90071992547409919').add(new BigInt('90071992547409918'))
          .val,
        '180143985094819837'
      );
      assert.equal(
        new BigInt('-90071992547409919').add(new BigInt('-90071992547409918'))
          .val,
        '-180143985094819837'
      );
      assert.equal(
        new BigInt('90071992547409919').add(new BigInt('-90071992547409918'))
          .val,
        '1'
      );
      assert.equal(
        new BigInt('-90071992547409919').add(new BigInt('90071992547409918'))
          .val,
        '-1'
      );
      assert.equal(
        new BigInt('-90071992547409919').add(new BigInt('90071992547409919'))
          .val,
        '0'
      );
    });
  });

  describe('#sub', () => {
    it('returns the difference', () => {
      assert.equal(new BigInt(18887).sub(8888).val, '9999');
      assert.equal(
        new BigInt('180143985094819837').sub('90071992547409919').val,
        '90071992547409918'
      );
      assert.equal(new BigInt(1234).sub(123456).val, '-122222');
      assert.equal(new BigInt(0).sub(123456).val, '-123456');
      assert.equal(
        new BigInt('90071992547409918').sub('90071992547409919').val,
        '-1'
      );
      assert.equal(
        new BigInt('-90071992547409919').sub(new BigInt('90071992547409918'))
          .val,
        '-180143985094819837'
      );
    });
  });

  describe('#mult', () => {
    it('returns the product', () => {
      assert.equal(new BigInt(99999).mult(99999999).val, '9999899900001');
      assert.equal(new BigInt(-99999).mult(99999999).val, '-9999899900001');
      assert.equal(new BigInt(99999).mult(-99999999).val, '-9999899900001');
      assert.equal(new BigInt(-99999).mult(-99999999).val, '9999899900001');
      assert.equal(
        new BigInt(123456789).mult(987654321).val,
        '121932631112635269'
      );
      assert.equal(new BigInt(123456789).mult(7).val, '864197523');
      assert.equal(new BigInt(7).mult(123456789).val, '864197523');
    });
  });

  describe('#div', () => {
    it('returns the quotient', () => {
      assert.equal(new BigInt(987654321).div(123456789).val, '8');
      assert.equal(new BigInt(700805340046809).div(12341234).val, '56785678');
      assert.equal(new BigInt(9999).div(1).val, '9999');
      assert.equal(new BigInt(9999).div(9999).val, '1');
    });

    it('correctly handles negatives', () => {
      assert.equal(new BigInt(-700805340046809).div(12341234).val, '-56785678');
      assert.equal(new BigInt(700805340046809).div(-12341234).val, '-56785678');
      assert.equal(new BigInt(-700805340046809).div(-12341234).val, '56785678');
    });

    it('throws if the arg is zero', () => {
      assert.throws(() => {
        new BigInt(4).div(0);
      }, 'division by zero is undefined');
    });
  });

  describe('#rem', () => {
    it('returns the remainder', () => {
      assert.equal(new BigInt(987654321).rem(123456789).val, '9');
      assert.equal(new BigInt(700805340046809).rem(12341234).val, '157');
      assert.equal(new BigInt(9999).rem(1).val, '0');
      assert.equal(new BigInt(9999).rem(9999).val, '0');
    });

    it('correctly handles negatives', () => {
      assert.equal(new BigInt(-700805340046809).rem(12341234).val, '-157');
      assert.equal(new BigInt(700805340046809).rem(-12341234).val, '157');
      assert.equal(new BigInt(-700805340046809).rem(-12341234).val, '-157');
    });

    it('throws if the arg is zero', () => {
      assert.throws(() => {
        new BigInt(4).rem(0);
      }, 'division by zero is undefined');
    });
  });

  describe('#mod', () => {
    it('returns the modulus', () => {
      assert.equal(new BigInt(987654321).mod(123456789).val, '9');
      assert.equal(new BigInt(700805340046809).mod(12341234).val, '157');
      assert.equal(new BigInt(9999).mod(1).val, '0');
      assert.equal(new BigInt(9999).mod(9999).val, '0');
    });

    it('correctly handles negatives', () => {
      assert.equal(new BigInt(-700805340046809).mod(12341234).val, '12341077');
      assert.equal(new BigInt(700805340046809).mod(-12341234).val, '-12341077');
      assert.equal(new BigInt(-700805340046809).mod(-12341234).val, '-157');
    });

    it('throws if the arg is zero', () => {
      assert.throws(() => {
        new BigInt(4).mod(0);
      }, 'division by zero is undefined');
    });
  });

  describe('#exp', () => {
    it('throws if passed a negative exponent', () => {
      assert.throws(() => {
        new BigInt().exp(-1);
      }, 'exponentiation not defined on BigInt for negative exponents');
    });

    it('returns the number raised to the arg', () => {
      assert.equal(new BigInt(13).exp(7).val, '62748517');
      assert.equal(new BigInt(13).exp(4).val, '28561');
      assert.equal(new BigInt(13).exp(2).val, '169');
      assert.equal(new BigInt(1234).exp(0).val, '1');
      assert.equal(new BigInt(1234).exp(1).val, '1234');
    });
  });
});

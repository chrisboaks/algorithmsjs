const assert = require('chai').assert;

import { Rational } from '../rational';

describe('Rational', () => {
  describe('#constructor', () => {
    it('throws if passed invalid args', () => {
      assert.throws(() => {
        new Rational('cat');
      }, 'invalid args passed to Rational constructor');
      assert.throws(() => {
        new Rational(1, 0);
      }, 'invalid args passed to Rational constructor');
      assert.throws(() => {
        new Rational(3.2, 1);
      }, 'invalid args passed to Rational constructor');
      assert.throws(() => {
        new Rational(3, 1.2);
      }, 'invalid args passed to Rational constructor');
    });

    it('reduces automatically', () => {
      const r1 = new Rational(3, 6);
      assert.equal(r1.n, 1);
      assert.equal(r1.d, 2);

      const r2 = new Rational(3, -6);
      assert.equal(r2.n, -1);
      assert.equal(r2.d, 2);

      const r3 = new Rational(-3, -6);
      assert.equal(r3.n, 1);
      assert.equal(r3.d, 2);
    });

    it('returns the first arg if already a Rational', () => {
      const arg = new Rational(1, 2);
      const rv = new Rational(arg);
      assert.deepEqual(rv, arg);
    });
  });

  describe('#mult', () => {
    it('multiplies by another rational', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 3);
      const rv = a.mult(b);
      assert.equal(rv.n, 1);
      assert.equal(rv.d, 3);
    });

    it('multiplies by an integer', () => {
      const a = new Rational(2, 5);
      const b = 2;
      const rv = a.mult(b);
      assert.equal(rv.n, 4);
      assert.equal(rv.d, 5);
    });

    it('does not modify the original inputs', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 3);
      a.mult(b);
      assert.equal(a.n, 1);
      assert.equal(a.d, 2);
      assert.equal(b.n, 2);
      assert.equal(b.d, 3);
    });

    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).mult(3.5);
      }, 'invalid Rational multiplier');
    });
  });

  describe('#div', () => {
    it('divides by another rational', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 3);
      const rv = a.div(b);
      assert.equal(rv.n, 3);
      assert.equal(rv.d, 4);
    });

    it('divides by an integer', () => {
      const a = new Rational(2, 5);
      const b = 2;
      const rv = a.div(b);
      assert.equal(rv.n, 1);
      assert.equal(rv.d, 5);
    });

    it('does not modify the original inputs', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 3);
      a.div(b);
      assert.equal(a.n, 1);
      assert.equal(a.d, 2);
      assert.equal(b.n, 2);
      assert.equal(b.d, 3);
    });

    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).div(3.5);
      }, 'invalid Rational divisor');
    });
  });

  describe('#add', () => {
    it('adds another rational', () => {
      const a = new Rational(1, 2);
      const b = new Rational(1, 3);
      const rv = a.add(b);
      assert.equal(rv.n, 5);
      assert.equal(rv.d, 6);
    });

    it('adds an integer', () => {
      const a = new Rational(2, 5);
      const b = 2;
      const rv = a.add(b);
      assert.equal(rv.n, 12);
      assert.equal(rv.d, 5);
    });

    it('does not modify the original inputs', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 3);
      a.add(b);
      assert.equal(a.n, 1);
      assert.equal(a.d, 2);
      assert.equal(b.n, 2);
      assert.equal(b.d, 3);
    });

    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).add(3.5);
      }, 'invalid Rational addend');
    });
  });

  describe('#sub', () => {
    it('subtracts another rational', () => {
      const a = new Rational(1, 2);
      const b = new Rational(1, 3);
      const rv = a.sub(b);
      assert.equal(rv.n, 1);
      assert.equal(rv.d, 6);
    });

    it('subtracts an integer', () => {
      const a = new Rational(2, 5);
      const b = 2;
      const rv = a.sub(b);
      assert.equal(rv.n, -8);
      assert.equal(rv.d, 5);
    });

    it('does not modify the original inputs', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 3);
      a.sub(b);
      assert.equal(a.n, 1);
      assert.equal(a.d, 2);
      assert.equal(b.n, 2);
      assert.equal(b.d, 3);
    });

    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).sub(3.5);
      }, 'invalid Rational subtrahend');
    });
  });

  describe('#mediant', () => {
    it('finds the mediant with another rational', () => {
      const a = new Rational(1, 2);
      const b = new Rational(1, 3);
      const rv = a.mediant(b);
      assert.equal(rv.n, 2);
      assert.equal(rv.d, 5);
    });

    it('finds the mediant with an integer', () => {
      const a = new Rational(2, 5);
      const b = 2;
      const rv = a.mediant(b);
      assert.equal(rv.n, 2);
      assert.equal(rv.d, 3);
    });

    it('does not modify the original inputs', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 3);
      a.mediant(b);
      assert.equal(a.n, 1);
      assert.equal(a.d, 2);
      assert.equal(b.n, 2);
      assert.equal(b.d, 3);
    });

    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).mediant(3.5);
      }, 'invalid Rational mediant pairing');
    });
  });

  describe('#pow', () => {
    it('throws if a non-integer is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).pow(3.5);
      }, 'invalid Rational exponent');

      assert.throws(() => {
        new Rational(1, 2).pow(new Rational(1, 2));
      }, 'invalid Rational exponent');

      assert.doesNotThrow(() => {
        new Rational(1, 2).pow(3);
      });

      assert.doesNotThrow(() => {
        new Rational(1, 2).pow(-3);
      });
    });

    it('exponentiates for positive integers', () => {
      const rational = new Rational(2, 3);
      const rv = rational.pow(3);
      assert.equal(rv.n, 8);
      assert.equal(rv.d, 27);
    });

    it('exponentiates for negative integers', () => {
      const rational = new Rational(2, 3);
      const rv = rational.pow(-3);
      assert.equal(rv.n, 27);
      assert.equal(rv.d, 8);
    });
  });

  describe('#abs', () => {
    it('returns a clone for positive rationals', () => {
      const a = new Rational(1, 2);
      const rv = a.abs();
      assert.equal(rv.n, 1);
      assert.equal(rv.d, 2);
      assert.notStrictEqual(rv, a);
    });

    it('returns the absolute value of a negative rational and does not modify the original', () => {
      const a = new Rational(-1, 2);
      const rv = a.abs();
      assert.equal(a.n, -1);
      assert.equal(a.d, 2);
      assert.equal(rv.n, 1);
      assert.equal(rv.d, 2);
    });
  });

  describe('#toString', () => {
    it('converts the rational to a string, ignoring any whole parts', () => {
      assert.equal(new Rational(1, 2).toString(), '1/2');
      assert.equal(new Rational(3, 2).toString(), '3/2');
      assert.equal(new Rational(-1, 2).toString(), '-1/2');
      assert.equal(new Rational(-3, 2).toString(), '-3/2');
    });
  });

  describe('#toMixedString', () => {
    it('converts the rational to a mixed-value string', () => {
      assert.equal(new Rational(1, 2).toMixedString(), '1/2');
      assert.equal(new Rational(3, 2).toMixedString(), '1 1/2');
      assert.equal(new Rational(-1, 2).toMixedString(), '-1/2');
      assert.equal(new Rational(-3, 2).toMixedString(), '-1 1/2');
    });
  });

  describe('#equals', () => {
    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).equals(3.5);
      }, 'Rational can only compare to a Rational or Integer');
    });

    it('functions for Rational args', () => {
      const a = new Rational(1, 2);
      const b = new Rational(3, 6);
      const c = new Rational(1, 5);

      assert.isTrue(a.equals(b));
      assert.isFalse(a.equals(c));
    });

    it('functions for Integer args', () => {
      const a = new Rational(8, 4);

      assert.isTrue(a.equals(2));
      assert.isFalse(a.equals(3));
    });
  });

  describe('#lt', () => {
    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).lt(3.5);
      }, 'Rational can only compare to a Rational or Integer');
    });

    it('functions for Rational args', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 4);
      const c = new Rational(3, 4);

      assert.isTrue(a.lt(c));
      assert.isFalse(c.lt(a));
      assert.isFalse(a.lt(b));
    });

    it('functions for Integer args', () => {
      const a = new Rational(5, 2);

      assert.isTrue(a.lt(3));
      assert.isFalse(a.lt(2));
    });
  });

  describe('#lte', () => {
    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).lte(3.5);
      }, 'Rational can only compare to a Rational or Integer');
    });

    it('functions for Rational args', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 4);
      const c = new Rational(3, 4);

      assert.isTrue(a.lte(c));
      assert.isFalse(c.lte(a));
      assert.isTrue(a.lte(b));
    });

    it('functions for Integer args', () => {
      const a = new Rational(8, 4);

      assert.isTrue(a.lte(2));
      assert.isTrue(a.lte(3));
      assert.isFalse(a.lte(1));
    });
  });

  describe('#gt', () => {
    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).gt(3.5);
      }, 'Rational can only compare to a Rational or Integer');
    });

    it('functions for Rational args', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 4);
      const c = new Rational(3, 4);

      assert.isFalse(a.gt(c));
      assert.isTrue(c.gt(a));
      assert.isFalse(a.gt(b));
    });

    it('functions for Integer args', () => {
      const a = new Rational(8, 4);

      assert.isTrue(a.gt(1));
      assert.isFalse(a.gt(2));
      assert.isFalse(a.gt(3));
    });
  });

  describe('#gte', () => {
    it('throws if a float is passed', () => {
      assert.throws(() => {
        new Rational(1, 2).gte(3.5);
      }, 'Rational can only compare to a Rational or Integer');
    });

    it('functions for Rational args', () => {
      const a = new Rational(1, 2);
      const b = new Rational(2, 4);
      const c = new Rational(3, 4);

      assert.isFalse(a.gte(c));
      assert.isTrue(c.gte(a));
      assert.isTrue(a.gte(b));
    });

    it('functions for Integer args', () => {
      const a = new Rational(8, 4);

      assert.isTrue(a.gte(1));
      assert.isTrue(a.gte(2));
      assert.isFalse(a.gte(3));
    });
  });

  describe('#toFloat', () => {
    it('returns the rational as a float', () => {
      assert.equal(new Rational(1, 2).toFloat(), 0.5);
      assert.equal(new Rational(3, 5).toFloat(), 0.6);
      assert.equal(new Rational(-1, 2).toFloat(), -0.5);
    });
  });
});

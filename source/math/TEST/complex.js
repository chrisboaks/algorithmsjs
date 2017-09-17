const assert = require('chai').assert;

import {Complex} from '../complex';

describe('Complex', () => {
  const TOLERANCE = 0.00001;

  describe('#constructor', () => {
    it('throws if passed an invalid arg', () => {
      assert.throws(() => {
        new Complex('cat');
      }, 'invalid arg passed to Complex constructor');
      assert.throws(() => {
        new Complex(3, 'cat');
      }, 'invalid arg passed to Complex constructor');
      assert.throws(() => {
        new Complex('cat', 3);
      }, 'invalid arg passed to Complex constructor');
    });

    it('does not throw if passed no args', () => {
      assert.doesNotThrow(() => {
        new Complex();
      });
    });

    it('does not throw if passed a Complex number', () => {
      assert.doesNotThrow(() => {
        new Complex(new Complex());
      });
    });

    it('does not throw if passed a single numerical arg', () => {
      assert.doesNotThrow(() => {
        new Complex(3.5);
      });
    });

    it('does not throw if passed two numerical args', () => {
      assert.doesNotThrow(() => {
        new Complex(3.5, 1.3);
      });
    });

    it('sets a, b, r, and theta', () => {
      const num = new Complex(3, 4);
      assert.equal(num.a, 3);
      assert.equal(num.b, 4);
      assert.equal(num.r, 5);
      assert.approximately(num.theta, 0.92729, TOLERANCE);
    });
  });

  describe('fromPolar', () => {
    it('defaults to r = 0, theta = 0', () => {
      const num1 = Complex.fromPolar();
      assert.equal(num1.a, 0);
      assert.equal(num1.b, 0);

      const num2 = Complex.fromPolar(3);
      assert.equal(num2.a, 3);
      assert.equal(num2.b, 0);

      const num3 = Complex.fromPolar(undefined, 4);
      assert.equal(num3.a, 0);
      assert.equal(num3.b, 0);
    });

    it('creates a complex number from polar coordinates', () => {
      const TOLERANCE = 0.00001;

      const num1 = Complex.fromPolar(4, Math.PI / 2);
      assert.approximately(num1.a, 0, TOLERANCE);
      assert.approximately(num1.b, 4, TOLERANCE);
      assert.approximately(num1.r, 4, TOLERANCE);
      assert.approximately(num1.theta, Math.PI / 2, TOLERANCE);

      const num2 = Complex.fromPolar(3, 2);
      assert.approximately(num2.a, -1.24844, TOLERANCE);
      assert.approximately(num2.b, 2.72789, TOLERANCE);
      assert.approximately(num2.r, 3, TOLERANCE);
      assert.approximately(num2.theta, 2, TOLERANCE);
    });

    it('converts to a positive r', () => {
      const num = Complex.fromPolar(-5, 5);
      assert.approximately(num.a, -1.41831, TOLERANCE);
      assert.approximately(num.b, 4.79462, TOLERANCE);
      assert.approximately(num.r, 5, TOLERANCE);
      assert.approximately(num.theta, 5 - Math.PI, TOLERANCE);
    });
  });

  describe('#toString', () => {
    it('correctly renders the number as a string', () => {
      assert.equal(new Complex().toString(), '0');
      assert.equal(new Complex(3).toString(), '3');
      assert.equal(new Complex(-3).toString(), '-3');
      assert.equal(new Complex(0, 3).toString(), '3i');
      assert.equal(new Complex(0, -3).toString(), '-3i');
      assert.equal(new Complex(3, 4).toString(), '3 + 4i');
      assert.equal(new Complex(3, -4).toString(), '3 - 4i');
      assert.equal(new Complex(-3, 4).toString(), '-3 + 4i');
      assert.equal(new Complex(-3, -4).toString(), '-3 - 4i');
    });
  });

  describe('#equals', () => {
    it('determines equality with a natural number', () => {
      assert.isTrue(new Complex(3, 0).equals(3));
      assert.isTrue(new Complex(3).equals(3));

      assert.isFalse(new Complex(3, 4).equals(3));
      assert.isFalse(new Complex(3).equals(4));
    });

    it('determines equality with a Complex', () => {
      const num = new Complex(3, 4);

      assert.isTrue(num.equals(new Complex(3, 4)));
      assert.isFalse(num.equals(new Complex(3, -4)));
      assert.isFalse(num.equals(new Complex(3)));
      assert.isFalse(num.equals(new Complex(-3, 4)));
      assert.isFalse(num.equals(new Complex(0, 4)));
    });

    it('returns false if passed a non-number', () => {
      const num = new Complex();

      assert.isFalse(num.equals('0'));
      assert.isFalse(num.equals([]));
      assert.isFalse(num.equals({}));
    });
  });

  describe('#abs', () => {
    it('finds the absolute value for real numbers', () => {
      assert.equal(new Complex(3, 0).abs(), 3);
      assert.equal(new Complex(-4, 0).abs(), 4);
    });

    it('finds the absolute value for imaginary numbers', () => {
      assert.equal(new Complex(0, 2).abs(), 2);
      assert.equal(new Complex(0, -5).abs(), 5);
    });

    it('finds the absolute value of Complex numbers', () => {
      assert.equal(new Complex(3, 4).abs(), 5);
      assert.equal(new Complex(5, 12).abs(), 13);
    });
  });

  describe('#negate', () => {
    it('returns a negated copy of the number', () => {
      assert.isTrue(new Complex(3).negate().equals(new Complex(-3)));
      assert.isTrue(new Complex(0, 4).negate().equals(new Complex(0, -4)));
      assert.isTrue(new Complex(3, 4).negate().equals(new Complex(-3, -4)));
      assert.isTrue(new Complex(-3, -4).negate().equals(new Complex(3, 4)));
    });

    it('does not modify the original number', () => {
      const num = new Complex(3, 4);
      num.negate();
      assert.isTrue(num.equals(new Complex(3, 4)));
    });
  });

  describe('#add', () => {
    it('adds a passed real number', () => {
      const num = new Complex(2, 3);
      assert.isTrue(num.add(3).equals(new Complex(5, 3)));
      assert.isTrue(num.add(-3).equals(new Complex(-1, 3)));
    });

    it('adds a passed Complex number', () => {
      const numA = new Complex(2, 3);
      const numB = new Complex(-4, 2);
      const numC = new Complex(3, -5);
      assert.isTrue(numA.add(numB).equals(new Complex(-2, 5)));
      assert.isTrue(numA.add(numC).equals(new Complex(5, -2)));
      assert.isTrue(numB.add(numC).equals(new Complex(-1, -3)));
    });

    it('does not modify the original number', () => {
      const num = new Complex(3, 4);
      num.add(5);
      assert.isTrue(num.equals(new Complex(3, 4)));
    });
  });

  describe('#sub', () => {
    it('subtracts a passed real number', () => {
      const num = new Complex(2, 3);
      assert.isTrue(num.sub(3).equals(new Complex(-1, 3)));
      assert.isTrue(num.sub(-3).equals(new Complex(5, 3)));
    });

    it('subs a passed Complex number', () => {
      const numA = new Complex(2, 3);
      const numB = new Complex(-4, 2);
      const numC = new Complex(3, -5);
      assert.isTrue(numA.sub(numB).equals(new Complex(6, 1)));
      assert.isTrue(numA.sub(numC).equals(new Complex(-1, 8)));
      assert.isTrue(numB.sub(numC).equals(new Complex(-7, 7)));
    });

    it('does not modify the original number', () => {
      const num = new Complex(3, 4);
      num.sub(5);
      assert.isTrue(num.equals(new Complex(3, 4)));
    });
  });

  describe('#conjugate', () => {
    it('returns the complex conjugate', () => {
      assert.isTrue(new Complex(2, 3).conjugate().equals(new Complex(2, -3)));
      assert.isTrue(new Complex(2, -3).conjugate().equals(new Complex(2, 3)));
      assert.isTrue(new Complex(0, 3).conjugate().equals(new Complex(0, -3)));
      assert.isTrue(new Complex(2).conjugate().equals(new Complex(2)));
    });

    it('does not modify the original number', () => {
      const num = new Complex(3, 4);
      num.conjugate();
      assert.isTrue(num.equals(new Complex(3, 4)));
    });
  });

  describe('#clone', () => {
    it('makes a copy of the Complex number', () => {
      const orig = new Complex(2, 7);
      const copy = orig.clone();
      assert.isTrue(orig.equals(copy));
      assert.notStrictEqual(orig, copy);
    });
  });

  describe('#mult', () => {
    it('returns the product of a real number', () => {
      const numA = new Complex(2, 3);
      const numB = new Complex(-4, 2);
      const numC = new Complex(3, -5);

      assert.isTrue(numA.mult(3).equals(new Complex(6, 9)));
      assert.isTrue(numB.mult(-2).equals(new Complex(8, -4)));
      assert.isTrue(numC.mult(5).equals(new Complex(15, -25)));
    });

    it('returns the product of a Complex number', () => {
      const numA = new Complex(2, 3);
      const numB = new Complex(-4, 2);
      const numC = new Complex(3, -5);

      assert.isTrue(numA.mult(numB).equals(new Complex(-14, -8)));
      assert.isTrue(numA.mult(numC).equals(new Complex(21, -1)));
      assert.isTrue(numB.mult(numC).equals(new Complex(-2, 26)));
    });

    it('does not modify the original number', () => {
      const num = new Complex(2, 7);
      num.mult(4);
      assert.isTrue(num.equals(new Complex(2, 7)));
    });
  });

  describe('#div', () => {
    it('returns the quotient of a real number', () => {
      const numA = new Complex(2, -4);
      const numB = new Complex(-6, 9);

      assert.isTrue(numA.div(2).equals(new Complex(1, -2)));
      assert.isTrue(numB.div(3).equals(new Complex(-2, 3)));
    });

    it('returns the quotient of a Complex', () => {
      const numer = new Complex(-25, 15);
      const denom = new Complex(1, -2);

      assert.isTrue(numer.div(denom).equals(new Complex(-11, -7)));
    });

    it('does not modify the original number', () => {
      const num = new Complex(2, 7);
      num.div(4);
      assert.isTrue(num.equals(new Complex(2, 7)));
    });
  });

  describe('#pow', () => {
    it('works exactly for natural powers', () => {
      const numA = new Complex(3, -2);
      const res = numA.pow(6);
      assert.equal(res.a, -2035);
      assert.equal(res.b, 828);
    });

    it('works for complex powers', () => {
      const numA = new Complex(3, -2);
      const numB = new Complex(-1, 5);
      const res = numA.pow(numB);
      assert.approximately(res.a, 3.95396, TOLERANCE);
      assert.approximately(res.b, 3.44829, TOLERANCE);
    });

    it('confirms euler\'s identity', () => {
      const e = new Complex(Math.E);
      const ipi = new Complex(0, Math.PI);
      const res = e.pow(ipi);
      assert.approximately(res.a, -1, TOLERANCE);
      assert.approximately(res.b, 0, TOLERANCE);
    });
  });
});

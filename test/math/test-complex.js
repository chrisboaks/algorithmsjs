const assert = require('chai').assert;

import {Complex} from '../../source/math/complex';

describe('Complex', function() {

  describe('#constructor', function() {
    it('throws if passed an invalid arg', function() {
      assert.throws(function() {
        new Complex('cat');
      }, 'invalid arg passed to Complex constructor');
      assert.throws(function() {
        new Complex(3, 'cat');
      }, 'invalid arg passed to Complex constructor');
      assert.throws(function() {
        new Complex('cat', 3);
      }, 'invalid arg passed to Complex constructor');
    });

    it('does not throw if passed no args', function() {
      assert.doesNotThrow(function() {
        new Complex();
      });
    });

    it('does not throw if passed a Complex number', function() {
      assert.doesNotThrow(function() {
        new Complex(new Complex());
      });
    });

    it('does not throw if passed a single numerical arg', function() {
      assert.doesNotThrow(function() {
        new Complex(3.5);
      });
    });

    it('does not throw if passed two numerical args', function() {
      assert.doesNotThrow(function() {
        new Complex(3.5, 1.3);
      });
    });
  });

  describe('attributes', function() {
    it('allows the user to directly get a and b', function() {
      const num = new Complex(3, 4);
      assert.equal(num.a, 3);
      assert.equal(num.b, 4);
    });

    it('does not allow the user to directly set a or b', function() {
      const num = new Complex(3, 4);
      assert.throws(function() {
        num.a = 7;
      }, 'Cannot set property a');
      assert.equal(num.a, 3);

      assert.throws(function() {
        num.b = 7;
      }, 'Cannot set property b');
      assert.equal(num.b, 4);
    });
  });

  describe('#toString', function() {
    it('correctly renders the number as a string', function() {
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

  describe('#equals', function() {
    it('determines equality with a natural number', function() {
      assert.isTrue(new Complex(3, 0).equals(3));
      assert.isTrue(new Complex(3).equals(3));

      assert.isFalse(new Complex(3, 4).equals(3));
      assert.isFalse(new Complex(3).equals(4));
    });

    it('determines equality with a Complex', function() {
      const num = new Complex(3, 4);

      assert.isTrue(num.equals(new Complex(3, 4)));
      assert.isFalse(num.equals(new Complex(3, -4)));
      assert.isFalse(num.equals(new Complex(3)));
      assert.isFalse(num.equals(new Complex(-3, 4)));
      assert.isFalse(num.equals(new Complex(0, 4)));
    });

    it('returns false if passed a non-number', function() {
      const num = new Complex();

      assert.isFalse(num.equals('0'));
      assert.isFalse(num.equals([]));
      assert.isFalse(num.equals({}));
    });
  });

  describe('#abs', function() {
    it('finds the absolute value for real numbers', function() {
      assert.equal(new Complex(3, 0).abs(), 3);
      assert.equal(new Complex(-4, 0).abs(), 4);
    });

    it('finds the absolute value for imaginary numbers', function() {
      assert.equal(new Complex(0, 2).abs(), 2);
      assert.equal(new Complex(0, -5).abs(), 5);
    });

    it('finds the absolute value of Complex numbers', function() {
      assert.equal(new Complex(3, 4).abs(), 5);
      assert.equal(new Complex(5, 12).abs(), 13);
    });
  });

  describe('#negate', function() {
    it('returns a negated copy of the number', function() {
      assert.isTrue(new Complex(3).negate().equals(new Complex(-3)));
      assert.isTrue(new Complex(0, 4).negate().equals(new Complex(0, -4)));
      assert.isTrue(new Complex(3, 4).negate().equals(new Complex(-3, -4)));
      assert.isTrue(new Complex(-3, -4).negate().equals(new Complex(3, 4)));
    });

    it('does not modify the original number', function() {
      const num = new Complex(3, 4);
      num.negate();
      assert.isTrue(num.equals(new Complex(3, 4)));
    });
  });

  describe('#add', function() {
    it('adds a passed real number', function() {
      const num = new Complex(2, 3);
      assert.isTrue(num.add(3).equals(new Complex(5, 3)));
      assert.isTrue(num.add(-3).equals(new Complex(-1, 3)));
    });

    it('adds a passed Complex number', function() {
      const numA = new Complex(2, 3);
      const numB = new Complex(-4, 2);
      const numC = new Complex(3, -5);
      assert.isTrue(numA.add(numB).equals(new Complex(-2, 5)));
      assert.isTrue(numA.add(numC).equals(new Complex(5, -2)));
      assert.isTrue(numB.add(numC).equals(new Complex(-1, -3)));
    });

    it('does not modify the original number', function() {
      const num = new Complex(3, 4);
      num.add(5);
      assert.isTrue(num.equals(new Complex(3, 4)));
    });
  });

  describe('#sub', function() {
    it('subtracts a passed real number', function() {
      const num = new Complex(2, 3);
      assert.isTrue(num.sub(3).equals(new Complex(-1, 3)));
      assert.isTrue(num.sub(-3).equals(new Complex(5, 3)));
    });

    it('subs a passed Complex number', function() {
      const numA = new Complex(2, 3);
      const numB = new Complex(-4, 2);
      const numC = new Complex(3, -5);
      assert.isTrue(numA.sub(numB).equals(new Complex(6, 1)));
      assert.isTrue(numA.sub(numC).equals(new Complex(-1, 8)));
      assert.isTrue(numB.sub(numC).equals(new Complex(-7, 7)));
    });

    it('does not modify the original number', function() {
      const num = new Complex(3, 4);
      num.sub(5);
      assert.isTrue(num.equals(new Complex(3, 4)));
    });
  });

  describe('#conjugate', function() {
    it('returns the complex conjugate', function() {
      assert.isTrue(new Complex(2, 3).conjugate().equals(new Complex(2, -3)));
      assert.isTrue(new Complex(2, -3).conjugate().equals(new Complex(2, 3)));
      assert.isTrue(new Complex(0, 3).conjugate().equals(new Complex(0, -3)));
      assert.isTrue(new Complex(2).conjugate().equals(new Complex(2)));
    });

    it('does not modify the original number', function() {
      const num = new Complex(3, 4);
      num.conjugate();
      assert.isTrue(num.equals(new Complex(3, 4)));
    });
  });

  describe('#clone', function() {
    it('makes a copy of the Complex number', function() {
      const orig = new Complex(2, 7);
      const copy = orig.clone();
      assert.isTrue(orig.equals(copy));
      assert.notStrictEqual(orig, copy);
    });
  });

  describe('#mult', function() {
    it('returns the product of a real number', function() {
      const numA = new Complex(2, 3);
      const numB = new Complex(-4, 2);
      const numC = new Complex(3, -5);

      assert.isTrue(numA.mult(3).equals(new Complex(6, 9)));
      assert.isTrue(numB.mult(-2).equals(new Complex(8, -4)));
      assert.isTrue(numC.mult(5).equals(new Complex(15, -25)));
    });

    it('returns the product of a Complex number', function() {
      const numA = new Complex(2, 3);
      const numB = new Complex(-4, 2);
      const numC = new Complex(3, -5);

      assert.isTrue(numA.mult(numB).equals(new Complex(-14, -8)));
      assert.isTrue(numA.mult(numC).equals(new Complex(21, -1)));
      assert.isTrue(numB.mult(numC).equals(new Complex(-2, 26)));
    });

    it('does not modify the original number', function() {
      const num = new Complex(2, 7);
      num.mult(4);
      assert.isTrue(num.equals(new Complex(2, 7)));
    });
  });

  describe('#div', function() {
    it('returns the quotient of a real number', function() {
      const numA = new Complex(2, -4);
      const numB = new Complex(-6, 9);

      assert.isTrue(numA.div(2).equals(new Complex(1, -2)));
      assert.isTrue(numB.div(3).equals(new Complex(-2, 3)));
    });

    it('returns the quotient of a Complex', function() {
      const numer = new Complex(-25, 15);
      const denom = new Complex(1, -2);

      assert.isTrue(numer.div(denom).equals(new Complex(-11, -7)));
    });

    it('does not modify the original number', function() {
      const num = new Complex(2, 7);
      num.div(4);
      assert.isTrue(num.equals(new Complex(2, 7)));
    });
  });
});

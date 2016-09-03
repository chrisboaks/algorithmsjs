const assert = require('chai').assert;

import {Factor} from '../../source/math/factor';

describe('Factor', function() {

  describe('Factor.primeFactorCount', function() {
    it('throws if given invalid input', function() {
      assert.throws(function() {
        Factor.primeFactorCount(-7);
      }, 'invalid input');
      assert.throws(function() {
        Factor.primeFactorCount(0);
      }, 'invalid input');
      assert.throws(function() {
        Factor.primeFactorCount(1.2);
      }, 'invalid input');
      assert.doesNotThrow(function() {
        Factor.primeFactorCount(7);
      });
    });

    it('returns prime factors as an object with factor counts', function() {
      const expectedTwentyfour = {2: 3, 3: 1};
      const expectedSixty = {2: 2, 3: 1, 5: 1};
      assert.deepEqual(Factor.primeFactorCount(24), expectedTwentyfour);
      assert.deepEqual(Factor.primeFactorCount(60), expectedSixty);
    });
  });

  describe('Factor.totalFactorCount', function() {
    it('throws if given invalid input', function() {
      assert.throws(function() {
        Factor.primeFactorCount(-7);
      }, 'invalid input');
      assert.throws(function() {
        Factor.primeFactorCount(0);
      }, 'invalid input');
      assert.throws(function() {
        Factor.primeFactorCount(1.2);
      }, 'invalid input');
      assert.doesNotThrow(function() {
        Factor.primeFactorCount(7);
      });
    });

    it('returns the total number of factors of a number', function() {
      assert.equal(Factor.totalFactorCount(28), 6);
      assert.equal(Factor.totalFactorCount(100), 9);
      assert.equal(Factor.totalFactorCount(7), 2);
      assert.equal(Factor.totalFactorCount(36), 9);
    });
  });

  describe('Factor.primeFactorList', function() {
    it('throws if given invalid input', function() {
      assert.throws(function() {
        Factor.primeFactorList(-7);
      }, 'invalid input');
      assert.throws(function() {
        Factor.primeFactorList(0);
      }, 'invalid input');
      assert.throws(function() {
        Factor.primeFactorList(1.2);
      }, 'invalid input');
      assert.doesNotThrow(function() {
        Factor.primeFactorList(7);
      });
    });

    it('returns prime factors as a list with possible multiples', function() {
      const expectedTwentyfour = [2, 2, 2, 3];
      const expectedSixty = [2, 2, 3, 5];
      assert.deepEqual(Factor.primeFactorList(24), expectedTwentyfour);
      assert.deepEqual(Factor.primeFactorList(60), expectedSixty);
    });
  });

  describe('Factor.gcd', function() {
    it('throws if given invalid inputs', function() {
      assert.throws(function() {
        Factor.gcd(3, 4.1);
      }, 'invalid inputs');
      assert.throws(function() {
        Factor.gcd(1.2, 3);
      }, 'invalid inputs');
      assert.doesNotThrow(function() {
        Factor.gcd(7, 4);
      });
      assert.doesNotThrow(function() {
        Factor.gcd(-7, 4);
      });
      assert.doesNotThrow(function() {
        Factor.gcd(7, -4);
      });
    });

    it('returns the gcd of coprime numbers as 1', function() {
      assert.equal(Factor.gcd(10, 21), 1);
    });

    it('returns the gcd of non-coprime numbers', function() {
      assert.equal(Factor.gcd(24, 60), 12);
    });

    it('returns gcd when one arg is 0', function() {
      assert.equal(Factor.gcd(3, 0), 3);
      assert.equal(Factor.gcd(0, 3), 3);
    });

    it('returns a positive gcd regardless of the signs of the inputs', function() {
      assert.isAbove(Factor.gcd(-2, -2), 0);
      assert.isAbove(Factor.gcd(2, -2), 0);
      assert.isAbove(Factor.gcd(-2, 2), 0);
    });
  });

  describe('Factor.lcm', function() {
    it('throws if given invalid inputs', function() {
      assert.throws(function() {
        Factor.lcm(3, 4.1);
      }, 'invalid inputs');
      assert.throws(function() {
        Factor.lcm(1.2, 3);
      }, 'invalid inputs');
      assert.doesNotThrow(function() {
        Factor.lcm(7, 4);
      });
      assert.doesNotThrow(function() {
        Factor.lcm(-7, 4);
      });
      assert.doesNotThrow(function() {
        Factor.lcm(7, -4);
      });
    });

    it('returns the lcm of coprime numbers', function() {
      assert.equal(Factor.lcm(10, 21), 210);
    });

    it('returns the lcm of non-coprime numbers', function() {
      assert.equal(Factor.lcm(21, 6), 42);
    });

    it('returns 0 if one arg is 0', function() {
      assert.equal(Factor.lcm(3, 0), 0);
      assert.equal(Factor.lcm(0, 3), 0);
    });

    it('returns a positive lcm regardless of the signs of the inputs', function() {
      assert.isAbove(Factor.lcm(-2, -2), 0);
      assert.isAbove(Factor.lcm(2, -2), 0);
      assert.isAbove(Factor.lcm(-2, 2), 0);
    });
  });

  describe('Factor.isCoprime', function() {
    it('throws if given invalid inputs', function() {
      assert.throws(function() {
        Factor.isCoprime(3, 4.1);
      }, 'invalid inputs');
      assert.throws(function() {
        Factor.isCoprime(1.2, 3);
      }, 'invalid inputs');
      assert.doesNotThrow(function() {
        Factor.isCoprime(7, 4);
      });
      assert.doesNotThrow(function() {
        Factor.isCoprime(-7, 4);
      });
      assert.doesNotThrow(function() {
        Factor.isCoprime(7, -4);
      });
    });

    it('returns true if inputs are coprime', function() {
      assert.isTrue(Factor.isCoprime(1, 4));
      assert.isTrue(Factor.isCoprime(3, 4));
      assert.isTrue(Factor.isCoprime(5, 7));
      assert.isTrue(Factor.isCoprime(25, 36));
    });

    it('returns false if inputs are not coprime', function() {
      assert.isFalse(Factor.isCoprime(2, 4));
      assert.isFalse(Factor.isCoprime(6, 10));
      assert.isFalse(Factor.isCoprime(36, 15));
      assert.isFalse(Factor.isCoprime(3, 3));
    });
  });

});

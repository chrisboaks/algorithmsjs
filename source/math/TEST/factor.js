const assert = require('chai').assert;

import { Factor } from '../factor';

describe('Factor', () => {
  describe('Factor.primeFactorCount', () => {
    it('throws if given invalid input', () => {
      assert.throws(() => {
        Factor.primeFactorCount(-7);
      }, 'invalid input');
      assert.throws(() => {
        Factor.primeFactorCount(0);
      }, 'invalid input');
      assert.throws(() => {
        Factor.primeFactorCount(1.2);
      }, 'invalid input');
      assert.doesNotThrow(() => {
        Factor.primeFactorCount(7);
      });
    });

    it('returns prime factors as an object with factor counts', () => {
      const expectedTwentyfour = { 2: 3, 3: 1 };
      const expectedSixty = { 2: 2, 3: 1, 5: 1 };
      assert.deepEqual(Factor.primeFactorCount(24), expectedTwentyfour);
      assert.deepEqual(Factor.primeFactorCount(60), expectedSixty);
    });
  });

  describe('Factor.totalFactorCount', () => {
    it('throws if given invalid input', () => {
      assert.throws(() => {
        Factor.primeFactorCount(-7);
      }, 'invalid input');
      assert.throws(() => {
        Factor.primeFactorCount(0);
      }, 'invalid input');
      assert.throws(() => {
        Factor.primeFactorCount(1.2);
      }, 'invalid input');
      assert.doesNotThrow(() => {
        Factor.primeFactorCount(7);
      });
    });

    it('returns the total number of factors of a number', () => {
      assert.equal(Factor.totalFactorCount(28), 6);
      assert.equal(Factor.totalFactorCount(100), 9);
      assert.equal(Factor.totalFactorCount(7), 2);
      assert.equal(Factor.totalFactorCount(36), 9);
    });
  });

  describe('Factor.primeFactorList', () => {
    it('throws if given invalid input', () => {
      assert.throws(() => {
        Factor.primeFactorList(-7);
      }, 'invalid input');
      assert.throws(() => {
        Factor.primeFactorList(0);
      }, 'invalid input');
      assert.throws(() => {
        Factor.primeFactorList(1.2);
      }, 'invalid input');
      assert.doesNotThrow(() => {
        Factor.primeFactorList(7);
      });
    });

    it('returns prime factors as a list with possible multiples', () => {
      const expectedTwentyfour = [2, 2, 2, 3];
      const expectedSixty = [2, 2, 3, 5];
      assert.deepEqual(Factor.primeFactorList(24), expectedTwentyfour);
      assert.deepEqual(Factor.primeFactorList(60), expectedSixty);
    });
  });

  describe('Factor.properFactors', () => {
    it('throws if given invalid input', () => {
      assert.throws(() => {
        Factor.properFactors(-7);
      }, 'invalid input');
      assert.throws(() => {
        Factor.properFactors(0);
      }, 'invalid input');
      assert.throws(() => {
        Factor.properFactors(1.2);
      }, 'invalid input');
      assert.doesNotThrow(() => {
        Factor.properFactors(7);
      });
    });

    it('handles 1', () => {
      assert.deepEqual(Factor.properFactors(1), [1]);
    });

    it('returns proper factors as a sorted list', () => {
      const expected = [1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110];
      assert.deepEqual(Factor.properFactors(220), expected);
      assert.deepEqual(Factor.properFactors(284), [1, 2, 4, 71, 142]);
    });
  });

  describe('Factor.gcd', () => {
    it('throws if given invalid inputs', () => {
      assert.throws(() => {
        Factor.gcd(3, 4.1);
      }, 'invalid inputs');
      assert.throws(() => {
        Factor.gcd(1.2, 3);
      }, 'invalid inputs');
      assert.doesNotThrow(() => {
        Factor.gcd(7, 4);
      });
      assert.doesNotThrow(() => {
        Factor.gcd(-7, 4);
      });
      assert.doesNotThrow(() => {
        Factor.gcd(7, -4);
      });
    });

    it('returns the gcd of coprime numbers as 1', () => {
      assert.equal(Factor.gcd(10, 21), 1);
    });

    it('returns the gcd of non-coprime numbers', () => {
      assert.equal(Factor.gcd(24, 60), 12);
    });

    it('returns gcd when one arg is 0', () => {
      assert.equal(Factor.gcd(3, 0), 3);
      assert.equal(Factor.gcd(0, 3), 3);
    });

    it('returns a positive gcd regardless of the signs of the inputs', () => {
      assert.isAbove(Factor.gcd(-2, -2), 0);
      assert.isAbove(Factor.gcd(2, -2), 0);
      assert.isAbove(Factor.gcd(-2, 2), 0);
    });
  });

  describe('Factor.lcm', () => {
    it('throws if given invalid inputs', () => {
      assert.throws(() => {
        Factor.lcm(3, 4.1);
      }, 'invalid inputs');
      assert.throws(() => {
        Factor.lcm(1.2, 3);
      }, 'invalid inputs');
      assert.doesNotThrow(() => {
        Factor.lcm(7, 4);
      });
      assert.doesNotThrow(() => {
        Factor.lcm(-7, 4);
      });
      assert.doesNotThrow(() => {
        Factor.lcm(7, -4);
      });
    });

    it('returns the lcm of coprime numbers', () => {
      assert.equal(Factor.lcm(10, 21), 210);
    });

    it('returns the lcm of non-coprime numbers', () => {
      assert.equal(Factor.lcm(21, 6), 42);
    });

    it('returns 0 if one arg is 0', () => {
      assert.equal(Factor.lcm(3, 0), 0);
      assert.equal(Factor.lcm(0, 3), 0);
    });

    it('returns a positive lcm regardless of the signs of the inputs', () => {
      assert.isAbove(Factor.lcm(-2, -2), 0);
      assert.isAbove(Factor.lcm(2, -2), 0);
      assert.isAbove(Factor.lcm(-2, 2), 0);
    });
  });

  describe('Factor.isCoprime', () => {
    it('throws if given invalid inputs', () => {
      assert.throws(() => {
        Factor.isCoprime(3, 4.1);
      }, 'invalid inputs');
      assert.throws(() => {
        Factor.isCoprime(1.2, 3);
      }, 'invalid inputs');
      assert.doesNotThrow(() => {
        Factor.isCoprime(7, 4);
      });
      assert.doesNotThrow(() => {
        Factor.isCoprime(-7, 4);
      });
      assert.doesNotThrow(() => {
        Factor.isCoprime(7, -4);
      });
    });

    it('returns true if inputs are coprime', () => {
      assert.isTrue(Factor.isCoprime(1, 4));
      assert.isTrue(Factor.isCoprime(3, 4));
      assert.isTrue(Factor.isCoprime(5, 7));
      assert.isTrue(Factor.isCoprime(25, 36));
    });

    it('returns false if inputs are not coprime', () => {
      assert.isFalse(Factor.isCoprime(2, 4));
      assert.isFalse(Factor.isCoprime(6, 10));
      assert.isFalse(Factor.isCoprime(36, 15));
      assert.isFalse(Factor.isCoprime(3, 3));
    });
  });
});

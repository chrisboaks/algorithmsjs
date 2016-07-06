const assert = require('chai').assert;

import {Factor} from '../source/math/factor';

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
        Factor.gcd(-7, 3);
      }, 'invalid inputs');
      assert.throws(function() {
        Factor.gcd(3, 0);
      }, 'invalid inputs');
      assert.throws(function() {
        Factor.gcd(1.2, 3);
      }, 'invalid inputs');
      assert.doesNotThrow(function() {
        Factor.gcd(7, 4);
      });
    });

    it('returns the gcd of coprime numbers as 1', function() {
      assert.equal(Factor.gcd(10, 21), 1);
    });
    
    it('returns the gcd of non-coprime numbers', function() {
      assert.equal(Factor.gcd(24, 60), 12);
    });
  });

  describe('Factor.gcd', function() {
    it('throws if given invalid inputs', function() {
      assert.throws(function() {
        Factor.gcd(-7, 3);
      }, 'invalid inputs');
      assert.throws(function() {
        Factor.gcd(3, 0);
      }, 'invalid inputs');
      assert.throws(function() {
        Factor.gcd(1.2, 3);
      }, 'invalid inputs');
      assert.doesNotThrow(function() {
        Factor.gcd(7, 4);
      });
    });
    
    it('returns the lcm of coprime numbers', function() {
      assert.equal(Factor.lcm(10, 21), 210);
    });
    
    it('returns the lcm of non-coprime numbers', function() {
      assert.equal(Factor.lcm(21, 6), 42);
    });
  });
});

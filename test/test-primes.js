const assert = require('chai').assert;

import {primes} from '../source/math/primes';

describe ('primes', function() {
  it('throws an error for invalid indices', function() {
    assert.throws(function() {
      primes(-1);
    }, 'invalid max number');
    assert.doesNotThrow(function() {
      primes(0);
      primes(16);
    });
  });
  it('finds primes less than the given limit', function() {
    const expectedTen = [ 2, 3, 5, 7 ];
    const expectedHundred = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ];
    const expectedTwenty = [ 2, 3, 5, 7, 11, 13, 17, 19 ];
    assert.deepEqual(primes(10), expectedTen);
    assert.deepEqual(primes(100), expectedHundred);
    assert.deepEqual(primes(20), expectedTwenty);
  });
});

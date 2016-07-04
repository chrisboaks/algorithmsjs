const assert = require('chai').assert;

import {fibonacci} from '../source/math/fibonacci';

describe ('fibonacci', function() {
  it('throws an error for invalid indices', function() {
    assert.throws(function() {
      fibonacci(0);
    }, 'invalid index number');
    assert.doesNotThrow(function() {
      fibonacci(1);
    });
  });
  it('calculates values of the fibonacci sequence', function() {
    const expectedSeven = [ 1, 1, 2, 3, 5, 8, 13 ];
    const expectedTen = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ];
    assert.deepEqual(fibonacci(7), expectedSeven);
    assert.deepEqual(fibonacci(10), expectedTen);
  });
});

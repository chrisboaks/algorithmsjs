const assert = require('chai').assert;

import {collatz} from '../source/math/collatz';

describe ('collatz', function() {
  it('throws an error for invalid indices', function() {
    assert.throws(function() {
      collatz(0);
    }, 'invalid index number');
    assert.doesNotThrow(function() {
      collatz(1);
    });
  });
  it("calculates rows of pascal's triangle", function() {
    const expectedSeven = [ 7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1 ];
    const expectedSeventeen = [ 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1 ];
    assert.deepEqual(collatz(7), expectedSeven);
    assert.deepEqual(collatz(17), expectedSeventeen);
  });
});

const assert = require('chai').assert;

import {pascal} from '../source/math/pascal';

describe ('pascal', function() {
  it("calculates rows of pascal's triangle", function() {
    const expectedRowFive = [1, 4, 6, 4, 1];
    const expectedRowTen = [1, 9, 36, 84, 126, 126, 84, 36, 9, 1];
    assert.deepEqual(pascal(5), expectedRowFive);
    assert.deepEqual(pascal(10), expectedRowTen);
  });
});

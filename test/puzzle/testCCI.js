import {CCI} from '../../source/puzzle/exports';

const assert = require('chai').assert;

describe('Cracking the Coding Interview', function() {

  it('solves cci16_01', function() {
    const fn = CCI.cci16_01;
    assert.deepEqual(fn([3, 5]), [5, 3]);
    assert.deepEqual(fn([3, -5]), [-5, 3]);
    assert.deepEqual(fn([-3, 5]), [5, -3]);
    assert.deepEqual(fn([-3, -5]), [-5, -3]);
  });

});

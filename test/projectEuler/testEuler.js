const assert = require('chai').assert;

import euler001 from '../../source/projectEuler/euler001';
import euler002 from '../../source/projectEuler/euler002';
import euler003 from '../../source/projectEuler/euler003';
import euler004 from '../../source/projectEuler/euler004';

describe('Project Euler', function() {
  it('solves euler001', function() {
    assert.equal(euler001(), 233168);
  });

  it('solves euler002', function() {
    assert.equal(euler002(), 4613732);
  });

  it('solves euler003', function() {
    assert.equal(euler003(), 6857);
  });

  it('solves euler004', function() {
    assert.equal(euler004(), 906609);
  });
});

const assert = require('chai').assert;

import {intToRoman} from '../../source/string/intToRoman';
// I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1,000


describe('intToRoman', function() {
  const msg = 'invalid input';
  it('throws for non-numerical inputs, inputs > 3999, and floats', function() {
    assert.throws(function() {
      intToRoman('cat');
    }, msg);

    assert.throws(function() {
      intToRoman();
    }, msg);

    assert.throws(function() {
      intToRoman(4000);
    }, msg);

    assert.throws(function() {
      intToRoman(5000);
    }, msg);

    assert.throws(function() {
      intToRoman(2.3);
    }, msg);

    assert.doesNotThrow(function() {
      intToRoman(3999);
    }, msg);

    assert.doesNotThrow(function() {
      intToRoman(15);
    }, msg);
  });

  it('handles zero', function() {
    assert.equal(intToRoman(0), '');
  });

  it('handles clock face numbers', function() {
    assert.equal(intToRoman(1), 'I');
    assert.equal(intToRoman(2), 'II');
    assert.equal(intToRoman(3), 'III');
    assert.equal(intToRoman(4), 'IV');
    assert.equal(intToRoman(5), 'V');
    assert.equal(intToRoman(6), 'VI');
    assert.equal(intToRoman(7), 'VII');
    assert.equal(intToRoman(8), 'VIII');
    assert.equal(intToRoman(9), 'IX');
    assert.equal(intToRoman(10), 'X');
    assert.equal(intToRoman(11), 'XI');
    assert.equal(intToRoman(12), 'XII');
  });

  it('handles numbers below 100', function() {
    assert.equal(intToRoman(23), 'XXIII');
    assert.equal(intToRoman(48), 'XLVIII');
    assert.equal(intToRoman(75), 'LXXV');
    assert.equal(intToRoman(84), 'LXXXIV');
    assert.equal(intToRoman(99), 'XCIX');
  });

  it('handles numbers > 100', function() {
    assert.equal(intToRoman(302), 'CCCII');
    assert.equal(intToRoman(444), 'CDXLIV');
    assert.equal(intToRoman(510), 'DX');
    assert.equal(intToRoman(798), 'DCCXCVIII');
    assert.equal(intToRoman(983), 'CMLXXXIII');
  });

  it('handles numbers > 1000', function() {
    assert.equal(intToRoman(1302), 'MCCCII');
    assert.equal(intToRoman(2444), 'MMCDXLIV');
    assert.equal(intToRoman(3510), 'MMMDX');
    assert.equal(intToRoman(1798), 'MDCCXCVIII');
    assert.equal(intToRoman(2983), 'MMCMLXXXIII');
  });

});

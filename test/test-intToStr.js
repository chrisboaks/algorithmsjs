const assert = require('chai').assert;

import {intToStr} from '../source/string/intToStr';

describe('intToStr', function() {
  it('handles zero', function() {
    assert.equal(intToStr(0), 'zero');
  });

  it('handles teens', function() {
    assert.equal(intToStr(11), 'eleven');
  });

  it('handles even tens', function() {
    assert.equal(intToStr(40), 'forty');
  });

  it('handles even hundreds', function() {
    assert.equal(intToStr(300), 'three hundred');
  });

  it('handles numbers > 100', function() {
    assert.equal(intToStr(313), 'three hundred thirteen');
    assert.equal(intToStr(310), 'three hundred ten');
    assert.equal(intToStr(301), 'three hundred one');
  });

  it('handles numbers > 1000', function() {
    assert.equal(intToStr(4313), 'four thousand three hundred thirteen');
  });

  it('handles large numbers with many zeros', function() {
    assert.equal(intToStr(4000000313), 'four billion three hundred thirteen');
  });

  it('handles general large numbers', function() {
    assert.equal(intToStr(4210313475), 'four billion two hundred ten million three hundred thirteen thousand four hundred seventy five');
  })

})

0
20
13
313
4313
4000313
4000000313

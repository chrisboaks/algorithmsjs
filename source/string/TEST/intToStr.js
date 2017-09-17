const assert = require('chai').assert;

import {intToStr} from '../intToStr';

describe('intToStr', () => {
  it('handles zero', () => {
    assert.equal(intToStr(0), 'zero');
  });

  it('handles teens', () => {
    assert.equal(intToStr(11), 'eleven');
  });

  it('handles even tens', () => {
    assert.equal(intToStr(40), 'forty');
  });

  it('handles even hundreds', () => {
    assert.equal(intToStr(300), 'three hundred');
  });

  it('handles numbers > 100', () => {
    assert.equal(intToStr(375), 'three hundred seventy-five');
    assert.equal(intToStr(313), 'three hundred thirteen');
    assert.equal(intToStr(310), 'three hundred ten');
    assert.equal(intToStr(301), 'three hundred one');
  });

  it('handles numbers > 1000', () => {
    assert.equal(intToStr(4313), 'four thousand three hundred thirteen');
  });

  it('handles large numbers with many zeros', () => {
    assert.equal(intToStr(4000000313), 'four billion three hundred thirteen');
  });

  it('handles general large numbers', () => {
    assert.equal(intToStr(4210313435), 'four billion two hundred ten million three hundred thirteen thousand four hundred thirty-five');
  });

  it('can write numbers in the british style', () => {
    assert.equal(intToStr(0, true), 'zero');
    assert.equal(intToStr(11, true), 'eleven');
    assert.equal(intToStr(40, true), 'forty');
    assert.equal(intToStr(300, true), 'three hundred');
    assert.equal(intToStr(375, true), 'three hundred and seventy-five');
    assert.equal(intToStr(313, true), 'three hundred and thirteen');
    assert.equal(intToStr(310, true), 'three hundred and ten');
    assert.equal(intToStr(301, true), 'three hundred and one');
    assert.equal(intToStr(4313, true), 'four thousand three hundred and thirteen');
    assert.equal(intToStr(4000000313, true), 'four billion three hundred and thirteen');
    assert.equal(intToStr(4210313435, true), 'four billion two hundred and ten million three hundred and thirteen thousand four hundred and thirty-five');
  });

});

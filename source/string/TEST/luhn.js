const assert = require('chai').assert;

import {luhn} from '../luhn';

describe('Luhn algorithm', () => {
  it('throws for non-numerical inputs', () => {
    const msg = 'invalid input';

    assert.throws(() => { luhn(''); }, msg);
    assert.throws(() => { luhn('xyz'); }, msg);
    assert.throws(() => { luhn('123xyz123'); }, msg);
    assert.throws(() => { luhn('123^123'); }, msg);
    assert.doesNotThrow(() => { luhn('123'); });
    assert.doesNotThrow(() => { luhn(123); });
  });

  it('returns true for valid credit card numbers', () => {
    // https://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm
    assert.isTrue(luhn('378282246310005'));
    assert.isTrue(luhn('371449635398431'));
    assert.isTrue(luhn('378734493671000'));
    assert.isTrue(luhn('5610591081018250'));
    assert.isTrue(luhn('30569309025904'));
    assert.isTrue(luhn('38520000023237'));
    assert.isTrue(luhn('6011111111111117'));
    assert.isTrue(luhn('6011000990139424'));
    assert.isTrue(luhn('3530111333300000'));
    assert.isTrue(luhn('3566002020360505'));
    assert.isTrue(luhn('5555555555554444'));
    assert.isTrue(luhn('5105105105105100'));
    assert.isTrue(luhn('4111111111111111'));
    assert.isTrue(luhn('4012888888881881'));
  });

  it('returns false for invalid numbers', () => {
    assert.isFalse(luhn('37828224631000'));
    assert.isFalse(luhn('37144963539843'));
    assert.isFalse(luhn('37873449367100'));
    assert.isFalse(luhn('561059108101825'));
    assert.isFalse(luhn('3056930902590'));
    assert.isFalse(luhn('3852000002323'));
    assert.isFalse(luhn('601111111111111'));
    assert.isFalse(luhn('601100099013942'));
    assert.isFalse(luhn('353011133330000'));
    assert.isFalse(luhn('356600202036050'));
    assert.isFalse(luhn('555555555555444'));
    assert.isFalse(luhn('510510510510510'));
    assert.isFalse(luhn('411111111111111'));
    assert.isFalse(luhn('401288888888188'));
  });
});

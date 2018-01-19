import { MISC } from '../exports';

const assert = require('chai').assert;

describe('Miscellaneous puzzle problems', () => {
  it('solves misc001', () => {
    assert.equal(MISC.misc001(), 1760);
  });
});

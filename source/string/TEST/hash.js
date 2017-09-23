const assert = require('chai').assert;

import { hash } from '../hash';

describe('hash', () => {
  it('hashes hashes individual characters to their character code', () => {
    assert.equal(hash('c'), 'c'.charCodeAt(0));
    assert.equal(hash('d'), 'd'.charCodeAt(0));
  });

  it('hashes strings consistently', () => {
    const rv1 = hash('test string');
    const rv2 = hash('test string');
    assert.equal(rv1, rv2);
  });
});

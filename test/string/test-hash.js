const assert = require('chai').assert;

import {hash} from '../../source/string/hash';

describe('hash', function() {
  it('hashes hashes individual characters to their character code', function() {
    assert.equal(hash('c'), 'c'.charCodeAt(0));
    assert.equal(hash('d'), 'd'.charCodeAt(0));
  });

  it('hashes strings consistently', function() {
    const rv1 = hash('test string');
    const rv2 = hash('test string');
    assert.equal(rv1, rv2);
  });
});

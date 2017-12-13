const assert = require('chai').assert;

import { Trie } from '../trie';

describe('Trie', () => {
  describe('#constructor', () => {
    it('terminates if no input is given', () => {
      const trie = new Trie();
      assert.isTrue(trie.terminates);
    });

    it('automatically creates subtries if a string is passed', () => {
      const trie = new Trie('cat');
      assert.isTrue(trie.c.a.t.terminates);
    });

    it('throws if passed a non-string', () => {
      assert.throws(() => {
        new Trie(123);
      }, 'invalid argument passed to Trie constructor');
    });
  });

  describe('#add', () => {
    it('properly adds strings with the same prefix', () => {
      const trie = new Trie();
      trie.add('car');
      trie.add('cat');
      assert.isTrue(trie.c.a.r.terminates);
      assert.isTrue(trie.c.a.t.terminates);
    });

    it('properly adds strings that overlap previous entries', () => {
      const trie = new Trie();
      trie.add('car');
      trie.add('cars');
      assert.isTrue(trie.c.a.r.terminates);
      assert.isTrue(trie.c.a.r.s.terminates);
    });

    it('properly adds strings that are overlapped by previous entries', () => {
      const trie = new Trie();
      trie.add('cars');
      trie.add('car');
      assert.isTrue(trie.c.a.r.s.terminates);
      assert.isTrue(trie.c.a.r.terminates);
    });

    it('properly adds brand new strings', () => {
      const trie = new Trie();
      trie.add('car');
      trie.add('pan');
      assert.isTrue(trie.c.a.r.terminates);
      assert.isTrue(trie.p.a.n.terminates);
    });
  });

  describe('#exists', () => {
    it('returns true when a full string is in the trie', () => {
      const trie = new Trie();
      trie.add('car');
      assert.isTrue(trie.exists('car'));
    });

    it('returns false if only a substring is in the trie', () => {
      const trie = new Trie();
      trie.add('car');
      assert.isFalse(trie.exists('cars'));
    });

    it('returns false if only a superstring is in the trie', () => {
      const trie = new Trie();
      trie.add('car');
      assert.isFalse(trie.exists('ca'));
    });
  });

  describe('#validPrefix', () => {
    it('returns true if a prefix exists in the trie', () => {
      var trie = new Trie();
      trie.add('cat');
      trie.add('hat');
      assert.isTrue(trie.validPrefix('ha'));
    });

    it('returns false if a prefix does not exist in the trie', () => {
      var trie = new Trie();
      trie.add('cat');
      trie.add('hat');
      assert.isFalse(trie.validPrefix('xa'));
    });
  });

  describe('#startsWith', () => {
    it('returns a list of strings that begin with the input', () => {
      var trie = new Trie();
      trie.add('cat');
      trie.add('hat');
      trie.add('hid');
      trie.add('help');
      assert.sameDeepMembers(trie.startsWith('h'), ['hat', 'hid', 'help']);
    });

    it('returns an empty list if no known strings begin with the input', () => {
      var trie = new Trie();
      trie.add('cat');
      trie.add('hat');
      assert.deepEqual(trie.startsWith('x'), []);
    });

    it('includes strings that equal the starting string', () => {
      var trie = new Trie();
      trie.add('cat');
      trie.add('hat');
      trie.add('hatch');
      trie.add('hats');
      trie.add('hid');
      assert.sameDeepMembers(trie.startsWith('hat'), ['hat', 'hatch', 'hats']);
    });
  });
});

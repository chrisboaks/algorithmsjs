const assert = require('chai').assert;

import {sortChars, isAnagram, anagramsOf} from '../anagram';

describe('Anagrams', function() {
  describe('sortChars', function() {
    it('sorts the characters in a string', function() {
      assert.equal(sortChars('characters'), 'aaccehrrst');
      assert.equal(sortChars('alongerstringofcharacters'), 'aaacceefgghilnnoorrrrsstt');
    });

    it('automatically downcases the characters', function() {
      assert.equal(sortChars('cHAraCtERs'), 'aaccehrrst');
    });
  });

  describe('isAnagram', function() {
    it('determines whether two strings are anagrams', function() {
      assert.isTrue(isAnagram('rescued', 'secured'));
      assert.isTrue(isAnagram('ripples', 'slipper'));
      assert.isFalse(isAnagram('rescued', 'crudesa'));
      assert.isFalse(isAnagram('ripples', 'slapper'));
    });
  });

  describe('anagramsOf', function() {
    it('returns anagrams of the input (not including that input)', function() {
      assert.deepEqual(anagramsOf('slipper'), ['lippers', 'ripples']);
      assert.deepEqual(anagramsOf('trashed'), ['dearths', 'hardest', 'hardset', 'hatreds', 'threads']);
      assert.deepEqual(anagramsOf('trashde'), ['dearths', 'hardest', 'hardset', 'hatreds', 'threads', 'trashed']);
    });
  });
});

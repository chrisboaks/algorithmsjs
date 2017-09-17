const assert = require('chai').assert;

import {sortChars, isAnagram, anagramsOf} from '../anagram';

describe('Anagrams', () => {
  describe('sortChars', () => {
    it('sorts the characters in a string', () => {
      assert.equal(sortChars('characters'), 'aaccehrrst');
      assert.equal(sortChars('alongerstringofcharacters'), 'aaacceefgghilnnoorrrrsstt');
    });

    it('automatically downcases the characters', () => {
      assert.equal(sortChars('cHAraCtERs'), 'aaccehrrst');
    });
  });

  describe('isAnagram', () => {
    it('determines whether two strings are anagrams', () => {
      assert.isTrue(isAnagram('rescued', 'secured'));
      assert.isTrue(isAnagram('ripples', 'slipper'));
      assert.isFalse(isAnagram('rescued', 'crudesa'));
      assert.isFalse(isAnagram('ripples', 'slapper'));
    });
  });

  describe('anagramsOf', () => {
    it('returns anagrams of the input (not including that input)', () => {
      assert.deepEqual(anagramsOf('slipper'), ['lippers', 'ripples']);
      assert.deepEqual(anagramsOf('trashed'), ['dearths', 'hardest', 'hardset', 'hatreds', 'threads']);
      assert.deepEqual(anagramsOf('trashde'), ['dearths', 'hardest', 'hardset', 'hatreds', 'threads', 'trashed']);
    });
  });
});

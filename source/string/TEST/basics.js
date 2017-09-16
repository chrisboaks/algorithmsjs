const assert = require('chai').assert;

import {isPalindrome, reverse, charCount, reverseEach} from '../basics';

describe('Basic string functionality', function() {
  describe('isPalindrome', function() {
    it('returns true if the input is a palindrome', function() {
      assert.isTrue(isPalindrome('hannah'));
      assert.isTrue(isPalindrome('level'));
    });

    it('returns false if the input is not a palindrome', function() {
      assert.isFalse(isPalindrome('taco'));
      assert.isFalse(isPalindrome('string'));
    });

    it('ignores case', function() {
      assert.isTrue(isPalindrome('Hannah'));
      assert.isTrue(isPalindrome('hANnah'));
      assert.isTrue(isPalindrome('HanNAh'));
    });
  });

  describe('reverse', function() {
    it('reverses a string', function() {
      assert.equal(reverse('chris'), 'sirhc');
      assert.equal(reverse('string'), 'gnirts');
    });
  });

  describe('reverseEach', function() {
    it('reverses each word in a string and maintains overall order', function() {
      assert.equal(reverseEach('hello how are you today'), 'olleh woh era uoy yadot');
      assert.equal(reverseEach('fine thank you very much'), 'enif knaht uoy yrev hcum');
    });
  });

  describe('charCount', function() {
    it('returns an object with the counts of each character in the input', function() {
      assert.deepEqual(charCount('cat'), {c: 1, a: 1, t: 1});
      assert.deepEqual(charCount('characters'), {c: 2, h: 1, a: 2, r: 2, t: 1, e: 1, s: 1});
    });
  });
});

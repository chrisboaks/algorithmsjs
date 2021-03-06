const assert = require('chai').assert;

import {
  caesar,
  isPalindrome,
  reverse,
  charCount,
  reverseEach
} from '../basics';

describe('Basic string functionality', () => {
  describe('caesar', () => {
    it('defaults to rot13', () => {
      assert.equal(caesar('test phrase'), 'grfg cuenfr');
    });

    it('allows varying offsets', () => {
      assert.equal(caesar('test phrase', 9), 'cnbc yqajbn');
    });

    it('allows negative offsets', () => {
      assert.equal(caesar('test phrase', -11), 'ithi ewgpht');
    });

    it('handles both upper and lower case', () => {
      assert.equal(caesar('TeST pHrAse', 9), 'CnBC yQaJbn');
    });

    it('leaves non-letter characters alone', () => {
      assert.equal(caesar('test [p]h.r=a1s3e5'), 'grfg [c]u.e=n1f3r5');
    });
  });

  describe('isPalindrome', () => {
    it('returns true if the input is a palindrome', () => {
      assert.isTrue(isPalindrome('hannah'));
      assert.isTrue(isPalindrome('level'));
    });

    it('returns false if the input is not a palindrome', () => {
      assert.isFalse(isPalindrome('taco'));
      assert.isFalse(isPalindrome('string'));
    });

    it('ignores case', () => {
      assert.isTrue(isPalindrome('Hannah'));
      assert.isTrue(isPalindrome('hANnah'));
      assert.isTrue(isPalindrome('HanNAh'));
    });
  });

  describe('reverse', () => {
    it('reverses a string', () => {
      assert.equal(reverse('chris'), 'sirhc');
      assert.equal(reverse('string'), 'gnirts');
    });
  });

  describe('reverseEach', () => {
    it('reverses each word in a string and maintains overall order', () => {
      assert.equal(
        reverseEach('hello how are you today'),
        'olleh woh era uoy yadot'
      );
      assert.equal(
        reverseEach('fine thank you very much'),
        'enif knaht uoy yrev hcum'
      );
    });
  });

  describe('charCount', () => {
    it('returns an object with the counts of each character in the input', () => {
      assert.deepEqual(charCount('cat'), { c: 1, a: 1, t: 1 });
      assert.deepEqual(charCount('characters'), {
        c: 2,
        h: 1,
        a: 2,
        r: 2,
        t: 1,
        e: 1,
        s: 1
      });
    });
  });
});

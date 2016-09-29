const assert = require('chai').assert;

import {
  curry,
  debounce,
  once
} from '../../source/fn/utils';

describe('utils', function() {

  describe('curry', function() {
    const addTwo = (a, b) => a + b;
    const addThree = (a, b, c) => a + b + c;
    const sqAndAdd = (a, b) => a * a + b;
    it('throws if not passed a function', function() {
      const errMsg = 'must pass a function';
      assert.throws(function() {
        curry();
      }, errMsg);
      assert.throws(function() {
        curry(3);
      }, errMsg);
      assert.throws(function() {
        curry('string');
      }, errMsg);
      assert.doesNotThrow(function() {
        curry(function() {});
      });
      assert.doesNotThrow(function() {
        curry((a, b) => a + b);
      });
    });
    it('appropriately handles functions that take different numbers of args', function() {
      const curriedAddTwo = curry(addTwo);
      const curriedAddThree = curry(addThree);
      assert.equal(curriedAddTwo(3)(4), 7);
      assert.equal(curriedAddThree(3)(4)(5), 12);
    });
    it('can handle args passed in groups or one by one and resets after use', function() {
      const curriedAddThree = curry(addThree);
      assert.equal(curriedAddThree(3)(4)(5), 12);
      assert.equal(curriedAddThree(1, 2)(3), 6);
      assert.equal(curriedAddThree(1)(1, 2), 4);
      assert.equal(curriedAddThree(2, 4, 8), 14);
    });
    it('respects order of passed args', function(){
      const curriedSqAndAdd = curry(sqAndAdd);
      assert.equal(curriedSqAndAdd(1)(2), 3);
      assert.equal(curriedSqAndAdd(2)(1), 5);
    });
  });

  describe('debounce', function() {
    it('throws if not passed a function and a wait time', function() {
      const errMsg = 'must pass a function and a wait time';
      assert.throws(function() {
        debounce();
      }, errMsg);
      assert.throws(function() {
        debounce(3);
      }, errMsg);
      assert.throws(function() {
        debounce('string');
      }, errMsg);
      assert.throws(function() {
        debounce(function() {});
      });
      assert.doesNotThrow(function() {
        debounce(function() {}, 0);
      });
    });
    it('returns a function that can only be called again after the wait time', function(done) {
      const add = (a, b) => a + b;
      const debounceAdd = debounce(add, 200);
      assert.equal(debounceAdd(3, 4), 7);
      setTimeout(function() {
        assert.isNull(debounceAdd(4, 5));
      }, 10);
      setTimeout(function() {
        assert.equal(debounceAdd(5, 6), 11);
        done();
      }, 210);
      // done();
    });
  });

  describe('once', function() {
    it('throws if not passed a function', function() {
      const errMsg = 'must pass a function';
      assert.throws(function() {
        once();
      }, errMsg);
      assert.throws(function() {
        once(3);
      }, errMsg);
      assert.throws(function() {
        once('string');
      }, errMsg);
      assert.doesNotThrow(function() {
        once(function() {});
      });
      assert.doesNotThrow(function() {
        once((a, b) => a + b);
      });
    });
  });

});

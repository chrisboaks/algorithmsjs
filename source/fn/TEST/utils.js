const assert = require('chai').assert;

import {
  curry,
  flip,
  once,
  throttle
} from '../utils';

describe('utils', () => {

  describe('curry', () => {
    const addTwo = (a, b) => a + b;
    const addThree = (a, b, c) => a + b + c;
    const sqAndAdd = (a, b) => a * a + b;
    it('throws if not passed a function', () => {
      const errMsg = 'must pass a function';
      assert.throws(() => {
        curry();
      }, errMsg);
      assert.throws(() => {
        curry(3);
      }, errMsg);
      assert.throws(() => {
        curry('string');
      }, errMsg);
      assert.doesNotThrow(() => {
        curry(() => {});
      });
      assert.doesNotThrow(() => {
        curry((a, b) => a + b);
      });
    });
    it('appropriately handles functions that take different numbers of args', () => {
      const curriedAddTwo = curry(addTwo);
      const curriedAddThree = curry(addThree);
      assert.equal(curriedAddTwo(3)(4), 7);
      assert.equal(curriedAddThree(3)(4)(5), 12);
    });
    it('can handle args passed in groups or one by one and resets after use', () => {
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

  describe('flip', () => {
    it('throws if not passed a function', () => {
      const errMsg = 'must pass a function';
      assert.throws(() => {
        flip();
      }, errMsg);
      assert.throws(() => {
        flip(3);
      }, errMsg);
      assert.throws(() => {
        flip('string');
      }, errMsg);
      assert.doesNotThrow(() => {
        flip(() => {});
      });
      assert.doesNotThrow(() => {
        flip((a, b) => a + b);
      });
    });

    it('returns a function that calls the passed function with arguments in reverse order', () => {
      const concatTwo = (a, b) => a + b;
      const concatThree = (a, b, c) => a + b + c;
      const concatTwoRev = flip(concatTwo);
      const concatThreeRev = flip(concatThree);
      assert.equal(concatTwoRev('cat', 'dog'), 'dogcat');
      assert.equal(concatThreeRev('cat', 'dog', 'fish'), 'fishdogcat');
    });
  });

  describe('once', () => {
    it('throws if not passed a function', () => {
      const errMsg = 'must pass a function';
      assert.throws(() => {
        once();
      }, errMsg);
      assert.throws(() => {
        once(3);
      }, errMsg);
      assert.throws(() => {
        once('string');
      }, errMsg);
      assert.doesNotThrow(() => {
        once(() => {});
      });
      assert.doesNotThrow(() => {
        once((a, b) => a + b);
      });
    });

    it('returns a function that can only be called once', () => {
      const addOnce = once((a, b) => a + b);
      assert.equal(addOnce(3, 4), 7);
      assert.isUndefined(addOnce(1, 2));
      assert.isUndefined(addOnce(8, 2));
    });
  });

  describe('throttle', () => {
    it('throws if not passed a function and a wait time', () => {
      const errMsg = 'must pass a function and a wait time';
      assert.throws(() => {
        throttle();
      }, errMsg);
      assert.throws(() => {
        throttle(3);
      }, errMsg);
      assert.throws(() => {
        throttle('string');
      }, errMsg);
      assert.throws(() => {
        throttle(() => {});
      });
      assert.doesNotThrow(() => {
        throttle(() => {}, 0);
      });
    });

    it('returns a function that can only be called again after the wait time', function(done) {
      const add = (a, b) => a + b;
      const throttleAdd = throttle(add, 200);
      assert.equal(throttleAdd(3, 4), 7);
      setTimeout(() => {
        assert.isNull(throttleAdd(4, 5));
      }, 10);
      setTimeout(() => {
        assert.equal(throttleAdd(5, 6), 11);
        done();
      }, 210);
    });
  });

});

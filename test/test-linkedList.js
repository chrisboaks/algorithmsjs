const assert = require('chai').assert;

import {LinkedList} from '../source/dataStructures/linkedList';

describe('LinkedList', function() {
  describe('#constructor', function() {
    it('can be constructed without values', function() {
      const list = new LinkedList();
      assert.deepEqual(list.toArray(), []);
    });

    it('can be constructed with values', function() {
      const list = new LinkedList(4, 3, 2, 1);
      assert.deepEqual(list.toArray(), [4, 3, 2, 1]);
    });
  });

  describe('#reverse', function() {
    it('handles empty lists', function() {
      const list = new LinkedList();
      const rv = list.reverse();
      assert.deepEqual(rv.toArray(), []);
    });

    it('returns a new list with the items reversed', function() {
      const list = new LinkedList(1, 2, 3, 4);
      const rv = list.reverse();
      assert.deepEqual(rv.toArray(), [4, 3, 2, 1]);
    });
  });

  describe('#push', function() {
    it('pushes on to an empty array', function() {
      const list = new LinkedList();
      list.push(4);
      assert.deepEqual(list.toArray(), [4]);
    });

    it('pushes on to a non-empty array', function() {
      const list = new LinkedList(1, 2, 3);
      list.push(4);
      assert.deepEqual(list.toArray(), [1, 2, 3, 4]);
    });

    it('returns the list itself', function() {
      const list = new LinkedList(1, 2, 3);
      const rv = list.push(4);
      assert.strictEqual(rv, list);
    });
  });

  describe('#pop', function() {
    it('returns null for an empty list', function() {
      const list = new LinkedList();
      assert.isNull(list.pop());
      assert.deepEqual(list.toArray(), []);
    });

    it('returns the value of the last item', function() {
      const oneItem = new LinkedList(1);
      const manyItems = new LinkedList(1, 2, 3, 4);
      assert.equal(oneItem.pop(), 1);
      assert.equal(manyItems.pop(), 4);
    });

    it('removes the last item', function() {
      const oneItem = new LinkedList(1);
      const manyItems = new LinkedList(1, 2, 3, 4);
      oneItem.pop();
      manyItems.pop();
      assert.deepEqual(oneItem.toArray(), []);
      assert.deepEqual(manyItems.toArray(), [1, 2, 3]);
    });
  });

  describe('#unshift', function() {
    it('unshifts on to an empty array', function() {
      const list = new LinkedList();
      list.unshift(4);
      assert.deepEqual(list.toArray(), [4]);
    });

    it('unshifts on to a non-empty array', function() {
      const list = new LinkedList(1, 2, 3);
      list.unshift(4);
      assert.deepEqual(list.toArray(), [4, 1, 2, 3]);
    });

    it('returns the list itself', function() {
      const list = new LinkedList(1, 2, 3);
      const rv = list.unshift(4);
      assert.strictEqual(rv, list);
    });
  });

  describe('#shift', function() {
    it('returns null for an empty list', function() {
      const list = new LinkedList();
      assert.isNull(list.shift());
      assert.deepEqual(list.toArray(), []);
    });

    it('returns the value of the first item', function() {
      const oneItem = new LinkedList(1);
      const manyItems = new LinkedList(2, 3, 4, 5);
      assert.equal(oneItem.shift(), 1);
      assert.equal(manyItems.shift(), 2);
    });

    it('removes the first item', function() {
      const oneItem = new LinkedList(1);
      const manyItems = new LinkedList(1, 2, 3, 4);
      oneItem.shift();
      manyItems.shift();
      assert.deepEqual(oneItem.toArray(), []);
      assert.deepEqual(manyItems.toArray(), [2, 3, 4]);
    });
  });

  describe('#length', function() {
    it('returns the length of a list', function() {
      const empty = new LinkedList();
      const withItems = new LinkedList(5, 6, 7, 8, 9, 10);
      assert.equal(empty.length(), 0);
      assert.equal(withItems.length(), 6);
    });
  });

  describe('#valAt', function() {
    it('returns null for an invalid index', function() {
      const list = new LinkedList(1, 2, 3, 4);
      assert.isNull(list.valAt(7));
    });

    it('returns the value for an index in the middle', function() {
      const list = new LinkedList(5, 10, 15, 20, 25, 30);
      assert.equal(list.valAt(2), 15);
    });

    it('returns the value for an index in the beginning', function() {
      const list = new LinkedList(5, 10, 15, 20, 25, 30);
      assert.equal(list.valAt(0), 5);
    });

    it('returns the value for an index at the end', function() {
      const list = new LinkedList(5, 10, 15, 20, 25, 30);
      assert.equal(list.valAt(5), 30);
    });
  });

  describe('#copy', function() {
    it('returns a copy of the list with the same values', function() {
      const list = new LinkedList(5, 10, 15, 20, 25, 30);
      const copy = list.copy();
      assert.deepEqual(list.toArray(), [5, 10, 15, 20, 25, 30]);
      assert.deepEqual(copy.toArray(), [5, 10, 15, 20, 25, 30]);
    });
  });

  describe('#delete', function() {
    it('returns a copy if passed an invalid index', function() {
      const list = new LinkedList(5, 10, 15, 20, 25, 30);
      const rv = list.delete(10);
      assert.deepEqual(list.toArray(), [5, 10, 15, 20, 25, 30]);
      assert.deepEqual(rv.toArray(), [5, 10, 15, 20, 25, 30]);
      assert.notStrictEqual(list, rv);
    });

    it('returns a copy with a value deleted from the middle of a list', function() {
      const list = new LinkedList(5, 10, 15, 20, 25, 30);
      const rv = list.delete(2);
      assert.deepEqual(list.toArray(), [5, 10, 15, 20, 25, 30]);
      assert.deepEqual(rv.toArray(), [5, 10, 20, 25, 30]);
      assert.notStrictEqual(list, rv);
    });

    it('returns a copy with a value deleted from the beginning of a list', function() {
      const list = new LinkedList(5, 10, 15, 20, 25, 30);
      const rv = list.delete(0);
      assert.deepEqual(list.toArray(), [5, 10, 15, 20, 25, 30]);
      assert.deepEqual(rv.toArray(), [10, 15, 20, 25, 30]);
      assert.notStrictEqual(list, rv);
    });

    it('returns a copy with a value deleted from the end of a list', function() {
      const list = new LinkedList(5, 10, 15, 20, 25, 30);
      const rv = list.delete(5);
      assert.deepEqual(list.toArray(), [5, 10, 15, 20, 25, 30]);
      assert.deepEqual(rv.toArray(), [5, 10, 15, 20, 25]);
      assert.notStrictEqual(list, rv);
    });
  });

});
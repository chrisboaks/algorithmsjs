const assert = require('chai').assert;

import {Heap} from '../heap';

describe('Heap', () => {
  describe('#constructor', () => {
    it('stores an empty array if no args are passed', () => {
      const h = new Heap();
      assert.sameMembers(h._items, []);
    });

    it('stores any passed args into the heap', () => {
      const h1 = new Heap(2, 4, 6, 8, 10);
      const h2 = new Heap(1, 1, 2, 3, 5, 8, 13);

      assert.sameMembers(h1._items, [2, 4, 6, 8, 10]);
      assert.sameMembers(h2._items, [1, 1, 2, 3, 5, 8, 13]);
    });
  });

  describe('Heap.parent', () => {
    it('finds the parent index of a given index', () => {
      assert.equal(Heap.parent(0), null);
      assert.equal(Heap.parent(1), 0);
      assert.equal(Heap.parent(2), 0);
      assert.equal(Heap.parent(7), 3);
      assert.equal(Heap.parent(8), 3);
      assert.equal(Heap.parent(9), 4);
      assert.equal(Heap.parent(10), 4);
    });
  });

  describe('Heap.left', () => {
    it('finds the left child index of a given index', () => {
      assert.equal(Heap.left(0), 1);
      assert.equal(Heap.left(1), 3);
      assert.equal(Heap.left(2), 5);
      assert.equal(Heap.left(3), 7);
      assert.equal(Heap.left(4), 9);
    });
  });

  describe('Heap.right', () => {
    it('finds the right child index of a given index', () => {
      assert.equal(Heap.right(0), 2);
      assert.equal(Heap.right(1), 4);
      assert.equal(Heap.right(2), 6);
      assert.equal(Heap.right(3), 8);
      assert.equal(Heap.right(4), 10);
    });
  });

  describe('.size', () => {
    it('returns the size of the heap', () => {
      const h1 = new Heap(2, 4, 6, 8, 10);
      const h2 = new Heap(1, 1, 2, 3, 5, 8, 13);
      h2.insert(21);

      assert.equal(h1.size, 5);
      assert.equal(h2.size, 8);
    });
  });

  describe('#insert', () => {
    it('stores the arg', () => {
      const h = new Heap(2, 4, 6, 8, 10);
      h.insert(5);
      assert.sameMembers(h._items, [2, 4, 6, 8, 10, 5]);
    });
  });

  describe('#clone', () => {
    it('clones the heap', () => {
      const h = new Heap(2, 4, 6, 8, 10);
      const rv = h.clone();
      assert.notStrictEqual(h, rv);
      assert.notStrictEqual(h._items, rv._items);
      assert.deepEqual(h._items, rv._items);
    });
  });

  describe('#extractMin', () => {
    it('extracts and returns the smallest element', () => {
      const h = new Heap(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
      const rv = h.extractMin();
      assert.equal(rv, 1);
      assert.sameMembers(h._items, [2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe('#sort', () => {
    it('returns an array of the sorted items', () => {
      const h = new Heap(7, 9, 3, 5, 1);
      h.insert(8);
      h.insert(2);
      h.insert(6);
      h.insert(10);
      h.insert(4);
      assert.deepEqual(h.sorted(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('is non-destructive to the original heap', () => {
      const h = new Heap(2, 4, 6, 8, 10);
      h.sorted();
      assert.sameMembers(h._items, [2, 4, 6, 8, 10]);
    });
  });
});

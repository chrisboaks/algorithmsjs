const assert = require('chai').assert;

import {HashTable} from '../hashTable';

describe('LinkedList', function() {
  describe('#constructor', function() {
    it('can be constructed without values', function() {
      const table = new HashTable();
      assert.deepEqual(table.items(), []);
    });

    it('can be constructed with values', function() {
      const table = new HashTable('ab', 'bc', 'cd');
      assert.sameDeepMembers(table.items(), ['ab', 'bc', 'cd']);
    });
  });

  describe('#items', function() {
    it('lists all the values in the table', function() {
      const table = new HashTable('ab', 'bc', 'cd');
      assert.sameDeepMembers(table.items(), ['ab', 'bc', 'cd']);
    });
  });

  describe('#includes', function() {
    it('returns true if the item is in the table', function() {
      const table = new HashTable('ab', 'bc', 'cd');
      assert.isTrue(table.includes('ab'));
      assert.isTrue(table.includes('bc'));
      assert.isTrue(table.includes('cd'));
    });

    it('returns false if the item is not in the table', function() {
      const table = new HashTable('ab', 'bc', 'cd');
      assert.isFalse(table.includes('def'));
    });

    it('returns false if there are no items in the table', function() {
      const table = new HashTable();
      assert.isFalse(table.includes('def'));
    });
  });

  describe('#add', function() {
    it('adds items to the table', function() {
      const table = new HashTable();
      assert.isFalse(table.includes('item'));
      table.add('item');
      assert.isTrue(table.includes('item'));
    });

    it('does not add duplicates', function() {
      const table = new HashTable();
      table.add('item');
      table.add('item');
      assert.equal(table.items().length, 1);
    });

    it('returns the updated table', function() {
      const table = new HashTable();
      const rv = table.add('item');
      assert.isTrue(rv.includes('item'));
    });

  });

  describe('#delete', function() {
    it('deletes items from the table', function() {
      const table = new HashTable('ab', 'bc', 'cd');
      assert.isTrue(table.includes('ab'));
      table.delete('ab');
      assert.isFalse(table.includes('ab'));
    });

    it('returns the updated table', function() {
      const table = new HashTable('item');
      const rv = table.delete('item');
      assert.isFalse(rv.includes('item'));
    });


  });

});

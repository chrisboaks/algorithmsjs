const assert = require('chai').assert;

import {Node, Tree} from '../../source/dataStructures/binarySearchTree';

describe('Node', function() {
  // manually construct a tree out of nodes
  const two = new Node(2);
  const threeA = new Node(3);
  const threeB = new Node(3, two, threeA);

  const nine = new Node(9);
  const thirteen = new Node(13, nine, null);
  const seven = new Node(7, null, thirteen);

  const six = new Node(6, threeB, seven);

  const seventeen = new Node(17);
  const twenty = new Node(20);
  const eighteen = new Node(18, seventeen, twenty);

  const fifteen = new Node(15, six, eighteen);

  const tree = fifteen;

  const values = [ 2, 3, 3, 6, 7, 9, 13, 15, 17, 18, 20 ];

  describe('#values', function() {
    it('can report and sort its values', function() {
      assert.deepEqual(tree.values(), values);
      assert.deepEqual(two.values(), [2]);
      assert.deepEqual(six.values(), [2, 3, 3, 6, 7, 9, 13]);
    });
  });

  describe('#next', function() {
    it('can find its successor', function() {
      assert.equal(nine.next(), 13);
      assert.equal(six.next(), 7);
    });

    it('returns null if there is no successor', function() {
      assert.isNull(twenty.next());
    });
  });

  describe('#find', function() {
    it('can find a node with a given value', function() {
      const foundSeven = tree.find(7);
      const foundTwenty = tree.find(20);

      assert.isOk(foundSeven);
      assert.equal(foundSeven.value, 7);
      assert.isOk(foundTwenty);
      assert.equal(foundTwenty.value, 20);
    });

    it('returns null if no node is found', function() {
      assert.isNull(tree.find(5));
    });
  });

  describe('#min', function() {
    it('can determine its minimum', function() {
      assert.equal(tree.min(), 2);
      assert.equal(eighteen.min(), 17);
      assert.equal(seventeen.min(), 17);
    });
  });

  describe('#max', function() {
    it('can determine its maximum', function() {
      assert.equal(tree.max(), 20);
      assert.equal(six.max(), 13);
      assert.equal(seventeen.max(), 17);
    });
  });

  describe('#depth', function() {
    it('can determine its maximum depth', function() {
      assert.equal(tree.depth(), 5);
      assert.equal(two.depth(), 1);
      assert.equal(eighteen.depth(), 2);
    });
  });

  describe('#isValid', function() {
    it('can determine if it is valid', function() {
      assert.isOk(tree.isValid());
      assert.isOk(threeB.isValid());
    });

    it('can determine if it is invalid', function() {
      const origLeft = eighteen.left;
      eighteen.left = new Node(19);
      assert.isNotOk(tree.isValid());
      eighteen.left = origLeft;
    });
  });
});

describe('Tree', function() {
  const emptyTree = new Tree();
  const tree = new Tree([13, 18, 3, 17, 6, 7, 20, 2, 4, 15, 9]);
  const values = [ 2, 3, 4, 6, 7, 9, 13, 15, 17, 18, 20 ];
  describe('#values', function() {
    it('can report and sort its values', function() {
      assert.deepEqual(tree.values(), values);
      assert.deepEqual(emptyTree.values(), []);
    });
  });

  describe('#find', function() {
    it('can find a node with a given value', function() {
      const foundSeven = tree.find(7);
      const foundTwenty = tree.find(20);

      assert.isOk(foundSeven);
      assert.equal(foundSeven.value, 7);
      assert.isOk(foundTwenty);
      assert.equal(foundTwenty.value, 20);
    });

    it('returns null if no node is found', function() {
      assert.isNull(tree.find(5));
      assert.isNull(emptyTree.find(5));
    });
  });

  describe('#min', function() {
    it('can determine its minimum', function() {
      assert.equal(tree.min(), 2);
    });
    it('returns null if no values exist', function() {
      assert.isNull(emptyTree.min());
    });
  });

  describe('#max', function() {
    it('can determine its maximum', function() {
      assert.equal(tree.max(), 20);
    });
    it('returns null if no values exist', function() {
      assert.isNull(emptyTree.max());
    });
  });

  describe('#depth', function() {
    it('can determine its depth', function() {
      const leftward = new Tree([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
      const rightward = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const balanced = new Tree([5, 3, 7, 2, 4, 6, 8]);
      assert.equal(leftward.depth(), 10);
      assert.equal(rightward.depth(), 10);
      assert.equal(balanced.depth(), 3);
    });
  });

  describe('#rebalance', function() {
    it('can optimally balance itself', function() {
      const full = new Tree([1, 2, 3, 4, 5, 6, 7]);
      const fullPlusOne = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
      full.rebalance();
      fullPlusOne.rebalance();
      assert.equal(full.depth(), 3);
      assert.equal(fullPlusOne.depth(), 4);
      assert.isOk(full.isValid());
      assert.isOk(fullPlusOne.isValid());
    });
  });

  describe('#clone', function() {
    it('returns a rebalanced clone', function() {
      const orig = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const clone = orig.clone();
      assert.deepEqual(orig.values(), clone.values());
      assert.isAbove(orig.depth(), clone.depth());
      assert.isOk(clone.isValid());
    });
  });

  describe('#delete', function() {
    it('deletes a solo node', function() {
      const tree = new Tree(3);
      tree.delete(3);
      assert.isNull(tree.root);
      assert.isOk(tree.isValid());
    });
    it('deletes a node without children', function() {
      const tree = new Tree([2, 1, 3]);
      tree.delete(3);
      assert.deepEqual(tree.values(), [1, 2]);
      assert.isOk(tree.isValid());
    });
    it('deletes a node with a left child only', function() {
      const tree = new Tree([3, 2, 1]);
      tree.delete(3);
      assert.deepEqual(tree.values(), [1, 2]);
      assert.isOk(tree.isValid());
    });
    it('deletes a node with a right child only', function() {
      const tree = new Tree([1, 2, 3]);
      tree.delete(1);
      assert.deepEqual(tree.values(), [2, 3]);
      assert.isOk(tree.isValid());
    });
    it('deletes a node with two children', function() {
      // when node.right.left === null
      const t1 = new Tree([2, 1, 3, 4]);
      t1.delete(2);
      assert.deepEqual(t1.values(), [1, 3, 4]);
      assert.isOk(t1.isValid());
      // when node.right.left !== null
      const t2 = new Tree([2, 1, 4, 3, 5]);
      t2.delete(2);
      assert.deepEqual(t2.values(), [1, 3, 4, 5]);
      assert.isOk(t2.isValid());
    });
    it('fails gracefully if no match', function() {
      const tree = new Tree([1, 2, 3, 4, 5]);
      const rv = tree.delete(6);
      assert.deepEqual(tree.values(), [1, 2, 3, 4, 5]);
      assert.isFalse(rv);
    });
    it('returns the tree after a successful deletion', function() {
      const tree = new Tree([3, 1, 2, 4, 5]);
      const rv = tree.delete(3);
      assert.deepEqual(rv.values(), [1, 2, 4, 5]);
    });
  });
});

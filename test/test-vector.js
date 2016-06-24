const assert = require('chai').assert;

import {Vector} from '../source/math/vector';

describe('Vector', function() {
  describe('#constructor', function() {
    it('can safely initialize from 0-3 numerical arguments', function() {
      const vEmpty = new Vector();
      assert.deepEqual(vEmpty.asArray(), [0, 0, 0]);
      const vx = new Vector(1);
      assert.deepEqual(vx.asArray(), [1, 0, 0]);
      const vxy = new Vector(1, 2);
      assert.deepEqual(vxy.asArray(), [1, 2, 0]);
      const vxyz = new Vector(1, 2, 3);
      assert.deepEqual(vxyz.asArray(), [1, 2, 3]);
    });
    it('can safely initialize from an array', function() {
      const vEmpty = new Vector([]);
      assert.equal(vEmpty.x, 0);
      assert.equal(vEmpty.y, 0);
      assert.equal(vEmpty.z, 0);
      const vx = new Vector([1]);
      assert.equal(vx.x, 1);
      assert.equal(vx.y, 0);
      assert.equal(vx.z, 0);
      const vxy = new Vector([1, 2]);
      assert.equal(vxy.x, 1);
      assert.equal(vxy.y, 2);
      assert.equal(vxy.z, 0);
      const vxyz = new Vector([1, 2, 3]);
      assert.equal(vxyz.x, 1);
      assert.equal(vxyz.y, 2);
      assert.equal(vxyz.z, 3);
    });
  });

  describe('#set', function() {
    it('can be set from 3 values', function() {
      const v = new Vector();
      v.set(1, 2, 3);
      assert.deepEqual(v.asArray(), [1, 2, 3]);
    });
    it('can safely be set from an array', function() {
      const v = new Vector();
      v.set([1, 2, 3]);
      assert.deepEqual(v.asArray(), [1, 2, 3]);
    });
  });

  describe('#add', function() {
    it('adds a vector', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(1, 1, 1);
      const rv = a.add(b);
      assert.deepEqual(a.asArray(), [2, 3, 4]);
      assert.strictEqual(rv, a);
    });
  });

  describe('#sub', function() {
    it('subtracts a vector', function() {
      const a = new Vector(2, 3, 4);
      const b = new Vector(1, 1, 1);
      const rv = a.sub(b);
      assert.deepEqual(a.asArray(), [1, 2, 3]);
      assert.strictEqual(rv, a);
    });
  });

  describe('#copy', function() {
    it('returns a copied vector', function() {
      const a = new Vector(1, 2, 3);
      const b = a.copy();
      assert.notStrictEqual(a, b);
      assert.deepEqual(a.asArray(), [1, 2, 3]);
      assert.deepEqual(b.asArray(), [1, 2, 3]);
    });
  });

  describe('#equals', function() {
    it('returns true when vectors share attributes', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(1, 2, 3);
      assert.isTrue(a.equals(b));
    });

    it('returns false when vectors have different attributes', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(0, 2, 3);
      const c = new Vector(1, 0, 3);
      const d = new Vector(1, 2, 0);
      assert.isFalse(a.equals(b));
      assert.isFalse(a.equals(c));
      assert.isFalse(a.equals(d));
    });
  });

  describe('#negate', function() {
    const a = new Vector(1, 2, 3);
    a.negate();
    assert.deepEqual(a.asArray(), [-1, -2, -3]);
  });

  describe('#multiplyScalar', function() {
    it('multiplies by a scalar', function() {
      const a = new Vector(1, 2, 3);
      const rv = a.multiplyScalar(2);
      assert.deepEqual(a.asArray(), [2, 4, 6]);
      assert.strictEqual(rv, a);
    });
  });

  describe('#length', function() {
    it('returns the length of a vector', function() {
      const a = new Vector(3, 4, 0);
      const b = new Vector(3, 0, 4);
      const c = new Vector(0, 3, 4);
      assert.equal(a.length(), 5);
      assert.equal(b.length(), 5);
      assert.equal(c.length(), 5);
    });
  });

  describe('#setLength', function() {
    it('changes the length of a vector', function() {
      const a = new Vector(3, 4, 0);
      a.setLength(10);
      assert.deepEqual(a.asArray(), [6, 8, 0]);
    });
  });

  describe ('#dot', function() {
    it('calculates the dot product', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(4, 5, 6);
      assert.equal(a.dot(b), 32);
    });
  });

  describe('#normalize', function() {
    it('sets the length of a vector to 1 and maintains the same direction', function() {
      const a = new Vector(3, 4, 0);
      const b = a.copy();
      b.normalize();
      assert.equal(b.length(), 1);
      assert.equal(b.dot(a), 5);
    });
  });

  describe('#cross', function() {
    it('finds the cross product of two vectors', function() {
      const a = new Vector(2, 3, 4);
      const b = new Vector(5, 6, 7);
      assert.deepEqual(a.cross(b).asArray(), [-3, 6, -3]);
    });
  });

});

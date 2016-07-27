const assert = require('chai').assert;

import {Vector} from '../../source/math/vector';

describe('Vector', function() {

  function dimensionsMustMatch(fnName) {
    // utility to check for an expected error
    it('dimensions must match', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(1, 2, 3, 4);
      const c = new Vector(5, 6, 7, 8);
      assert.throws(function() {
        a[fnName](b);
      }, 'vector dimensions must match');
      assert.doesNotThrow(function() {
        b[fnName](c);
      });
    });
  }

  describe('#constructor', function() {
    it('can safely initialize from numerical arguments', function() {
      const vEmpty = new Vector();
      assert.deepEqual(vEmpty.toArray(), []);
      const vx = new Vector(1);
      assert.deepEqual(vx.toArray(), [1]);
      const vxyz = new Vector(1, 2, 3);
      assert.deepEqual(vxyz.toArray(), [1, 2, 3]);
    });
    it('can safely initialize from an array', function() {
      const vEmpty = new Vector([]);
      assert.deepEqual(vEmpty.toArray(), []);
      const vx = new Vector([1]);
      assert.deepEqual(vx.toArray(), [1]);
      const vxyz = new Vector([1, 2, 3]);
      assert.deepEqual(vxyz.toArray(), [1, 2, 3]);
    });
    it('can initialize from a string separated by commas and/or spaces (numpy style)', function() {
      const v1 = new Vector('1 2 3 4');
      const v2 = new Vector('1,2,3,4');
      const v3 = new Vector('1, 2 ,3 , 4');
      assert.deepEqual(v1.toArray(), [1, 2, 3, 4]);
      assert.deepEqual(v2.toArray(), [1, 2, 3, 4]);
      assert.deepEqual(v3.toArray(), [1, 2, 3, 4]);
    });
  });

  describe('#set', function() {
    it('can be set from values', function() {
      const v = new Vector();
      v.set(1, 2, 3);
      assert.deepEqual(v.toArray(), [1, 2, 3]);
    });
    it('can be set from an array', function() {
      const v = new Vector();
      v.set([1, 2, 3]);
      assert.deepEqual(v.toArray(), [1, 2, 3]);
    });
  });

  describe('#get', function() {
    it('gets the val at a natural index', function() {
      const a = new Vector(1, 2, 5);
      assert.equal(a.get(1), 1);
      assert.equal(a.get(2), 2);
      assert.equal(a.get(3), 5);
    });
  });

  describe('.dims', function() {
    it('returns the number of dimensions of a vector', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(4, 5, 6, 7);
      assert.equal(a.dims, 3);
      assert.equal(b.dims, 4);
    });
  });

  describe('#addDimensions', function() {
    it('adds zeroed dimensions to a vector', function() {
      const a = new Vector(1, 2, 3);
      a.addDimensions(3);
      assert.deepEqual(a.toArray(), [1, 2, 3, 0, 0, 0]);
    });
  });

  describe('#matchDimensions', function() {
    const a = new Vector(1, 2, 3);
    const b = new Vector(4, 5, 6, 7, 8);
    const expected = [1, 2, 3, 0, 0];
    it('can increase dimensions of the caller', function() {
      const sm = a.clone();
      const lg = b.clone();
      sm.matchDimensions(lg);
      assert.deepEqual(sm.toArray(), expected);
    });
    it('can increase dimensions of the argument', function() {
      const sm = a.clone();
      const lg = b.clone();
      lg.matchDimensions(sm);
      assert.deepEqual(sm.toArray(), expected);
    });
  });

  describe('#add', function() {
    dimensionsMustMatch('add');

    it('adds a vector', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(1, 1, 3);
      const rv = a.add(b);
      assert.deepEqual(a.toArray(), [2, 3, 6]);
      assert.strictEqual(rv, a);
    });
  });

  describe('#sub', function() {
    dimensionsMustMatch('sub');

    it('subtracts a vector', function() {
      const a = new Vector(2, 3, 4);
      const b = new Vector(1, 1, 2);
      const rv = a.sub(b);
      assert.deepEqual(a.toArray(), [1, 2, 2]);
      assert.strictEqual(rv, a);
    });
  });

  describe('#clone', function() {
    it('returns a copied vector', function() {
      const a = new Vector(1, 2, 3);
      const b = a.clone();
      assert.notStrictEqual(a, b);
      assert.deepEqual(a.toArray(), [1, 2, 3]);
      assert.deepEqual(b.toArray(), [1, 2, 3]);
    });
  });

  describe('#equals', function() {
    it('returns true when vectors share attributes', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(1, 2, 3);
      assert.isTrue(a.equals(b));
    });

    it('returns false when vectors have different dimensions', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(1, 2, 3, 4);
      assert.isFalse(a.equals(b));
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

  describe('#multiplyScalar', function() {
    it('multiplies by a scalar', function() {
      const a = new Vector(1, 2, 3);
      const rv = a.multiplyScalar(2);
      assert.deepEqual(a.toArray(), [2, 4, 6]);
      assert.strictEqual(rv, a);
    });
  });

  describe('#negate', function() {
    const a = new Vector(1, 2, 3);
    a.negate();
    assert.deepEqual(a.toArray(), [-1, -2, -3]);
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
      assert.deepEqual(a.toArray(), [6, 8, 0]);
    });
  });

  describe ('#dot', function() {
    dimensionsMustMatch('dot');

    it('calculates the dot product', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(4, 5, 6);
      assert.equal(a.dot(b), 32);
    });
  });

  describe('#normalize', function() {
    it('sets the length of a vector to 1 and maintains the same direction', function() {
      const a = new Vector(3, 4, 0);
      const b = a.clone();
      b.normalize();
      assert.equal(b.length(), 1);
      assert.equal(b.dot(a), 5);
    });
  });

  describe('#cross', function() {
    it("throws an error if the vectors aren't both 3D", function() {
      const good = new Vector(2, 3, 4);
      const short = new Vector(2, 3);
      const long = new Vector(3, 4, 5, 6);
      const msg = 'vectors must be 3D to cross';
      assert.throws(function() {
        good.cross(short);
      }, msg);
      assert.throws(function() {
        short.cross(good);
      }, msg);
      assert.throws(function() {
        good.cross(long);
      }, msg);
      assert.throws(function() {
        long.cross(good);
      }, msg);
    });
    it('finds the cross product of two vectors', function() {
      const a = new Vector(2, 3, 4);
      const b = new Vector(5, 6, 7);
      assert.deepEqual(a.cross(b).toArray(), [-3, 6, -3]);
    });
  });

});
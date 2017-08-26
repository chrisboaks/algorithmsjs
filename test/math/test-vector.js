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

  describe('#norm', function() {
    it('returns the norm of a vector', function() {
      const a = new Vector(3, 4, 0);
      const b = new Vector(3, 0, 4);
      const c = new Vector(0, 3, 4);
      assert.equal(a.norm(), 5);
      assert.equal(b.norm(), 5);
      assert.equal(c.norm(), 5);
    });
  });

  describe('#setNorm', function() {
    it('changes the length of a vector', function() {
      const a = new Vector(3, 4, 0);
      a.setNorm(10);
      assert.deepEqual(a.toArray(), [6, 8, 0]);
    });
  });

  describe('#dot', function() {
    dimensionsMustMatch('dot');

    it('calculates the dot product', function() {
      const a = new Vector(1, 2, 3);
      const b = new Vector(4, 5, 6);
      assert.equal(a.dot(b), 32);
    });
  });

  describe('#normalize', function() {
    it('sets the norm of a vector to 1 and maintains the same direction', function() {
      const a = new Vector(3, 4, 0);
      const b = a.clone();
      b.normalize();
      assert.equal(b.norm(), 1);
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

  describe('#angle', function() {
    const x = new Vector(1, 0, 0);
    const y = new Vector(0, 1, 0);
    const z = new Vector(0, 0, 1);

    const TOLERANCE = 0.001;
    const degToRad = deg => Math.PI * deg / 180;

    it('returns 0 for vectors with the same orientation', function() {
      assert.equal(x.angle(x), 0);
      assert.equal(y.angle(y.multiplyScalar(3)), 0);
      assert.equal(z.multiplyScalar(5).angle(z), 0);
    });

    it('returns the angle in radians of two vectors', function() {
      const k = Math.sqrt(3);
      const a = new Vector(1, k, 0);
      const b = new Vector(1, 0, 1);

      assert.approximately(x.angle(a), degToRad(60), TOLERANCE);
      assert.approximately(y.angle(a), degToRad(30), TOLERANCE);
      assert.approximately(z.angle(a), degToRad(90), TOLERANCE);
      assert.approximately(x.angle(b), degToRad(45), TOLERANCE);
      assert.approximately(y.angle(b), degToRad(90), TOLERANCE);
      assert.approximately(z.angle(b), degToRad(45), TOLERANCE);
    });
  });

  describe('#centralize', function() {
    it('centralizes a vector', function() {
      const a = new Vector([1, 3, 5, 7]);
      const expectedCentralizedA = new Vector([-3, -1, 1, 3]);
      const b = new Vector([1, 4, 9, 25, 6]);
      const expectedCentralizedB = new Vector([-8, -5, 0, 16, -3]);
      assert.isTrue(a.centralize().equals(expectedCentralizedA));
      assert.isTrue(b.centralize().equals(expectedCentralizedB));
    });
  });

  describe('#correlation', function() {
    it('determines the correlation coefficient of two vectors', function() {
      const a = new Vector([150, 150, 128, 128, 121, 119, 115, 112, 105, 42]);
      const b = new Vector([184, 176, 160, 127, 126, 144, 120, 150, 138, 45]);
      assert.approximately(a.correlation(b), 0.932, 0.001);
    });
  });

});

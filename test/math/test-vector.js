const assert = require('chai').assert;

import {Vector} from '../../source/math/vector';
import {degToRad} from '../../source/math/utils';

const TOLERANCE = 0.0000001;

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

    it('can initialize from a vector by cloning it', function() {
      const v = new Vector(1, 2, 3, 4, 5);
      const newV = new Vector(v);
      assert.isTrue(v.equals(newV));
      assert.notStrictEqual(v, newV);
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

    it('returns 0 for vectors with the same orientation', function() {
      const a = new Vector(3, 4, -7);
      const b = new Vector(6, -3, -1);

      assert.equal(x.angle(x), 0);
      assert.equal(y.angle(y.multiplyScalar(3)), 0);
      assert.equal(z.multiplyScalar(5).angle(z), 0);
      assert.equal(a.multiplyScalar(2).angle(a), 0);
      assert.equal(b.multiplyScalar(5).angle(b), 0);
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
    it('centralizes a data vector', function() {
      const a = new Vector([1, 3, 5, 7]);
      const expectedCentralizedA = new Vector([-3, -1, 1, 3]);
      const b = new Vector([1, 4, 9, 25, 6]);
      const expectedCentralizedB = new Vector([-8, -5, 0, 16, -3]);
      assert.isTrue(a.centralize().equals(expectedCentralizedA));
      assert.isTrue(b.centralize().equals(expectedCentralizedB));
    });
  });

  describe('#correlation', function() {
    dimensionsMustMatch('correlation');

    it('determines the correlation coefficient of two data vectors', function() {
      const a = new Vector([150, 150, 128, 128, 121, 119, 115, 112, 105, 42]);
      const b = new Vector([184, 176, 160, 127, 126, 144, 120, 150, 138, 45]);
      assert.approximately(a.correlation(b), 0.93170008271042, TOLERANCE);
    });
  });

  describe('#projection', function() {
    const a = new Vector(4, 0, -3);
    const b = new Vector(1, -2, 2);

    dimensionsMustMatch('projection');

    it('finds the projection of a vector onto an axis', function() {
      const y = new Vector(0, 1, 0);
      const threeZ = new Vector(0, 0, 1);
      assert.isTrue(a.projection(y).equals(new Vector(0, 0, 0)));
      assert.isTrue(a.projection(threeZ).equals(new Vector(0, 0, -3)));
      assert.isTrue(b.projection(y).equals(new Vector(0, -2, 0)));
      assert.isTrue(b.projection(threeZ).equals(new Vector(0, 0, 2)));
    });

    it('finds the projection of a vector onto an arbitrary vector', function() {
      const projection = b.projection(a);
      assert.approximately(projection.get(1), -8 / 25, TOLERANCE);
      assert.approximately(projection.get(2), 0, TOLERANCE);
      assert.approximately(projection.get(3), 6 / 25, TOLERANCE);
    });
  });

  describe('#rejection', function() {
    const a = new Vector(4, 0, -3);
    const b = new Vector(1, -2, 2);

    dimensionsMustMatch('rejection');

    it('finds the rejection of a vector onto an axis', function() {
      const y = new Vector(0, 1, 0);
      const threeZ = new Vector(0, 0, 1);
      assert.isTrue(a.rejection(y).equals(a));
      assert.isTrue(a.rejection(threeZ).equals(new Vector(4, 0, 0)));
      assert.isTrue(b.rejection(y).equals(new Vector(1, 0, 2)));
      assert.isTrue(b.rejection(threeZ).equals(new Vector(1, -2, 0)));
    });

    it('finds the rejection of a vector onto an arbitrary vector', function() {
      const rejection = b.rejection(a);
      assert.approximately(rejection.get(1), 33 / 25, TOLERANCE);
      assert.approximately(rejection.get(2), -2, TOLERANCE);
      assert.approximately(rejection.get(3), 44 / 25, TOLERANCE);
    });
  });

  describe('#reflection', function() {
    const a = new Vector(4, 0, -3);
    const b = new Vector(1, -2, 2);

    dimensionsMustMatch('rejection');

    it('finds the reflection of a vector over an axis', function() {
      const y = new Vector(0, 1, 0);
      const threeZ = new Vector(0, 0, 1);
      assert.isTrue(a.reflection(y).equals(new Vector(-4, 0, 3)));
      assert.isTrue(a.reflection(threeZ).equals(new Vector(-4, 0, -3)));
      assert.isTrue(b.reflection(y).equals(new Vector(-1, -2, -2)));
      assert.isTrue(b.reflection(threeZ).equals(new Vector(-1, 2, 2)));
    });

    it('finds the reflection of a vector over an arbitrary vector', function() {
      const reflection = b.reflection(a);
      assert.approximately(reflection.get(1), -41 / 25, TOLERANCE);
      assert.approximately(reflection.get(2), 2, TOLERANCE);
      assert.approximately(reflection.get(3), -38 / 25, TOLERANCE);
    });

  });

  describe('.orthogonalize', function() {
    it('orthogonalizes a set of vectors', function() {
      const v1 = new Vector(2, 2, 2);
      const v2 = new Vector(0, 2, 2);
      const v3 = new Vector(0, 0, 2);
      let [o1, o2, o3] = Vector.orthogonalize(v1, v2, v3);
      assert.approximately(o1.get(1), 2, TOLERANCE);
      assert.approximately(o1.get(2), 2, TOLERANCE);
      assert.approximately(o1.get(3), 2, TOLERANCE);
      assert.approximately(o2.get(1), -4 / 3, TOLERANCE);
      assert.approximately(o2.get(2), 2 / 3, TOLERANCE);
      assert.approximately(o2.get(3), 2 / 3, TOLERANCE);
      assert.approximately(o3.get(1), 0, TOLERANCE);
      assert.approximately(o3.get(2), -1, TOLERANCE);
      assert.approximately(o3.get(3), 1, TOLERANCE);
    });
  });

});

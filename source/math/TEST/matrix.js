const assert = require('chai').assert;

import { Matrix } from '../matrix';

const I2 = new Matrix([[1, 0], [0, 1]]);

const I3 = new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

const M22 = new Matrix([[1, 2], [3, 4]]);

const M33 = new Matrix([[1, 2, 3], [4, 5, 6], [5, 8, 9]]);

const M44 = new Matrix([
  [1, 3, 5, 9],
  [1, 3, 1, 7],
  [4, 3, 9, 7],
  [5, 2, 0, 9]
]);

const M23 = new Matrix([[1, 2, 3], [4, 1, 2]]);

const M34 = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);

const M34T = new Matrix([[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]);

describe('Matrix', () => {
  // some utilities to check for expected errors
  function dimensionsMustMatch(fnName) {
    it('dimensions must match', () => {
      const a = M23.clone();
      const b = M34.clone();
      const c = M34.clone();
      assert.throws(() => {
        a[fnName](b);
      }, 'matrix dimensions must match');
      assert.doesNotThrow(() => {
        b[fnName](c);
      });
    });
  }

  function mustBeSquare(fnName, ...args) {
    it('matrix must be square', () => {
      const a = M34.clone();
      const b = M33.clone();
      assert.throws(() => {
        a[fnName](...args);
      }, 'matrix must be square');
      assert.doesNotThrow(() => {
        b[fnName](...args);
      });
    });
  }

  function mustBeMultiplicable(fnName) {
    it('matrices must be multiplicable', () => {
      const a = M23.clone();
      const b = M23.clone();
      const c = M34.clone();
      assert.throws(() => {
        a[fnName](b);
      }, 'matrices cannot be multiplied');
      assert.doesNotThrow(() => {
        b[fnName](c);
      });
    });
  }

  describe('#constructor', () => {
    it('throws an error if invalid values are passed', () => {
      const msg = 'invalid matrix constructor values passed';
      assert.throws(function noArgs() {
        new Matrix();
      }, msg);
      assert.throws(function numArg() {
        new Matrix(3);
      }, msg);
      assert.throws(function ary() {
        new Matrix([3, 4]);
      });
      assert.doesNotThrow(function matrixArgs() {
        new Matrix([[3, 4]]);
      });
    });
  });

  describe('.numRows', () => {
    it('returns the number of rows', () => {
      assert.equal(M22.numRows, 2);
      assert.equal(M33.numRows, 3);
      assert.equal(M23.numRows, 2);
      assert.equal(M34.numRows, 3);
    });
  });

  describe('.numCols', () => {
    it('returns the number of columns', () => {
      assert.equal(M22.numCols, 2);
      assert.equal(M33.numCols, 3);
      assert.equal(M23.numCols, 3);
      assert.equal(M34.numCols, 4);
    });
  });

  describe('.cols', () => {
    it('returns the columns of a matrix', () => {
      assert.deepEqual(M34.cols, M34T.rows);
    });
  });

  describe('Matrix.fromString', () => {
    it('creates a matrix from a numpy-styled string', () => {
      const str = '1 2 3 4; 5,6,7,8; 9 , 10 ,11, 12';
      const matrix = Matrix.fromString(str);
      assert.deepEqual(matrix.rows, M34.rows);
    });
  });

  describe('Matrix.filled', () => {
    it('creates a matrix by filling the given dimensions with the given values (repeated)', () => {
      // styled after the J language's `$` operator:
      // http://www.jsoftware.com/help/learning/05.htm
      const matrix = Matrix.filled([2, 3], [1, 2, 3, 4]);
      assert.deepEqual(matrix.rows, M23.rows);
    });
  });

  describe('Matrix.identity', () => {
    it('creates an identity matrix of the given dimension', () => {
      assert.deepEqual(Matrix.identity(2).rows, I2.rows);
      assert.deepEqual(Matrix.identity(3).rows, I3.rows);
    });
  });

  describe('#clone', () => {
    it('clones a matrix', () => {
      const cloned = M34.clone();
      assert.deepEqual(cloned.rows, M34.rows);
      assert.notStrictEqual(cloned, M34);
    });
  });

  describe('#transpose', () => {
    it('returns a new matrix of transposed rows', () => {
      const cloned = M34.clone();
      const rv = cloned.transpose();
      assert.deepEqual(cloned.rows, M34.rows);
      assert.deepEqual(rv.rows, M34T.rows);
    });
  });

  describe('Matrix.ones', () => {
    it('returns a matrix of ones', () => {
      const expected = [[1, 1, 1], [1, 1, 1]];
      assert.deepEqual(Matrix.ones(2, 3).rows, expected);
    });
  });

  describe('Matrix.zeros', () => {
    it('returns a matrix of zeros', () => {
      const expected = [[0, 0, 0], [0, 0, 0]];
      assert.deepEqual(Matrix.zeros(2, 3).rows, expected);
    });
  });

  describe('#getVal', () => {
    it('gets values using natural indices', () => {
      assert.equal(M34.getVal(2, 1), 5);
      assert.equal(M34.getVal(3, 2), 10);
    });
  });

  describe('#setVal', () => {
    it('sets a value at a natural index', () => {
      const clone = M34.clone();
      clone.setVal(7, 2, 1);
      clone.setVal(8, 3, 2);
      assert.equal(clone.getVal(2, 1), 7);
      assert.equal(clone.getVal(3, 2), 8);
    });
  });

  describe('#add', () => {
    dimensionsMustMatch('add');

    it('returns a new matrix with passed matrix values added', () => {
      const cloned = M34.clone();
      const addend = Matrix.ones(3, 4);
      const expected = new Matrix([
        [2, 3, 4, 5],
        [6, 7, 8, 9],
        [10, 11, 12, 13]
      ]);
      const rv = cloned.add(addend);
      assert.deepEqual(cloned.rows, M34.rows);
      assert.deepEqual(rv.rows, expected.rows);
    });
  });

  describe('#multiplyScalar', () => {
    it('returns a new matrix multiplied by a scalar', () => {
      const cloned = M34.clone();
      const expected = new Matrix([
        [2, 4, 6, 8],
        [10, 12, 14, 16],
        [18, 20, 22, 24]
      ]);
      const rv = cloned.multiplyScalar(2);
      assert.deepEqual(cloned.rows, M34.rows);
      assert.deepEqual(rv.rows, expected.rows);
    });
  });

  describe('#addScalar', () => {
    it('returns a new matrix with each entry summed with a scalar', () => {
      const cloned = M34.clone();
      const expected = new Matrix([
        [3, 4, 5, 6],
        [7, 8, 9, 10],
        [11, 12, 13, 14]
      ]);
      const rv = cloned.addScalar(2);
      assert.deepEqual(cloned.rows, M34.rows);
      assert.deepEqual(rv.rows, expected.rows);
    });
  });

  describe('#negate', () => {
    it('returns a new matrix with each value negated', () => {
      const cloned = M34.clone();
      const expected = new Matrix([
        [-1, -2, -3, -4],
        [-5, -6, -7, -8],
        [-9, -10, -11, -12]
      ]);
      const rv = cloned.negate();
      assert.deepEqual(cloned.rows, M34.rows);
      assert.deepEqual(rv.rows, expected.rows);
    });
  });

  describe('#sub', () => {
    dimensionsMustMatch('sub');

    it('returns a new matrix with passed matrix values subtracted', () => {
      const cloned = M34.clone();
      const subtrahend = Matrix.ones(3, 4);
      const expected = new Matrix([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]);
      const rv = cloned.sub(subtrahend);
      assert.deepEqual(cloned.rows, M34.rows);
      assert.deepEqual(rv.rows, expected.rows);
    });
  });

  describe('#equals', () => {
    dimensionsMustMatch('equals');

    it('returns true if matrices share all vals', () => {
      const cloned = M34.clone();
      assert.isTrue(M34.equals(cloned));
    });
    it('returns false if matrices do not share all vals', () => {
      const cloned = M34.clone();
      cloned.setVal(70, 1, 2);
      assert.isFalse(M34.equals(cloned));
    });
  });

  describe('#trace', () => {
    mustBeSquare('trace');

    it('returns the trace of a matrix', () => {
      assert.equal(M33.trace(), 15);
    });
  });

  describe('#multiply', () => {
    mustBeMultiplicable('multiply');

    it('multiplies two matrices', () => {
      const expected = new Matrix([[38, 44, 50, 56], [27, 34, 41, 48]]);

      assert.deepEqual(M23.multiply(M34).rows, expected.rows);
    });
  });

  describe('#pow', () => {
    mustBeSquare('pow', 1);

    it('throws an error with invalid exponents', () => {
      const m = new Matrix([[1]]);
      const msg = 'invalid matrix exponent';
      assert.throws(() => m.pow(1.2), msg);
      assert.throws(() => m.pow(-1), msg);
    });

    it('returns the identity if exp === 0', () => {
      const m = Matrix.fromString('1 3 5; 5 6 8; 4 6 2');
      assert.isTrue(m.pow(0).equals(Matrix.identity(3)));
    });

    it('raises a matrix to the given power', () => {
      // use the fibonacci-generating matrix as a proxy to validate

      const fib = Matrix.fromString('0 1; 1 1');
      const init = Matrix.fromString('1; 1');

      assert.isTrue(
        fib
          .pow(0)
          .multiply(init)
          .equals(Matrix.fromString('1; 1'))
      );
      assert.isTrue(
        fib
          .pow(1)
          .multiply(init)
          .equals(Matrix.fromString('1; 2'))
      );
      assert.isTrue(
        fib
          .pow(2)
          .multiply(init)
          .equals(Matrix.fromString('2; 3'))
      );
      assert.isTrue(
        fib
          .pow(3)
          .multiply(init)
          .equals(Matrix.fromString('3; 5'))
      );
      assert.isTrue(
        fib
          .pow(4)
          .multiply(init)
          .equals(Matrix.fromString('5; 8'))
      );
      assert.isTrue(
        fib
          .pow(5)
          .multiply(init)
          .equals(Matrix.fromString('8; 13'))
      );
      assert.isTrue(
        fib
          .pow(6)
          .multiply(init)
          .equals(Matrix.fromString('13; 21'))
      );
      assert.isTrue(
        fib
          .pow(7)
          .multiply(init)
          .equals(Matrix.fromString('21; 34'))
      );
    });
  });

  describe('#det', () => {
    mustBeSquare('det');

    it('returns the determinant of a matrix', () => {
      assert.equal(M44.det(), -376);
    });
  });

  describe('#cofactor', () => {
    mustBeSquare('cofactor');

    it('returns the cofactor matrix', () => {
      const initial = new Matrix([[1, 2, 3], [0, 4, 5], [1, 0, 6]]);

      const expected = new Matrix([[24, 5, -4], [-12, 3, 2], [-2, -5, 4]]);

      assert.deepEqual(initial.cofactor(), expected);
    });
  });

  describe('#inverse', () => {
    mustBeSquare('inverse');

    it('throws if matrix determinant is zero', () => {
      assert.throws(() => {
        const m = new Matrix([[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
        m.inverse();
      }, 'cannot determine the inverse of a matrix with determinant 0');
    });

    it('finds the inverse of a matrix', () => {
      const initial = new Matrix([[3, 1, -2], [-2, -1, 2], [-1, -2, 2]]);

      const expected = new Matrix([[1, 1, 0], [1, 2, -1], [1.5, 2.5, -0.5]]);

      assert.deepEqual(initial.inverse(), expected);
    });
  });

  describe('#toString', () => {
    it('returns a pretty string version of a matrix', () => {
      const expected =
        '[\n  [ 1, 3, 5, 9 ],\n  [ 1, 3, 1, 7 ],\n  [ 4, 3, 9, 7 ],\n  [ 5, 2, 0, 9 ]\n]';
      assert.equal(M44.toString(), expected);
    });
  });
});

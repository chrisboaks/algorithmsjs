export class Matrix {
  constructor(rows) {
    if (this._isValid(rows)) {
      this.rows = rows;
    } else {
      throw new Error('invalid matrix constructor values passed');
    }
  }

  get numRows() {
    return this.rows.length;
  }

  get numCols() {
    return this.rows[0].length;
  }

  get cols() {
    return this.rows[0].map((_, colIndex) => {
      return this.rows.map(row => row[colIndex]);
    });
  }

  static fromString(str) {
    function strToRows(str) {
      // numpy-style
      return str.split(';').map(row =>
        row
          .trim()
          .split(/[, ]+/)
          .map(parseFloat)
      );
    }
    return new Matrix(strToRows(str));
  }

  static filled(dims, vals) {
    function fillRows(dims, vals) {
      const [numRows, numCols] = dims;
      let i = 0;
      const rows = [];

      for (let r = 0; r < numRows; r++) {
        const row = [];
        for (let c = 0; c < numCols; c++) {
          row.push(vals[i++ % vals.length]);
        }
        rows.push(row);
      }

      return rows;
    }
    return new Matrix(fillRows(dims, vals));
  }

  static identity(dimension) {
    const fillPattern = [1].concat(Array(dimension).fill(0));
    return Matrix.filled([dimension, dimension], fillPattern);
  }

  static ones(numRows, numCols) {
    return Matrix.filled([numRows, numCols], [1]);
  }

  static zeros(numRows, numCols) {
    return Matrix.filled([numRows, numCols], [0]);
  }

  clone() {
    return new Matrix(this.rows.map(row => row.slice()));
  }

  transpose() {
    return new Matrix(this.cols);
  }

  getVal(rowIndex, colIndex) {
    return this.rows[rowIndex - 1][colIndex - 1];
  }

  setVal(val, rowIndex, colIndex) {
    this.rows[rowIndex - 1][colIndex - 1] = val;
    return this;
  }

  setEach(cb) {
    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        const current = this.rows[r][c];
        const newVal = cb(current, r, c, this);
        this.rows[r][c] = newVal;
      }
    }
    return this;
  }

  add(that) {
    this._dimensionsMustMatch(that);
    return this.clone().setEach((current, r, c) => current + that.rows[r][c]);
  }

  multiplyScalar(s) {
    return this.clone().setEach(current => s * current);
  }

  addScalar(s) {
    return this.clone().setEach(current => s + current);
  }

  negate() {
    return this.multiplyScalar(-1);
  }

  sub(that) {
    return this.add(that.negate());
  }

  equals(that) {
    this._dimensionsMustMatch(that);

    return this.rows.every((row, r) => {
      return row.every((val, c) => {
        return val === that.rows[r][c];
      });
    });
  }

  trace() {
    this._mustBeSquare();

    return this.rows.reduce((prev, curr, i) => prev + curr[i], 0);
  }

  multiply(that) {
    this._mustBeMultiplicable(that);

    function dot(row, col) {
      return row.reduce((prev, curr, i) => prev + curr * col[i], 0);
    }

    const res = this.rows.map(row => {
      return that.cols.map(col => dot(row, col));
    });

    return new Matrix(res);
  }

  pow(exp) {
    this._mustBeSquare();
    if (exp < 0 || !Number.isInteger(exp)) {
      throw new Error('invalid matrix exponent');
    }

    const clone = this.clone();

    if (exp === 0) {
      return Matrix.identity(this.numRows);
    } else if (exp === 1) {
      return clone;
    } else if (exp % 2 === 0) {
      const partial = clone.pow(exp / 2);
      return partial.multiply(partial);
    } else {
      const partial = clone.pow((exp - 1) / 2);
      return partial.multiply(partial).multiply(clone);
    }
  }

  det() {
    this._mustBeSquare();

    if (this.numRows === 1 && this.numCols === 1) {
      return this.rows[0][0];
    } else {
      const rowIndex = 0;
      return this.rows[rowIndex].reduce((prev, curr, c) => {
        const sign = Math.pow(-1, c);
        return prev + sign * curr * this._strike(rowIndex, c).det();
      }, 0);
    }
  }

  cofactor() {
    this._mustBeSquare();

    const newRows = this.rows.map((row, r) => {
      return row.map((col, c) => {
        return Math.pow(-1, r + c) * this._strike(r, c).det();
      });
    });

    return new Matrix(newRows);
  }

  inverse() {
    const det = this.det();
    if (det === 0) {
      throw new Error(
        'cannot determine the inverse of a matrix with determinant 0'
      );
    }
    return this.cofactor()
      .transpose()
      .multiplyScalar(1 / det);
  }

  toString() {
    const base = this.rows.map(row => row.join(', ')).join(' ],\n  [ ');
    return `[\n  [ ${base} ]\n]`;
  }

  _strike(r, c) {
    const rows = this.clone().rows;
    rows.splice(r, 1);
    rows.forEach(r => r.splice(c, 1));
    return new Matrix(rows);
  }

  _dimensionsMustMatch(that) {
    if (this.numRows !== that.numRows || this.numCols !== that.numCols) {
      throw new Error('matrix dimensions must match');
    }
  }

  _mustBeSquare() {
    if (this.numRows !== this.numCols) {
      throw new Error('matrix must be square');
    }
  }

  _mustBeMultiplicable(that) {
    if (this.numCols !== that.numRows) {
      throw new Error('matrices cannot be multiplied');
    }
  }

  _isValidType(rows) {
    return (
      Array.isArray(rows) &&
      rows.every(row => {
        return Array.isArray(row) && row.every(val => typeof val === 'number');
      })
    );
  }

  _isValidShape(rows) {
    const width = rows[0].length;
    return rows.every(row => row.length === width);
  }

  _isValid(rows) {
    return this._isValidType(rows) && this._isValidShape(rows);
  }
}

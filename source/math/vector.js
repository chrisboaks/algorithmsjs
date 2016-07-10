export class Vector {
  constructor(...args) {
    if (Array.isArray(args[0])) {
      this._vals = args[0].slice();
    } else if (typeof args[0] === 'string') {
      this._vals = args[0]
        .split(/[, ]+/)
        .map(parseFloat);
    } else {
      this._vals = args;
    }
  }

  get dims() {
    return this._vals.length;
  }

  _dimensionsMustMatch(that) {
    if (this.dims !== that.dims) {
      throw new Error('vector dimensions must match');
    }
  }

  addDimensions(newDims) {
    const zeros = Array(newDims).fill(0);
    this.set(this._vals.concat(zeros));
    return this;
  }

  matchDimensions(that) {
    const smaller = this.dims < that.dims ? this : that;
    const diff = Math.abs(this.dims - that.dims);
    smaller.addDimensions(diff);
  }

  asArray() {
    return this._vals.slice();
  }

  set(...args) {
    if (Array.isArray(args[0])) {
      this._vals = args[0].slice();
    } else {
      this._vals = args;
    }
  }

  get(i) {
    return this._vals[i - 1];
  }

  add(that) {
    this._dimensionsMustMatch(that);
    this._vals.forEach((_, i) => this._vals[i] += that._vals[i]);
    return this;
  }

  sub(that) {
    this._dimensionsMustMatch(that);
    this._vals.forEach((_, i) => this._vals[i] -= that._vals[i]);
    return this;
  }

  clone() {
    return new Vector(this.asArray());
  }

  equals(that) {
    return this.dims === that.dims &&
      this._vals.every((val, i) => val === that._vals[i]);
  }

  multiplyScalar(s) {
    this._vals.forEach((_, i) => this._vals[i] *= s);
    return this;
  }

  negate() {
    return this.multiplyScalar(-1);
  }

  length() {
    const sumSquares = this._vals.reduce((prev, curr) => prev + curr * curr, 0);
    return Math.sqrt(sumSquares);
  }

  setLength(len) {
    return this.multiplyScalar(len / this.length());
  }

  normalize() {
    return this.setLength(1);
  }

  dot(that) {
    this._dimensionsMustMatch(that);
    return this._vals.reduce((prev, curr, i) => prev + curr * that._vals[i], 0);
  }

  cross(that) {
    if (this.dims !== 3 || that.dims !== 3) {
      throw new Error('vectors must be 3D to cross');
    }
    const x = this.get(2) * that.get(3) - this.get(3) * that.get(2);
    const y = this.get(3) * that.get(1) - this.get(1) * that.get(3);
    const z = this.get(1) * that.get(2) - this.get(2) * that.get(1);
    return new Vector(x, y, z);
  }

}

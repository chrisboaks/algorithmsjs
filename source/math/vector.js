export class Vector {
  constructor(...args) {
    if (Array.isArray(args[0])) {
      this._vals = args[0].slice();
    } else if (typeof args[0] === 'string') {
      this._vals = args[0].split(/[, ]+/).map(parseFloat);
    } else if (args[0] instanceof Vector) {
      return args[0].clone();
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

  toArray() {
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
    const clone = this.clone();
    clone._vals.forEach((_, i) => (clone._vals[i] += that._vals[i]));
    return clone;
  }

  sub(that) {
    return this.add(that.negate());
  }

  clone() {
    return new Vector(this.toArray());
  }

  equals(that) {
    return (
      this.dims === that.dims &&
      this._vals.every((val, i) => val === that._vals[i])
    );
  }

  multiplyScalar(s) {
    const clone = this.clone();
    clone._vals.forEach((_, i) => (clone._vals[i] *= s));
    return clone;
  }

  negate() {
    return this.multiplyScalar(-1);
  }

  norm() {
    const sumSquares = this._vals.reduce((prev, curr) => prev + curr * curr, 0);
    return Math.sqrt(sumSquares);
  }

  setNorm(newNorm) {
    return this.multiplyScalar(newNorm / this.norm());
  }

  normalize() {
    return this.setNorm(1);
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

  _cosAngle(that) {
    return this.dot(that) / (this.norm() * that.norm());
  }

  angle(that) {
    return Math.acos(this._cosAngle(that));
  }

  centralize() {
    const sum = this._vals.reduce((a, b) => a + b, 0);
    const avg = sum / this.dims;
    const center = new Vector(new Array(this.dims).fill(avg));
    return this.clone().sub(center);
  }

  correlation(that) {
    this._dimensionsMustMatch(that);
    return this.centralize()._cosAngle(that.centralize());
  }

  projection(that) {
    this._dimensionsMustMatch(that);
    const multiplier = this.dot(that) / that.dot(that);
    return that.clone().multiplyScalar(multiplier);
  }

  rejection(that) {
    this._dimensionsMustMatch(that);
    return this.clone().sub(this.projection(that));
  }

  reflection(that) {
    this._dimensionsMustMatch(that);
    const proj = this.projection(that);
    const rej = this.rejection(that);
    return proj.sub(rej);
  }

  static orthogonalize(...vectors) {
    // Gram-Schmidt orthogonalization
    const vecs = vectors.map(v => new Vector(v));
    const orthos = [];
    vecs.forEach(v => {
      let clone = v.clone();
      orthos.forEach(o => {
        clone = clone.rejection(o);
      });
      orthos.push(clone);
    });
    return orthos;
  }
}

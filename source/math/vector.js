function zeros(size) {
  const rv = [];
  for (let i = 0; i < size; i++) {
    rv.push(0);
  }
  return rv;
}

function matchDims(a, b) {
  const smaller = a.dims < b.dims ? a : b;
  const diff = Math.abs(a.dims - b.dims);
  smaller.vals.concat(zeros(diff));
}

export class Vector {
  constructor(...args) {
    if (Array.isArray(args[0])) {
      this.vals = args[0].slice();
    } else {
      this.vals = args;
    }
  }

  asArray() {
    return this.vals.slice();
  }

  set(...args) {
    if (Array.isArray(args[0])) {
      this.vals = args[0].slice();
    } else {
      this.vals = args;
    }
  }

  get(i) {
    return this.vals[i];
  }

  get dims() {
    return this.vals.length;
  }

  add(that) {
    matchDims(this, that);
    this.vals.forEach((_, i) => this.vals[i] += that.get(i));
    return this;
  }

  sub(that) {
    matchDims(this, that);
    this.vals.forEach((_, i) => this.vals[i] -= that.get(i));
    return this;
  }

  copy() {
    return new Vector(this.asArray());
  }

  equals(that) {
    return this.vals.every((val, i) => val === that.get(i));
  }

  multiplyScalar(s) {
    this.vals.forEach((_, i) => this.vals[i] *= s);
    return this;
  }

  negate() {
    return this.multiplyScalar(-1);
  }

  length() {
    const sumSquares = this.vals.reduce((prev, curr) => prev + curr * curr, 0);
    return Math.sqrt(sumSquares);
  }

  setLength(len) {
    return this.multiplyScalar(len / this.length());
  }

  normalize() {
    return this.setLength(1);
  }

  dot(that) {
    return this.vals.reduce((prev, curr, i) => prev + curr * that.get(i), 0);
  }

  cross(that) {
    if (this.dims !== 3 || that.dims !== 3) {
      throw new Error('vectors must be 3D to cross');
    }
    const x = this.get(1) * that.get(2) - this.get(2) * that.get(1);
    const y = this.get(2) * that.get(0) - this.get(0) * that.get(2);
    const z = this.get(0) * that.get(1) - this.get(1) * that.get(0);
    return new Vector(x, y, z);
  }

}

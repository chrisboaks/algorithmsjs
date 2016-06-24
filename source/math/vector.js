export class Vector {
  constructor(x, y, z) {
    if (Array.isArray(x)) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  }

  set(x, y, z) {
    if (Array.isArray(x)) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  }

  asArray() {
    return [this.x, this.y, this.z];
  }

  add(that) {
    this.x += that.x;
    this.y += that.y;
    this.z += that.z;
    return this;
  }

  sub(that) {
    this.x -= that.x;
    this.y -= that.y;
    this.z -= that.z;
    return this;
  }

  copy() {
    return new Vector(this.asArray());
  }

  equals(that) {
    return this.x === that.x && this.y === that.y && this.z === that.z;
  }

  multiplyScalar(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  negate() {
    return this.multiplyScalar(-1);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  setLength(len) {
    return this.multiplyScalar(len / this.length());
  }

  normalize() {
    return this.setLength(1);
  }

  dot(that) {
    return (this.x * that.x) + (this.y * that.y) + (this.z * that.z);
  }

  cross(that) {
    const x = this.y * that.z - this.z * that.y;
    const y = this.z * that.x - this.x * that.z;
    const z = this.x * that.y - this.y * that.x;
    return new Vector(x, y, z);
  }


}

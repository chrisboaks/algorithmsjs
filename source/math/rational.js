import {Factor} from './factor';

class Rational {
  constructor(n, d = 1) {
    if (n instanceof Rational) {
      return n;
    }

    const invalidArgs = d === 0 ||
      !Number.isInteger(n) ||
      !Number.isInteger(d);
    if (invalidArgs) {
      throw new Error('invalid args passed to Rational constructor');
    }

    if (n === 0) {
      d = 1;
    } else if (d < 0) {
      n *= -1;
      d *= -1;
    }

    this.n = n;
    this.d = d;
    this.reduce();
  }

  reduce() {
    const gcd = Factor.gcd(this.n, this.d);
    this.n /= gcd;
    this.d /= gcd;
  }

  _isIrrational(x) {
    return !(x instanceof Rational || Number.isInteger(x));
  }

  mult(x) {
    if (this._isIrrational(x)) {
      throw new Error('invalid Rational multiplier');
    } else {
      const that = new Rational(x);
      return new Rational(this.n * that.n, this.d * that.d);
    }
  }

  div(x) {
    if (this._isIrrational(x)) {
      throw new Error('invalid Rational divisor');
    } else {
      const that = new Rational(x);
      return new Rational(this.n * that.d, this.d * that.n);
    }
  }

  add(x) {
    if (this._isIrrational(x)) {
      throw new Error('invalid Rational addend');
    } else {
      const that = new Rational(x);
      return new Rational(this.n * that.d + that.n * this.d, this.d * that.d);
    }
  }

  sub(x) {
    if (this._isIrrational(x)) {
      throw new Error('invalid Rational subtrahend');
    } else {
      const that = new Rational(x).mult(-1);
      return this.add(that);
    }
  }

  pow(exp) {
    if (!Number.isInteger(exp)) {
      throw new Error('invalid Rational exponent');
    } else {
      const posExp = Math.abs(exp);
      const n = Math.pow(this.n, posExp);
      const d = Math.pow(this.d, posExp);
      return exp >= 0 ? new Rational(n, d) : new Rational(d, n);
    }
  }

  abs() {
    return this.n >= 0 ? new Rational(this.n, this.d) : new Rational(-this.n, this.d);
  }

  toString() {
    return `${this.n}/${this.d}`;
  }

  toMixedString() {
    const sign = this.n < 0 ? '-' : '';
    const absolute = this.abs();
    const wholePart = Math.floor(absolute.n / absolute.d);
    const wholePartString = wholePart === 0 ? '' : `${wholePart} `;
    const fractionalPartNum = absolute.n % absolute.d;
    const fractionalPartString = `${fractionalPartNum}/${absolute.d}`;

    return `${sign}${wholePartString}${fractionalPartString}`;
  }

  _compare(x, fn) {
    if (this._isIrrational(x)) {
      throw new Error('Rational can only compare to a Rational or Integer');
    } else {
      const that = new Rational(x);
      const thisRepr = this.n * that.d;
      const thatRepr = that.n * this.d;
      return fn(thisRepr, thatRepr);
    }
  }

  equals(x) {
    return this._compare(x, (a, b) => a === b);
  }

  lt(x) {
    return this._compare(x, (a, b) => a < b);
  }

  gt(x) {
    return this._compare(x, (a, b) => a > b);
  }

  lte(x) {
    return this._compare(x, (a, b) => a <= b);
  }

  gte(x) {
    return this._compare(x, (a, b) => a >= b);
  }

  toFloat() {
    return this.n / this.d;
  }
}

export {Rational};

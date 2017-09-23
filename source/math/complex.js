class Complex {
  constructor(a = 0, b = 0) {
    if (a instanceof Complex) {
      return a;
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('invalid arg passed to Complex constructor');
    }
    this._a = a;
    this._b = b;
    this._r = Math.sqrt(a * a + b * b);
    this._theta = Math.atan2(b, a);
  }

  static fromPolar(r = 0, theta = 0) {
    const a = r * Math.cos(theta);
    const b = r * Math.sin(theta);
    return new Complex(a, b);
  }

  get a() {
    return this._a;
  }

  get b() {
    return this._b;
  }

  get r() {
    return this._r;
  }

  get theta() {
    return this._theta;
  }

  toString() {
    const sign = this.b < 0 ? '-' : '+';

    if (this.a && this.b) {
      return `${this.a} ${sign} ${Math.abs(this.b)}i`;
    } else if (this.a) {
      return `${this.a}`;
    } else if (this.b) {
      return `${this.b}i`;
    } else {
      return '0';
    }
  }

  equals(num) {
    if (typeof num === 'number') {
      return this.a === num && this.b === 0;
    }
    if (num instanceof Complex) {
      return this.a === num.a && this.b === num.b;
    }
    return false;
  }

  abs() {
    return Math.sqrt(this.a * this.a + this.b * this.b);
  }

  negate() {
    return new Complex(-this.a, -this.b);
  }

  add(num) {
    const cNum = new Complex(num);
    return new Complex(this.a + cNum.a, this.b + cNum.b);
  }

  sub(num) {
    const cNum = new Complex(num).negate();
    return this.add(cNum);
  }

  conjugate() {
    return new Complex(this.a, -this.b);
  }

  clone() {
    return new Complex(this.a, this.b);
  }

  mult(num) {
    const cNum = new Complex(num);
    const prodA = this.a * cNum.a - this.b * cNum.b;
    const prodB = this.a * cNum.b + this.b * cNum.a;
    return new Complex(prodA, prodB);
  }

  div(num) {
    if (typeof num === 'number') {
      return new Complex(this.a / num, this.b / num);
    }

    const conjugate = num.conjugate();
    const numerator = this.mult(conjugate);
    const denominator = num.mult(conjugate).a; // denominator is a real

    return numerator.div(denominator);
  }

  pow(num) {
    if (Number.isInteger(num) && num >= 0) {
      // return exact powers whenever possible
      return this._intPow(num);
    }

    // r * e ^ (i * theta) === e ^ (ln(r) + i * theta)
    const thisExp = new Complex(Math.log(this.r), this.theta);
    const multiple = thisExp.mult(num);
    const r = Math.exp(multiple.a);
    const theta = multiple.b;
    return Complex.fromPolar(r, theta);
  }

  _intPow(int) {
    const clone = this.clone();

    if (int === 0) {
      return 1;
    } else if (int === 1) {
      return clone;
    } else if (int % 2 === 0) {
      const partial = clone._intPow(int / 2);
      return partial.mult(partial);
    } else {
      const partial = clone._intPow((int - 1) / 2);
      return partial.mult(partial).mult(clone);
    }
  }
}

export { Complex };

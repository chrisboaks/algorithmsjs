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
  }

  get a() {
    return this._a;
  }

  get b() {
    return this._b;
  }

  toString() {
    const sign = this.b < 0 ? '-' : '+';

    if (this.a && this.b) {
      return `${ this.a } ${ sign } ${ Math.abs(this.b) }i`;
    } else if (this.a) {
      return `${ this.a }`;
    } else if (this.b) {
      return `${ this.b }i`;
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
    return Math.sqrt((this.a * this.a) + (this.b * this.b));
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
}

export {Complex};

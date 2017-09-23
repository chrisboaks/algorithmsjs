import { xor } from './utils';

class BigInt {
  constructor(n = 0) {
    if (n instanceof BigInt) {
      return n;
    }

    let valStr = `${n}`;

    if (valStr[0] === '-') {
      this._isNegative = true;
      valStr = valStr.slice(1);
    } else {
      this._isNegative = false;
    }

    const NONDIGIT = /\D/;
    if (valStr.match(NONDIGIT)) {
      throw new Error('invalid arg passed to BigInt constructor');
    }

    this._revDigits = valStr
      .split('')
      .map(x => parseInt(x, 10))
      .reverse(); // reverse the digits to simplify common operations

    this._clean();
  }

  _clean() {
    while (this._revDigits[this._revDigits.length - 1] === 0) {
      this._revDigits.pop();
    }
    return this;
  }

  get digits() {
    return this._clean()
      ._revDigits.slice()
      .reverse();
  }

  get val() {
    const repr = this.digits.join('');

    if (repr.length === 0) return '0';

    const sign = this._isNegative ? '-' : '';

    return `${sign}${repr}`;
  }

  clone() {
    const rv = new BigInt();
    rv._revDigits = this._revDigits.slice();
    rv._isNegative = this._isNegative;
    return rv;
  }

  negate() {
    const rv = this.clone();
    rv._isNegative = !rv._isNegative;
    return rv;
  }

  equals(n) {
    return this.val === new BigInt(n).val;
  }

  gt(n) {
    const bi = new BigInt(n);

    if (this._isNegative !== bi._isNegative) {
      return bi._isNegative;
    }

    if (this.digits.length !== bi.digits.length) {
      const baseGt = this.digits.length > bi.digits.length;
      return this._isNegative ? !baseGt : baseGt;
    }

    for (let i = 0; i < this.digits.length; i++) {
      if (this.digits[i] !== bi.digits[i]) {
        const baseGt = this.digits[i] > bi.digits[i];
        return this._isNegative ? !baseGt : baseGt;
      }
    }

    return false;
  }

  gte(n) {
    return this.equals(n) || this.gt(n);
  }

  lt(n) {
    return !this.gte(n);
  }

  lte(n) {
    return !this.gt(n);
  }

  get magnitude() {
    return this.digits.length;
  }

  abs() {
    const rv = this.clone();
    rv._isNegative = false;
    return rv;
  }

  _place(i) {
    return this._revDigits[i] || 0;
  }

  add(n) {
    const that = new BigInt(n);
    const loops = Math.max(this.magnitude, that.magnitude);

    function baseAdd(a, b) {
      // assumes a & b are both positive
      const rv = new BigInt();
      let carry = 0;
      for (let i = 0; i <= loops; i++) {
        const sum = a._place(i) + b._place(i) + carry;
        rv._revDigits.push(sum % 10);
        carry = Math.floor(sum / 10);
      }
      return rv;
    }

    function baseSub(lg, sm) {
      // treats lg & small are both positive & |lg| > |sm|
      const rv = new BigInt();
      let carry = 0;
      for (let i = 0; i <= loops; i++) {
        let diff = lg._place(i) - sm._place(i) + carry;
        if (diff < 0) {
          diff += 10;
          carry = -1;
        } else {
          carry = 0;
        }
        rv._revDigits.push(diff);
      }
      return rv;
    }

    let rv;
    if (this._isNegative === that._isNegative) {
      rv = baseAdd(this, that);
      rv._isNegative = this._isNegative;
    } else {
      const [lg, sm] = this.abs().gt(that.abs()) ? [this, that] : [that, this];
      rv = baseSub(lg, sm);
      rv._isNegative = lg._isNegative;
    }
    return rv;
  }

  sub(n) {
    return this.add(new BigInt(n).negate());
  }

  _changeMagnitude(n) {
    if (n >= 0) {
      const zeros = new Array(n).fill(0);
      this._revDigits = zeros.concat(this._revDigits);
    } else {
      this._revDigits = this._revDigits.slice(-n);
    }
    return this;
  }

  mult(n) {
    const that = new BigInt(n);

    const resNegative = xor(this._isNegative, that._isNegative);

    const rv = this._revDigits
      .map((x, i) => {
        const partial = new BigInt();
        partial._revDigits = that._revDigits.map(y => x * y);
        partial._changeMagnitude(i);
        return partial;
      })
      .reduce((prev, curr) => prev.add(curr), new BigInt());

    rv._isNegative = resNegative;
    return rv;
  }

  _divRem(denom) {
    if (denom.equals(0)) {
      throw new Error('division by zero is undefined');
    }

    const quotient = new BigInt();
    quotient._isNegative = xor(this._isNegative, denom._isNegative);
    let remainderAbs = this.clone().abs();
    const denomAbs = denom.abs();

    for (let i = this.magnitude - denom.magnitude; i >= 0; i--) {
      let partial = remainderAbs.clone()._changeMagnitude(-i);
      let divDigit = 0;
      while (partial.gte(denomAbs)) {
        partial = partial.sub(denomAbs);
        divDigit++;
      }
      quotient._revDigits.unshift(divDigit);
      remainderAbs = remainderAbs.sub(
        denomAbs.mult(divDigit)._changeMagnitude(i)
      );
    }

    return [quotient, this.clone().sub(quotient.mult(denom))];
  }

  div(n) {
    return this._divRem(new BigInt(n))[0];
  }

  rem(n) {
    return this._divRem(new BigInt(n))[1];
  }

  mod(n) {
    const divisor = new BigInt(n);
    const rem = this.rem(divisor);
    return rem.val === '0' || divisor._isNegative === rem._isNegative
      ? rem
      : rem.add(divisor);
  }

  _isEven() {
    const lastDigit = this._revDigits[0] || 0;
    return lastDigit % 2 === 0;
  }

  _square() {
    return this.mult(this);
  }

  exp(n) {
    const exponent = new BigInt(n);

    if (exponent.lt(0)) {
      throw new Error(
        'exponentiation not defined on BigInt for negative exponents'
      );
    }

    if (exponent.equals(0)) {
      return new BigInt(1);
    }

    const halfExponent = exponent.div(2);
    if (exponent._isEven()) {
      return this._square().exp(halfExponent);
    } else {
      return this._square()
        .exp(halfExponent)
        .mult(this);
    }
  }
}

export { BigInt };

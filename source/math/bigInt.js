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
      .reverse();  // reverse the digits to simplify common operations

    this._clean();
  }

  _clean() {
    while (this._revDigits[this._revDigits.length - 1] === 0) {
      this._revDigits.pop();
    }
    return this;
  }

  get digits() {
    return this
      ._clean()
      ._revDigits
      .slice()
      .reverse();
  }

  get val() {
    const repr = this.digits.join('');

    if (repr.length === 0) return '0';

    const sign = this._isNegative ? '-' : '';

    return `${sign}${repr}`;
  }

  clone() {
    return new BigInt(this.val);
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

  magnitude() {
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
    const loops = Math.max(this.magnitude(), that.magnitude());

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

}

export {BigInt};

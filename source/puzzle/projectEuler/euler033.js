// The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.

// We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

// There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.

// If the product of these four fractions is given in its lowest common terms, find the value of the denominator.

import {Rational} from '../../math/rational';
import {digits} from '../../math/utils';
import arrayFns from '../../fn/arrayFns';

const unique = arrayFns.unique;

function dedupedRational(nDigits, dDigits) {
  const repeated = dDigits.includes(nDigits[0]) ? nDigits[0] : nDigits[1];
  const n = nDigits[0] === repeated ? nDigits[1] : nDigits[0];
  const d = dDigits[0] === repeated ? dDigits[1] : dDigits[0];
  if (d === 0) {
    // return a dummy value if d is invalid
    return new Rational(0);
  }
  return new Rational(n, d);
}

function pairIsCurious(n, d) {
  if (n % 10 === 0 && d % 10 === 0) {
    return false;
  }

  const nDigits = digits(n);
  const dDigits = digits(d);
  const allDigits = nDigits.concat(dDigits);
  if (unique(allDigits).length == unique(nDigits).length + unique(dDigits).length) {
    return false;
  }

  return dedupedRational(nDigits, dDigits).equals(new Rational(n, d));
}


export default function euler033() {
  let curiousProduct = 1;
  for (let d = 11; d < 100; d++) {
    for (let n = 10; n < d; n++) {
      if (pairIsCurious(n, d)) {
        const fraction = new Rational(n, d);
        curiousProduct = fraction.mult(curiousProduct);
      }
    }
  }
  return curiousProduct.d;
}

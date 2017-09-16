// import {parity} from '../fn/arrayFns';

///////////////////////
function parity(ary, returnSwaps) {
  // count the number of swaps needed to sort an array
  // if even, return 1, else -1. optionally return total swaps

  if (!Array.isArray(ary)) {
    throw new Error('invalid input');
  }

  let swaps = 0;

  function countingMergeSort(ary) {
    if (ary.length <= 1) {
      return ary;
    } else {
      const pivot = Math.floor(ary.length / 2);
      const left = ary.slice(0, pivot);
      const right = ary.slice(pivot);
      return countingMerge(countingMergeSort(left), countingMergeSort(right));
    }
  }

  function countingMerge(left, right) {
    const res = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        res.push(left.shift());
      } else {
        swaps += left.length;
        res.push(right.shift());
      }
    }
    return res.concat(left).concat(right);
  }

  countingMergeSort(ary);

  if (returnSwaps) {
    return swaps;
  } else {
    return swaps % 2 ? -1 : 1;
  }
}
//////////////////////////


function removeAdjacentPairs(ary) {
  let i = 0;
  const copy = ary.slice();
  while (i < copy.length - 1) {
    if (copy[i] === copy[i + 1]) {
      copy.splice(i, 2);
      i -= 2;
    }
    i++;
  }
  return copy;
}

function toSubscript(ary) {
  const base = 0x2080;
  const codes = ary.map(n => base + n);
  return String.fromCharCode(...codes);
}

class Blade {
  constructor(mag, basisIndices = []) {
    this.mag = mag * parity(basisIndices);

    if (this.mag === 0) {
      this.basisIndices = [];
    } else {
      this.basisIndices = removeAdjacentPairs(basisIndices.slice().sort());
    }
  }

  toString(termFormat = false) {
    if (this.mag === 0) return '';

    const sign = this.mag > 0 ? '+' : '-';
    const mag = Math.abs(this.mag) === 1 ? '' : Math.abs(this.mag);
    const basis = `e${ toSubscript(this.basisIndices) }`;



    // todo: make work for 1e0
    if (termFormat) {
      return `${ sign } ${ mag }${ basis }`;
    } else {
      return `${ sign }${ mag }${ basis }`;
    }
  }

  sameBasis(that) {
    return (
      this.basisIndices.length === that.basisIndices.length &&
      this.basisIndices.every((b, i) => b === that.basisIndices[i])
    );
  }

  add(that) {
    if (this.sameBasis(that)) {
      const mag = this.mag * that.mag;
      const bases = this.basisIndices.concat(that.basisIndices);
      return new Blade(mag, bases);
    } else {
      return new Blade(0);
    }
  }

  mult(that) {
    const mag = this.mag * that.mag;
    const bases = this.basisIndices.concat(that.basisIndices);
    return new Blade(mag, bases);
  }

  negate() {
    return new Blade(-this.mag, this.basisIndices);
  }

  invert() {}
  divide() {}

}

class Multivector {
  constructor() {

  }
}


export {Blade, Multivector};

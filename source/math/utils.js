function minOf(ary) {
  if (ary.length === 0) {
    return null;
  }

  return ary.reduce((min, n) => (n < min ? n : min), Infinity);
}

function maxOf(ary) {
  if (ary.length === 0) {
    return null;
  }

  return ary.reduce((max, n) => (n > max ? n : max), -Infinity);
}

function minMaxOf(ary) {
  // this implementation allows for fewer comparisons than a more straightforward algorithm
  if (ary.length === 0) {
    return [null, null];
  } else if (ary.length === 1) {
    return [ary[0], ary[0]];
  }

  // setup of base values
  let bestMin, bestMax, i;
  if (ary.length % 2 === 0) {
    const [first, second] = ary;
    bestMin = first < second ? first : second;
    bestMax = first < second ? second : first;
    i = 2;
  } else {
    bestMin = bestMax = ary[0];
    i = 1;
  }

  // loop through remaining values
  let a, b, pairMin, pairMax;
  for (i; i < ary.length; i += 2) {
    a = ary[i];
    b = ary[i + 1];

    pairMin = a < b ? a : b;
    pairMax = a > b ? a : b;

    bestMin = pairMin < bestMin ? pairMin : bestMin;
    bestMax = pairMax > bestMax ? pairMax : bestMax;
  }

  return [bestMin, bestMax];
}

function xor(a, b) {
  return a ? !b : !!b;
}

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

function sineLaw(opts) {
  if (!opts.sideA || !opts.angleA || !xor(opts.sideB, opts.angleB)) {
    throw new Error('incorrect args passed to sineLaw');
  }

  if (opts.sideB) {
    const sinB = opts.sideB * Math.sin(opts.angleA) / opts.sideA;
    return Math.asin(sinB);
  } else {
    return Math.sin(opts.angleB) * opts.sideA / Math.sin(opts.angleA);
  }
}

function cosineLaw(opts) {
  if (!opts.sideA || !opts.sideB || !xor(opts.sideC, opts.angleC)) {
    throw new Error('incorrect args passed to cosineLaw');
  }

  const a = opts.sideA;
  const b = opts.sideB;
  const aSq = a * a;
  const bSq = b * b;

  if (opts.sideC) {
    const cSq = opts.sideC * opts.sideC;
    const cosC = (aSq + bSq - cSq) / (2 * a * b);
    return Math.acos(cosC);
  } else {
    const cosC = Math.cos(opts.angleC);
    const cSquared = aSq + bSq - 2 * a * b * cosC;
    return Math.sqrt(cSquared);
  }
}

function randInt(rangeStart, rangeEnd = 0) {
  if (!Number.isInteger(rangeStart) || !Number.isInteger(rangeEnd)) {
    throw new Error('invalid input');
  }
  const min = Math.min(rangeStart, rangeEnd);
  const max = Math.max(rangeStart, rangeEnd);
  const multiplier = max - min + 1;
  return Math.floor(Math.random() * multiplier) + min;
}

function digits(int) {
  if (!Number.isInteger(int)) {
    throw new Error('invalid input');
  }
  const str = `${Math.abs(int)}`;
  return str.split('').map(d => parseInt(d));
}

function _extractNumsFromArgs(args) {
  let nums;
  if (Array.isArray(args[0])) {
    nums = args[0];
  } else {
    nums = args;
  }

  if (nums.some(n => !Number.isFinite(n)) || nums.length === 0) {
    throw new Error('invalid input');
  }

  return nums;
}

function mod(n, div) {
  if (!isFinite(n) || !isFinite(div) || div <= 0) {
    throw new Error('invalid input');
  }
  // ensures a positive value is always returned
  return (n % div + div) % div;
}

function mean(...args) {
  const nums = _extractNumsFromArgs(args);
  const sum = nums.reduce((a, b) => a + b);
  return sum / nums.length;
}

function median(...args) {
  const nums = _extractNumsFromArgs(args).sort();

  let startIndex, endIndex;
  if (nums.length % 2 === 0) {
    const mid = nums.length / 2;
    startIndex = mid - 1;
    endIndex = mid + 1;
  } else {
    startIndex = Math.floor(nums.length / 2);
    endIndex = startIndex + 1;
  }

  return mean(nums.slice(startIndex, endIndex));
}

function modes(...args) {
  const nums = _extractNumsFromArgs(args);
  const numCounts = nums.reduce((counts, n) => {
    counts[n] = counts[n] ? counts[n] + 1 : 1;
    return counts;
  }, {});
  const topCount = Math.max.apply(null, Object.values(numCounts));
  const modesSet = new Set();
  nums.filter(n => numCounts[n] === topCount).forEach(n => modesSet.add(n));
  return Array.from(modesSet);
}

export {
  maxOf,
  minOf,
  minMaxOf,
  xor,
  degToRad,
  radToDeg,
  sineLaw,
  cosineLaw,
  randInt,
  digits,
  mod,
  mean,
  median,
  modes
};

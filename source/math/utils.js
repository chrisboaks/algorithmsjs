function maxOf(ary) {
  if (ary.length === 0) {
    return null;
  }
  let best = -Infinity;
  ary.forEach(value => {
    if (value > best) {
      best = value;
    }
  });
  return best;
}

function minOf(ary) {
  if (ary.length === 0) {
    return null;
  }
  let best = Infinity;
  ary.forEach(value => {
    if (value < best) {
      best = value;
    }
  });
  return best;
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
    const first = ary[0];
    const second = ary[1];
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
    if (a < b) {
      pairMin = a;
      pairMax = b;
    } else {
      pairMin = b;
      pairMax = a;
    }

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
    const cSquared = aSq + bSq - (2 * a * b * cosC);
    return Math.sqrt(cSquared);
  }
}

function randInt(rangeStart, rangeEnd = 0) {
  if (!Number.isInteger(rangeStart) || !Number.isInteger(rangeEnd)) {
    throw new Error('invalid input');
  }
  const [min, max] = minMaxOf([rangeStart, rangeEnd]);
  const multiplier = max - min + 1;
  return Math.floor(Math.random() * multiplier) + min;
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
  randInt
};

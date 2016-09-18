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
  if (!opts.a || !opts.A || !xor(opts.b, opts.B)) {
    throw new Error('incorrect args passed to sineLaw');
  }

  if (opts.b) {
    const sinB = opts.b * Math.sin(opts.A) / opts.a;
    return Math.asin(sinB);
  } else {
    return Math.sin(opts.B) * opts.a / Math.sin(opts.A);
  }
}

function cosineLaw(opts) {
  if (!opts.a || !opts.b || !xor(opts.c, opts.C)) {
    throw new Error('incorrect args passed to cosineLaw');
  }

  const a = opts.a;
  const b = opts.b;
  const aSq = a * a;
  const bSq = b * b;

  if (opts.c) {
    const cSq = opts.c * opts.c;
    const cosC = (aSq + bSq - cSq) / (2 * a * b);
    return Math.acos(cosC);
  } else {
    const cosC = Math.cos(opts.C);
    const cSquared = aSq + bSq - (2 * a * b * cosC);
    return Math.sqrt(cSquared);
  }
}

export {maxOf, minOf, minMaxOf, xor, degToRad, radToDeg, sineLaw, cosineLaw};

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

export {maxOf, minOf, minMaxOf};

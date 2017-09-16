// functions assume that all passed permutations
// are fully 'hydrated'

function commutesWith(f, g) {
  return equals(compose(f, g), compose(g, f));
}

function compose(...permutations) {
  if (permutations.length === 1) {
    return permutations[0];
  } else {
    const composed = {};
    const f = permutations[0];
    const g = compose(...permutations.slice(1));
    Object.keys(f).forEach(el => composed[el] = f[g[el]]);
    return composed;
  }
}

function equals(f, g) {
  return Object.keys(f).length === Object.keys(g).length &&
    Object.keys(f).every(k => f[k] === g[k]);
}

function inverseOf(permutation) {
  const inverse = {};
  Object.keys(permutation)
    .forEach(el => inverse[permutation[el]] = el);
  return inverse;
}

function isId(permutation) {
  return Object.keys(permutation).every(k => k === `${ permutation[k] }`);
}

function orderOf(permutation) {
  return generateFrom(permutation).length;
}

function toCycle(permutation) {
  const numElements = Object.keys(permutation).length;
  const cycle = [];
  let iteration = permutation;
  for (let i = 1; i <= numElements; i++) {
    if (!isId(iteration)) {
      cycle.push(iteration);
    } else {
      cycle.unshift(iteration);
      break;
    }
    iteration = compose(iteration, permutation);
  }
  return cycle;
}

function toString(permutation) {
  const keys = Object.keys(permutation).sort();
  if (isId(permutation)) { return `(${ keys[0] })`; }

  const cycles = [];
  const seen = {};

  keys.forEach(k => {
    const cycle = [];
    let el = k;
    while (!seen[el]) {
      seen[el] = true;
      cycle.push(el);
      el = permutation[el];
    }
    cycles.push(cycle);
  });

  const stringify = els => els.length > 1 ? `(${ els.join(', ') })` : '';
  return cycles.map(stringify).join('');
}

export {
  commutesWith,
  compose,
  equals,
  inverseOf,
  isId,
  orderOf,
  toCycle,
  toString,
};

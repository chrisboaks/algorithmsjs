// TODO: ensure uniqueness of permutations

function unique(ary) { return Array.from(new Set(ary)); }

function isValidPermutation(permutation) {
  if (typeof permutation !== 'object') return false;

  const keys = unique(Object.keys(permutation));
  const vals = unique(Object.values(permutation).map(v => v.toString()));
  return keys.length === vals.length && keys.every(k => vals.includes(k));
}

function allKeys(permutations) {
  const keys = permutations
    .map(p => Object.keys(p))
    .reduce((acc, ks) => acc.concat(ks), []);
  return unique(keys);
}

function createHydrator(keys) {
  return function (permutation) {
    const copy = Object.assign({}, permutation);
    keys.forEach(k => {
      if (copy[k] === undefined) {
        copy[k] = k;
      } else {
        copy[k] = copy[k].toString();
      }
    });
    return copy;
  };
}

function standardize(permutations) {
  if (!permutations.every(isValidPermutation)) {
    throw new Error('invalid permutations passed');
  }

  const keys = allKeys(permutations);
  const hydrate = createHydrator(keys);
  return permutations.map(hydrate);
}

export default standardize;

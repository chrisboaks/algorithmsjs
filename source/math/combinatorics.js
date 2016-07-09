function allCombinations(ary) {
  function combine(sets, item) {
    return sets
      .map(set => [item].concat(set))
      .concat(sets);
  }

  if (ary.length === 0) {
    return [[]];
  } else {
    return combine(allCombinations(ary.slice(1)), ary[0]);
  }
}

function allPermutations(ary) {
  if (ary.length < 2) {
    return [ary];
  } else {
    const val = ary[0];
    const subPermutations = allPermutations(ary.slice(1));
    return subPermutations
      .map(sub => {
        const res = [];
        for (let i = 0; i <= sub.length; i++) {
          const copy = sub.slice();
          copy.splice(i, 0, val);
          res.push(copy);
        }
        return res;
      })
      .reduce((prev, curr) => prev.concat(curr), []);
  }
}

export const Combinatorics = {allCombinations, allPermutations};

import {randInt} from '../math/utils';

function flatten(ary, depth = Infinity) {
  if (depth <= 0) return ary;

  let rv = [];
  ary.forEach(item => {
    if (!Array.isArray(item)) {
      rv.push(item);
    } else {
      rv = rv.concat(flatten(item, depth - 1));
    }
  });
  return rv;
}

function flatMap(ary, fn) {
  if (!Array.isArray(ary) || typeof fn !== 'function') {
    throw new Error('invalid input');
  }

  return ary
    .map(fn)
    .reduce((prev, curr) => prev.concat(curr), []);
}

function groupBy(ary, fn) {
  if (!Array.isArray(ary) || typeof fn !== 'function') {
    throw new Error('invalid input');
  }

  const dict = new Map();

  ary.forEach(item => {
    const res = fn(item);
    dict.has(res) ? dict.get(res).push(item) : dict.set(res, [item]);
  });

  return dict;
}

function nonTrivialSubgroups(ary) {
  return subgroups(ary)
    .filter(sub => sub.length !== 0 && sub.length !== ary.length);
}

function product(...arys) {
  if (arys.length === 0 || !arys.every(a => Array.isArray(a))) {
    throw new Error('invalid input');
  }

  return arys
    .reduce((subproducts, currAry) =>
      flatMap(subproducts, prod =>
        currAry.map(item => prod.concat(item))
      )
    , [[]]);
}

function rotate(ary, n = 1) {
  if (!Array.isArray(ary) || !Number.isInteger(n)) {
    throw new Error('invalid input');
  }
  const rotateVal = n % ary.length;
  const start = ary.slice(rotateVal);
  const end = ary.slice(0, rotateVal);
  return start.concat(end);
}

function sample(ary) {
  if (!Array.isArray(ary)) {
    throw new Error('invalid input');
  }
  const randIndex = randInt(ary.length - 1);
  return ary[randIndex];
}

function shuffle(ary) {
  if (!Array.isArray(ary)) {
    throw new Error('invalid input');
  }
  const copy = ary.slice();
  const rv = [];
  ary.forEach(() => {
    const randIndex = randInt(copy.length - 1);
    rv.push(copy[randIndex]);
    copy.splice(randIndex, 1);
  });
  return rv;
}

// note: not `subsets` b/c this function does not enforce uniqueness
function subgroups(ary) {
  if (!Array.isArray(ary)) {
    throw new Error('invalid input');
  }

  function getSubgroups(items) {
    if (items.length === 0) {
      return [[]];
    } else {
      const x = items[0];
      const xs = items.slice(1);
      const subsWithoutX = getSubgroups(xs);
      const subsWithX = subsWithoutX.map(sub => [x].concat(sub));
      return subsWithX.concat(subsWithoutX);
    }
  }

  return getSubgroups(ary);
}

function unique(ary) {
  if (!Array.isArray(ary)) {
    throw new Error('invalid input');
  }
  return Array.from(new Set(ary));
}

function zip(...arys) {
  if (arys.some(arg => !Array.isArray(arg)) || arys.length === 0) {
    throw new Error('invalid input');
  }
  return arys[0].map((first, i) => {
    return [first].concat(arys.slice(1).map(ary => ary[i] || null));
  });
}

export default {
  flatten,
  flatMap,
  groupBy,
  nonTrivialSubgroups,
  product,
  rotate,
  sample,
  shuffle,
  subgroups,
  unique,
  zip
};

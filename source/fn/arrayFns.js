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

function rotate(ary, n = 1) {
  if (!Array.isArray(ary) || !Number.isInteger(n)) {
    throw new Error('invalid input');
  }
  const rotateVal = n % ary.length;
  const start = ary.slice(rotateVal);
  const end = ary.slice(0, rotateVal);
  return start.concat(end);
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
  rotate,
  unique,
  zip
};

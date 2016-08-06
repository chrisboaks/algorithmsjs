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

export {flatten};

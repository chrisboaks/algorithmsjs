function merge(a, b) {
  const res = [];
  while (a.length > 0 && b.length > 0) {
    if (a[0] - b[0] > 0) {
      res.push(b.shift());
    } else {
      res.push(a.shift());
    }
  }
  return res.concat(a).concat(b);
}

export function mergeSort(ary) {
  if (ary.length !== 0 && ary.length !== 1) {
    const splitIndex = ary.length / 2;
    const a = ary.slice(0, splitIndex);
    const b = ary.slice(splitIndex, ary.length);
    const sorted = merge(mergeSort(a), mergeSort(b));
    sorted.forEach((val, i) => ary[i] = val);
  }
  return ary;
}

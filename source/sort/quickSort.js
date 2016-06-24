export function quickSort(ary) {
  if (ary.length === 0 || ary.length === 1) {
    return ary;
  }
  const pivot = ary.pop();
  const left = [];
  const right = [];
  ary.forEach(val => {
    val < pivot ? left.push(val) : right.push(val);
  });
  quickSort(left).concat([pivot]).concat(quickSort(right)).forEach((val, i) => {
    ary[i] = val;
  });
  return ary;
}

import { insertionCore } from './sortCores';

function generateGapSequence(max) {
  let res = [];
  let k = 1;
  do {
    let gap = Math.pow(2, k) - 1;
    res.unshift(gap);
    k++;
  } while (res[0] < max);
  return res.slice(1);
}

export function shellSort(ary) {
  const gaps = generateGapSequence(ary.length);
  for (let gap of gaps) {
    for (let i = 0; i < gap; i++) {
      insertionCore(ary, gap, i);
    }
  }
  return ary;
}

import { bubbleCore } from './sortCores';

const SCALE_FACTOR = 1.3;

export function combSort(ary) {
  let sorted = false;
  let gap = ary.length;
  while (gap > 1 || !sorted) {
    gap = Math.floor(gap / SCALE_FACTOR) || 1;
    sorted = bubbleCore(ary, gap);
  }
  return ary;
}

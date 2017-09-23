import { bubbleCore } from './sortCores';

export function bubbleSort(ary) {
  let sorted = false;
  while (!sorted) {
    sorted = bubbleCore(ary, 1);
  }
  return ary;
}

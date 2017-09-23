import { swap } from './sortCores';

export function cocktailShakerSort(ary) {
  let leftBound = 0;
  let rightBound = ary.length;
  let sorted;

  function sortUp() {
    let newRight = rightBound;
    for (let i = leftBound; i < rightBound; i++) {
      if (ary[i] > ary[i + 1]) {
        swap(ary, i, i + 1);
        sorted = false;
        newRight = i;
      }
    }
    rightBound = newRight;
  }

  function sortDown() {
    let newLeft = leftBound;
    for (let i = rightBound; i > leftBound; i--) {
      if (ary[i] < ary[i - 1]) {
        swap(ary, i, i - 1);
        sorted = false;
        newLeft = i;
      }
    }
    leftBound = newLeft;
  }

  while (!sorted) {
    sorted = true;
    sortUp();
    sortDown();
  }
  return ary;
}

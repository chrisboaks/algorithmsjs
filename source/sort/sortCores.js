export function swap(ary, i, j) {
  let tmp = ary[i];
  ary[i] = ary[j];
  ary[j] = tmp;
}

export function bubbleCore(ary, gap) {
  let sorted = true;
  for (let i = 0; i < ary.length - gap; i++) {
    if (ary[i] > ary[i + gap]) {
      swap(ary, i, i + gap);
      sorted = false;
    }
  }
  return sorted;
}

export function insertionCore(ary, gap, baseIndex) {
  for (let sortIndex = baseIndex; sortIndex < ary.length; sortIndex += gap) {
    let sortVal = ary[sortIndex];
    let compareIndex = sortIndex - gap;
    while (compareIndex >= 0 && ary[compareIndex] > sortVal) {
      ary[compareIndex + gap] = ary[compareIndex];
      compareIndex -= gap;
    }
    ary[compareIndex + gap] = sortVal;
  }
  return ary;
}

export function bubbleCore(ary, gap) {
  let sorted = true;
  for (let i = 0; i < ary.length - gap; i++) {
    const a = ary[i];
    const b = ary[i + gap];
    if (a > b) {
      ary[i] = b;
      ary[i + gap] = a;
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

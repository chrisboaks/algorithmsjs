// count the number of unique 10-digit numbers that can be created
// by making knight's moves on a telephone pad, starting with 0

// 1 2 3
// 4 5 6
// 7 8 9
//   0

const moves = {
  0: [4, 6],
  1: [6, 8],
  2: [7, 9],
  3: [4, 8],
  4: [0, 3, 9],
  5: [],
  6: [0, 1, 7],
  7: [2, 6],
  8: [1, 3],
  9: [2, 4]
};

function getNextPossCounts(possCount) {
  const rv = new Array(10).fill(0);
  possCount.forEach((count, poss) => {
    const nextPossibilities = moves[poss];
    nextPossibilities.forEach(n => (rv[n] += count));
  });
  return rv;
}

export default function getUniqueNumberCount() {
  const LENGTH = 10;
  let possCounts = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 1; i < LENGTH; i++) {
    possCounts = getNextPossCounts(possCounts);
  }
  return possCounts.reduce((a, b) => a + b);
}

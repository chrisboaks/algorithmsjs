// there are three types of edits that can be performed on strings: insert a char,
// remove a char, or replace a char. given two strings, write a fn to check if they are
// one (or zero) away.

export default function cci0105(s1, s2) {
  if (s1.length === s2.length) {
    return handleSameLength(s1, s2);
  } else if (Math.abs(s1.length - s2.length) === 1) {
    const short = s1.length < s2.length ? s1 : s2;
    const long = s1.length < s2.length ? s2 : s1;
    return handleDiffLength(short, long);
  } else {
    return false;
  }
}

function handleSameLength(s1, s2) {
  let seenDiff = false;
  for (let i = 0; i < s1.length; i++) {
    const sameChar = s1[i] === s2[i];
    if (!sameChar && !seenDiff) {
      seenDiff = true;
    } else if (!sameChar && seenDiff) {
      return false;
    }
  }
  return true;
}

function handleDiffLength(short, long) {
  let seenDiff = false;
  let i = 0;
  let j = 0;
  while (i < short.length && j < long.length) {
    const sameChar = short[i] === long[j];
    if (!sameChar && !seenDiff) {
      seenDiff = true;
      j++;
    } else if (!sameChar && seenDiff) {
      return false;
    }
    i++;
    j++;
  }
  return true;
}

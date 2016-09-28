// check permutation: given two strings, write a method to decide if one is a permutation of the other.

export default function cci0102(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  const aChars = a.split('').sort();
  const bChars = b.split('').sort();

  for (let i = 0; i < a.length; i++) {
    if (aChars[i] !== bChars[i]) {
      return false;
    }
  }

  return true;
}

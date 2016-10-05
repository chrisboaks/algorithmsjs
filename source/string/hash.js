import {mod} from '../math/utils';

const NUM_BUCKETS = 997; // a large prime number

function getCharCodes(str) {
  return str.split('').map(char => char.charCodeAt(0));
}

function hashingCallback(prev, curr) {
  const highestFiveBits = prev & 0xf8000000;
  const lowestBitsShifted = prev << 5;
  const shuffled = lowestBitsShifted ^ (highestFiveBits >> 27);
  return shuffled ^ curr;
}

function hash(str) {
  const charCodes = getCharCodes(str);
  const baseHashVal = charCodes.reduce(hashingCallback, 0);
  return mod(baseHashVal, NUM_BUCKETS);
}

export {hash};

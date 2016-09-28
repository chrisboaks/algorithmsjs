// implement an algorithm to determine if a string has all unique characters. what if you cannot use additional data structures?

function cci0101a(str) {
  const chars = str.split('');
  const seen = {};
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (seen[char]) {
      return false;
    } else {
      seen[char] = true;
    }
  }
  return true;
}

function cci0101b(str) {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] === str[j]) {
        return false;
      }
    }
  }
  return true;
}

export {
  cci0101a,
  cci0101b
};

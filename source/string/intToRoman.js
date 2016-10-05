// use this data structure to allow easy access to integer vals
const MAPPINGS = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
];

function intToRoman(num) {
  if (!Number.isInteger(num) || num > 3999) {
    throw new Error('invalid input');
  }

  let rv = '';
  while (num > 0) {
    const mappingToAppend = MAPPINGS.find(mapping => mapping[0] <= num);
    rv += mappingToAppend[1];
    num -= mappingToAppend[0];
  }
  return rv;
}

export {intToRoman};

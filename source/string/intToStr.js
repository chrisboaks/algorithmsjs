const ONES = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
];
const TEENS = [
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen'
];
const TENS = [
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety'
];
const MAGNITUDES = [
  '',
  'thousand',
  'million',
  'billion',
  'trillion',
  'quadrillion',
  'quintillion',
  'sextillion',
  'septillion',
  'octillion',
  'nonillion',
  'decillion',
  'undecillion',
  'duodecillion',
  'tredecillion',
  'quattuordecillion',
  'quindecillion',
  'sexdecillion',
  'septendecillion',
  'octodecillion',
  'novemdecillion',
  'vigintillion'
];

function splitNum(num) {
  const rv = [];
  do {
    rv.unshift(num % 1000);
    num = Math.floor(num / 1000);
  } while (num > 0);
  return rv;
}

function subhundredToStr(subhundred) {
  const tens = Math.floor(subhundred / 10);
  const ones = subhundred % 10;
  if (tens === 1 && ones > 0) {
    return TEENS[ones - 1];
  }

  const words = [];
  if (tens > 0) {
    words.push(TENS[tens - 1]);
  }
  if (ones > 0) {
    words.push(ONES[ones - 1]);
  }
  return words.join('-');
}

function tripleToStr(triple, britishStyle) {
  const words = [];
  const hundreds = Math.floor(triple / 100);
  const subhundreds = triple % 100;

  if (hundreds > 0) {
    words.push(`${ONES[hundreds - 1]} hundred`);
  }

  if (subhundreds > 0) {
    words.push(subhundredToStr(subhundreds));
  }

  const joinOn = britishStyle ? ' and ' : ' ';

  return words.join(joinOn);
}

function appendMagnitude(str, i, ary) {
  const magnitudeIndex = ary.length - i - 1;
  return str && MAGNITUDES[magnitudeIndex]
    ? `${str} ${MAGNITUDES[magnitudeIndex]}`
    : str;
}

function intToStr(num, britishStyle = false) {
  if (num === 0) return 'zero';

  const triples = splitNum(num);
  return triples
    .map(t => tripleToStr(t, britishStyle))
    .map(appendMagnitude)
    .filter(s => s !== '')
    .join(' ');
}

export { intToStr };

// Number Swapper: Write a function to swap a number in place (that is, without temporary variables)

export default function cci16_01(inputs) {
  let [a, b] = inputs;
  a -= b;
  b += a;
  a *= -1;
  a += b;
  return [a, b];
}

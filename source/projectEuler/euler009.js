// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
// a^2 + b^2 = c^2
// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.
// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

export default function euler009() {
  for (let a = 1; a < 333; a++) {
    for (let b = a + 1; b < (1000 - a) / 2; b++) {
      let c = 1000 - a - b;
      if (a * a + b * b === c * c) {
        return a * b * c;
      }
    }
  }
}

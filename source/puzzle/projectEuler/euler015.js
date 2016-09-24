// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
// How many such routes are there through a 20×20 grid?


// SOLUTION NOTES
// problem is equivalent to counting the number of arrangements of 20 'R's and 20 'D's:
// 40! / (20! * 20!)

import {Seq} from '../../math/seq';
const factorial = Seq.factorial;

export default function euler015() {
  return factorial(40) / (factorial(20) * factorial(20));
}

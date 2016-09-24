// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

import {Factor} from '../../math/factor';

export default function euler005() {
  let res = 1;
  for (let i = 1; i <= 20; i++) {
    res = Factor.lcm(res, i);
  }
  return res;
}

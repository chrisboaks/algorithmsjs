import {
  commutesWith,
  compose,
  equals,
  inverseOf,
  isId,
  orderOf,
  toCycle,
  toString,
} from './permutationTools';

function groupProduct(gPermutations, hPermutations) {
  return gPermutations
  .map(g => leftCoset(g, hPermutations))
  .reduce((acc, coset) => acc.concat(coset), []);
}

function leftCoset(el, permutations) {
  return permutations.map(p => compose(el, p));
}

export {
  groupProduct,
  leftCoset
};

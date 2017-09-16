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

import {
  groupProduct,
  leftCoset
} from './groupTools';

function cyclicGenerator(order) {
  const mapping = {};
  for (let i = 1; i <= order; i++) {
    mapping[i] = (i !== order) ? i + 1 : 1;
  }
  return mapping;
}

function flipGenerator(order) {
  const mapping = {};
  for (let i = 1; i <= order; i++) {
    mapping[i] = order - (i - 1);
  }
  return mapping;
}

class Group {
  constructor(permutations) {
    this.permutations = permutations;
  }

  get order() {
    return this.permutations.length;
  }

  static fromGenerators(...generators) {
    const [c, ...cs] = generators.map(toCycle);

    if (cs.length === 0) {
      return new Group(c);
    } else {
      const permutations = cs.reduce(groupProduct, c);
      return new Group(permutations);
    }
  }

  static Z(order) {
    return Group.fromGenerators(
      cyclicGenerator(order)
    );
  }

  static D(order) {
    return Group.fromGenerators(
      cyclicGenerator(order),
      flipGenerator(order)
    );
  }
}

export default Group;

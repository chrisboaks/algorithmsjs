import Group from './group/index';

export default Group;

// class Permutation {
//   constructor(mapping) {
//     // assume complete mapping for now
//     this._mapping = {};
//     Object.keys(mapping)
//       .forEach(el => this._mapping[el] = `${ mapping[el] }`);
//   }

//   static cyclic(order) {
//     const mapping = {};
//     for (let i = 1; i <= order; i++) {
//       mapping[i] = (i + 1) % order;
//     }
//     return new Permutation(mapping);
//   }

//   // get isId() {
//   //   return this.elements.every(el => this.map(el) === el);
//   // }

//   get elements() {
//     return Object.keys(this._mapping);
//   }

//   // get cycle() {
//   //   const numElements = this.elements.length;
//   //   const cycle = [];
//   //   let iteration = this;
//   //   for (let i = 1; i <= numElements; i++) {
//   //     if (!iteration.isId) {
//   //       cycle.push(iteration);
//   //     } else {
//   //       // put id at head of list
//   //       cycle.unshift(iteration);
//   //       break;
//   //     }
//   //     iteration = iteration.compose(this);
//   //   }
//   //   return new Group(cycle);
//   // }

//   // get order() {
//   //   return this.cycle.order;
//   // }

//   // get inverse() {
//   //   const mapping = {};
//   //   this.elements.forEach(el => {
//   //     const mapped = this.map(el);
//   //     mapping[mapped] = el;
//   //   });
//   //   return new Permutation(mapping);
//   // }

//   // toString() {
//   //   if (this.isId) {
//   //     return `(${ Object.keys(this._mapping)[0] })`;
//   //   }

//   //   const toCycle = els => els.length > 1 ? `(${ els.join(', ') })` : '';
//   //   const cycles = [];
//   //   const seen = {};

//   //   this.elements.forEach(el => {
//   //     const cycle = [];
//   //     let next = el;
//   //     do {
//   //       seen[next] = true;
//   //       cycle.push(next);
//   //       next = this.map(next);
//   //     } while (!seen[next]);
//   //     cycles.push(cycle);
//   //   });
//   //   return cycles.map(toCycle).join('');
//   // }

//   leftCoset(group) {
//     return group.permutations.map(p => this.compose(p));
//   }

//   map(element) {
//     return this._mapping[element];
//   }

//   // compose(other) {
//   //   const mapping = {};
//   //   this.elements.forEach(el => mapping[el] = this.map(other.map(el)));
//   //   return new Permutation(mapping);
//   // }

//   // equals(other) {
//   //   return this.elements.every(el => this.map(el) === other.map(el));
//   // }

//   // commutesWith(other) {
//   //   const ab = this.compose(other);
//   //   const ba = other.compose(this);
//   //   return ab.equals(ba);
//   // }
// }

// class Group {
//   // assume for now constructor is passed a valid set of permutations
//   constructor(permutations) {
//     this.permutations = permutations;
//   }

//   get order() {
//     return this.permutations.length;
//   }

//   // assume for now that generators form a set
//   static fromGenerators(firstGenerator, ...otherGenerators) {
//     let subgroup = firstGenerator.cycle;
//     otherGenerators.forEach(generator => {
//       const otherCycle = generator.cycle;
//       subgroup = subgroup.permutations
//         .map(el => otherCycle.permutations.map(other => other.compose(el)))
//         .reduce((acc, permutations) => acc.concat(permutations), []);
//     });
//     return new Group(subgroup);
//   }

//   static cyclic(order) {
//     return Group.fromGenerators(new Permutation.cyclic(order));
//   }
// }




// // groups: z, u, d


// var r = new Permutation({
//   1: 2,
//   2: 3,
//   3: 1
// });

// var r2 = {
//   1: 2,
//   2: 3,
//   3: 1
// };

// var f2 = {
//   1: 1,
//   2: 3,
//   3: 2
// };

// var f2dotr2 = {1: 3, 2: 2, 3: 1 };


// var f = new Permutation({
//   1: 1,
//   2: 3,
//   3: 2
// });



// var expected = new Permutation({1: 3, 2: 2, 3: 1 });

// var prod = f.compose(r);

// /* eslint-disable no-console */
// console.assert(prod.equals(expected));

// // f x r = {1: 3, 2: 2, 3: 1 }


// // export {Permutation};

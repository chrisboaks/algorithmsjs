const assert = require('chai').assert;

import Group from '../../source/math/group';

describe.skip('Group', () => {
  describe('C', () => {
    // it('makes a group', () => {
    //   console.log(Group.C(4).permutations);
    // });

    // it('makes a group w generators', () => {
    //   console.log(Group.fromGenerators(
    //     {1: 1, 2: 3, 3: 2},
    //     {1: 2, 2: 3, 3: 1}
    //   ));
    // });

    it('makes a D group', () => {
      console.log(Group.D(4).permutations);
    })
  });
});

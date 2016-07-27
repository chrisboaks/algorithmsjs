import {Tree} from '../dataStructures/binarySearchTree';

export function treeSort(ary) {
  new Tree(ary)
    .values()
    .forEach((val, i) => ary[i] = val); // sort in place
  return ary;
}

import { Heap } from '../dataStructures/heap';

export function heapSort(ary) {
  const h = new Heap(...ary);
  ary.splice(0, ary.length, ...h.sorted()); // allows array to be sorted in place
  return ary;
}

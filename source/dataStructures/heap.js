class Heap {
  constructor(...args) {
    this._items = args;
    for (let i = Math.floor(args.length / 2); i >= 0; i--) {
      this._heapify(i);
    }
  }

  static parent(i) {
    return i === 0 ? null : Math.floor((i - 1) / 2);
  }

  static left(i) {
    return 2 * i + 1;
  }

  static right(i) {
    return 2 * i + 2;
  }

  get size() {
    return this._items.length;
  }

  insert(item) {
    let index = this._items.length;
    let pIndex = Heap.parent(index);
    this._items.push(item);
    while (pIndex !== null && this._items[pIndex] > item) {
      this._swap(index, pIndex);
      index = pIndex;
      pIndex = Heap.parent(index);
    }
  }

  clone() {
    // simply copy over _items, since they are already in
    // heap order
    const rv = new Heap();
    rv._items = this._items.slice();
    return rv;
  }

  _swap(i, j) {
    const tmp = this._items[i];
    this._items[i] = this._items[j];
    this._items[j] = tmp;
  }

  _heapify(i) {
    const l = Heap.left(i);
    const r = Heap.right(i);
    const iVal = this._items[i];
    const lVal = this._items[l];
    const rVal = this._items[r];

    let idxSmallest = lVal !== undefined && lVal < iVal ? l : i;

    if (rVal !== undefined && rVal < this._items[idxSmallest]) {
      idxSmallest = r;
    }

    if (idxSmallest === i) {
      return;
    } else {
      this._swap(i, idxSmallest);
      this._heapify(idxSmallest);
    }
  }

  extractMin() {
    const rv = this._items[0];
    this._swap(0, this.size - 1);
    this._items.pop();
    this._heapify(0);
    return rv;
  }

  sorted() {
    const clone = this.clone();
    const rv = [];
    for (let i = 0; i < this.size; i++) {
      rv.push(clone.extractMin());
    }
    return rv;
  }
}

export { Heap };

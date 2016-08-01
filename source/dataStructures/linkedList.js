class Node {
  constructor(val) {
    this._val = val;
    this._prev = null;
    this._next = null;
  }
}

class LinkedList {
  // this implementation can function as both a stack and a queue
  constructor(...args) {
    this._head = null;
    this._last = null;
    for (const a of args) {
      this.push(a);
    }
  }

  toArray() {
    const rv = [];
    let node = this._head;
    while (node) {
      rv.push(node._val);
      node = node._next;
    }
    return rv;
  }

  reverse() {
    const rv = new LinkedList();
    while (this._last) {
      rv.push(this.pop());
    }
    return rv;
  }

  push(val) {
    const node = new Node(val);
    if (!this._head) {
      this._head = node;
    }
    if (this._last) {
      node._prev = this._last;
      this._last._next = node;
    }
    this._last = node;
    return this;
  }

  pop() {
    const rv = this._last && this._last._val;

    if (this._head === this._last) {
      this._head = this._last = null;
    } else {
      const penultimate = this._last._prev;
      penultimate._next = null;
      this._last = penultimate;
    }

    return rv;
  }

  unshift(val) {
    if (!this._head) {
      this.push(val);
    } else {
      const node = new Node(val);
      this._head._prev = node;
      node._next = this._head;
      this._head = node;
    }

    return this;
  }

  shift() {
    const rv = this._head && this._head._val;

    if (this._head === this._last) {
      this._head = this._last = null;
    } else {
      const second = this._head._next;
      second._prev = null;
      this._head = second;
    }

    return rv;
  }

  length() {
    let count = 0;
    let node = this._head;
    while (node) {
      count++;
      node = node._next;
    }
    return count;
  }

  _nodeAt(index) {
    let count = 0;
    let node = this._head;
    while (node && count <= index) {
      if (count === index) {
        return node;
      } else {
        count++;
        node = node._next;
      }
    }
    return null;
  }

  valAt(index) {
    const node = this._nodeAt(index);
    return node && node._val;
  }

  clone() {
    const rv = new LinkedList();
    let node = this._head;
    while (node) {
      rv.push(node._val);
      node = node._next;
    }
    return rv;
  }

  delete(index) {
    const clone = this.clone();
    const node = clone._nodeAt(index);

    if (!node) {
      return clone;
    }

    const before = node._prev;
    const after = node._next;

    if (before) {
      before._next = after;
    } else {
      clone._head = after;
    }

    if (after) {
      after._prev = before;
    } else {
      clone._last = before;
    }

    return clone;
  }

  head() {
    return this._head._val;
  }

  last() {
    return this._last._val;
  }

  init() {
    const rv = this.clone();
    rv.pop();
    return rv;
  }

  tail() {
    const rv = this.clone();
    rv.shift();
    return rv;
  }

  indexOf(val) {
    let index = 0;
    let node = this._head;
    while (node) {
      if (node._val === val) {
        return index;
      } else {
        index++;
        node = node._next;
      }
    }
    return -1;
  }

  includes(val) {
    return this.indexOf(val) >= 0;
  }

  concat(that) {
    const listA = this.clone();
    const listB = that.clone();

    listA._last._next = listB._head;
    listB._head._prev = listA._last;

    listA._last = listB._last;
    return listA;
  }

}


export {LinkedList};

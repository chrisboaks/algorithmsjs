class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(...args) {
    this.head = null;
    this.last = null;
    for (const a of args) {
      this.push(a);
    }
  }

  toArray() {
    const rv = [];
    let node = this.head;
    while (node) {
      rv.push(node.val);
      node = node.next;
    }
    return rv;
  }

  reverse() {
    const rv = new LinkedList();
    while (this.last) {
      rv.push(this.pop());
    }
    return rv;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
    }
    if (this.last) {
      node.prev = this.last;
      this.last.next = node;
    }
    this.last = node;
    return this;
  }

  pop() {
    const rv = this.last && this.last.val;

    if (this.head === this.last) {
      this.head = this.last = null;
    } else {
      const penultimate = this.last.prev;
      penultimate.next = null;
      this.last = penultimate;
    }

    return rv;
  }

  unshift(val) {
    if (!this.head) {
      this.push(val);
    } else {
      const node = new Node(val);
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

    return this;
  }

  shift() {
    const rv = this.head && this.head.val;

    if (this.head === this.last) {
      this.head = this.last = null;
    } else {
      const second = this.head.next;
      second.prev = null;
      this.head = second;
    }

    return rv;
  }

  length() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }

  _nodeAt(index) {
    let count = 0;
    let node = this.head;
    while (node && count <= index) {
      if (count === index) {
        return node;
      } else {
        count++;
        node = node.next;
      }
    }
    return null;
  }

  valAt(index) {
    const node = this._nodeAt(index);
    return node && node.val;
  }

  copy() {
    const rv = new LinkedList();
    let node = this.head;
    while (node) {
      rv.push(node.val);
      node = node.next;
    }
    return rv;
  }

  delete(index) {
    const copy = this.copy();
    const node = copy._nodeAt(index);

    if (!node) {
      return copy;
    }

    const before = node.prev;
    const after = node.next;

    if (before) {
      before.next = after;
    } else {
      copy.head = after;
    }

    if (after) {
      after.prev = before;
    } else {
      copy.last = before;
    }

    return copy;
  }

}


export {LinkedList};

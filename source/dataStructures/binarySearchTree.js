class Node {
  constructor(value, left, right) {
    this.value = value;
    this.parent = null;
    this.left = left || null;
    this.right = right || null;
  }

  next() {
    if (this.right) {
      return this.right.min();
    } else {
      let descendant = this;
      let ancestor = this.parent;
      while (ancestor) {
        if (ancestor.left === descendant) {
          return ancestor.value;
        } else {
          descendant = descendant.parent;
          ancestor = ancestor.parent;
        }
      }
      return null;
    }
  }

  set right(r) {
    this._right = r || null;
    if (r) {
      r.parent = this;
    }
  }

  get right() {
    return this._right;
  }

  set left(l) {
    this._left = l || null;
    if (l) {
      l.parent = this;
    }
  }

  get left() {
    return this._left;
  }

  values() {
    let left = this.left ? this.left.values() : [];
    let right = this.right ? this.right.values() : [];
    return left.concat([this.value]).concat(right);
  }

  find(val) {
    if (this.value === val) {
      return this;
    } else if (val < this.value && this.left) {
      return this.left.find(val);
    } else if (val > this.value && this.right) {
      return this.right.find(val);
    } else {
      return null;
    }
  }

  insert(node) {
    let accessor = node.value >= this.value ? 'right' : 'left';
    this[accessor] ? this[accessor].insert(node) : (this[accessor] = node);
  }

  min() {
    return this.left ? this.left.min() : this.value;
  }

  max() {
    return this.right ? this.right.max() : this.value;
  }

  depth() {
    const leftDepth = this.left ? this.left.depth() : 0;
    const rightDepth = this.right ? this.right.depth() : 0;
    return 1 + Math.max(leftDepth, rightDepth);
  }

  isValid() {
    const isLeftValid =
      this.left === null ||
      (this.left.value < this.value && this.left.isValid());
    const isRightValid =
      this.right === null ||
      (this.right.value >= this.value && this.right.isValid());

    return isLeftValid && isRightValid;
  }
}

class Tree {
  constructor(arg) {
    if (Array.isArray(arg)) {
      arg.forEach(val => this.insert(val));
    } else if (typeof arg !== 'undefined') {
      this.insert(arg);
    } else {
      this.root = null;
    }
  }

  insert(val) {
    let newNode = new Node(val);
    this.root ? this.root.insert(newNode) : (this.root = newNode);
  }

  find(val) {
    return this.root ? this.root.find(val) : null;
  }

  min() {
    return this.root ? this.root.min() : null;
  }

  max() {
    return this.root ? this.root.max() : null;
  }

  values() {
    return this.root ? this.root.values() : [];
  }

  isValid() {
    return this.root ? this.root.isValid() : true;
  }

  depth() {
    return this.root ? this.root.depth() : 0;
  }

  _getEfficientInsertionOrder() {
    function reorderByMedians(ary) {
      if (ary.length < 3) {
        return ary;
      } else {
        const medianIndex = Math.floor(ary.length / 2);
        const median = ary[medianIndex];
        const left = ary.slice(0, medianIndex);
        const right = ary.slice(medianIndex + 1);
        return [median]
          .concat(reorderByMedians(left))
          .concat(reorderByMedians(right));
      }
    }
    return reorderByMedians(this.values());
  }

  rebalance() {
    const values = this._getEfficientInsertionOrder();
    this.root = null;
    values.forEach(v => this.insert(v));
    return this;
  }

  clone() {
    const values = this._getEfficientInsertionOrder();
    return new Tree(values);
  }

  delete(val) {
    const node = this.find(val);
    if (!node) return false;
    function absorbChild(accessor) {
      const child = node[accessor];
      node.value = child.value;
      node.left = child.left;
      node.right = child.right;
    }
    function getSuccessorNode(node) {
      return node.left ? getSuccessorNode(node.left) : node;
    }

    if (node.left === null && node.right === null) {
      if (this.root === node) {
        this.root = null;
      } else {
        const parent = node.parent;
        parent.left === node ? (parent.left = null) : (parent.right = null);
      }
    } else if (node.right === null) {
      absorbChild('left');
    } else if (node.left === null) {
      absorbChild('right');
    } else if (node.right.left === null) {
      // because right is >= node and has no left child,
      // the node can simply take on right.value and right.right
      node.value = node.right.value;
      node.right = node.right.right;
    } else {
      // the most complicated case. find the successor node
      // (by definition, and after the above conditions,
      // within the right subtree and with no left children),
      // take on its value, and then redefine the successor's
      // right child as its parent's left child.
      const successor = getSuccessorNode(node);
      node.value = successor.value;
      successor.parent.left = successor.right;
    }

    return this;
  }
}

export { Node, Tree };

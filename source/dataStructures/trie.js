class Trie {
  constructor(str) {
    if (typeof str !== 'string' && typeof str !== 'undefined') {
      throw new Error('invalid argument passed to Trie constructor');
    }

    this.add(str);
  }

  add(str) {
    if (!str) {
      this.terminates = true;
    } else {
      const head = str.slice(0, 1);
      const tail = str.slice(1);
      if (this[head]) {
        this[head].add(tail);
      } else {
        this[head] = new Trie(tail);
      }
    }
  }

  exists(str) {
    if (str === '') {
      return !!this.terminates;
    } else {
      const head = str.slice(0, 1);
      const tail = str.slice(1);
      return !!(this[head] && this[head].exists(tail));
    }
  }

  get chars() {
    return Object.keys(this).filter(k => k !== 'terminates');
  }

  get children() {
    const flatten = ary => Array.prototype.concat.apply([], ary);

    const subchildren = flatten(
      this.chars.map(c => this[c].children.map(child => c + child))
    );

    return this.terminates ? [''].concat(subchildren) : subchildren;
  }

  _nodeAt(str) {
    if (str === '') {
      return this;
    } else {
      const head = str.slice(0, 1);
      const tail = str.slice(1);
      return this[head] ? this[head]._nodeAt(tail) : undefined;
    }
  }

  validPrefix(str) {
    return !!this._nodeAt(str);
  }

  startsWith(str) {
    const baseNode = this._nodeAt(str);
    if (baseNode) {
      return baseNode.children.map(child => str + child);
    } else {
      return [];
    }
  }
}

export { Trie };

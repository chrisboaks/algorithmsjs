import { LinkedList } from './linkedList';
import { hash } from '../string/hash';

class HashTable {
  constructor(...args) {
    this._items = [];
    for (const a of args) {
      this.add(a);
    }
  }

  items() {
    let rv = [];
    for (const list of this._items) {
      if (list) {
        rv = rv.concat(list.toArray());
      }
    }
    return rv;
  }

  includes(val) {
    const hashVal = hash(val);
    const list = this._items[hashVal];
    return !!(list && list.includes(val));
  }

  add(val) {
    const hashVal = hash(val);
    if (!this._items[hashVal]) {
      this._items[hashVal] = new LinkedList(val);
    } else if (!this.includes(val)) {
      this._items[hashVal].push(val);
    }
    return this;
  }

  delete(val) {
    const hashVal = hash(val);
    const valIndex = this._items[hashVal].indexOf(val);
    this._items[hashVal] = this._items[hashVal].delete(valIndex);
    return this;
  }
}

export { HashTable };

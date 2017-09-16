const assert = require('chai').assert;

import {Graph} from '../graph';

const gs6 =
`010011
101010
010100
001010
110100
100000`;

const ga6 =
`010011
001010
010100
000000
110100
000000`;

const gs6raw =
`0 1 0 0 1 1
1,0,1,0,1,0,
0;1;0;1;0;0
001010
1-1+0#  1% 0 h 0
   1   0  ;  00  $0  g0    `;


describe('Graph', function() {
  describe('#constructor', function() {
    it('can be initialized from an arbitrarily separated table of 0s and 1s', function() {
      const g = new Graph(gs6raw);
      assert.equal(g.toString(), gs6);
    });

    it('throws if passed incomplete adjacency data', function() {
      const incomplete = `11
                          110
                          011`;
      assert.throws(function() {
        new Graph(incomplete);
      }, 'incomplete adjacency matrix');
    });

    it('automatically makes symmetric adjacency data if isDirected is false', function() {
      const g = new Graph(ga6, false);
      assert.equal(g.toString(), gs6);
    });
  });

  describe('#addEdge', function() {
    it('adds directed edges', function() {
      const input = '000\n000\n010';
      const expected = '001\n000\n010';
      const g = new Graph(input);
      g.addEdge(0, 2);
      assert.equal(g.toString(), expected);
    });

    it('adds both edges if the graph is undirected', function() {
      const input = '000\n000\n000';
      const expected = '001\n000\n100';
      const g = new Graph(input, false);
      g.addEdge(0, 2);
      assert.equal(g.toString(), expected);
    });

    it('ignores attempts to add preexisting edges', function() {
      const input = '001\n000\n000';
      const g = new Graph(input);
      g.addEdge(0, 2);
      assert.equal(g.toString(), input);
    });
  });
});
